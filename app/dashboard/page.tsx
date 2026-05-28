import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { bootstrapUserProfile, getDashboardDataForUser } from '../lib/dashboard-data';

export const metadata = {
  title: 'Dashboard | HookSignals',
  description: 'Manage HookSignals creator credits, workflows and subscription status.',
};

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const email = user.emailAddresses?.[0]?.emailAddress || null;
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || null;

  await bootstrapUserProfile({
    clerkUserId: user.id,
    email,
    fullName,
    avatarUrl: user.imageUrl || null,
  });

  const data = await getDashboardDataForUser(user.id);

  const plan = data.subscription?.plan || data.credits?.plan || 'free';
  const status = data.subscription?.status || 'inactive';
  const creditsTotal = data.credits?.credits_total ?? 0;
  const creditsRemaining = data.credits?.credits_remaining ?? 0;

  return (
    <main className="min-h-screen bg-[#030507] px-5 py-16 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">HookSignals dashboard</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">Creator operating room.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/55">
            Welcome{fullName ? `, ${fullName}` : ''}. Your plan, credits and saved creator workflows are now tied to your account.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-4">
          <div className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">Plan</p>
            <p className="mt-4 text-3xl font-black capitalize">{plan}</p>
            <p className="mt-3 leading-7 text-white/50">Subscription status: {status}</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/25 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/38">Credits</p>
            <p className="mt-4 text-3xl font-black">{creditsRemaining} / {creditsTotal}</p>
            <p className="mt-3 leading-7 text-white/50">Live account credit data from Supabase.</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/25 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/38">Analyses</p>
            <p className="mt-4 text-3xl font-black">{data.workspace.totalGenerations}</p>
            <p className="mt-3 leading-7 text-white/50">Saved creator generations.</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/25 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/38">Credits spent</p>
            <p className="mt-4 text-3xl font-black">{data.workspace.creditsSpent}</p>
            <p className="mt-3 leading-7 text-white/50">Tracked workspace activity.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-[-0.04em]">Recent creator generations</h2>
                <p className="mt-3 max-w-2xl leading-8 text-white/55">
                  Your saved hook analyses and creator workflow outputs.
                </p>
              </div>
              <a href="/tools" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-black text-white">Open tools</a>
            </div>

            <div className="mt-7 grid gap-4">
              {data.generations.length === 0 && (
                <div className="rounded-[24px] border border-dashed border-white/10 bg-black/20 p-6 text-white/45">
                  No saved generations yet. Analyze your first hook to start building creator memory.
                </div>
              )}

              {data.generations.map((generation: any) => (
                <div key={generation.id || generation.created_at} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">{generation.tool_name || 'tool'}</p>
                      <h3 className="mt-2 text-xl font-bold text-white/90">
                        {generation.input || 'Saved generation'}
                      </h3>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/45">
                      {generation.credits_spent || 0} credits
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
            <h2 className="text-3xl font-black tracking-[-0.04em]">Workspace memory</h2>
            <p className="mt-4 leading-8 text-white/55">
              HookSignals tracks your creator workflow usage and builds persistent creator context.
            </p>

            <div className="mt-7 grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm uppercase tracking-[0.14em] text-white/35">Recent tools</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {data.workspace.recentToolNames.length === 0 && (
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/45">
                      No tools used yet
                    </span>
                  )}

                  {data.workspace.recentToolNames.map((tool: string) => (
                    <span key={tool} className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-2 text-sm text-cyan-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm uppercase tracking-[0.14em] text-white/35">Billing</p>
                <h3 className="mt-3 text-2xl font-black">Manage subscription</h3>
                <p className="mt-3 leading-7 text-white/50">
                  Billing management portal foundation is ready for Paddle customer sync.
                </p>
                <a href="/pricing" className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">
                  Upgrade plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
