import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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

    const analysis = fallbackAnalysis(hook);
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
      mode: 'rules',
      diagnostic: 'premium_credit_path',
      creditsSpent: CREDIT_COST,
      creditsRemaining: nextRemaining,
      shareId: generation?.id || null,
      generationError: generationError?.message || null,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'analysis_failed', detail: errorDetail(error) }, { status: 500 });
  }
}
