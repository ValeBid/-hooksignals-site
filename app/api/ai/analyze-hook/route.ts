import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const CREDIT_COST = 5;

type AnalysisPayload = {
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

type ContextInput = {
  platform: string;
  niche: string;
  audience: string;
};

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl) throw new Error('missing_supabase_url');
  if (!supabaseKey) throw new Error('missing_supabase_key');
  return createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
}

function cleanText(value: string, max = 140) {
  return value.trim().replace(/\s+/g, ' ').slice(0, max);
}

function cleanArray(value: unknown, fallback: string[], limit = 5) {
  if (!Array.isArray(value)) return fallback;
  const clean = value.map((item) => cleanText(String(item), 220)).filter(Boolean).slice(0, limit);
  return clean.length ? clean : fallback;
}

function contextSignals(context: ContextInput) {
  const platform = cleanText(context.platform, 80);
  const niche = cleanText(context.niche, 80);
  const audience = cleanText(context.audience, 120);
  return {
    platform,
    niche,
    audience,
    hasPlatformContext: platform.length > 2,
    hasNicheContext: niche.length > 2,
    hasAudienceContext: audience.length > 2,
    platformLower: platform.toLowerCase(),
    nicheLower: niche.toLowerCase(),
    audienceLower: audience.toLowerCase(),
  };
}

function signals(hook: string, context: ContextInput = { platform: '', niche: '', audience: '' }) {
  const clean = cleanText(hook, 500);
  const words = clean.split(/\s+/).filter(Boolean);
  const lower = clean.toLowerCase();
  const ctx = contextSignals(context);
  const combined = `${lower} ${ctx.platformLower} ${ctx.nicheLower} ${ctx.audienceLower}`;
  return {
    clean,
    words,
    wordCount: words.length,
    uniqueWords: new Set(words.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ''))).size,
    hasNumber: /\d/.test(clean),
    hasPlatform: /youtube|shorts|tiktok|reels|instagram|video|channel|creator/i.test(combined),
    hasOutcome: /doubled|changed|increased|grew|saved|lost|failed|worked|result|retention|views|click|ctr|sales|revenue|growth|followers|subscribers/i.test(clean),
    hasTimeframe: /hour|hours|day|days|week|weeks|month|months|year|years|48|24|30|7/i.test(clean),
    hasTension: /but|only|why|secret|mistake|avoid|stop|failed|lost|truth|before|after|changed|surprised|nobody|one/i.test(clean),
    hasTest: /tested|uploaded|tried|analyzed|compared|reviewed|studied|experiment/i.test(clean),
    hasAudience: /creator|founder|coach|student|freelancer|business|marketer|viewer|beginner|youtuber/i.test(combined),
    hasNicheContext: ctx.hasNicheContext,
    hasAudienceContext: ctx.hasAudienceContext,
    hasFullContext: ctx.hasPlatformContext && ctx.hasNicheContext && ctx.hasAudienceContext,
    ctx,
    lower,
  };
}

function isLowQualityInput(hook: string, context: ContextInput = { platform: '', niche: '', audience: '' }) {
  const s = signals(hook, context);
  const alphaChars = (s.clean.match(/[a-zA-Z]/g) || []).length;
  const hasConcreteSignal = s.hasNumber || s.hasPlatform || s.hasOutcome || s.hasTimeframe || s.hasTest || s.hasAudience || s.hasNicheContext || s.hasAudienceContext;
  return s.clean.length < 12 || s.wordCount < 4 || alphaChars < 10 || s.uniqueWords < 3 || (!hasConcreteSignal && s.wordCount < 6);
}

function invalidAnalysis(hook: string): AnalysisPayload {
  const clean = cleanText(hook, 120) || 'This hook';
  return {
    hookScore: 4,
    clarityScore: 5,
    curiosityScore: 4,
    retentionRisk: 92,
    pattern: 'Input not analyzable',
    weakness: 'The hook does not contain enough concrete meaning to evaluate. Add a clear subject, outcome, tension or viewer benefit.',
    improvedHook: `${clean} — but add the specific result, mistake, or promise viewers should care about`,
    variants: ['I tested one simple change and the result surprised me', 'The mistake most creators make before they publish', 'Before you post this, fix the first three seconds'],
    retentionNotes: ['Add a concrete subject, not just mood words.', 'Name the payoff viewers will get by staying.', 'Use tension: what changed, failed, or surprised you?'],
    scoreRationale: ['The current input is too vague to picture quickly.', 'There is no clear viewer benefit or outcome.', 'A stronger hook needs a subject plus tension.'],
    audienceTrigger: 'No clear audience trigger yet.',
    titlePairings: ['The first-second mistake to fix', 'What changed after the test', 'Why viewers leave early'],
    thumbnailAngles: ['One bold outcome word', 'Before and after contrast', 'Mistake label over the key moment'],
  };
}

