import { NextResponse } from "next/server";
import { validateYouTubeUrl, extractVideoId } from "../../../lib/youtube";
import { getYouTubeVideoProvider } from "../../../lib/providers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// ─── Rate limiting ────────────────────────────────────────────────────────────
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 10;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// ─── Cache: video data + analysis by video ID ─────────────────────────────────
const CACHE_TTL_MS = 60 * 60 * 1000;
const videoCache = new Map<string, { payload: AnalyzeResponse; cachedAt: number }>();

// ─── Types ────────────────────────────────────────────────────────────────────
export type VideoInfo = {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string | null;
  duration: string | null;
  thumbnailUrl: string;
  viewCount: number | null;
  likeCount: number | null;
  commentCount: number | null;
};

export type Scores = {
  packagingScore: number;
  hookStrength: number;
  curiosityScore: number;
  clarityScore: number;
  ctrPotential: number;
  retentionRisk: number;
  outlierPotential: number;
};

export type Analysis = {
  summary: string;
  strengths: string[];
  risks: string[];
  titleDiagnosis: string;
  thumbnailDiagnosis: string;
  retentionDiagnosis: string;
  positioningDiagnosis: string;
};

export type Recommendations = {
  betterTitles: string[];
  thumbnailTextIdeas: string[];
  openingHookIdeas: string[];
  descriptionAngle: string;
};

