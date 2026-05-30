import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getDashboardDataForUser } from '../lib/dashboard-data';

export const metadata = {
  title: 'Billing | HookSignals',
  description: 'Manage your HookSignals billing and subscription.',
};

const PADDLE_PORTAL_URL = 'https://customer.paddle.com/';

const planDetails = {
  free:    { label: 'Free',         credits: 5,     price: '$0',  cadence: '' },
  starter: { label: 'Starter Pack', credits: 250,   price: '$10', cadence: 'one-time' },
  pro:     { label: 'Creator Pro',  credits: 2000,  price: '$20', cadence: '/month' },
  elite:   { label: 'Elite',        credits: 10000, price: '$50', cadence: '/month' },
};

export default async function BillingPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const data = await getDashboardDataForUser(user.id);
  const plan = (data.credits?.plan ?? data.subscription?.plan ?? 'free') as keyof typeof planDetails;
  const status = data.subscription?.status ?? 'inactive';
  const creditsRemaining = data.credits?.credits_remaining ?? 0;
  const creditsTotal = data.credits?.credits_total ?? 0;
  const paddleCustomerId = data.subscription?.paddle_customer_id ?? null;

  const detail = planDetails[plan] ?? planDetails.free;

  return (
    <main className="min-h-screen bg-[#030507] px-5 py-14 text-white md:px-8 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Billing</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">Plan and billing.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/55">
            Manage your HookSignals subscription and payment details through the Paddle customer portal.
          </p>
        </div>

        {/* Current plan card */}
        <div className="rounded-[36px] border border-cyan-300/20 bg-cyan-300/[0.05] p-6 md:p-9">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Current plan</p>
              <h2 className="mt-2 text-3xl font-black capitalize">{detail.label}</h2>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-xl font-black text-white">{detail.price}</span>
                {detail.cadence && <span className="text-sm text-white/45">{detail.cadence}</span>}
                <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.1em] ${
                  status === 'active' ? 'border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-200' :
                  status === 'past_due' ? 'border-amber-300/25 bg-amber-300/[0.08] text-amber-200' :
                  'border-white/10 bg-white/[0.04] text-white/45'
                }`}>
                  {status}
                </span>
              </div>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-black/28 px-6 py-4 text-right">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-white/38">Credits remaining</p>
              <p className="mt-1 text-3xl font-black text-white">{creditsRemaining.toLocaleString()}</p>
              <p className="mt-0.5 text-xs text-white/38">of {creditsTotal.toLocaleString()} total</p>
            </div>
          </div>

          {status === 'past_due' && (
            <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/[0.08] p-4">
              <p className="text-sm font-black text-amber-200">⚠ Payment overdue</p>
              <p className="mt-1 text-sm text-white/60">
                Your last payment failed. Update your payment method in the billing portal to restore full access.
              </p>
            </div>
          )}
        </div>

        {/* Billing portal CTA */}
        <div className="mt-5 rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-white/38">Manage subscription</p>
          <h2 className="mt-3 text-2xl font-black">
            {plan === 'free' ? 'Upgrade your plan.' : 'Update payment, invoices or cancel.'}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/52">
            {plan === 'free'
              ? 'Choose a HookSignals plan to unlock full hook analysis, title and thumbnail insights and saved creator workflows.'
              : 'Invoices, payment method updates and subscription cancellation are managed through the Paddle customer portal.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {plan === 'free' ? (
              <a
                href="/pricing"
                className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-6 py-3.5 text-sm font-black text-black transition hover:scale-[1.01]"
              >
                View plans →
              </a>
            ) : (
              <>
                <a
                  href={paddleCustomerId
                    ? `${PADDLE_PORTAL_URL}?customerIds=${paddleCustomerId}`
                    : PADDLE_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-black transition hover:bg-white/90"
                >
                  Open billing portal →
                </a>
                <a
                  href="/pricing"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-black text-white transition hover:bg-white/[0.07]"
                >
                  Upgrade plan
                </a>
              </>
            )}
          </div>
        </div>

        {/* Plan comparison */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { name: 'Starter', price: '$10', cadence: 'one-time', credits: '250', note: 'One-time pack', planKey: 'starter' },
            { name: 'Creator Pro', price: '$20', cadence: '/month', credits: '2,000', note: 'Monthly', planKey: 'pro' },
            { name: 'Elite', price: '$50', cadence: '/month', credits: '10,000', note: 'High-volume', planKey: 'elite' },
          ].map((p) => (
            <div
              key={p.planKey}
              className={`rounded-[26px] border p-5 ${
                plan === p.planKey
                  ? 'border-cyan-300/30 bg-cyan-300/[0.07]'
                  : 'border-white/10 bg-black/22'
              }`}
            >
              {plan === p.planKey && (
                <span className="mb-3 inline-block rounded-full border border-cyan-300/25 bg-cyan-300/[0.09] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-200">
                  Current
                </span>
              )}
              <p className="text-lg font-black text-white">{p.name}</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-3xl font-black">{p.price}</span>
                <span className="mb-1 text-sm text-white/38">{p.cadence}</span>
              </div>
              <p className="mt-2 text-sm text-white/52">{p.credits} credits</p>
              <p className="mt-1 text-xs text-white/30">{p.note}</p>
            </div>
          ))}
        </div>

        {/* Support */}
        <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="text-sm font-black text-white">Questions about your billing?</p>
          <p className="mt-1 text-sm text-white/50">Contact support for invoice requests, refunds or account issues.</p>
          <a
            href="mailto:support@hooksignals.com"
            className="mt-4 inline-flex rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white transition hover:bg-white/[0.07]"
          >
            support@hooksignals.com
          </a>
        </div>
      </div>
    </main>
  );
}
