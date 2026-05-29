import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const CREDIT_COST = 5;

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) throw new Error('missing_supabase_url');
  if (!supabaseKey) throw new Error('missing_supabase_key');

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
}

function fallbackAnalysis(hook: string) {
  const trimmed = hook.trim().slice(0, 500);
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const hasNumber = /\d/.test(trimmed);
  const hasQuestion = trimmed.includes('?');
  const hasTension = /but|why|secret|mistake|avoid|stop|failed|lost|truth|before|after/i.test(trimmed);
  const hasSpecificTopic = /youtube|shorts|tiktok|video|views|money|client|creator|days|result|hook|title|thumbnail/i.test(trimmed);

  const clarityScore = Math.min(95, Math.max(30, 58 + (wordCount >= 6 && wordCount <= 16 ? 14 : -8) + (hasSpecificTopic ? 10 : 0)));
  const curiosityScore = Math.min(95, Math.max(25, 50 + (hasQuestion ? 8 : 0) + (hasTension ? 18 : 0) + (hasNumber ? 9 : 0)));
  const retentionRisk = Math.min(90, Math.max(10, 62 + (wordCount > 18 ? 12 : 0) - (hasTension ? 12 : 0) - (hasNumber ? 8 : 0) - (hasSpecificTopic ? 8 : 0)));
  const hookScore = Math.round((clarityScore + curiosityScore + (100 - retentionRisk)) / 3);

  return {
    hookScore,
    clarityScore,
    curiosityScore,
    retentionRisk,
    pattern: hasNumber ? 'Specific promise with numeric framing' : hasTension ? 'Curiosity gap with tension' : 'General hook angle',
    weakness: hasSpecificTopic
      ? 'The angle is understandable, but the payoff needs a sharper consequence or reveal.'
      : 'The hook is too vague. It needs a clearer object, audience pain point, or concrete result.',
    improvedHook: `${trimmed.replace(/[?.!]+$/g, '')} — but the result exposed one detail viewers should see`,
    variants: [
      `The mistake behind ${trimmed.toLowerCase().replace(/[?.!]+$/g, '')}`,
      'One detail changed the result',
      'Before you post this idea, fix the first 3 seconds',
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

function normalizeAnalysis(raw: any, hook: string) {
  const fallback = fallbackAnalysis(hook);
  return {
    hookScore: Number.isFinite(raw?.hookScore) ? Math.max(0, Math.min(100, Math.round(raw.hookScore))) : fallback.hookScore,
    clarityScore: Number.isFinite(raw?.clarityScore) ? Math.max(0, Math.min(100, Math.round(raw.clarityScore))) : fallback.clarityScore,
    curiosityScore: Number.isFinite(raw?.curiosityScore) ? Math.max(0, Math.min(100, Math.round(raw.curiosityScore))) : fallback.curiosityScore,
    retentionRisk: Number.isFinite(raw?.retentionRisk) ? Math.max(0, Math.min(100, Math.round(raw.retentionRisk))) : fallback.retentionRisk,
    pattern: typeof raw?.pattern === 'string' ? raw.pattern.slice(0, 180) : fallback.pattern,
    weakness: typeof raw?.weakness === 'string' ? raw.weakness.slice(0, 280) : fallback.weakness,
    improvedHook: typeof raw?.improvedHook === 'string' ? raw.improvedHook.slice(0, 220) : fallback.improvedHook,
    variants: Array.isArray(raw?.variants) ? raw.variants.map(String).filter(Boolean).slice(0, 5) : fallback.variants,
    retentionNotes: Array.isArray(raw?.retentionNotes) ? raw.retentionNotes.map(String).filter(Boolean).slice(0, 5) : fallback.retentionNotes,
    scoreRationale: Array.isArray(raw?.scoreRationale) ? raw.scoreRationale.map(String).filter(Boolean).slice(0, 5) : fallback.scoreRationale,
    audienceTrigger: typeof raw?.audienceTrigger === 'string' ? raw.audienceTrigger.slice(0, 240) : fallback.audienceTrigger,
    titlePairings: Array.isArray(raw?.titlePairings) ? raw.titlePairings.map(String).filter(Boolean).slice(0, 5) : fallback.titlePairings,
    thumbnailAngles: Array.isArray(raw?.thumbnailAngles) ? raw.thumbnailAngles.map(String).filter(Boolean).slice(0, 5) : fallback.thumbnailAngles,
  };
}

async function analyzeWithOpenAI(hook: string, platform: string, niche: string, audience: string) {
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
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'You are a strict short-form video strategist. Return valid JSON only. Score harshly and give practical improvements.' },
          { role: 'user', content: `Hook: ${hook}\nPlatform: ${platform || 'not provided'}\nNiche: ${niche || 'not provided'}\nAudience: ${audience || 'not provided'}\nReturn JSON with hookScore, clarityScore, curiosityScore, retentionRisk, pattern, weakness, improvedHook, variants, retentionNotes, scoreRationale, audienceTrigger, titlePairings, thumbnailAngles.` },
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
    if (!user) {
      return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const hook = String(body?.hook || '').trim().slice(0, 500);
    const platform = String(body?.platform || '').trim().slice(0, 80);
    const niche = String(body?.niche || '').trim().slice(0, 80);
    const audience = String(body?.audience || '').trim().slice(0, 120);

    if (hook.length < 8) {
      return NextResponse.json({ success: false, error: 'missing_hook' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data: credits, error: creditsError } = await supabaseAdmin
      .from('credits')
      .select('*')
      .eq('clerk_user_id', user.id)
      .limit(1)
      .maybeSingle();

    if (creditsError) {
      return NextResponse.json({ success: false, error: 'credits_read_failed', detail: creditsError.message }, { status: 500 });
    }

    if (!credits || Number(credits.credits_remaining || 0) < CREDIT_COST) {
      return NextResponse.json({ success: false, error: 'insufficient_credits' }, { status: 402 });
    }

    const plan = String(credits.plan || 'starter').toLowerCase();
    if (plan === 'free') {
      return NextResponse.json({ success: false, error: 'upgrade_required' }, { status: 402 });
    }

    const { analysis, mode, diagnostic } = await analyzeWithOpenAI(hook, platform, niche, audience);
    const nextUsed = Number(credits.credits_used || 0) + CREDIT_COST;
    const nextRemaining = Math.max(0, Number(credits.credits_remaining || 0) - CREDIT_COST);

    const { error: updateError } = await supabaseAdmin
      .from('credits')
      .update({ credits_used: nextUsed, credits_remaining: nextRemaining, updated_at: new Date().toISOString() })
      .eq('clerk_user_id', user.id);

    if (updateError) {
      return NextResponse.json({ success: false, error: 'credits_update_failed', detail: updateError.message }, { status: 500 });
    }

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