export type AnalyzeResponse = {
  source: "youtube_api" | "manual" | "cached";
  video: VideoInfo;
  scores: Scores;
  analysis: Analysis;
  recommendations: Recommendations;
  mode: "ai" | "rules";
  disclaimer: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip")?.trim() ??
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

function clamp(v: unknown, fallback: number): number {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : fallback;
}

function cleanStr(v: unknown, max = 300): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function cleanArr(v: unknown, fallback: string[], limit = 5): string[] {
  if (!Array.isArray(v)) return fallback;
  const items = v.map((x) => cleanStr(String(x), 280)).filter(Boolean).slice(0, limit);
  return items.length ? items : fallback;
}

const DISCLAIMER =
  "This analysis uses public YouTube metadata and AI packaging signals. " +
  "It does not access private YouTube Studio data such as retention curves, actual CTR, or watch time.";

// ─── Heuristic scoring (no OpenAI) ───────────────────────────────────────────
function heuristicScores(title: string, description: string): Scores {
  const words = title.trim().split(/\s+/).filter(Boolean);
  const lower = title.toLowerCase();
  const hasNumber = /\d/.test(title);
  const hasTension = /mistake|secret|stop|why|hidden|truth|avoid|but|failed|lost|wrong|before|after|nobody|one|changed|surprised/i.test(title);
  const hasOutcome = /doubled|increased|grew|saved|lost|failed|worked|result|retention|views|click|ctr|sales|revenue|growth/i.test(title);
  const hasTimeframe = /hour|day|week|month|year|48|24|30|7/i.test(title);
  const hasTest = /tested|uploaded|tried|analyzed|compared|reviewed|studied/i.test(title);
  const wordCount = words.length;
  const descLen = description.length;

  let base = 30;
  if (wordCount >= 6 && wordCount <= 14) base += 14;
  if (hasNumber) base += 14;
  if (hasTension) base += 12;
  if (hasOutcome) base += 12;
  if (hasTimeframe) base += 8;
  if (hasTest) base += 8;
  if (wordCount > 20) base -= 10;
  if (!hasTension && !hasNumber) base -= 8;

  const packagingScore = Math.max(10, Math.min(90, base));
  const hookStrength = Math.max(10, Math.min(90, base + (hasNumber ? 4 : 0)));
  const clarityScore = Math.max(10, Math.min(90, 35 + (hasNumber ? 14 : 0) + (hasOutcome ? 14 : 0) + (wordCount >= 6 && wordCount <= 12 ? 10 : 0)));
  const curiosityScore = Math.max(10, Math.min(90, 28 + (hasTension ? 22 : 0) + (hasNumber ? 12 : 0) + (hasTest ? 10 : 0)));
  const ctrPotential = Math.max(10, Math.min(90, Math.round((packagingScore + curiosityScore) / 2)));
  const retentionRisk = Math.max(10, Math.min(90, 90 - packagingScore + (wordCount > 18 ? 8 : 0)));
  const outlierPotential = Math.max(10, Math.min(90, hasNumber && hasTension && hasOutcome ? 72 : hasNumber || hasTension ? 52 : 32));

  return { packagingScore, hookStrength, curiosityScore, clarityScore, ctrPotential, retentionRisk, outlierPotential };
}

function heuristicAnalysis(title: string, scores: Scores): Analysis {
  const weak = scores.packagingScore < 50;
  return {
    summary: weak
      ? `The title "${title}" has a weak packaging signal. It lacks the specificity and tension needed to stop a viewer mid-scroll.`
      : `The title "${title}" has usable packaging. There are opportunities to sharpen the tension and make the payoff more concrete.`,
    strengths: [
      scores.clarityScore >= 60 ? "The topic is understandable at a glance." : "The core subject is identifiable.",
      scores.curiosityScore >= 60 ? "There is some curiosity signal in the framing." : "The title attempts a promise.",
    ].filter(Boolean),
    risks: [
      scores.packagingScore < 50 ? "Weak tension — the title doesn't create a reason to click." : "Tension could be sharper.",
      scores.retentionRisk > 60 ? "High early drop-off risk — the payoff isn't clear in the first three seconds." : "Retention setup is moderate.",
      "Heuristic estimate only — configure OpenAI for deeper AI analysis.",
    ],
    titleDiagnosis: weak
      ? "The title lacks a concrete outcome, number, or tension. It reads as a topic description rather than a viewer promise."
      : "The title is functional but could be stronger with a more specific number, tension, or outcome.",
    thumbnailDiagnosis: "Unable to analyze thumbnail without image data. Ensure the thumbnail text reinforces the title's core promise.",
    retentionDiagnosis: scores.retentionRisk > 60
      ? "High estimated retention risk. The opening needs to deliver the title's promise immediately."
      : "Moderate retention risk. Open with the payoff — don't delay the reason viewers clicked.",
    positioningDiagnosis: "Positioning analysis requires AI. The topic appears general — consider narrowing to a specific audience or outcome.",
  };
}

function heuristicRecommendations(title: string): Recommendations {
  const safe = title.replace(/[?.!]+$/g, "");
  return {
    betterTitles: [
      `I tested ${safe.toLowerCase()} and one result changed the whole approach`,
      `The mistake behind ${safe.toLowerCase()} that most creators miss`,
      `Before you publish: ${safe.toLowerCase()} — what to fix first`,
    ],
    thumbnailTextIdeas: [
      "ONE MISTAKE",
      "THE RESULT",
      "BEFORE / AFTER",
    ],
    openingHookIdeas: [
      `Most creators get ${safe.toLowerCase()} wrong because they skip one step.`,
      `I spent 30 days testing ${safe.toLowerCase()} — here's what actually worked.`,
      `Before you post your next video, check this one thing about ${safe.toLowerCase()}.`,
    ],
    descriptionAngle:
      "Open the description with the core outcome or insight — not just a summary. Front-load the value so it appears in search snippets.",
  };
}

// ─── AI analysis via OpenAI ───────────────────────────────────────────────────
async function aiAnalysis(video: VideoInfo): Promise<{
  scores: Scores;
  analysis: Analysis;
  recommendations: Recommendations;
  mode: "ai" | "rules";
}> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_API_TOKEN;
  const fallbackScores = heuristicScores(video.title, video.description);

  if (!apiKey) {
    return {
      scores: fallbackScores,
      analysis: heuristicAnalysis(video.title, fallbackScores),
      recommendations: heuristicRecommendations(video.title),
      mode: "rules",
    };
  }

  const ctx = [
    `Title: "${video.title}"`,
    video.channelTitle ? `Channel: ${video.channelTitle}` : "",
    video.viewCount != null ? `Views: ${video.viewCount.toLocaleString()}` : "",
    video.likeCount != null ? `Likes: ${video.likeCount.toLocaleString()}` : "",
    video.duration ? `Duration: ${video.duration}` : "",
    video.publishedAt ? `Published: ${video.publishedAt.slice(0, 10)}` : "",
    video.description ? `Description preview: "${video.description.slice(0, 600).replace(/\n+/g, " ")}"` : "",
  ].filter(Boolean).join("\n");

  const prompt = `You are HookSignals, a strict YouTube packaging analyst. Analyze this video's public metadata for creator intelligence.

${ctx}

Return valid JSON with these exact keys:
{
  "packagingScore": 0-100,
  "hookStrength": 0-100,
  "curiosityScore": 0-100,
  "clarityScore": 0-100,
  "ctrPotential": 0-100,
  "retentionRisk": 0-100,
  "outlierPotential": 0-100,
  "summary": "2-3 sentence executive summary of the video's packaging",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "risks": ["risk 1", "risk 2", "risk 3"],
  "titleDiagnosis": "specific diagnosis of the title's click-through potential",
  "thumbnailDiagnosis": "advice on thumbnail/title alignment based on title and description",
  "retentionDiagnosis": "estimated early retention risk from the title promise and description",
  "positioningDiagnosis": "how well the video is positioned for its target audience",
  "betterTitles": ["alternative 1", "alternative 2", "alternative 3"],
  "thumbnailTextIdeas": ["text idea 1", "text idea 2", "text idea 3"],
  "openingHookIdeas": ["hook 1", "hook 2", "hook 3"],
  "descriptionAngle": "one specific recommendation for the description opening"
}

Scoring rules:
- 85-100: Elite packaging — specific, high-tension, measurable payoff, clear audience
- 70-84: Strong — good clarity and curiosity, minor weaknesses
- 50-69: Average — usable but weak stakes or vague promise
- 20-49: Weak — generic, low tension, unclear viewer benefit
- 0-19: Very weak or meaningless

IMPORTANT: These are estimates based on public metadata only. Do NOT claim actual CTR, retention, or watch time data. Be honest that scores are estimated signals, not measured analytics.

Be direct. Be specific. Reference the actual title and channel in your analysis. Do not produce filler or generic advice.`;

  try {
    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.15,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a strict YouTube packaging analyst. Return only valid JSON. Be specific. Reference the actual video." },
          { role: "user", content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(22_000),
    });

    if (!res.ok) throw new Error(`openai_${res.status}`);
    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error("empty_openai_response");

    const raw = JSON.parse(content) as Record<string, unknown>;

    return {
      scores: {
        packagingScore: clamp(raw.packagingScore, fallbackScores.packagingScore),
        hookStrength: clamp(raw.hookStrength, fallbackScores.hookStrength),
        curiosityScore: clamp(raw.curiosityScore, fallbackScores.curiosityScore),
        clarityScore: clamp(raw.clarityScore, fallbackScores.clarityScore),
        ctrPotential: clamp(raw.ctrPotential, fallbackScores.ctrPotential),
        retentionRisk: clamp(raw.retentionRisk, fallbackScores.retentionRisk),
        outlierPotential: clamp(raw.outlierPotential, fallbackScores.outlierPotential),
      },
      analysis: {
        summary: cleanStr(raw.summary, 500) || heuristicAnalysis(video.title, fallbackScores).summary,
        strengths: cleanArr(raw.strengths, ["Strong topic area.", "Clear subject matter."]),
        risks: cleanArr(raw.risks, ["Packaging could be stronger.", "Tension is not explicit."]),
        titleDiagnosis: cleanStr(raw.titleDiagnosis, 400) || "Title analysis unavailable.",
        thumbnailDiagnosis: cleanStr(raw.thumbnailDiagnosis, 400) || "Thumbnail alignment analysis unavailable.",
        retentionDiagnosis: cleanStr(raw.retentionDiagnosis, 400) || "Retention analysis unavailable.",
        positioningDiagnosis: cleanStr(raw.positioningDiagnosis, 400) || "Positioning analysis unavailable.",
      },
      recommendations: {
        betterTitles: cleanArr(raw.betterTitles, heuristicRecommendations(video.title).betterTitles),
        thumbnailTextIdeas: cleanArr(raw.thumbnailTextIdeas, ["ONE RESULT", "THE MISTAKE", "BEFORE/AFTER"]),
        openingHookIdeas: cleanArr(raw.openingHookIdeas, heuristicRecommendations(video.title).openingHookIdeas),
        descriptionAngle: cleanStr(raw.descriptionAngle, 300) || "Open with the core outcome or insight in the first line.",
      },
      mode: "ai",
    };
  } catch {
    return {
      scores: fallbackScores,
      analysis: heuristicAnalysis(video.title, fallbackScores),
      recommendations: heuristicRecommendations(video.title),
      mode: "rules",
    };
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

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const rawUrl = typeof body?.url === "string" ? body.url.trim() : "";

  // ── Manual analysis mode ──────────────────────────────────────────────────
  if (!rawUrl) {
    const title = typeof body?.title === "string" ? body.title.trim().slice(0, 300) : "";
    const hook = typeof body?.hook === "string" ? body.hook.trim().slice(0, 500) : "";
    const thumbnailText = typeof body?.thumbnailText === "string" ? body.thumbnailText.trim().slice(0, 200) : "";
    const description = typeof body?.description === "string" ? body.description.trim().slice(0, 2000) : "";
    const channelName = typeof body?.channelName === "string" ? body.channelName.trim().slice(0, 150) : "";

    if (!title && !hook) {
      return NextResponse.json(
        { error: "missing_input", message: "Provide a YouTube URL, or a title and hook for manual analysis." },
        { status: 400 }
      );
    }

    const analysisTitle = title || hook;
    const video: VideoInfo = {
      id: "",
      title: analysisTitle,
      description: [hook, thumbnailText, description].filter(Boolean).join("\n\n"),
      channelTitle: channelName,
      publishedAt: null,
      duration: null,
      thumbnailUrl: "",
      viewCount: null,
      likeCount: null,
      commentCount: null,
    };

    const { scores, analysis, recommendations, mode } = await aiAnalysis(video);
    return NextResponse.json({
      source: "manual",
      video,
      scores,
      analysis,
      recommendations,
      mode,
      disclaimer: DISCLAIMER,
    } satisfies AnalyzeResponse);
  }

  // ── URL mode ──────────────────────────────────────────────────────────────
  if (!validateYouTubeUrl(rawUrl)) {
    return NextResponse.json(
      { error: "invalid_url", message: "Enter a valid YouTube URL (youtube.com/watch?v=..., youtu.be/..., or Shorts URL)." },
      { status: 400 }
    );
  }

  const videoId = extractVideoId(rawUrl)!;

  // Cache hit
  const cached = videoCache.get(videoId);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return NextResponse.json({ ...cached.payload, source: "cached" } satisfies AnalyzeResponse);
  }

  // Fetch from provider
  let video: VideoInfo;
  try {
    const provider = getYouTubeVideoProvider();
    const data = await provider.fetchVideo(rawUrl);
    video = {
      id: data.videoId,
      title: data.title,
      description: data.description,
      channelTitle: data.channelName,
      publishedAt: data.uploadDate,
      duration: data.duration,
      thumbnailUrl: data.thumbnailUrl,
      viewCount: data.viewCount,
      likeCount: data.likes,
      commentCount: data.commentsCount,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);

    if (msg.includes("provider_not_configured")) {
      // No API key configured — return manual mode signal so frontend can switch
      return NextResponse.json(
        { error: "provider_not_configured", message: "YouTube URL analysis is not configured. Use manual mode to analyze your title and hook directly." },
        { status: 503 }
      );
    }
    if (msg.includes("no_data")) {
      return NextResponse.json(
        { error: "no_data", message: "No data found for this video. It may be private, deleted, or unavailable." },
        { status: 404 }
      );
    }
    if (msg.includes("youtube_api_forbidden")) {
      return NextResponse.json(
        { error: "api_error", message: "YouTube API quota exceeded or key is invalid. Try again later." },
        { status: 503 }
      );
    }
    if (msg.includes("youtube_api_network") || msg.includes("youtube_api_error")) {
      return NextResponse.json(
        { error: "api_error", message: "Could not reach YouTube. Try again in a moment." },
        { status: 502 }
      );
    }
    return NextResponse.json(
      { error: "fetch_failed", message: "Could not fetch video data. Try again." },
      { status: 502 }
    );
  }

  // AI analysis
  const { scores, analysis, recommendations, mode } = await aiAnalysis(video);

  const payload: AnalyzeResponse = {
    source: "youtube_api",
    video,
    scores,
    analysis,
    recommendations,
    mode,
    disclaimer: DISCLAIMER,
  };

  videoCache.set(videoId, { payload, cachedAt: Date.now() });
  return NextResponse.json(payload);
}
