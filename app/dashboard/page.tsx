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

        <div className="mt-6 grid gap-5 md:grid-cols-3">
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
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/38">Billing</p>
            <p className="mt-4 text-3xl font-black">Paddle</p>
            <p className="mt-3 leading-7 text-white/50">Subscription persistence is wired through webhook sync.</p>
          </div>
        </div>

        <div className="mt-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
          <h2 className="text-3xl font-black tracking-[-0.04em]">Premium workflow access</h2>
          <p className="mt-4 max-w-3xl leading-8 text-white/55">
            Premium gating uses your plan and credit state stored in Supabase.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="/tools" className="rounded-2xl bg-white px-6 py-4 text-center font-black text-black">Open tools</a>
            <a href="/pricing" className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-center font-black text-white">Upgrade plan</a>
          </div>
        </div>
      </div>
    </main>
  );
}
