"use client";

import { useUser } from "@clerk/nextjs";
import { trackEvent } from "../lib/analytics";

const plans = [
  {
    name: "Starter",
    price: "$10",
    cadence: "/pack",
    desc: "Analyze your next 5 videos before they go live. Find the weak signal before your audience decides for you.",
    fit: "Right when you have a specific video to strengthen before publishing.",
    features: ["250 credits included", "Full hook analysis", "Hook rewrites", "Title and thumbnail scoring", "Saved workspace history"],
    cta: "Buy Starter Pack",
    checkoutPath: "/checkout/starter",
    premium: false,
    note: "One-time pack",
  },
  {
    name: "Creator Pro",
    price: "$20",
    cadence: "/month",
    desc: "Pre-publish analysis on every upload. Stop guessing why some videos tank and others take off.",
    fit: "Right for creators publishing weekly who want a repeatable pre-publish system.",
    features: ["2,000 monthly credits", "Full hook analysis", "Multiple hook variants", "Title pairings + thumbnail angles", "Saved creator history", "Cancel anytime"],
    cta: "Start Creator Pro",
    checkoutPath: "/checkout/pro",
    premium: true,
    note: "Most popular",
  },
  {
    name: "Elite",
    price: "$50",
    cadence: "/month",
    desc: "Full team workflow. Batch analyze content ideas before production starts across a content calendar.",
    fit: "Right for editors, agencies and high-output creators managing multiple channels.",
    features: ["10,000 monthly credits", "Team-ready workflows", "Batch content analysis", "Creator dashboards", "Priority support", "Cancel anytime"],
    cta: "Start Elite",
    checkoutPath: "/checkout/elite",
    premium: false,
    note: "For teams",
  },
];

export default function PricingPreview() {
  const { isLoaded, isSignedIn } = useUser();

  function goToCheckout(plan: string, path: string) {
    if (!isLoaded) return;
    trackEvent({ name: "pricing_click", props: { plan, action: isSignedIn ? "checkout" : "sign_up" } });
    if (!isSignedIn) {
      window.location.href = `/sign-up?redirect_url=${encodeURIComponent(path)}`;
      return;
    }
    window.location.href = path;
  }

  return (
    <section className="mt-14" id="pricing">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.025] p-6 shadow-[0_24px_80px_rgba(0,0,0,.30)] md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">Creator pricing</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] md:text-5xl">Start with the free tools. Upgrade when you want analysis on every upload.</h2>
            <p className="mt-5 text-lg leading-8 text-white/55">Free tools run without an account. Paid plans add saved history, more hook variants and deeper packaging analysis — available as soon as you pay.</p>
          </div>
          <div className="max-w-sm rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.055] px-5 py-4 text-sm leading-6 text-white/62">
            Secure checkout via Paddle. Credits appear in your dashboard instantly after payment.
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative overflow-hidden rounded-[30px] border p-7 ${plan.premium ? "border-cyan-300/45 bg-cyan-300/[0.075] shadow-[0_28px_100px_rgba(34,211,238,.16)]" : "border-white/10 bg-black/24"}`}>
              {plan.note && (
                <div className={`mb-6 inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${plan.premium ? "bg-cyan-300 text-black" : "border border-white/10 bg-white/[0.04] text-white/55"}`}>
                  {plan.note}
                </div>
              )}

              <div>
                <p className="text-2xl font-black tracking-tight">{plan.name}</p>
                <p className="mt-3 max-w-sm leading-7 text-white/52">{plan.desc}</p>
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-5xl font-black tracking-[-0.05em]">{plan.price}</span>
                <span className="pb-1 text-white/45">{plan.cadence}</span>
              </div>

              <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white/58">{plan.fit}</p>

              <div className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-white/72">
                    <div className="h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goToCheckout(plan.name, plan.checkoutPath)}
                className={`mt-8 inline-flex w-full justify-center rounded-2xl px-6 py-3 font-black transition ${plan.premium ? "bg-white text-black hover:bg-white/90" : "border border-white/10 bg-white/[0.045] text-white hover:bg-white/10"}`}
              >
                {isSignedIn ? plan.cta : "Create account to buy"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-7 grid gap-3 text-sm text-white/45 md:grid-cols-3">
          <p>✓ Cancel anytime on monthly plans</p>
          <p>✓ Starter pack credits never expire</p>
          <p>✓ Instant access after payment</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12 rounded-[32px] border border-white/10 bg-white/[0.02] p-6 md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Common questions</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">Everything you need to know before upgrading.</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            {
              q: "What is a credit?",
              a: "One credit equals one AI analysis request. A hook analysis costs 5 credits. A YouTube video analysis (which fetches real metadata and runs packaging AI) also costs 5 credits. You can see your credit balance at any time in your dashboard.",
            },
            {
              q: "What is free and what requires credits?",
              a: "The Hook Analyzer, Title Analyzer, Thumbnail Checker and Viral Hook Examples all have a free tier that runs without credits. Saving results, running more than 3 analyses, accessing full AI output and unlocking hook rewrite variants require credits.",
            },
            {
              q: "What happens when I run out of credits?",
              a: "You can still use the free tier of each tool. You will not lose any saved history. To run new paid analyses, purchase a Starter pack or subscribe to a monthly plan — both add credits to your account instantly.",
            },
            {
              q: "Can I cancel my subscription?",
              a: "Yes. Creator Pro and Elite are monthly subscriptions and can be cancelled at any time from your dashboard. You keep access to your remaining credits and saved history until the end of the billing period.",
            },
            {
              q: "Do Starter pack credits expire?",
              a: "No. The $10 Starter pack credits are added to your account and never expire. They are a one-time purchase — not a subscription. You can use them at your own pace.",
            },
            {
              q: "Do monthly credits roll over?",
              a: "Monthly credits (Creator Pro and Elite) reset each billing cycle and do not roll over. If you regularly use fewer credits than your plan includes, the Starter pack may be a better fit.",
            },
            {
              q: "Is there a free trial?",
              a: "There is no time-limited trial, but every account gets 15 free credits on sign-up — enough for 3 full analyses. You can use these to run real analyses on your own hooks and videos before deciding whether to upgrade.",
            },
            {
              q: "What if I want a refund?",
              a: "If you purchased a Starter pack and have not used any credits, contact support@hooksignals.com within 7 days of purchase for a full refund. Monthly subscriptions are billed in advance and are not refunded for partial months, but you can cancel immediately to prevent the next charge.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-[24px] border border-white/10 bg-black/24 p-5">
              <p className="font-black text-white">{q}</p>
              <p className="mt-3 text-sm leading-7 text-white/52">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border border-cyan-300/18 bg-cyan-300/[0.05] p-5">
          <p className="font-black text-white">Still have a question?</p>
          <p className="mt-2 text-sm leading-6 text-white/55">
            Email <a href="mailto:support@hooksignals.com" className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">support@hooksignals.com</a> and we will reply within one business day.
          </p>
        </div>
      </div>
    </section>
  );
}
