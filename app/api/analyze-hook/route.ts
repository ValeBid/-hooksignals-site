import { NextResponse } from "next/server";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const requestLog = new Map<string, { count: number; resetAt: number }>();

type HookAnalysis = {
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

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "anonymous";
}

function isRateLimited(request: Request) {
  const key = getClientKey(request);
  const now = Date.now();
  const current = requestLog.get(key);

  if (!current || current.resetAt <= now) {
    requestLog.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) return true;
  current.count += 1;
  return false;
}

function clampScore(value: unknown, fallback: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function toArray(value: unknown, fallback: string[], limit: number) {
  if (!Array.isArray(value)) return fallback;
  const clean = value.map((item) => String(item).trim()).filter(Boolean).slice(0, limit);
  return clean.length ? clean : fallback;
}

function titleCase(text: string) {
  return text.trim().replace(/\s+/g, " ").replace(/^./, (char) => char.toUpperCase());
}

function fallbackAnalysis(hook: string): HookAnalysis {
  const trimmed = titleCase(hook).slice(0, 500);
  const lower = trimmed.toLowerCase();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const hasNumber = /\d/.test(trimmed);
  const hasQuestion = trimmed.includes("?");
  const hasTension = /mistake|secret|stop|why|hidden|truth|avoid|but|instead|failed|lost|bad|lucky|unlucky|wrong|surprised|nobody|before|after/i.test(trimmed);
  const hasSpecificObject = /\b(day|days|month|months|dollar|money|views|video|client|creator|youtube|tiktok|shorts|hook|title|thumbnail|result|test|experiment|cardio)\b/i.test(trimmed);
  const isVague = wordCount < 6 || /^(very|really|just|today|this|that|something|lucky|bad|good)/i.test(lower);

  let clarityScore = 54;
  if (wordCount >= 6 && wordCount <= 14) clarityScore += 18;
  if (wordCount > 18) clarityScore -= 12;
  if (hasSpecificObject) clarityScore += 10;
  if (isVague) clarityScore -= 22;

  let curiosityScore = 46;
  if (hasQuestion) curiosityScore += 8;
  if (hasTension) curiosityScore += 16;
  if (hasNumber) curiosityScore += 10;
  if (isVague) curiosityScore -= 18;

  let retentionRisk = 64;
  if (hasTension) retentionRisk -= 12;
  if (hasNumber) retentionRisk -= 8;
  if (hasSpecificObject) retentionRisk -= 8;
  if (isVague) retentionRisk += 20;
  if (wordCount > 18) retentionRisk += 12;

  clarityScore = clampScore(clarityScore, 54);
  curiosityScore = clampScore(curiosityScore, 46);
  retentionRisk = clampScore(retentionRisk, 64);
  const hookScore = clampScore((clarityScore + curiosityScore + (100 - retentionRisk)) / 3, 42);
  const subject = trimmed.replace(/[?.!]+$/g, "");

  return {
    hookScore,
    clarityScore,
    curiosityScore,
    retentionRisk,
    pattern: isVague ? "Vague personal opener" : hasNumber ? "Specific promise with numeric framing" : hasTension ? "Curiosity gap with unresolved tension" : "General creator promise",
    weakness: isVague
      ? "The hook does not give viewers a clear reason to care. Add a specific event, consequence or contradiction."
      : "The idea is understandable, but it needs sharper stakes and a clearer reason to keep watching.",
    improvedHook: isVague
      ? `I thought ${subject.toLowerCase()} was random — then one detail changed the whole story`
      : hasNumber
        ? `${subject} — but the result exposed one mistake I did not expect`
        : `I tested ${subject.toLowerCase()}, and the result exposed one mistake most creators miss`,
    variants: [
      `I almost ignored ${subject.toLowerCase()} — then this happened`,
      `The part nobody explains about ${subject.toLowerCase()}`,
      `Before you judge ${subject.toLowerCase()}, watch the first detail`,
    ],
    retentionNotes: [
      "Name the specific payoff in the first second so viewers understand why they should stay.",
      "Add tension: what went wrong, what changed, or what the viewer does not know yet.",
      "Replace vague emotion with a concrete object, result, number or consequence.",
    ],
    scoreRationale: [
      hasNumber ? "Numeric framing makes the promise easier to understand." : "The hook lacks a concrete number or scale.",
      hasSpecificObject ? "The topic is concrete enough to picture." : "The hook needs a clearer object, result, or audience pain point.",
      hasTension ? "There is some tension to carry attention." : "The hook needs a stronger contradiction, mistake, or reveal.",
    ],
    audienceTrigger: isVague ? "Personal curiosity without enough viewer benefit." : "Outcome curiosity and mistake avoidance.",
    titlePairings: ["The mistake behind this result", "What changed after the first test", "I tested this so you do not have to"],
    thumbnailAngles: ["Before / after contrast", "One bold result word", "Mistake label over the key moment"],
  };
}

function normalizeAnalysis(raw: any, hook: string): HookAnalysis {
  const fallback = fallbackAnalysis(hook);
  return {
    hookScore: clampScore(raw?.hookScore ?? raw?.score, fallback.hookScore),
    clarityScore: clampScore(raw?.clarityScore ?? raw?.clarity, fallback.clarityScore),
    curiosityScore: clampScore(raw?.curiosityScore ?? raw?.curiosity, fallback.curiosityScore),
    retentionRisk: clampScore(raw?.retentionRisk, fallback.retentionRisk),
    pattern: typeof raw?.pattern === "string" ? raw.pattern.slice(0, 180) : fallback.pattern,
    weakness: typeof raw?.weakness === "string" ? raw.weakness.slice(0, 280) : fallback.weakness,
    improvedHook: typeof raw?.improvedHook === "string" ? raw.improvedHook.slice(0, 220) : fallback.improvedHook,
    variants: toArray(raw?.variants, fallback.variants, 3),
    retentionNotes: toArray(raw?.retentionNotes, fallback.retentionNotes, 3),
    scoreRationale: toArray(raw?.scoreRationale, fallback.scoreRationale, 4),
    audienceTrigger: typeof raw?.audienceTrigger === "string" ? raw.audienceTrigger.slice(0, 240) : fallback.audienceTrigger,
    titlePairings: toArray(raw?.titlePairings, fallback.titlePairings, 4),
    thumbnailAngles: toArray(raw?.thumbnailAngles, fallback.thumbnailAngles, 4),
  };
}

async function analyzeWithOpenAI(hook: string, apiKey: string) {
  const aiResponse = await fetch(OPENAI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a strict short-form hook analyst for YouTube Shorts, TikTok and Reels. Score harshly. Be specific. Return only valid JSON." },
        {
          role: "user",
          content: `Analyze this opening hook: "${hook}". Return JSON with hookScore, clarityScore, curiosityScore, retentionRisk, pattern, weakness, improvedHook, variants, retentionNotes, scoreRationale, audienceTrigger, titlePairings, thumbnailAngles. Vague hooks should score below 45.`,
        },
      ],
    }),
  });

  if (!aiResponse.ok) return null;
  const data = await aiResponse.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return null;
  return JSON.parse(content);
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json({ error: "Free analysis limit reached. Choose a plan to keep analyzing hooks." }, { status: 429 });
    }

    const body = await request.json();
    const hook = typeof body?.hook === "string" ? body.hook.trim() : "";
    if (hook.length < 8) return NextResponse.json({ error: "Enter a hook with at least 8 characters." }, { status: 400 });

    const cleanedHook = hook.slice(0, 500);
    const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_API_TOKEN;

    if (!apiKey) {
      return NextResponse.json({ analysis: fallbackAnalysis(cleanedHook), mode: "rules", diagnostic: "missing_openai_key" });
    }

    const rawAnalysis = await analyzeWithOpenAI(cleanedHook, apiKey);
    if (!rawAnalysis) {
      return NextResponse.json({ analysis: fallbackAnalysis(cleanedHook), mode: "rules", diagnostic: "openai_call_failed" });
    }

    return NextResponse.json({ analysis: normalizeAnalysis(rawAnalysis, cleanedHook), mode: "ai" });
  } catch {
    return NextResponse.json({ analysis: fallbackAnalysis("Untitled hook"), mode: "rules", diagnostic: "analysis_exception" });
  }
}
