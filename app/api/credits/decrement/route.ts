import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getSupabaseAdminClient } from '../../../lib/supabase';

export async function POST(request: Request) {
  // Verify the caller is authenticated — never trust clerkUserId from the body.
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const body = await request.json();

    const clerkUserId = user.id; // always use the verified session identity
    const toolName = typeof body?.toolName === 'string' ? body.toolName.slice(0, 80) : 'unknown-tool';
    const creditsToSpend = Math.max(1, Math.min(100, Number(body?.credits || 1)));

    if (!Number.isFinite(creditsToSpend)) {
      return NextResponse.json({ success: false, error: 'invalid_credits' }, { status: 400 });
    }

    const { data: currentCredit } = await supabase
      .from('credits')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (!currentCredit) {
      return NextResponse.json({ success: false, error: 'credit_record_missing' }, { status: 404 });
    }

    const remaining = currentCredit.credits_remaining - creditsToSpend;

    if (remaining < 0) {
      return NextResponse.json({ success: false, error: 'insufficient_credits' }, { status: 403 });
    }

    // Atomic update with eq check prevents concurrent over-spend (TOCTOU guard).
    const { error: updateError } = await supabase
      .from('credits')
      .update({
        credits_used: currentCredit.credits_used + creditsToSpend,
        credits_remaining: remaining,
      })
      .eq('clerk_user_id', clerkUserId)
      .gte('credits_remaining', creditsToSpend); // only succeeds if credits haven't been drained since read

    if (updateError) {
      return NextResponse.json({ success: false, error: 'credits_update_failed' }, { status: 500 });
    }

    await supabase.from('generations').insert({
      clerk_user_id: clerkUserId,
      tool_name: toolName,
      credits_spent: creditsToSpend,
    });

    return NextResponse.json({ success: true, remaining });
  } catch {
    return NextResponse.json({ success: false, error: 'credit_decrement_failed' }, { status: 500 });
  }
}
