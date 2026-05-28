import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { supabase } from '../../../lib/supabase';

function fallbackAnalysis(hook: string) {
  const trimmed = hook.trim();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const hasNumber = /\d/.test(trimmed);
  const hasQuestion = trimmed.includes('?');
  const hasContrast = /but|however|instead|why|secret|mistake|avoid|stop/i.test(trimmed);

  const clarityScore = Math.min(95, Math.max(45, 70 + (wordCount <= 14 ? 10 : -8) + (hasNumber ? 6 : 0)));
  const curiosityScore = Math.min(95, Math.max(40, 62 + (hasQuestion ? 8 : 0) + (hasContrast ? 14 : 0) + (hasNumber ? 6 : 0)));
  const retentionRisk = Math.min(90, Math.max(10, 48 + (wordCount > 18 ? 18 : 0) - (hasContrast ? 10 : 0) - (hasNumber ? 6 : 0)));
  const hookScore = Math.round((clarityScore + curiosityScore + (100 - retentionRisk)) / 3);

  return {
    hookScore,
    clarityScore,
    curiosityScore,
    retentionRisk,
    pattern: hasNumber ? 'Specific promise with numeric framing' : 'General curiosity hook',
    weakness: wordCount > 18 ? 'The hook is too long for a fast first-second payoff.' : 'The hook can use a stronger unresolved tension.',
    improvedHook: hasNumber
      ? `${trimmed} — but one detail changes the result.`
      : `I tested this creator hook pattern, and the result was not what I expected.`,
    variants: [
      `I tried this hook pattern so you do not have to.`,
      `Most creators miss this one hook mistake.`,
      `This small hook change can improve the first 3 seconds.`,
    ],
    retentionNotes: [
      'Open with the payoff faster.',
      'Create a clearer curiosity gap.',
      'Avoid vague setup before the promise.',
    ],
  };
}

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const hook = String(body?.hook || '').trim();

    if (!hook) {
      return NextResponse.json({ success: false, error: 'missing_hook' }, { status: 400 });
    }

    const analysis = fallbackAnalysis(hook);

    const { data: generation } = await supabase
      .from('generations')
      .insert({
        clerk_user_id: user.id,
        tool_name: 'hook-analyzer',
        input: hook,
        output: JSON.stringify(analysis),
        credits_spent: 1,
      })
      .select('id')
      .single();

    return NextResponse.json({
      success: true,
      analysis,
      shareId: generation?.id || null,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'analysis_failed' }, { status: 500 });
  }
}
