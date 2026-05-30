"use client";

import { useUser } from "@clerk/nextjs";
import { trackEvent } from "../lib/analytics";

const plans = [
  {
    name: "Starter",
    price: "$10",
    cadence: "/pack",
    desc: "A one-time pack for testing HookSignals with real hooks before moving into a weekly workflow.",
    fit: "Best for validating upcoming videos without a subscription.",
    features: ["250 credits included", "Premium hook analysis", "Basic hook rewrites", "Title and thumbnail preview", "Saved workspace history"],
    cta: "Buy Starter Pack",
    checkoutPath: "/checkout/starter",
    premium: false,
    note: "One-time pack",
  },
  {
    name: "Creator Pro",
    price: "$20",
    cadence: "/month",
    desc: "The main plan for creators who want deeper pre-publish decisions before every upload.",
    fit: "Best for solo creators publishing every week.",
    features: ["2,000 monthly credits", "Premium hook analysis", "More hook variants", "Title pairings + thumbnail angles", "Saved creator history", "Cancel anytime"],
    cta: "Start Creator Pro",
    checkoutPath: "/checkout/pro",
    premium: true,
    note: "Best first upgrade",
  },
  {
    name: "Elite",
    price: "$50",
    cadence: "/month",
    desc: "A heavier workflow tier for teams, agencies and high-output creators managing multiple content ideas.",
    fit: "Best for teams, editors and high-output creators.",
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
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] md:text-5xl">Start small. Upgrade when the workflow saves real publishing time.</h2>
            <p className="mt-5 text-lg leading-8 text-white/55">Create an account first, then checkout through a branded HookSignals payment screen. Credits attach to your dashboard after payment.</p>
          </div>
          <div className="max-w-sm rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.055] px-5 py-4 text-sm leading-6 text-white/62">
            Branded checkout, secure payment by Paddle, and clear credit usage before you pay.
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
          <p>✓ Account required before checkout</p>
          <p>✓ 250 / 2,000 / 10,000 credit tiers</p>
          <p>✓ Branded checkout before Paddle payment</p>
        </div>
      </div>
    </section>
  );
}
