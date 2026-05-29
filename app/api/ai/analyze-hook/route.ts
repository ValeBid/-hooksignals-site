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

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) throw new Error('missing_supabase_url');
  if (!supabaseKey) throw new Error('missing_supabase_key');

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
}

function cleanText(value: string, max = 140) {
  return value.trim().replace(/\s+/g, ' ').slice(0, max);
}

function clampScore(value: unknown, fallback: number) {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function cleanArray(value: unknown, fallback: string[], limit = 5) {
  if (!Array.isArray(value)) return fallback;
  const clean = value.map((item) => cleanText(String(item), 220)).filter(Boolean).slice(0, limit);
  return clean.length ? clean : fallback;
}

function isLowQualityInput(hook: string) {
  const clean = cleanText(hook, 500);
  const words = clean.split(/\s+/).filter(Boolean);
  const alphaChars = (clean.match(/[a-zA-Z]/g) || []).length;
  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ''))).size;
  const hasConcreteSignal = /\d|youtube|shorts|tiktok|reels|video|views|client|money|fitness|ai|business|creator|title|thumbnail|mistake|before|after|why|how|result|test|days|month|secret|stop|avoid/i.test(clean);

  return clean.length < 12 || words.length < 4 || alphaChars < 10 || uniqueWords < 3 || (!hasConcreteSignal && words.length < 6);
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
    variants: [
      'I tested one simple change and the result surprised me',
      'The mistake most creators make before they publish',
      'Before you post this, fix the first three seconds',
    ],
    retentionNotes: [
      'Add a concrete subject, not just mood words.',
      'Name the payoff viewers will get by staying.',
      'Use tension: what changed, failed, or surprised you?',
    ],
    scoreRationale: [
      'The current input is too vague to picture quickly.',
      'There is no clear viewer benefit or outcome.',
      'A stronger hook needs a subject plus tension.',
    ],
    audienceTrigger: 'No clear audience trigger yet.',
    titlePairings: ['The first-second mistake to fix', 'What changed after the test', 'Why viewers leave early'],
    thumbnailAngles: ['One bold outcome word', 'Before and after contrast', 'Mistake label over the key moment'],
  };
}

function fallbackAnalysis(hook: string): AnalysisPayload {
  if (isLowQualityInput(hook)) return invalidAnalysis(hook);

  const trimmed = cleanText(hook, 500);
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const hasNumber = /\d/.test(trimmed);
  const hasQuestion = trimmed.includes('?');
  const hasTension = /but|why|secret|mistake|avoid|stop|failed|lost|truth|before|after|changed|surprised|nobody/i.test(trimmed);
  const hasSpecificTopic = /youtube|shorts|tiktok|reels|video|views|money|client|creator|days|result|hook|title|thumbnail|fitness|ai|business/i.test(trimmed);

  const clarityScore = Math.min(95, Math.max(20, 52 + (wordCount >= 6 && wordCount <= 16 ? 18 : -10) + (hasSpecificTopic ? 12 : 0) + (hasNumber ? 6 : 0)));
  const curiosityScore = Math.min(95, Math.max(20, 44 + (hasQuestion ? 8 : 0) + (hasTension ? 20 : 0) + (hasNumber ? 10 : 0)));
  const retentionRisk = Math.min(95, Math.max(8, 68 + (wordCount > 18 ? 10 : 0) - (hasTension ? 16 : 0) - (hasNumber ? 8 : 0) - (hasSpecificTopic ? 8 : 0)));
  const hookScore = Math.round((clarityScore + curiosityScore + (100 - retentionRisk)) / 3);

  return {
    hookScore,
    clarityScore,
    curiosityScore,
    retentionRisk,
    pattern: hasNumber ? 'Specific promise with numeric framing' : hasTension ? 'Curiosity gap with tension' : 'General hook angle',
    weakness: hasSpecificTopic
      ? 'The angle is understandable, but the payoff needs a sharper consequence or reveal.'
      : 'The hook is still broad. It needs a clearer object, audience pain point, or concrete result.',
    improvedHook: `${trimmed.replace(/[?.!]+$/g, '')} — but the result exposed one detail viewers should see`,
    variants: [
      `The mistake behind ${trimmed.toLowerCase().replace(/[?.!]+$/g, '')}`,
      'One detail changed the result',
      'Before you post this idea, fix the first three seconds',
    ],
    retentionNotes: [
      'Name the concrete payoff in the first second.',
      'Add tension around what changed or went wrong.',
      'Pair the hook with a clear title and thumbnail promise.',
    ],
    scoreRationale: [
      hasNumber ? 'The number gives scale.' : 'The hook needs a number or concrete scale.',
      hasTension ? 'The tension helps curiosity.' : 'The hook needs stronger tension.',
      hasSpecificTopic ? 'The topic is concrete.' : 'The topic is too broad to picture quickly.',
    ],
    audienceTrigger: hasTension ? 'Outcome curiosity and mistake avoidance.' : 'The viewer needs a clearer benefit before caring.',
    titlePairings: ['The mistake behind this result', 'What changed after the test', 'The first detail to fix'],
    thumbnailAngles: ['Before and after contrast', 'One bold result word', 'Mistake label over the key moment'],
  };
}

