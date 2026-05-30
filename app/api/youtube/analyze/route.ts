import { NextResponse } from "next/server";
import { runYouTubeScraper } from "../../../lib/apify";
import { validateYouTubeUrl, extractVideoId, normalizeYouTubeData } from "../../../lib/youtube";
import type { YouTubeVideoData } from "../../../lib/youtube";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 90;

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// ─── Rate limiting ────────────────────────────────────────────────────────────
// In-memory per-IP limiter: 5 requests / hour.
// NOTE: resets on cold start on serverless; this matches the existing pattern
// used across this codebase (see app/api/analyze-hook/route.ts).
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// ─── Cache ────────────────────────────────────────────────────────────────────
// Video data + analysis cached by video ID for 1 hour.
type CacheEntry = {
  data: YouTubeVideoData;
  analysis: VideoAnalysisResult;
  cachedAt: number;
};
const CACHE_TTL_MS = 60 * 60 * 1000;
const videoCache = new Map<string, CacheEntry>();

// ─── Types ────────────────────────────────────────────────────────────────────
type VideoAnalysisResult = {
  hookScore: number;
  clarityScore: number;
  curiosityScore: number;
  retentionRisk: number;
  pattern: string;
  weakness: string;
  improvedHook: string;
  variants: string[];
  retentionNotes: string[];
  scoreRationale: string[];
  audienceTrigger: string;
  titlePairings: string[];
  thumbnailAngles: string[];
};

export type VideoAnalyzeResponse = YouTubeVideoData & {
  analysis: VideoAnalysisResult;
  mode: "ai" | "rules" | "cached";
  cached: boolean;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip")?.trim() ??
    "anonymous"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_MAX) return true;
  entry.count += 1;
  return false;
}

function getCached(videoId: string): CacheEntry | null {
  const entry = videoCache.get(videoId);
  if (!entry) return null;
  if (Date.now() - entry.cachedAt > CACHE_TTL_MS) {
    videoCache.delete(videoId);
    return null;
  }
  return entry;
}

function clean(value: unknown, max = 80): string {
  return typeof value === "string"
    ? value.trim().replace(/\s+/g, " ").slice(0, max)
    : "";
}

function cleanArr(value: unknown, fallback: string[], limit = 5): string[] {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .map((v) => clean(String(v), 220))
    .filter(Boolean)
    .slice(0, limit);
  return items.length ? items : fallback;
}

function clamp(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : fallback;
}

function fallbackAnalysis(title: string): VideoAnalysisResult {
  return {
    hookScore: 50,
    clarityScore: 55,
    curiosityScore: 50,
    retentionRisk: 55,
    pattern: "Title-based analysis",
    weakness: "No OpenAI key configured — scored with heuristics only.",
    improvedHook: title,
    variants: [
      title,
      `The truth behind: ${title.toLowerCase()}`,
      `What nobody tells you about: ${title.toLowerCase()}`,
    ],
    retentionNotes: [
      "Open with the payoff in the first three seconds, not the setup.",
      "Ensure the title and thumbnail make the same promise.",
      "Add a specific outcome, number, or tension to the hook.",
    ],
    scoreRationale: [
      "AI analysis unavailable — OpenAI key not configured.",
      "Score is a heuristic baseline only.",
      "Configure OPENAI_API_KEY for a real analysis.",
    ],
    audienceTrigger: "Unable to determine without AI analysis.",
    titlePairings: [
      title,
      `I tested this: ${title.toLowerCase()}`,
      `The mistake behind: ${title.toLowerCase()}`,
    ],
    thumbnailAngles: [
      "Bold result word",
      "Before / after contrast",
      "Mistake label over key moment",
    ],
  };
}

function normalizeAnalysis(raw: unknown, title: string): VideoAnalysisResult {
  if (!raw || typeof raw !== "object") return fallbackAnalysis(title);
  const r = raw as Record<string, unknown>;
  const fb = fallbackAnalysis(title);
  return {
    hookScore: clamp(r.hookScore, fb.hookScore),
    clarityScore: clamp(r.clarityScore, fb.clarityScore),
    curiosityScore: clamp(r.curiosityScore, fb.curiosityScore),
    retentionRisk: clamp(r.retentionRisk, fb.retentionRisk),
    pattern: clean(r.pattern, 200) || fb.pattern,
    weakness: clean(r.weakness, 320) || fb.weakness,
    improvedHook: clean(r.improvedHook, 260) || fb.improvedHook,
    variants: cleanArr(r.variants, fb.variants, 5),
    retentionNotes: cleanArr(r.retentionNotes, fb.retentionNotes, 5),
    scoreRationale: cleanArr(r.scoreRationale, fb.scoreRationale, 5),
    audienceTrigger: clean(r.audienceTrigger, 300) || fb.audienceTrigger,
    titlePairings: cleanArr(r.titlePairings, fb.titlePairings, 5),
    thumbnailAngles: cleanArr(r.thumbnailAngles, fb.thumbnailAngles, 5),
  };
}

