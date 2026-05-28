"use client";

declare global {
  interface Window {
    Paddle?: {
      Initialize: (config: { token: string }) => void;
      Checkout: {
        open: (config: { items: { priceId: string; quantity: number }[] }) => void;
      };
    };
  }
}

const paddleToken = "live_af5c9cec32aec5fc5c8f8c35773";
const elitePriceId = "pri_01ksnn757pd4582jcvn8g0g165";

let paddleLoadingPromise: Promise<void> | null = null;

function loadPaddle() {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.Paddle) {
    window.Paddle.Initialize({ token: paddleToken });
    return Promise.resolve();
  }

  if (paddleLoadingPromise) return paddleLoadingPromise;

  paddleLoadingPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://cdn.paddle.com/paddle/v2/paddle.js"]');

    if (existing) {
      existing.addEventListener("load", () => {
        window.Paddle?.Initialize({ token: paddleToken });
        resolve();
      });
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      window.Paddle?.Initialize({ token: paddleToken });
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });

  return paddleLoadingPromise;
}

const plans = [
  {
    name: "Free Tools",
    price: "$0",
    desc: "Use the public creator tools for hooks, scripts and thumbnail optimization.",
    features: ["Hook analysis", "Hook rewriting", "Shorts script drafts", "Thumbnail text checks"],
    cta: "Start Free",
    href: "/tools",
    premium: false,
    checkout: false,
  },
  {
    name: "Creator Pro",
    price: "$19",
    desc: "Advanced creator workflows for faster publishing decisions and stronger retention systems.",
    features: ["Saved workflows", "Advanced retention insights", "Project memory", "Priority creator tools"],
    cta: "Pro setup pending",
    href: "mailto:support@hooksignals.com?subject=HookSignals%20Creator%20Pro",
    premium: true,
    checkout: false,
  },
  {
    name: "Elite",
    price: "$49",
    desc: "Higher-tier creator workflow access for serious publishing systems.",
    features: ["Team workflows", "Creator dashboards", "Publishing systems", "Priority support"],
    cta: "Start Elite",
    href: "/pricing",
    premium: true,
    checkout: true,
  },
];

export default function PricingPreview() {
  async function openEliteCheckout() {
    try {
      await loadPaddle();
      window.Paddle?.Checkout.open({ items: [{ priceId: elitePriceId, quantity: 1 }] });
    } catch {
      window.location.href = "mailto:support@hooksignals.com?subject=HookSignals%20Elite%20Checkout";
    }
  }

  return (
    <section className="mt-14" id="pricing">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Creator pricing</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">Simple plans for modern creator workflows.</h2>
          <p className="mt-5 text-lg leading-8 text-white/55">HookSignals helps creators improve hooks, scripts, thumbnails and publishing decisions before videos go live.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-[30px] border p-7 ${plan.premium ? "border-cyan-300/25 bg-cyan-300/[0.05]" : "border-white/10 bg-black/25"}`}>
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-2xl font-black tracking-tight">{plan.name}</p><p className="mt-3 max-w-sm leading-7 text-white/50">{plan.desc}</p></div>
                {plan.premium && <div className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Pro</div>}
              </div>
              <div className="mt-8 flex items-end gap-2"><span className="text-5xl font-black tracking-[-0.05em]">{plan.price}</span><span className="pb-1 text-white/45">/month</span></div>
              <div className="mt-8 space-y-3">{plan.features.map((feature) => <div key={feature} className="flex items-center gap-3 text-white/70"><div className="h-2 w-2 rounded-full bg-cyan-300" /><span>{feature}</span></div>)}</div>
              {plan.checkout ? (
                <button type="button" onClick={openEliteCheckout} className="mt-8 inline-flex w-full justify-center rounded-2xl bg-white px-6 py-3 font-black text-black transition hover:bg-white/90">{plan.cta}</button>
              ) : (
                <a href={plan.href} className={`mt-8 inline-flex w-full justify-center rounded-2xl px-6 py-3 font-black transition ${plan.premium ? "bg-white text-black hover:bg-white/90" : "border border-white/10 bg-white/[0.04] text-white hover:bg-white/10"}`}>{plan.cta}</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
