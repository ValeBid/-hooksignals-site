"use client";

import { useUser } from "@clerk/nextjs";

const paddleToken = "live_af5c9cec32aec5fc5c8f8c35773";
const starterPriceId = "pri_01ksqr6vp07e48ktwm6x5jzw1y";
const proPriceId = "pri_01ksnnbh8fc2452se12nr37tmz";
const elitePriceId = "pri_01ksnn757pd4582jcvn8g0g165";

let paddleLoadingPromise: Promise<void> | null = null;

type PaddleWindow = Window & {
  Paddle?: {
    Environment?: { set: (environment: "sandbox" | "production") => void };
    Initialize: (options: { token: string }) => void;
    Checkout: {
      open: (options: {
        items: Array<{ priceId: string; quantity: number }>;
        customer?: { email?: string };
        customData?: Record<string, string>;
        settings?: { successUrl?: string };
      }) => void;
    };
  };
};

function getPaddleWindow() {
  return window as PaddleWindow;
}

function loadPaddle() {
  if (typeof window === "undefined") return Promise.resolve();

  const paddleWindow = getPaddleWindow();

  if (paddleWindow.Paddle) {
    paddleWindow.Paddle.Environment?.set("production");
    paddleWindow.Paddle.Initialize({ token: paddleToken });
    return Promise.resolve();
  }

  if (paddleLoadingPromise) return paddleLoadingPromise;

  paddleLoadingPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://cdn.paddle.com/paddle/v2/paddle.js"]');

    if (existing) {
      existing.addEventListener("load", () => {
        const loadedWindow = getPaddleWindow();
        loadedWindow.Paddle?.Environment?.set("production");
        loadedWindow.Paddle?.Initialize({ token: paddleToken });
        resolve();
      });
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      const loadedWindow = getPaddleWindow();
      loadedWindow.Paddle?.Environment?.set("production");
      loadedWindow.Paddle?.Initialize({ token: paddleToken });
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });

  return paddleLoadingPromise;
}

const plans = [
  {
    name: "Starter",
    price: "$10",
    cadence: "/pack",
    desc: "A one-time pack for testing HookSignals with real hooks before moving into a weekly workflow.",
    fit: "Best for validating upcoming videos without a subscription.",
    features: ["250 credits included", "Free-level hook diagnosis", "Basic hook rewrites", "Title and thumbnail preview"],
    cta: "Buy Starter Pack",
    priceId: starterPriceId,
    premium: false,
    note: "One-time pack",
  },
  {
    name: "Creator Pro",
    price: "$20",
    cadence: "/month",
    desc: "The main plan for creators who want deeper pre-publish decisions before every upload.",
    fit: "Best for solo creators publishing every week.",
    features: ["2,000 monthly credits", "Premium hook analysis", "More hook variants", "Title pairings + thumbnail angles", "Saved creator history"],
    cta: "Start Creator Pro",
    priceId: proPriceId,
    premium: true,
    note: "Best first upgrade",
  },
  {
    name: "Elite",
    price: "$50",
    cadence: "/month",
    desc: "A heavier workflow tier for teams, agencies and high-output creators managing multiple content ideas.",
    fit: "Best for teams, editors and high-output creators.",
    features: ["10,000 monthly credits", "Team-ready workflows", "Batch content analysis", "Creator dashboards", "Priority support"],
    cta: "Start Elite",
    priceId: elitePriceId,
    premium: false,
    note: "For teams",
  },
];

export default function PricingPreview() {
  const { isLoaded, isSignedIn, user } = useUser();

  async function openCheckout(priceId: string) {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      window.location.href = `/sign-up?redirect_url=${encodeURIComponent('/pricing')}`;
      return;
    }

    try {
      await loadPaddle();
      getPaddleWindow().Paddle?.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: { email: user.primaryEmailAddress?.emailAddress || undefined },
        customData: {
          clerk_user_id: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
        },
        settings: {
          successUrl: `${window.location.origin}/dashboard?checkout=success`,
        },
      });
    } catch {
      window.location.href = "mailto:support@hooksignals.com?subject=HookSignals%20Checkout";
    }
  }

  return (
    <section className="mt-14" id="pricing">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.025] p-6 shadow-[0_24px_80px_rgba(0,0,0,.30)] md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">Creator pricing</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] md:text-5xl">Start small. Upgrade when the workflow saves real publishing time.</h2>
            <p className="mt-5 text-lg leading-8 text-white/55">Create an account first, then checkout. Credits are attached to your HookSignals dashboard after payment.</p>
          </div>
          <div className="max-w-sm rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.055] px-5 py-4 text-sm leading-6 text-white/62">
            Secure checkout by Paddle. After payment, return to your dashboard to see plan, credits and saved workflow history.
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
                onClick={() => openCheckout(plan.priceId)}
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
          <p>✓ Credits connect to your dashboard</p>
        </div>
      </div>
    </section>
  );
}
