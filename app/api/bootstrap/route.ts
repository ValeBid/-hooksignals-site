import { NextResponse } from 'next/server';
import { getSupabaseClient } from '../../lib/supabase';

export async function POST() {
  try {
    const supabase = getSupabaseClient();
    const payload = {
      clerk_user_id: 'preview-user',
      plan: 'starter',
      credits_total: 100,
      credits_used: 0,
      credits_remaining: 100,
    };

    await supabase.from('credits').upsert(payload, {
      onConflict: 'clerk_user_id',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'bootstrap_failed' }, { status: 500 });
  }
}
