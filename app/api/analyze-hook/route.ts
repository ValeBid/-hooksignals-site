import { NextResponse } from "next/server";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
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

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  current.count += 1;
  return false;
}

function clampScore(value: unknown, fallback: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function fallbackAnalysis(hook: string): HookAnalysis {
  const trimmed = hook.trim();
  const clean = trimmed.toLowerCase();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const hasNumber = /\d/.test(trimmed);
  const hasQuestion = trimmed.includes("?");
  const hasTension = /mistake|secret|stop|why|hidden|truth|avoid|but|instead|failed|lost/i.test(trimmed);

  const clarityScore = Math.min(95, Math.max(40, 68 + (wordCount <= 16 ? 10 : -8) + (hasNumber ? 7 : 0)));
  const curiosityScore = Math.min(95, Math.max(40, 60 + (hasQuestion ? 8 : 0) + (hasTension ? 14 : 0) + (hasNumber ? 6 : 0)));
  const retentionRisk = Math.min(90, Math.max(12, 52 + (wordCount > 20 ? 18 : 0) - (hasTension ? 10 : 0) - (hasNumber ? 6 : 0)));
  const hookScore = Math.round((clarityScore + curiosityScore + (100 - retentionRisk)) / 3);
  const base = trimmed.replace(/[?.!]+$/g, "");

  return {
    hookScore,
    clarityScore,
    curiosityScore,
    retentionRisk,
    pattern: hasNumber ? "Specific promise with numeric framing" : hasTension ? "Curiosity gap with unresolved tension" : "General creator promise",
    weakness: wordCount > 18 ? "The hook takes too long to reach the payoff. Make the first second more direct." : "The idea is usable, but it needs a sharper contrast or more specific stakes.",
    improvedHook: hasNumber ? `${base} — but one detail changed the result` : `I tested ${base.toLowerCase()}, and one result surprised me`,
    variants: [
      `Most creators miss this before they publish: ${base}`,
      `I fixed one part of this hook and the promise became clearer`,
      `Before you post this idea, tighten the first 3 seconds`,
    ],
    retentionNotes: [
      "Open with the payoff faster so viewers understand why they should stay.",
      "Add a clearer curiosity gap instead of a broad setup.",
      "Make the promise specific enough to feel useful, not generic.",
    ],
  };
}

function normalizeAnalysis(raw: any, hook: string): HookAnalysis {
  const fallback = fallbackAnalysis(hook);

  return {
    hookScore: clampScore(raw?.hookScore ?? raw?.score, fallback.hookScore),
    clarityScore: clampScore(raw?.clarityScore ?? raw?.clarity, fallback.clarityScore),
    curiosityScore: clampScore(raw?.curiosityScore ?? raw?.curiosity, fallback.curiosityScore),
    retentionRisk: clampScore(raw?.retentionRisk, fallback.retentionRisk),
    pattern: typeof raw?.pattern === "string" ? raw.pattern.slice(0, 160) : fallback.pattern,
    weakness: typeof raw?.weakness === "string" ? raw.weakness.slice(0, 220) : fallback.weakness,
    improvedHook: typeof raw?.improvedHook === "string" ? raw.improvedHook.slice(0, 180) : fallback.improvedHook,
    variants: Array.isArray(raw?.variants)
      ? raw.variants.slice(0, 3).map((item: unknown) => String(item).slice(0, 180))
      : fallback.variants,
    retentionNotes: Array.isArray(raw?.retentionNotes)
      ? raw.retentionNotes.slice(0, 3).map((item: unknown) => String(item).slice(0, 180))
      : fallback.retentionNotes,
  };
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json({ error: "Free analysis limit reached. Choose a plan to keep analyzing hooks." }, { status: 429 });
    }

    const body = await request.json();
    const hook = typeof body?.hook === "string" ? body.hook.trim() : "";

    if (hook.length < 8) {
      return NextResponse.json({ error: "Enter a hook with at least 8 characters." }, { status: 400 });
    }

    const cleanedHook = hook.slice(0, 500);
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ analysis: fallbackAnalysis(cleanedHook), mode: "fallback" });
    }

    const aiResponse = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: "You analyze YouTube, Shorts and TikTok opening hooks. Return only valid JSON with hookScore, clarityScore, curiosityScore, retentionRisk, pattern, weakness, improvedHook, variants and retentionNotes.",
          },
          {
            role: "user",
            content: `Analyze this hook: ${cleanedHook}\nReturn JSON: {"hookScore":number,"clarityScore":number,"curiosityScore":number,"retentionRisk":number,"pattern":string,"weakness":string,"improvedHook":string,"variants":string[],"retentionNotes":string[]}`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      return NextResponse.json({ analysis: fallbackAnalysis(cleanedHook), mode: "fallback" });
    }

    const data = await aiResponse.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ analysis: fallbackAnalysis(cleanedHook), mode: "fallback" });
    }

    return NextResponse.json({ analysis: normalizeAnalysis(JSON.parse(content), cleanedHook), mode: "ai" });
  } catch {
    return NextResponse.json({ error: "Hook analysis failed. Try again." }, { status: 500 });
  }
}
