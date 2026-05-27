import { NextResponse } from "next/server";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_MODEL || "gpt-5.5";

type HookAnalysis = {
  score: number;
  clarity: number;
  curiosity: number;
  retention: number;
  grade: string;
  verdict: string;
  feedback: string[];
  improved: string[];
};

function clampScore(value: unknown, fallback: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function fallbackAnalysis(hook: string): HookAnalysis {
  const clean = hook.toLowerCase();
  const wordCount = hook.trim().split(/\s+/).filter(Boolean).length;
  let score = 48;

  if (hook.length >= 35) score += 8;
  if (hook.length >= 70) score += 5;
  if (hook.includes("?")) score += 7;
  if (wordCount <= 18) score += 6;

  ["mistake", "stop", "secret", "grow", "viral", "views", "why", "hidden", "simple", "truth"].forEach((word) => {
    if (clean.includes(word)) score += 4;
  });

  score = Math.min(100, score);

  return {
    score,
    clarity: Math.min(100, Math.max(35, score - 4)),
    curiosity: Math.min(100, Math.max(35, score + 5)),
    retention: Math.min(100, Math.max(35, score - 1)),
    grade: score >= 85 ? "Excellent" : score >= 72 ? "Strong" : score >= 58 ? "Decent" : "Weak",
    verdict:
      score >= 85
        ? "This hook is sharp, specific and likely to stop the scroll."
        : score >= 72
        ? "This hook is strong, but it can become more specific."
        : score >= 58
        ? "This hook is usable, but it needs more tension and clarity."
        : "This hook is too vague. Make the promise sharper and faster.",
    feedback: [
      "Make the viewer understand the payoff faster.",
      "Add a clearer curiosity gap or stronger contrast.",
      "Keep the opening specific enough to feel useful, not generic.",
    ],
    improved: [
      `The real reason ${hook.replace(/[?.!]+$/g, "").toLowerCase()}`,
      `Most creators miss this: ${hook.replace(/[?.!]+$/g, "")}`,
      `Before you post, fix this hook: ${hook.replace(/[?.!]+$/g, "")}`,
    ],
  };
}

function normalizeAnalysis(raw: any, hook: string): HookAnalysis {
  const fallback = fallbackAnalysis(hook);

  return {
    score: clampScore(raw?.score, fallback.score),
    clarity: clampScore(raw?.clarity, fallback.clarity),
    curiosity: clampScore(raw?.curiosity, fallback.curiosity),
    retention: clampScore(raw?.retention, fallback.retention),
    grade: typeof raw?.grade === "string" ? raw.grade.slice(0, 40) : fallback.grade,
    verdict: typeof raw?.verdict === "string" ? raw.verdict.slice(0, 220) : fallback.verdict,
    feedback: Array.isArray(raw?.feedback)
      ? raw.feedback.slice(0, 3).map((item: unknown) => String(item).slice(0, 180))
      : fallback.feedback,
    improved: Array.isArray(raw?.improved)
      ? raw.improved.slice(0, 3).map((item: unknown) => String(item).slice(0, 160))
      : fallback.improved,
  };
}

export async function POST(request: Request) {
  try {
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
            content: "You analyze YouTube and Shorts opening hooks. Return only valid JSON with scores from 0 to 100.",
          },
          {
            role: "user",
            content: `Analyze this hook: ${cleanedHook}\nReturn JSON: {"score":number,"clarity":number,"curiosity":number,"retention":number,"grade":string,"verdict":string,"feedback":string[],"improved":string[]}`,
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