function calibratedScores(hook: string, context: ContextInput = { platform: '', niche: '', audience: '' }) {
  if (isLowQualityInput(hook, context)) return { hookScore: 4, clarityScore: 5, curiosityScore: 4, retentionRisk: 92 };
  const s = signals(hook, context);
  let score = 25;
  if (s.wordCount >= 7 && s.wordCount <= 18) score += 12;
  if (s.hasNumber) score += 14;
  if (s.hasPlatform) score += 8;
  if (s.hasOutcome) score += 15;
  if (s.hasTimeframe) score += 8;
  if (s.hasTension) score += 10;
  if (s.hasTest) score += 8;
  if (s.hasAudience) score += 4;
  if (s.hasNicheContext) score += 4;
  if (s.hasAudienceContext) score += 5;
  if (s.hasFullContext) score += 3;
  if (s.wordCount > 22) score -= 10;
  if (!s.hasOutcome) score -= 8;
  if (!s.hasTension) score -= 6;
  const hookScore = Math.max(8, Math.min(94, Math.round(score)));
  const clarityScore = Math.max(10, Math.min(96, Math.round(32 + (s.hasPlatform ? 12 : 0) + (s.hasOutcome ? 16 : 0) + (s.hasNumber ? 10 : 0) + (s.hasNicheContext ? 10 : 0) + (s.hasAudienceContext ? 10 : 0) + (s.wordCount >= 7 && s.wordCount <= 18 ? 8 : 0))));
  const curiosityScore = Math.max(10, Math.min(96, Math.round(30 + (s.hasTension ? 22 : 0) + (s.hasOutcome ? 14 : 0) + (s.hasNumber ? 12 : 0) + (s.hasTest ? 8 : 0) + (s.hasAudienceContext ? 5 : 0))));
  const retentionRisk = Math.max(6, Math.min(95, Math.round(88 - hookScore + (s.wordCount > 20 ? 8 : 0) - (s.hasFullContext ? 4 : 0))));
  return { hookScore, clarityScore, curiosityScore, retentionRisk };
}

function fallbackAnalysis(hook: string, context: ContextInput = { platform: '', niche: '', audience: '' }): AnalysisPayload {
  if (isLowQualityInput(hook, context)) return invalidAnalysis(hook);
  const s = signals(hook, context);
  const scores = calibratedScores(hook, context);
  const trimmed = s.clean;
  const audienceLabel = s.ctx.audience || 'creators';
  const nicheLabel = s.ctx.niche || 'this topic';
  return {
    ...scores,
    pattern: s.hasNumber && s.hasOutcome ? 'Specific test with measurable payoff' : s.hasNumber ? 'Specific promise with numeric framing' : s.hasTension ? 'Curiosity gap with tension' : 'General hook angle',
    weakness: scores.hookScore >= 75 ? `Strong premise for ${audienceLabel}. Sharpen the emotional stakes and make the payoff even more concrete.` : `The premise is usable, but it needs sharper stakes for ${audienceLabel}, clearer ${nicheLabel} context, or a stronger reason to keep watching.`,
    improvedHook: s.hasOutcome ? trimmed : `${trimmed.replace(/[?.!]+$/g, '')} — and the result exposed one mistake ${audienceLabel} should avoid`,
    variants: [
      s.hasNumber ? `I tested ${trimmed.match(/\d+[^ ]*/)?.[0] || 'multiple'} hooks for ${nicheLabel} and one result changed everything` : `The mistake behind ${trimmed.toLowerCase().replace(/[?.!]+$/g, '')}`,
      `The one change that made ${audienceLabel} stay longer`,
      `Before you publish on ${s.ctx.platform || 'your channel'}, fix this first-second mistake`,
    ],
    retentionNotes: [`Open with the concrete payoff for ${audienceLabel} before the setup.`, 'Make the contrast sharper: what failed versus what worked.', `Pair the first line with a ${s.ctx.platform || 'platform'} title and thumbnail that repeat the same promise.`],
    scoreRationale: [s.hasNumber ? 'The number gives scale.' : 'A number would make the promise more concrete.', s.hasOutcome ? 'The hook includes a measurable result.' : 'The result needs to be clearer.', s.hasAudienceContext ? 'The audience context improves relevance.' : 'A sharper audience would improve relevance.'],
    audienceTrigger: s.hasAudienceContext ? `${audienceLabel} want to know which specific change improves ${nicheLabel} performance.` : 'Creators want to know which specific change improved performance.',
    titlePairings: [`The ${nicheLabel} Hook That Changed Retention`, `What Worked After Testing Multiple ${s.ctx.platform || 'Video'} Hooks`, `The First-Second Fix ${audienceLabel} Miss`],
    thumbnailAngles: ['Retention graph before and after', 'One winning hook highlighted', `Failed ${nicheLabel} hooks crossed out beside the winner`],
  };
}

