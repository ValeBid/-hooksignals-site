import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { bootstrapUserProfile, getDashboardDataForUser } from '../lib/dashboard-data';

export const metadata = {
  title: 'Dashboard | HookSignals',
  description: 'Manage HookSignals creator credits, workflows and subscription status.',
};

type DashboardPageProps = {
  searchParams?: { checkout?: string };
};

type GenerationItem = {
  id?: string;
  created_at?: string;
  tool_name?: string;
  input?: string;
  output?: string;
  credits_spent?: number;
};

// ─── Credit donut (SVG) ───────────────────────────────────────────────────────
function CreditDonut({
  remaining,
  total,
  percent,
}: {
  remaining: number;
  total: number;
  percent: number;
}) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const filled = (percent / 100) * circ;
  const ringColor = percent > 60 ? '#22d3ee' : percent > 25 ? '#fbbf24' : '#f87171';

  return (
    <div className="relative flex items-center justify-center">
      <svg width={128} height={128} viewBox="0 0 128 128" className="-rotate-90">
        <circle
          cx={64} cy={64} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={12}
        />
        <circle
          cx={64} cy={64} r={r}
          fill="none"
          stroke={ringColor}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ - filled}`}
          style={{ filter: `drop-shadow(0 0 6px ${ringColor}55)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-2xl font-black text-white">{remaining.toLocaleString()}</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/38">left</p>
      </div>
    </div>
  );
}

// ─── Tool color coding ────────────────────────────────────────────────────────
function toolMeta(toolName: string): { dot: string; label: string } {
  const n = toolName.toLowerCase();
  if (n.includes('hook') && n.includes('analyz')) return { dot: 'bg-cyan-400', label: 'Hook analysis' };
  if (n.includes('hook')) return { dot: 'bg-sky-400', label: 'Hook workflow' };
  if (n.includes('title')) return { dot: 'bg-violet-400', label: 'Title generation' };
  if (n.includes('script')) return { dot: 'bg-purple-400', label: 'Script' };
  if (n.includes('thumbnail')) return { dot: 'bg-amber-400', label: 'Thumbnail check' };
  return { dot: 'bg-white/30', label: toolName };
}

