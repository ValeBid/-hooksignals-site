import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '../../../lib/supabase';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = process.env.OPENAI_MODEL || 'gpt-5-mini';
const CREDIT_COST = 5;

function fallbackAnalysis(hook: string) {
  const trimmed = hook.trim().slice(0, 500);
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const hasNumber = /\d/.test(trimmed);
  const hasQuestion = trimmed.includes('?');
  const hasContrast = /but|however|instead|why|secret|mistake|avoid|stop|failed|lost|nobody|truth/i.test(trimmed);
  const hasSpecificTopic = /youtube|shorts|tiktok|video|views|money|cardio|investing|client|creator|days|result/i.test(trimmed);

  const clarityScore = Math.min(95, Math.max(30, 58 + (wordCount >= 6 && wordCount <= 16 ? 14 : -8) + (hasSpecificTopic ? 10 : 0)));
  const curiosityScore = Math.min(95, Math.max(25, 50 + (hasQuestion ? 8 : 0) + (hasContrast ? 18 : 0) + (hasNumber ? 9 : 0)));
  const retentionRisk = Math.min(90, Math.max(10, 62 + (wordCount > 18 ? 12 : 0) - (hasContrast ? 12 : 0) - (hasNumber ? 8 : 0) - (hasSpecificTopic ? 8 : 0)));
  const hookScore = Math.round((clarityScore + curiosityScore + (100 - retentionRisk)) / 3);

  return {
    hookScore,
    clarityScore,
    curiosityScore,
    retentionRisk,
    pattern: hasNumber ? 'Specific promise with numeric framing' : hasContrast ? 'Curiosity gap with tension' : 'General hook angle',
    weakness: hasSpecificTopic
      ? 'The angle is understandable, but the payoff needs a sharper consequence or reveal.'
      : 'The hook is too vague. It needs a clearer object, audience pain point, or concrete result.',
    improvedHook: hasNumber
      ? `${trimmed.replace(/[?.!]+$/g, '')} — but the result exposed one mistake I did not expect`
      : `I tested ${trimmed.toLowerCase().replace(/[?.!]+$/g, '')}, and one detail changed the result`,
    variants: [
      `The mistake behind ${trimmed.toLowerCase().replace(/[?.!]+$/g, '')}`,
      `I almost ignored this — then the result changed`,
      `Before you post this idea, fix the first 3 seconds`,
      `Nobody explains this part clearly enough`,
      `This looked ordinary until one detail changed the outcome`,
    ],
    retentionNotes: [
      'Make the first second name a concrete payoff.',
      'Use a contradiction or mistake to create forward motion.',
      'Pair the hook with a title and thumbnail that reveal the same promise.',
    ],
    scoreRationale: [
      hasNumber ? 'The number gives scale.' : 'The hook needs a number or concrete scale.',
      hasContrast ? 'The tension helps curiosity.' : 'The hook needs a stronger contradiction.',
      hasSpecificTopic ? 'The topic is concrete.' : 'The topic is too broad to picture quickly.',
    ],
    audienceTrigger: hasContrast ? 'The viewer wants to resolve the tension.' : 'The viewer needs a clearer benefit before caring.',
    titlePairings: ['What changed after the test', 'The mistake behind the result', 'I tested this so you do not have to'],
    thumbnailAngles: ['Before / after contrast', 'One bold result word', 'Mistake label over the key moment'],
  };
}

function safeParseAnalysis(content: string, hook: string) {
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error('[hook-analyzer] OpenAI returned invalid JSON', error);
    return fallbackAnalysis(hook);
  }
}

async function analyzeWithOpenAI(hook: string) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_API_TOKEN;
  if (!apiKey) return { analysis: fallbackAnalysis(hook), mode: 'rules' as const, diagnostic: 'missing_openai_key' };

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
        {
          role: 'system',
          content: 'You are a strict short-form video strategist. Return valid JSON only. Score harshly and give specific practical improvements.',
        },
        {
          role: 'user',
          content: `Analyze this hook for YouTube Shorts, TikTok or Reels: "${hook}". Return JSON with hookScore, clarityScore, curiosityScore, retentionRisk, pattern, weakness, improvedHook, variants, retentionNotes, scoreRationale, audienceTrigger, titlePairings, thumbnailAngles. Give 8 variants if possible.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    console.error('[hook-analyzer] OpenAI call failed', response.status, body.slice(0, 500));
    return { analysis: fallbackAnalysis(hook), mode: 'rules' as const, diagnostic: 'openai_call_failed' };
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return { analysis: fallbackAnalysis(hook), mode: 'rules' as const, diagnostic: 'empty_openai_response' };

  return { analysis: safeParseAnalysis(content, hook), mode: 'ai' as const, diagnostic: null };
}

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });

    const body = await request.json();
    const hook = String(body?.hook || '').trim().slice(0, 500);
    if (hook.length < 8) return NextResponse.json({ success: false, error: 'missing_hook' }, { status: 400 });

    const { data: credits, error: creditsError } = await supabaseAdmin
      .from('credits')
      .select('*')
      .eq('clerk_user_id', user.id)
      .limit(1)
      .maybeSingle();

    if (creditsError) {
      console.error('[hook-analyzer] credits read failed', creditsError);
      return NextResponse.json({ success: false, error: 'credits_read_failed', detail: creditsError.message }, { status: 500 });
    }

    if (!credits || Number(credits.credits_remaining || 0) < CREDIT_COST) {
      return NextResponse.json({ success: false, error: 'insufficient_credits' }, { status: 402 });
    }

    const plan = String(credits.plan || 'starter').toLowerCase();
    if (plan === 'free') {
      return NextResponse.json({ success: false, error: 'upgrade_required' }, { status: 402 });
    }

    const { analysis, mode, diagnostic } = await analyzeWithOpenAI(hook);

    const nextUsed = Number(credits.credits_used || 0) + CREDIT_COST;
    const nextRemaining = Math.max(0, Number(credits.credits_remaining || 0) - CREDIT_COST);

    const { error: updateError } = await supabaseAdmin
      .from('credits')
      .update({ credits_used: nextUsed, credits_remaining: nextRemaining, updated_at: new Date().toISOString() })
      .eq('clerk_user_id', user.id);

    if (updateError) {
      console.error('[hook-analyzer] credits update failed', updateError);
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

    if (generationError) {
      console.error('[hook-analyzer] generation insert failed', generationError);
    }

    return NextResponse.json({
      success: true,
      analysis,
      mode,
      diagnostic,
      creditsSpent: CREDIT_COST,
      creditsRemaining: nextRemaining,
      shareId: generation?.id || null,
    });
  } catch (error) {
    console.error('[hook-analyzer] unhandled failure', error);
    return NextResponse.json({ success: false, error: 'analysis_failed' }, { status: 500 });
  }
}
