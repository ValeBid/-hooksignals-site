import { supabase, supabaseAdmin } from './supabase';

function filterGenerations(generations: any[], matchers: string[]) {
  return generations.filter((item) => {
    const name = String(item.tool_name || '').toLowerCase();
    return matchers.some((matcher) => name.includes(matcher));
  });
}

export async function getDashboardPreviewData() {
  const [{ data: subscriptions }, { data: credits }] = await Promise.all([
    supabaseAdmin.from('subscriptions').select('*').limit(1),
    supabaseAdmin.from('credits').select('*').limit(1),
  ]);

  return {
    subscription: subscriptions?.[0] || null,
    credits: credits?.[0] || null,
  };
}

export async function getDashboardDataForUser(clerkUserId: string) {
  const [{ data: subscriptions }, { data: credits }, { data: generations }] = await Promise.all([
    supabaseAdmin.from('subscriptions').select('*').eq('clerk_user_id', clerkUserId).limit(1),
    supabaseAdmin.from('credits').select('*').eq('clerk_user_id', clerkUserId).limit(1),
    supabaseAdmin.from('generations').select('*').eq('clerk_user_id', clerkUserId).order('created_at', { ascending: false }).limit(30),
  ]);

  const safeGenerations = generations || [];
  const hookAnalyses = filterGenerations(safeGenerations, ['hook']);
  const titleGenerations = filterGenerations(safeGenerations, ['title']);
  const scriptGenerations = filterGenerations(safeGenerations, ['script']);
  const thumbnailChecks = filterGenerations(safeGenerations, ['thumbnail']);
  const totalGenerations = safeGenerations.length;
  const recentToolNames = Array.from(new Set(safeGenerations.map((item: any) => item.tool_name).filter(Boolean)));
  const creditsSpent = safeGenerations.reduce((sum: number, item: any) => sum + Number(item.credits_spent || 0), 0);
  const lastGenerationAt = safeGenerations[0]?.created_at || null;

  return {
    subscription: subscriptions?.[0] || null,
    credits: credits?.[0] || null,
    generations: safeGenerations,
    groups: {
      hookAnalyses: hookAnalyses.slice(0, 6),
      titleGenerations: titleGenerations.slice(0, 6),
      scriptGenerations: scriptGenerations.slice(0, 6),
      thumbnailChecks: thumbnailChecks.slice(0, 6),
    },
    workspace: {
      totalGenerations,
      recentToolNames,
      creditsSpent,
      lastGenerationAt,
      hookCount: hookAnalyses.length,
      titleCount: titleGenerations.length,
      scriptCount: scriptGenerations.length,
      thumbnailCount: thumbnailChecks.length,
    },
  };
}

export async function bootstrapUserProfile(input: {
  clerkUserId: string;
  email?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
}) {
  await supabaseAdmin.from('profiles').upsert(
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

  const { data: existingCredits } = await supabaseAdmin
    .from('credits')
    .select('id')
    .eq('clerk_user_id', input.clerkUserId)
    .limit(1);

  if (!existingCredits?.length) {
    await supabaseAdmin.from('credits').insert({
      clerk_user_id: input.clerkUserId,
      plan: 'free',
      credits_total: 5,
      credits_used: 0,
      credits_remaining: 5,
    });
  }
}