// ─── Activity list ────────────────────────────────────────────────────────────
function ActivityList({
  items,
  empty,
}: {
  items: GenerationItem[];
  empty: string;
}) {
  if (items.length === 0) {
    return (
      <div className="mt-4 rounded-[20px] border border-dashed border-white/10 bg-black/20 p-5 text-sm leading-6 text-white/38">
        {empty}
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-2">
      {items.map((item) => {
        const meta = toolMeta(item.tool_name ?? '');
        const preview = (item.input || item.output || '').slice(0, 120);
        const date = item.created_at
          ? new Date(item.created_at).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : null;

        return (
          <div
            key={item.id ?? item.created_at ?? item.input}
            className="flex items-start gap-3 rounded-[20px] border border-white/[0.07] bg-black/24 p-4 transition hover:border-white/12"
          >
            <span className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${meta.dot}`} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-white/45">
                  {meta.label}
                </p>
                {date && (
                  <p className="text-xs text-white/28">{date}</p>
                )}
              </div>
              {preview && (
                <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-white/65">
                  {preview}
                </p>
              )}
            </div>
            {(item.credits_spent ?? 0) > 0 && (
              <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs text-white/38">
                {item.credits_spent}cr
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-[26px] border p-5 ${
        accent
          ? 'border-cyan-300/20 bg-cyan-300/[0.055]'
          : 'border-white/10 bg-black/24'
      }`}
    >
      <p className={`text-xs font-black uppercase tracking-[0.14em] ${accent ? 'text-cyan-300' : 'text-white/38'}`}>
        {label}
      </p>
      <p className="mt-3 text-4xl font-black text-white">{value}</p>
      {sub && <p className="mt-2 text-xs leading-5 text-white/42">{sub}</p>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const user = await currentUser();
  if (!user) redirect('/sign-in?redirect_url=/dashboard');

  const email = user.emailAddresses?.[0]?.emailAddress ?? null;
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || null;
  const firstName = user.firstName ?? null;

  await bootstrapUserProfile({
    clerkUserId: user.id,
    email,
    fullName,
    avatarUrl: user.imageUrl ?? null,
  });

  const data = await getDashboardDataForUser(user.id);

  const plan = data.subscription?.plan ?? data.credits?.plan ?? 'free';
  const status = data.subscription?.status ?? 'inactive';
  const creditsTotal = data.credits?.credits_total ?? 0;
  const creditsRemaining = data.credits?.credits_remaining ?? 0;
  const creditsUsed = Math.max(0, creditsTotal - creditsRemaining);
  const creditPercent = creditsTotal
    ? Math.min(100, Math.round((creditsRemaining / creditsTotal) * 100))
    : 0;
  const analysesLeft = Math.floor(creditsRemaining / 5);
  const checkoutSuccess = searchParams?.checkout === 'success';
  const lastActivity = data.workspace.lastGenerationAt
    ? new Date(data.workspace.lastGenerationAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : '—';

  return (
    <main className="min-h-screen bg-[#030507] px-5 py-10 text-white md:px-8 md:py-14">
      <div className="mx-auto max-w-5xl">

        {/* Checkout success banner */}
        {checkoutSuccess && (
          <section className="mb-6 overflow-hidden rounded-[34px] border border-cyan-300/25 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.18),transparent_28%),linear-gradient(135deg,rgba(34,211,238,.08),rgba(124,58,237,.08))] p-7 shadow-[0_28px_100px_rgba(34,211,238,.12)]">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">Checkout complete</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.06em]">
              Welcome to HookSignals{plan !== 'free' ? ` ${plan}` : ''}.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
              Credits usually appear within a minute after payment confirms. If the count has not updated, refresh this page.
            </p>
          </section>
        )}

        {/* ── Hero: credits + primary action ─────────────────────────── */}
        <section className="rounded-[36px] border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">

            {/* Credit ring */}
            <div className="flex items-center gap-6 shrink-0">
              <CreditDonut remaining={creditsRemaining} total={creditsTotal} percent={creditPercent} />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Current plan</p>
                <p className="mt-1.5 text-2xl font-black capitalize">{plan}</p>
                <span className="mt-1 inline-block rounded-full border border-white/10 bg-black/24 px-2.5 py-0.5 text-xs uppercase tracking-[0.1em] text-white/45">
                  {status}
                </span>
                <p className="mt-2.5 text-xs leading-5 text-white/45">
                  {creditsRemaining.toLocaleString()} of {creditsTotal.toLocaleString()} credits<br />
                  ~{analysesLeft} hook {analysesLeft === 1 ? 'analysis' : 'analyses'} remaining
                </p>
              </div>
            </div>

            {/* Welcome + actions */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-white/38">HookSignals workspace</p>
              <h1 className="mt-2 text-3xl font-black tracking-[-0.05em] md:text-4xl">
                {firstName ? `Welcome, ${firstName}.` : 'Creator workspace.'}
              </h1>
              <p className="mt-2 text-sm leading-6 text-white/48">
                Your credits, saved analyses and creator workflow live here.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href="/hook-analyzer"
                  className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-6 py-3 text-sm font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.18)] transition hover:scale-[1.01]"
                >
                  Analyze hook →
                </a>
                <a
                  href="/youtube-video-analyzer"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-black text-white transition hover:bg-white/[0.07]"
                >
                  Analyze YouTube video
                </a>
                <a
                  href="/pricing"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-black text-white/60 transition hover:bg-white/[0.07]"
                >
                  Manage plan
                </a>
              </div>
            </div>
          </div>

          {/* Compact workspace stats */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-5">
            {[
              { label: 'Hook analyses', value: data.workspace.hookCount },
              { label: 'Last activity', value: lastActivity },
              { label: 'Credits spent', value: data.workspace.creditsSpent },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-[20px] border border-white/[0.07] bg-black/24 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-white/35">{label}</p>
                <p className="mt-2 text-2xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Activity + tools ───────────────────────────────────────── */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.6fr]">

          {/* Hook analysis history — primary */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.025] p-6 md:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Hook analyses</p>
                <h2 className="mt-1.5 text-xl font-black tracking-tight">Analysis history</h2>
              </div>
              <a href="/hook-analyzer" className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-white transition hover:bg-white/[0.07]">
                New →
              </a>
            </div>
            <ActivityList
              items={data.groups.hookAnalyses}
              empty="No hook analyses saved yet. Run your first analysis to build history."
            />
          </div>

          {/* Quick tools */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.025] p-6 md:p-7">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Tools</p>
            <h2 className="mt-1.5 text-xl font-black tracking-tight">Quick access</h2>
            <div className="mt-4 grid gap-2">
              {[
                ['/hook-analyzer', 'Hook Analyzer', 'Score your opening line'],
                ['/hook-improver', 'Hook Improver', 'Rewrite weak hooks'],
                ['/youtube-video-analyzer', 'YouTube Analyzer', 'Analyze any video'],
                ['/youtube-title-generator', 'Title Generator', 'Build click intent'],
                ['/shorts-script-generator', 'Script Builder', 'Hook to CTA'],
                ['/thumbnail-text-checker', 'Thumbnail Check', 'Mobile readability'],
              ].map(([href, label, desc]) => (
                <a
                  key={href as string}
                  href={href as string}
                  className="flex items-center justify-between rounded-[18px] border border-white/[0.07] bg-black/24 px-4 py-3 transition hover:border-cyan-300/20 hover:bg-cyan-300/[0.04]"
                >
                  <div>
                    <p className="text-sm font-black text-white">{label as string}</p>
                    <p className="text-xs text-white/38">{desc as string}</p>
                  </div>
                  <span className="text-xs text-cyan-300/60">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Recent activity ────────────────────────────────────────── */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.6fr]">
          <div className="rounded-[32px] border border-white/10 bg-black/22 p-6 md:p-7">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">All activity</p>
            <h2 className="mt-1.5 text-xl font-black tracking-tight">Recent workflow</h2>
            <ActivityList
              items={(data.generations as GenerationItem[]).slice(0, 8)}
              empty="No saved workflow activity yet."
            />
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.025] p-6 md:p-7">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Billing</p>
            <h2 className="mt-1.5 text-xl font-black tracking-tight">Plan</h2>
            <p className="mt-3 text-sm leading-6 text-white/48">
              Credit balance syncs after checkout. Current balance is shown above.
            </p>
            <div className="mt-4 grid gap-2">
              <a
                href="/pricing"
                className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-black transition hover:bg-white/90"
              >
                Upgrade or manage plan
              </a>
              <a
                href="/hook-analyzer"
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/[0.07]"
              >
                Use credits now
              </a>
            </div>
            <div className="mt-4 rounded-[20px] border border-white/10 bg-black/24 p-4 text-sm text-white/50 leading-6">
              {creditsRemaining} credits ≈ {analysesLeft} hook {analysesLeft === 1 ? 'analysis' : 'analyses'} at 5 credits each.
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
