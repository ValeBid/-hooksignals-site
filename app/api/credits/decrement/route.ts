import { NextResponse } from 'next/server';
import { getSupabaseClient } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();

    const clerkUserId = body?.clerkUserId;
    const toolName = body?.toolName || 'unknown-tool';
    const creditsToSpend = Number(body?.credits || 1);

    if (!clerkUserId) {
      return NextResponse.json(
        {
          success: false,
          error: 'missing_user',
        },
        {
          status: 400,
        }
      );
    }

    const { data: currentCredit } = await supabase
      .from('credits')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (!currentCredit) {
      return NextResponse.json(
        {
          success: false,
          error: 'credit_record_missing',
        },
        {
          status: 404,
        }
      );
    }

    const remaining = currentCredit.credits_remaining - creditsToSpend;

    if (remaining < 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'insufficient_credits',
        },
        {
          status: 403,
        }
      );
    }

    await supabase
      .from('credits')
      .update({
        credits_used: currentCredit.credits_used + creditsToSpend,
        credits_remaining: remaining,
      })
      .eq('clerk_user_id', clerkUserId);

    await supabase.from('generations').insert({
      clerk_user_id: clerkUserId,
      tool_name: toolName,
      credits_spent: creditsToSpend,
    });

    return NextResponse.json({
      success: true,
      remaining,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'credit_decrement_failed',
      },
      {
        status: 500,
      }
    );
  }
}