function normalizeAnalysis(raw: any, hook: string): AnalysisPayload {
  const fallback = fallbackAnalysis(hook);
  return {
    hookScore: clampScore(raw?.hookScore, fallback.hookScore),
    clarityScore: clampScore(raw?.clarityScore, fallback.clarityScore),
    curiosityScore: clampScore(raw?.curiosityScore, fallback.curiosityScore),
    retentionRisk: clampScore(raw?.retentionRisk, fallback.retentionRisk),
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
  if (isLowQualityInput(hook)) return { analysis: invalidAnalysis(hook), mode: 'rules' as const, diagnostic: 'low_quality_input' };

  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_API_TOKEN;
  if (!apiKey) return { analysis: fallbackAnalysis(hook), mode: 'rules' as const, diagnostic: 'missing_openai_key' };

  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'You are HookSignals, a strict short-form video hook strategist. Return only valid JSON. Be harsh. Do not invent a niche that was not provided. If the hook is vague or weak, say so. Scores below 20 are allowed for bad hooks. Never flatter weak input.',
          },
          {
            role: 'user',
            content: `Analyze this creator hook.\nHook: "${hook}"\nPlatform: "${platform || 'not provided'}"\nNiche: "${niche || 'not provided'}"\nAudience: "${audience || 'not provided'}"\n\nReturn JSON only with these exact keys:\nhookScore, clarityScore, curiosityScore, retentionRisk, pattern, weakness, improvedHook, variants, retentionNotes, scoreRationale, audienceTrigger, titlePairings, thumbnailAngles.\n\nRules:\n- hookScore, clarityScore, curiosityScore and retentionRisk must be 0-100 numbers.\n- If input is nonsense, filler, or too vague, hookScore must be under 15.\n- Do not infer family, finance, fitness or AI unless the hook or context says so.\n- improvedHook must be usable as a first line.\n- variants must contain 3-5 sharper first-line hooks.\n- retentionNotes and scoreRationale must be practical and specific.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return { analysis: fallbackAnalysis(hook), mode: 'rules' as const, diagnostic: `openai_${response.status}_${text.slice(0, 80)}` };
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) return { analysis: fallbackAnalysis(hook), mode: 'rules' as const, diagnostic: 'empty_openai_response' };

    return { analysis: normalizeAnalysis(JSON.parse(content), hook), mode: 'ai' as const, diagnostic: null };
  } catch (error) {
    return { analysis: fallbackAnalysis(hook), mode: 'rules' as const, diagnostic: error instanceof Error ? error.message.slice(0, 120) : 'openai_exception' };
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

    const { data: credits, error: creditsError } = await supabaseAdmin
      .from('credits')
      .select('*')
      .eq('clerk_user_id', user.id)
      .limit(1)
      .maybeSingle();

    if (creditsError) return NextResponse.json({ success: false, error: 'credits_read_failed', detail: creditsError.message }, { status: 500 });
    if (!credits || Number(credits.credits_remaining || 0) < CREDIT_COST) return NextResponse.json({ success: false, error: 'insufficient_credits' }, { status: 402 });

    const plan = String(credits.plan || 'starter').toLowerCase();
    if (plan === 'free') return NextResponse.json({ success: false, error: 'upgrade_required' }, { status: 402 });

    const { analysis, mode, diagnostic } = await analyzeWithOpenAI(hook, platform, niche, audience);
    const nextUsed = Number(credits.credits_used || 0) + CREDIT_COST;
    const nextRemaining = Math.max(0, Number(credits.credits_remaining || 0) - CREDIT_COST);

    const { error: updateError } = await supabaseAdmin
      .from('credits')
      .update({ credits_used: nextUsed, credits_remaining: nextRemaining, updated_at: new Date().toISOString() })
      .eq('clerk_user_id', user.id);

    if (updateError) return NextResponse.json({ success: false, error: 'credits_update_failed', detail: updateError.message }, { status: 500 });

    const { data: generation, error: generationError } = await supabaseAdmin
      .from('generations')
      .insert({
        clerk_user_id: user.id,
        tool_name: 'hook-analyzer-pro',
        input: hook,
        output: JSON.stringify(analysis),
        credits_spent: CREDIT_COST,
      })
      .select('id')
      .maybeSingle();

    return NextResponse.json({
      success: true,
      analysis,
      mode,
      diagnostic,
      creditsSpent: CREDIT_COST,
      creditsRemaining: nextRemaining,
      shareId: generation?.id || null,
      generationError: generationError?.message || null,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'analysis_failed', detail: errorDetail(error) }, { status: 500 });
  }
}
