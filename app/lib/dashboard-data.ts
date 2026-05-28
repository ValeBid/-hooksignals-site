import { supabase } from './supabase';

export async function getDashboardPreviewData() {
  const [{ data: subscriptions }, { data: credits }] = await Promise.all([
    supabase.from('subscriptions').select('*').limit(1),
    supabase.from('credits').select('*').limit(1),
  ]);

  return {
    subscription: subscriptions?.[0] || null,
    credits: credits?.[0] || null,
  };
}

export async function getDashboardDataForUser(clerkUserId: string) {
  const [{ data: subscriptions }, { data: credits }, { data: generations }] = await Promise.all([
    supabase.from('subscriptions').select('*').eq('clerk_user_id', clerkUserId).limit(1),
    supabase.from('credits').select('*').eq('clerk_user_id', clerkUserId).limit(1),
    supabase.from('generations').select('*').eq('clerk_user_id', clerkUserId).order('created_at', { ascending: false }).limit(5),
  ]);

  return {
    subscription: subscriptions?.[0] || null,
    credits: credits?.[0] || null,
    generations: generations || [],
  };
}

export async function bootstrapUserProfile(input: {
  clerkUserId: string;
  email?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
}) {
  await supabase.from('profiles').upsert(
    {
      clerk_user_id: input.clerkUserId,
      email: input.email || null,
      full_name: input.fullName || null,
      avatar_url: input.avatarUrl || null,
    },
    {
      onConflict: 'clerk_user_id',
    }
  );

  const { data: existingCredits } = await supabase
    .from('credits')
    .select('id')
    .eq('clerk_user_id', input.clerkUserId)
    .limit(1);

  if (!existingCredits?.length) {
    await supabase.from('credits').insert({
      clerk_user_id: input.clerkUserId,
      plan: 'free',
      credits_total: 5,
      credits_used: 0,
      credits_remaining: 5,
    });
  }
}