function normalizeAnalysis(raw: any, hook: string, context: ContextInput): AnalysisPayload {
  const fallback = fallbackAnalysis(hook, context);
  const calibrated = calibratedScores(hook, context);
  const modelScore = Number(raw?.hookScore);
  const useCalibrated = Number.isFinite(modelScore) && Math.abs(modelScore - calibrated.hookScore) > 30;
  return {
    hookScore: useCalibrated ? calibrated.hookScore : Math.max(0, Math.min(100, Math.round(Number.isFinite(modelScore) ? modelScore : fallback.hookScore))),
    clarityScore: Math.max(0, Math.min(100, Math.round(Number.isFinite(Number(raw?.clarityScore)) ? Number(raw.clarityScore) : calibrated.clarityScore))),
    curiosityScore: Math.max(0, Math.min(100, Math.round(Number.isFinite(Number(raw?.curiosityScore)) ? Number(raw.curiosityScore) : calibrated.curiosityScore))),
    retentionRisk: Math.max(0, Math.min(100, Math.round(Number.isFinite(Number(raw?.retentionRisk)) ? Number(raw.retentionRisk) : calibrated.retentionRisk))),
    pattern: typeof raw?.pattern === 'string' ? cleanText(raw.pattern, 180) : fallback.pattern,
    weakness: typeof raw?.weakness === 'string' ? cleanText(raw.weakness, 280) : fallback.weakness,
    improvedHook: typeof raw?.improvedHook === 'string' ? cleanText(raw.improvedHook, 220) : fallback.improvedHook,
    variants: cleanArray(raw?.variants, fallback.variants, 5),
    retentionNotes: cleanArray(raw?.retentionNotes, fallback.retentionNotes, 5),
    scoreRationale: cleanArray(raw?.scoreRationale, fallback.scoreRationale, 5),
    audienceTrigger: typeof raw?.audienceTrigger === 'string' ? cleanText(raw.audienceTrigger, 240) : fallback.audienceTrigger,
    titlePairings: cleanArray(raw?.titlePairings, fallback.titlePairings, 5),
    thumbnailAngles: cleanArray(raw?.thumbnailAngles, fallback.thumbnailAngles, 5),
  };
}