async function analyzeVideoWithAI(
  video: YouTubeVideoData
): Promise<{ analysis: VideoAnalysisResult; mode: "ai" | "rules" }> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_API_TOKEN;
  if (!apiKey) return { analysis: fallbackAnalysis(video.title), mode: "rules" };

  const descPreview = video.description
    .slice(0, 500)
    .replace(/\n+/g, " ")
    .trim();

  const transcriptLine = video.subtitlePreview
    ? `Opening transcript: "${video.subtitlePreview.slice(0, 400)}"`
    : "";

  const contextLines = [
    `Video title (the hook): "${video.title}"`,
    video.channelName ? `Channel: ${video.channelName}` : "",
    video.viewCount != null ? `Views: ${video.viewCount.toLocaleString()}` : "",
    video.likes != null ? `Likes: ${video.likes.toLocaleString()}` : "",
    video.subscriberCount != null
      ? `Subscribers: ${video.subscriberCount.toLocaleString()}`
      : "",
    video.duration ? `Duration: ${video.duration}` : "",
    video.uploadDate ? `Uploaded: ${video.uploadDate}` : "",
    descPreview ? `Description preview: "${descPreview}"` : "",
    transcriptLine,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are HookSignals, a strict YouTube video performance analyst. " +
              "The video title IS the hook — score it for clarity, curiosity, retention pull, and packaging alignment. " +
              "Use description, transcript, and channel metrics as supporting context. " +
              "Score harshly. Vague, generic, or clickbait-without-payoff titles score below 50. " +
              "Return only valid JSON.",
          },
          {
            role: "user",
            content:
              `Analyze this YouTube video's hook and packaging performance.\n\n${contextLines}\n\n` +
              "Return JSON with these exact keys:\n" +
              "hookScore (0-100), clarityScore (0-100), curiosityScore (0-100), retentionRisk (0-100),\n" +
              "pattern (string), weakness (string), improvedHook (string — a stronger version of the title),\n" +
              "variants (array of 3 improved title alternatives),\n" +
              "retentionNotes (array of 3 observations about early retention risk from the title/hook),\n" +
              "scoreRationale (array of 3 reasons for the hookScore),\n" +
              "audienceTrigger (string — what viewer emotion or intent this targets),\n" +
              "titlePairings (array of 3 complementary title options),\n" +
              "thumbnailAngles (array of 3 thumbnail ideas that match the hook promise).\n\n" +
              "Scoring calibration:\n" +
              "85-100 = elite — specific audience, measurable payoff, strong tension, immediate curiosity.\n" +
              "70-84 = strong — clear payoff and curiosity with minor weaknesses.\n" +
              "50-69 = average — usable premise but weak stakes or vague promise.\n" +
              "20-49 = weak — generic, no tension, or no clear viewer benefit.\n" +
              "0-19 = very weak — vague, misleading, or meaningless.",
          },
        ],
      }),
      signal: AbortSignal.timeout(25_000),
    });

    if (!response.ok) {
      return { analysis: fallbackAnalysis(video.title), mode: "rules" };
    }

    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return { analysis: fallbackAnalysis(video.title), mode: "rules" };

    const parsed: unknown = JSON.parse(content);
    return { analysis: normalizeAnalysis(parsed, video.title), mode: "ai" };
  } catch {
    return { analysis: fallbackAnalysis(video.title), mode: "rules" };
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "rate_limited", message: "Rate limit reached. Try again in an hour." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const rawUrl =
    typeof (body as Record<string, unknown>)?.url === "string"
      ? ((body as Record<string, unknown>).url as string).trim()
      : "";

  if (!rawUrl) {
    return NextResponse.json(
      { error: "missing_url", message: "A YouTube URL is required." },
      { status: 400 }
    );
  }

  if (!validateYouTubeUrl(rawUrl)) {
    return NextResponse.json(
      { error: "invalid_url", message: "Enter a valid YouTube video URL (youtube.com or youtu.be)." },
      { status: 400 }
    );
  }

  const videoId = extractVideoId(rawUrl)!;

  // Cache hit — skip Apify and AI entirely
  const cached = getCached(videoId);
  if (cached) {
    const payload: VideoAnalyzeResponse = {
      ...cached.data,
      analysis: cached.analysis,
      mode: "cached",
      cached: true,
    };
    return NextResponse.json(payload);
  }

  // Guard: APIFY_TOKEN required
  const apifyToken = process.env.APIFY_TOKEN;
  if (!apifyToken) {
    return NextResponse.json(
      {
        error: "apify_token_missing",
        message:
          "APIFY_TOKEN is not configured. Add it to your environment variables to enable YouTube data fetching.",
      },
      { status: 503 }
    );
  }

  const actorId =
    process.env.APIFY_YOUTUBE_ACTOR_ID || "streamers/youtube-scraper";

  // ── Fetch from Apify ────────────────────────────────────────────────────────
  let videoData: YouTubeVideoData;
  try {
    const items = await runYouTubeScraper(rawUrl, apifyToken, actorId);

    if (!items.length) {
      return NextResponse.json(
        {
          error: "no_data",
          message:
            "No data returned for this video. It may be private, deleted, age-restricted, or unavailable in the scraper region.",
        },
        { status: 404 }
      );
    }

    videoData = normalizeYouTubeData(items[0], rawUrl);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);

    if (msg.includes("apify_unauthorized")) {
      return NextResponse.json(
        { error: "apify_unauthorized", message: "Apify authentication failed. Check your APIFY_TOKEN." },
        { status: 503 }
      );
    }
    if (msg.includes("apify_actor_not_found")) {
      return NextResponse.json(
        {
          error: "apify_actor_not_found",
          message: "Apify actor not found. Verify APIFY_YOUTUBE_ACTOR_ID is set to 'streamers/youtube-scraper'.",
        },
        { status: 503 }
      );
    }
    if (msg.includes("apify_timeout")) {
      return NextResponse.json(
        { error: "scraper_timeout", message: "The video scraper timed out. Try again in a moment." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "scraper_failed", message: "Video data could not be fetched. Try again." },
      { status: 502 }
    );
  }

  // ── AI analysis ─────────────────────────────────────────────────────────────
  const { analysis, mode } = await analyzeVideoWithAI(videoData);

  // Store in cache
  videoCache.set(videoId, { data: videoData, analysis, cachedAt: Date.now() });

  const payload: VideoAnalyzeResponse = {
    ...videoData,
    analysis,
    mode,
    cached: false,
  };

  return NextResponse.json(payload);
}
