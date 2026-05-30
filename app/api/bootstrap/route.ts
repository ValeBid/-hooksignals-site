import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getSupabaseClient } from '../../lib/supabase';

// Bootstrap a new user's credits record on first sign-in.
// Must be authenticated — the user's own Clerk ID is used as the key.
export async function POST() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseClient();

    await supabase.from('credits').upsert(
      {
        clerk_user_id: user.id,
        plan: 'free',
        credits_total: 5,
        credits_used: 0,
        credits_remaining: 5,
      },
      { onConflict: 'clerk_user_id' }
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'bootstrap_failed' }, { status: 500 });
  }
}
