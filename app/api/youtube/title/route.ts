import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// ─── Rate limiting ─────────────────────────────────────────────────────────
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 10;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// ─── Types ─────────────────────────────────────────────────────────────────
export type TitleAnalysis = {
  titleScore: number;
  clarityScore: number;
  curiosityScore: number;
  ctrPotential: number;
  lengthScore: number;
  keywordPlacement: number;
  charCount: number;
  pattern: string;
  weakness: string;
  improvedTitle: string;
  alternatives: string[];
  rationale: string[];
};

// ─── Helpers ───────────────────────────────────────────────────────────────
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

function clean(v: unknown, max = 100): string {
  return typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

function cleanArr(v: unknown, fallback: string[], limit = 5): string[] {
  if (!Array.isArray(v)) return fallback;
  const items = v.map((i) => clean(String(i), 200)).filter(Boolean).slice(0, limit);
  return items.length ? items : fallback;
}

// ─── Rules-based fallback scoring ─────────────────────────────────────────
function ruleScore(title: string) {
  const len = title.length;
  const words = title.trim().split(/\s+/).filter(Boolean);
  const lower = title.toLowerCase();

  // Length: optimal is 40–70 chars
  const lengthScore =
    len < 20  ? 40 :
    len <= 40 ? 72 :
    len <= 70 ? 94 :
    len <= 85 ? 68 :
    44;

  const hasNumber    = /\d/.test(title);
  const hasTension   = /mistake|secret|stop|why|avoid|failed|lost|wrong|before|after|hidden|truth|never|best|worst/i.test(lower);
  const hasQuestion  = title.includes("?");
  const hasContrast  = /vs\.?|versus|better|worse|right|actually|really/i.test(lower);
  const hasSubject   = /\b(youtube|shorts|tiktok|video|hook|title|thumbnail|creator|channel|views|subscribers|workout|fitness|invest|money|crypto|business|ai|tool|course|skill|learn)\b/i.test(lower);
  const isVague      = words.length < 4 || /^(this|that|it)\s+(changed|works|is|was)/i.test(lower);
  const hasCtrWord   = /\b(how to|why|best|top \d+|guide|ultimate|secret|mistake|truth|fix|boost|double|step-by-step)\b/i.test(lower);
  const keywordEarly = hasSubject && lower.split(/\s+/).slice(0, 5).some(w => /youtube|shorts|tiktok|video|hook|title|fitness|invest|crypto|business|ai/.test(w));

  let clarityScore   = 45 + (hasSubject ? 22 : 0) + (words.length >= 5 && words.length <= 12 ? 14 : 0) - (isVague ? 22 : 0);
  let curiosityScore = 38 + (hasTension ? 22 : 0) + (hasQuestion ? 12 : 0) + (hasNumber ? 14 : 0) + (hasContrast ? 10 : 0) - (isVague ? 15 : 0);
  let ctrPotential   = 40 + (hasCtrWord ? 22 : 0) + (hasNumber ? 10 : 0) + (hasSubject ? 14 : 0) - (isVague ? 18 : 0);
  const keywordPlacement = keywordEarly ? 88 : hasSubject ? 60 : 30;

  clarityScore   = Math.min(96, Math.max(8, Math.round(clarityScore)));
  curiosityScore = Math.min(96, Math.max(8, Math.round(curiosityScore)));
  ctrPotential   = Math.min(96, Math.max(8, Math.round(ctrPotential)));

  const titleScore = Math.min(94, Math.max(8, Math.round(
    clarityScore * 0.35 + curiosityScore * 0.35 + ctrPotential * 0.2 + lengthScore * 0.1
  )));

  return { titleScore, clarityScore, curiosityScore, ctrPotential, lengthScore, keywordPlacement };
}

function fallbackAnalysis(title: string, niche?: string): TitleAnalysis {
  const scores = ruleScore(title);
  const n      = niche ? ` for ${niche}` : "";

  return {
    ...scores,
    charCount: title.length,
    pattern: scores.titleScore >= 72 ? "Specific promise with tension" : scores.titleScore >= 50 ? "Topic statement" : "Vague opener",
    weakness:
      scores.titleScore < 50
        ? "The title lacks a specific subject, tension or curiosity signal. Add a number, name the payoff, or imply a mistake."
        : "OpenAI key not configured — scored with heuristics. Add OPENAI_API_KEY for AI analysis.",
    improvedTitle: title.length < 40 ? `${title} — the one change that made the biggest difference${n}` : title,
    alternatives: [
      `The ${niche ?? "creator"} mistake most people make before publishing${n}`,
      `I tested this and the result changed how I approach ${niche ?? "content"}`,
      `Why most ${niche ?? "video"} titles underperform — and the simple fix`,
    ],
    rationale: [
      scores.lengthScore < 70 ? `Title is ${title.length} chars — optimal is 40–70 for YouTube search display.` : "Title length is in the optimal range for YouTube.",
      scores.curiosityScore < 60 ? "No clear tension or curiosity signal — add a mistake, contrast or open loop." : "Curiosity signal detected.",
      scores.keywordPlacement < 60 ? "Primary keyword does not appear in the first 30 characters — move it earlier." : "Keyword placement looks reasonable.",
    ],
  };
}

function normalizeAnalysis(raw: unknown, title: string, niche?: string): TitleAnalysis {
  if (!raw || typeof raw !== "object") return fallbackAnalysis(title, niche);
  const r  = raw as Record<string, unknown>;
  const fb = fallbackAnalysis(title, niche);
  const scores = ruleScore(title);

  return {
    titleScore:      clamp(r.titleScore,      fb.titleScore),
    clarityScore:    clamp(r.clarityScore,    fb.clarityScore),
    curiosityScore:  clamp(r.curiosityScore,  fb.curiosityScore),
    ctrPotential:    clamp(r.ctrPotential,    fb.ctrPotential),
    lengthScore:     scores.lengthScore, // always computed from actual length
    keywordPlacement:clamp(r.keywordPlacement, fb.keywordPlacement),
    charCount:       title.length,
    pattern:         clean(r.pattern, 200)       || fb.pattern,
    weakness:        clean(r.weakness, 320)      || fb.weakness,
    improvedTitle:   clean(r.improvedTitle, 200) || fb.improvedTitle,
    alternatives:    cleanArr(r.alternatives, fb.alternatives, 3),
    rationale:       cleanArr(r.rationale,    fb.rationale,    3),
  };
}

// ─── AI analysis ───────────────────────────────────────────────────────────
async function analyzeWithAI(
  title: string,
  niche?: string,
  platform?: string
): Promise<{ analysis: TitleAnalysis; mode: "ai" | "rules" }> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_API_TOKEN;
  if (!apiKey) return { analysis: fallbackAnalysis(title, niche), mode: "rules" };

  const context = [
    `Title: "${title}"`,
    niche    ? `Niche: ${niche}`       : "",
    platform ? `Platform: ${platform}` : "",
    `Character count: ${title.length}`,
  ].filter(Boolean).join("\n");

  try {
    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are HookSignals, a strict YouTube title performance analyst. " +
              "Analyze the title for click-through rate potential, clarity, curiosity and keyword placement. " +
              "This is NOT the video's opening hook — it is the title shown in search results and the feed. " +
              "Score harshly. Vague, generic or overlong titles score below 50. " +
              "Return only valid JSON.",
          },
          {
            role: "user",
            content:
              `Analyze this YouTube title for CTR potential and packaging quality.\n\n${context}\n\n` +
              "Return JSON with these exact keys:\n" +
              "titleScore (0-100 overall), clarityScore (0-100), curiosityScore (0-100), " +
              "ctrPotential (0-100 estimated click-through signal vs generic titles), " +
              "keywordPlacement (0-100: does a keyword appear in the first 30 chars?),\n" +
              "pattern (string: detected title pattern e.g. 'Number list', 'Curiosity gap', 'Specific promise'),\n" +
              "weakness (string: the single most important thing holding this title back),\n" +
              "improvedTitle (string: a stronger version of this title, keeping the core idea),\n" +
              "alternatives (array of 3 alternative title options with different angles),\n" +
              "rationale (array of 3 specific reasons for the titleScore).\n\n" +
              "Scoring guide:\n" +
              "85-100 = strong CTR signal — specific, curious, keyword-first, optimal length.\n" +
              "65-84 = solid title — clear but missing one element.\n" +
              "45-64 = average — understandable but low CTR pull.\n" +
              "20-44 = weak — vague, too long, or no tension.\n" +
              "0-19 = very weak — misleading, empty, or meaningless.\n\n" +
              "YouTube title length guidance: 40-70 characters is optimal for search display without truncation.",
          },
        ],
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!res.ok) return { analysis: fallbackAnalysis(title, niche), mode: "rules" };

    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return { analysis: fallbackAnalysis(title, niche), mode: "rules" };

    return { analysis: normalizeAnalysis(JSON.parse(content), title, niche), mode: "ai" };
  } catch {
    return { analysis: fallbackAnalysis(title, niche), mode: "rules" };
  }
}

// ─── Route handler ─────────────────────────────────────────────────────────
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "rate_limited", message: "Rate limit reached. Try again in an hour." },
      { status: 429 }
    );
  }

  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }

  const b = body as Record<string, unknown>;
  const title    = typeof b.title    === "string" ? b.title.trim().slice(0, 200)  : "";
  const niche    = typeof b.niche    === "string" ? b.niche.trim().slice(0, 80)   : undefined;
  const platform = typeof b.platform === "string" ? b.platform.trim().slice(0, 60): undefined;

  if (!title || title.length < 5) {
    return NextResponse.json(
      { error: "missing_title", message: "Enter a YouTube title with at least 5 characters." },
      { status: 400 }
    );
  }

  const { analysis, mode } = await analyzeWithAI(title, niche, platform);

  return NextResponse.json({ analysis, mode, charCount: title.length });
}