async function analyzeWithOpenAI(hook: string, platform: string, niche: string, audience: string) {
  const context = { platform: cleanText(platform, 80), niche: cleanText(niche, 80), audience: cleanText(audience, 120) };
  if (isLowQualityInput(hook, context)) return { analysis: invalidAnalysis(hook), mode: 'rules' as const, diagnostic: 'low_quality_input' };
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_API_TOKEN;
  if (!apiKey) return { analysis: fallbackAnalysis(hook, context), mode: 'rules' as const, diagnostic: 'missing_openai_key' };
  const calibration = calibratedScores(hook, context);
  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.1,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'You are HookSignals, a strict short-form video hook strategist. Return only valid JSON. Be harsh but calibrated. Use platform, niche and audience as scoring context. Do not invent a niche that was not provided. Never flatter weak input.' },
          { role: 'user', content: `Analyze this creator hook.\nHook: "${hook}"\nPlatform: "${context.platform || 'not provided'}"\nNiche: "${context.niche || 'not provided'}"\nAudience: "${context.audience || 'not provided'}"\n\nReturn JSON only with these exact keys: hookScore, clarityScore, curiosityScore, retentionRisk, pattern, weakness, improvedHook, variants, retentionNotes, scoreRationale, audienceTrigger, titlePairings, thumbnailAngles.\n\nScoring calibration:\n90-100 = elite hook with specific audience, sharp tension, measurable payoff, and immediate curiosity.\n75-89 = strong hook with clear curiosity and payoff.\n50-74 = average hook with usable premise but weak stakes.\n20-49 = weak hook with unclear payoff or broad promise.\n0-19 = nonsense, filler, or meaningless text.\n\nContext rules:\n- Platform changes pacing and packaging advice. YouTube Shorts needs fast payoff, TikTok needs pattern interruption, Reels needs instantly visual promise, long-form needs stronger title curiosity.\n- Niche makes the output specific. Use it in weakness, audienceTrigger, titlePairings and thumbnailAngles.\n- Audience changes the trigger. Beginners need clarity, founders need ROI/time leverage, creators need retention/growth proof, experts need novelty.\n- Reward complete context, but do not rescue a bad hook only because context is filled.\n\nExamples:\n"I tested 37 YouTube hooks and one doubled retention in 48 hours" with Platform YouTube Shorts, Niche creator growth, Audience YouTubers => hookScore 84, clarityScore 88, curiosityScore 86, retentionRisk 16.\n"I uploaded 100 shorts in 30 days and only one changed everything" with Platform YouTube Shorts, Niche creator growth, Audience new creators => hookScore 78, clarityScore 82, curiosityScore 84, retentionRisk 22.\n"Sadly madly dadly" => hookScore 3, clarityScore 5, curiosityScore 4, retentionRisk 92.\n\nThis hook's heuristic baseline is hookScore ${calibration.hookScore}, clarityScore ${calibration.clarityScore}, curiosityScore ${calibration.curiosityScore}, retentionRisk ${calibration.retentionRisk}. Stay close unless there is a strong reason.`, },
        ],
      }),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return { analysis: fallbackAnalysis(hook, context), mode: 'rules' as const, diagnostic: `openai_${response.status}_${text.slice(0, 80)}` };
    }
    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return { analysis: fallbackAnalysis(hook, context), mode: 'rules' as const, diagnostic: 'empty_openai_response' };
    return { analysis: normalizeAnalysis(JSON.parse(content), hook, context), mode: 'ai' as const, diagnostic: null };
  } catch (error) {
    return { analysis: fallbackAnalysis(hook, context), mode: 'rules' as const, diagnostic: error instanceof Error ? error.message.slice(0, 120) : 'openai_exception' };
  }
}

function errorDetail(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error || 'unknown_error');
}

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
    const body = await request.json();
    const hook = String(body?.hook || '').trim().slice(0, 500);
    const platform = String(body?.platform || '').trim().slice(0, 80);
    const niche = String(body?.niche || '').trim().slice(0, 80);
    const audience = String(body?.audience || '').trim().slice(0, 120);
    if (hook.length < 8) return NextResponse.json({ success: false, error: 'missing_hook' }, { status: 400 });
    const supabaseAdmin = getSupabaseAdmin();
    const { data: credits, error: creditsError } = await supabaseAdmin.from('credits').select('*').eq('clerk_user_id', user.id).limit(1).maybeSingle();
    if (creditsError) return NextResponse.json({ success: false, error: 'credits_read_failed', detail: creditsError.message }, { status: 500 });
    if (!credits || Number(credits.credits_remaining || 0) < CREDIT_COST) return NextResponse.json({ success: false, error: 'insufficient_credits' }, { status: 402 });
    // Free plan users can use their 5 starter credits — this is the trial.
    // The credit balance check above is the sole gate; plan name is not a gate.
    const { analysis, mode, diagnostic } = await analyzeWithOpenAI(hook, platform, niche, audience);
    const nextUsed = Number(credits.credits_used || 0) + CREDIT_COST;
    const nextRemaining = Math.max(0, Number(credits.credits_remaining || 0) - CREDIT_COST);
    const { error: updateError } = await supabaseAdmin.from('credits').update({ credits_used: nextUsed, credits_remaining: nextRemaining, updated_at: new Date().toISOString() }).eq('clerk_user_id', user.id);
    if (updateError) return NextResponse.json({ success: false, error: 'credits_update_failed', detail: updateError.message }, { status: 500 });
    const { data: generation, error: generationError } = await supabaseAdmin.from('generations').insert({ clerk_user_id: user.id, tool_name: 'hook-analyzer-pro', input: hook, output: JSON.stringify(analysis), credits_spent: CREDIT_COST }).select('id').maybeSingle();
    return NextResponse.json({ success: true, analysis, mode, diagnostic, creditsSpent: CREDIT_COST, creditsRemaining: nextRemaining, shareId: generation?.id || null, generationError: generationError?.message || null });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'analysis_failed', detail: errorDetail(error) }, { status: 500 });
  }
}
