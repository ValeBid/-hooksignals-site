import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { bootstrapUserProfile, getDashboardDataForUser } from '../lib/dashboard-data';

export const metadata = {
  title: 'Dashboard | HookSignals',
  description: 'Manage HookSignals creator credits, workflows and subscription status.',
};

type DashboardPageProps = {
  searchParams?: {
    checkout?: string;
  };
};

function ActivityList({ items, empty }: { items: any[]; empty: string }) {
  return (
    <div className="mt-5 grid gap-3">
      {items.length === 0 && (
        <div className="rounded-[20px] border border-dashed border-white/10 bg-black/20 p-5 text-sm leading-6 text-white/42">
          {empty}
        </div>
      )}
      {items.map((item: any) => (
        <div key={item.id || item.created_at || item.input} className="rounded-[20px] border border-white/10 bg-black/24 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">{item.tool_name || 'workspace item'}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/72">{item.input || item.output || 'Saved creator workflow'}</p>
              {item.created_at && <p className="mt-2 text-xs text-white/32">{new Date(item.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>}
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/45">
              {item.credits_spent || 0} credits
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
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
  const creditsUsed = Math.max(0, creditsTotal - creditsRemaining);
  const creditPercent = creditsTotal ? Math.min(100, Math.round((creditsRemaining / creditsTotal) * 100)) : 0;
  const analysesLeft = Math.floor(creditsRemaining / 5);
  const checkoutSuccess = searchParams?.checkout === 'success';
  const isPaid = plan !== 'free' && creditsTotal > 5;
  const lastActivity = data.workspace.lastGenerationAt ? new Date(data.workspace.lastGenerationAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No activity yet';

  return (
    <main className="min-h-screen bg-[#030507] px-5 py-10 text-white md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        {checkoutSuccess && (
          <section className="mb-6 overflow-hidden rounded-[34px] border border-cyan-300/25 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.18),transparent_28%),linear-gradient(135deg,rgba(34,211,238,.08),rgba(124,58,237,.08))] p-7 shadow-[0_28px_100px_rgba(34,211,238,.12)] md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">Checkout complete</p>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.06em]">Welcome to HookSignals {plan !== 'free' ? plan : ''}.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/62">
              Your payment is being connected to this account. Credits usually appear after Paddle confirms the webhook. If the count has not updated yet, refresh this dashboard in a minute.
            </p>
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[36px] border border-white/10 bg-white/[0.035] p-7 md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">HookSignals workspace</p>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] md:text-6xl">Welcome{fullName ? `, ${fullName.split(' ')[0]}` : ''}.</h1>
            <p className="mt-5 leading-8 text-white/55">
              Your creator workflow, credits and saved analyses live here. Start with a hook, then move through title, thumbnail and script packaging.
            </p>

            <div className="mt-7 rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-200">Current plan</p>
                  <p className="mt-2 text-3xl font-black capitalize">{plan}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.12em] text-white/55">{status}</span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/30">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400" style={{ width: `${creditPercent}%` }} />
              </div>
              <p className="mt-3 text-sm text-white/55">{creditsRemaining} of {creditsTotal} credits remaining. About {analysesLeft} hook analyses left.</p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a href="/hook-analyzer" className="rounded-2xl bg-white px-5 py-4 text-center text-sm font-black text-black">Analyze hook</a>
              <a href="/pricing" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center text-sm font-black text-white">Manage plan</a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[28px] border border-white/10 bg-black/24 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/38">Credits</p>
              <p className="mt-4 text-4xl font-black">{creditsRemaining}</p>
              <p className="mt-3 leading-7 text-white/48">{creditsUsed} used / {creditsTotal} total</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-black/24 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/38">Analyses left</p>
              <p className="mt-4 text-4xl font-black">{analysesLeft}</p>
              <p className="mt-3 leading-7 text-white/48">Based on 5 credits each</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-black/24 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/38">Last activity</p>
              <p className="mt-4 text-2xl font-black">{lastActivity}</p>
              <p className="mt-3 leading-7 text-white/48">Most recent saved output</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-black/24 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/38">Credits spent</p>
              <p className="mt-4 text-4xl font-black">{data.workspace.creditsSpent}</p>
              <p className="mt-3 leading-7 text-white/48">Tracked usage</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Saved history</p>
            <h2 className="mt-3 text-2xl font-black">Every premium run is stored.</h2>
            <p className="mt-2 text-sm leading-6 text-white/52">Review hooks, titles, scripts and packaging checks from one workspace.</p>
          </div>
          <div className="rounded-[28px] border border-violet-300/20 bg-violet-300/[0.05] p-5">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-200">Credit clarity</p>
            <h2 className="mt-3 text-2xl font-black">No hidden usage.</h2>
            <p className="mt-2 text-sm leading-6 text-white/52">The dashboard shows remaining credits, credits spent and estimated analyses left.</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/38">Workflow path</p>
            <h2 className="mt-3 text-2xl font-black">Hook → title → thumbnail.</h2>
            <p className="mt-2 text-sm leading-6 text-white/52">Move from a single first line to a complete publish-ready package.</p>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-[26px] border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Hooks</p>
            <p className="mt-3 text-4xl font-black">{data.workspace.hookCount}</p>
          </div>
          <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-white/38">Titles</p>
            <p className="mt-3 text-4xl font-black">{data.workspace.titleCount}</p>
          </div>
          <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-white/38">Scripts</p>
            <p className="mt-3 text-4xl font-black">{data.workspace.scriptCount}</p>
          </div>
          <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-white/38">Thumbnails</p>
            <p className="mt-3 text-4xl font-black">{data.workspace.thumbnailCount}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Recent hooks</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Hook analysis history</h2>
              </div>
              <a href="/hook-analyzer" className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-white">New</a>
            </div>
            <ActivityList items={data.groups.hookAnalyses} empty="No hook analyses saved yet. Run your first premium hook analysis to build history." />
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Saved titles</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Title ideas</h2>
              </div>
              <a href="/youtube-title-generator" className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-white">Generate</a>
            </div>
            <ActivityList items={data.groups.titleGenerations} empty="No saved titles yet. Generate titles after analyzing a hook." />
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Script drafts</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Saved scripts</h2>
              </div>
              <a href="/shorts-script-generator" className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-white">Write</a>
            </div>
            <ActivityList items={data.groups.scriptGenerations} empty="No saved scripts yet. Build a script opener from a stronger hook." />
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Thumbnail reviews</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Packaging checks</h2>
              </div>
              <a href="/thumbnail-text-checker" className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-white">Check</a>
            </div>
            <ActivityList items={data.groups.thumbnailChecks} empty="No thumbnail checks yet. Pair your hook with a readable visual promise." />
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[34px] border border-white/10 bg-black/24 p-6 md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Full activity stream</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Recent creator generations</h2>
            <ActivityList items={data.generations.slice(0, 8)} empty="No saved workflow activity yet." />
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Billing</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Plan and credits</h2>
            <p className="mt-4 leading-8 text-white/55">Plan and credit data sync through Paddle checkout and webhook events. Your current usable balance is shown above.</p>
            <div className="mt-6 grid gap-3">
              <a href="/pricing" className="rounded-2xl bg-white px-5 py-4 text-center text-sm font-black text-black">Upgrade or manage plan</a>
              <a href="/hook-analyzer" className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center text-sm font-black text-white">Use credits now</a>
            </div>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-black/24 p-5">
              <p className="text-sm font-black text-white">Credit estimate</p>
              <p className="mt-2 text-sm leading-6 text-white/50">{creditsRemaining} credits = about {analysesLeft} hook analyses at 5 credits each.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
