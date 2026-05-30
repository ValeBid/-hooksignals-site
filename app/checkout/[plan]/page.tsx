"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";

const paddleToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

const plans: Record<string, {
  name: string;
  label: string;
  price: string;
  cadence: string;
  priceId: string;
  credits: string;
  analyses: string;
  bestFor: string;
  trial?: string;
  features: string[];
}> = {
  starter: {
    name: "Starter",
    label: "HookSignals Starter",
    price: "$10",
    cadence: "one-time",
    priceId: "pri_01ksqr6vp07e48ktwm6x5jzw1y",
    credits: "250 credits",
    analyses: "about 50 hook analyses",
    bestFor: "Testing HookSignals before moving into a weekly workflow.",
    features: ["250 credits included", "Premium hook analysis", "Title and thumbnail previews", "Saved workspace history", "Secure Paddle checkout"],
  },
  pro: {
    name: "Creator Pro",
    label: "HookSignals Pro",
    price: "$20",
    cadence: "per month",
    priceId: "pri_01ksnnbh8fc2452se12nr37tmz",
    credits: "2,000 monthly credits",
    analyses: "about 400 hook analyses/month",
    bestFor: "Solo creators publishing every week and checking hooks before posting.",
    trial: "7-day free trial if enabled on your Paddle price",
    features: ["2,000 monthly credits", "Premium hook analysis", "More hook variants", "Title pairings + thumbnail angles", "Saved creator history", "Cancel anytime"],
  },
  elite: {
    name: "Elite",
    label: "HookSignals Elite",
    price: "$50",
    cadence: "per month",
    priceId: "pri_01ksnn757pd4582jcvn8g0g165",
    credits: "10,000 monthly credits",
    analyses: "about 2,000 hook analyses/month",
    bestFor: "Teams, editors, agencies and high-output creators.",
    trial: "7-day free trial if enabled on your Paddle price",
    features: ["10,000 monthly credits", "Team-ready workflows", "Batch content analysis", "Creator dashboards", "Priority analysis", "Cancel anytime"],
  },
};

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
        settings?: {
          displayMode?: "inline" | "overlay";
          theme?: "light" | "dark";
          locale?: string;
          frameTarget?: string;
          frameInitialHeight?: number;
          frameStyle?: string;
          successUrl?: string;
        };
      }) => void;
    };
  };
};

function getPaddleWindow() {
  return window as PaddleWindow;
}

const paddleEnv = process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? "sandbox" : "production";

function loadPaddle(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!paddleToken) return Promise.reject(new Error("NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is not configured"));

  const paddleWindow = getPaddleWindow();

  if (paddleWindow.Paddle) {
    paddleWindow.Paddle.Environment?.set(paddleEnv);
    paddleWindow.Paddle.Initialize({ token: paddleToken });
    return Promise.resolve();
  }

  if (paddleLoadingPromise) return paddleLoadingPromise;

  paddleLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      const loadedWindow = getPaddleWindow();
      loadedWindow.Paddle?.Environment?.set(paddleEnv);
      loadedWindow.Paddle?.Initialize({ token: paddleToken! });
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });

  return paddleLoadingPromise;
}

export default function CheckoutPage() {
  const params = useParams<{ plan: string }>();
  const { isLoaded, isSignedIn, user } = useUser();
  const [status, setStatus] = useState("Preparing secure checkout...");
  const [failed, setFailed] = useState(false);
  const plan = useMemo(() => plans[String(params?.plan || "").toLowerCase()], [params?.plan]);

  useEffect(() => {
    if (!isLoaded || !plan) return;

    if (!isSignedIn || !user) {
      window.location.href = `/sign-up?redirect_url=${encodeURIComponent(`/checkout/${params.plan}`)}`;
      return;
    }

    async function openInlineCheckout() {
      try {
        setStatus("Loading secure Paddle checkout...");
        await loadPaddle();
        setStatus("Secure checkout ready.");
        getPaddleWindow().Paddle?.Checkout.open({
          items: [{ priceId: plan.priceId, quantity: 1 }],
          customer: { email: user?.primaryEmailAddress?.emailAddress || undefined },
          customData: {
            clerk_user_id: user?.id || "",
            email: user?.primaryEmailAddress?.emailAddress || "",
            plan: plan.name,
          },
          settings: {
            displayMode: "inline",
            theme: "dark",
            locale: "en",
            frameTarget: "paddle-checkout-frame",
            frameInitialHeight: 520,
            frameStyle: "width:100%; min-width:312px; background-color:transparent; border:none;",
            successUrl: `${window.location.origin}/dashboard?checkout=success`,
          },
        });
      } catch {
        setFailed(true);
        setStatus("Checkout could not load. Use the secure fallback below.");
      }
    }

    openInlineCheckout();
  }, [isLoaded, isSignedIn, user, plan, params?.plan]);

  if (!plan) {
    return (
      <main className="min-h-screen bg-[#030507] px-5 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-[34px] border border-white/10 bg-white/[0.035] p-8">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-red-300">Plan not found</p>
          <h1 className="mt-4 text-4xl font-black">Choose a valid HookSignals plan.</h1>
          <Link href="/pricing" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">Back to pricing</Link>
        </div>
      </main>
    );
  }

  if (!paddleToken) {
    return (
      <main className="min-h-screen bg-[#030507] px-5 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-[34px] border border-red-400/20 bg-red-400/[0.06] p-8">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-red-300">Checkout unavailable</p>
          <h1 className="mt-4 text-3xl font-black">Checkout is not configured.</h1>
          <p className="mt-4 text-white/60">Please contact support at support@hooksignals.com to complete your purchase.</p>
          <Link href="/pricing" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">Back to pricing</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030507] px-5 py-10 text-white md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/pricing" className="text-sm font-black text-white/55 transition hover:text-white">← Pricing</Link>
          <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-200">Secure checkout by Paddle</div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-[38px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.14),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.025))] p-7 shadow-[0_30px_120px_rgba(0,0,0,.42)] md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">{plan.label}</p>
            <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] md:text-6xl">Start with a cleaner creator workflow.</h1>
            <p className="mt-5 text-lg leading-8 text-white/60">{plan.bestFor}</p>

            <div className="mt-8 rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-200">Today</p>
                  <p className="mt-2 text-5xl font-black">{plan.price}</p>
                  <p className="mt-2 text-sm text-white/48">{plan.cadence}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-right">
                  <p className="text-sm font-black text-white">{plan.credits}</p>
                  <p className="mt-1 text-xs text-white/42">{plan.analyses}</p>
                </div>
              </div>
              {plan.trial && <p className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm text-emerald-100">{plan.trial}. Cancel anytime.</p>}
            </div>

            <div className="mt-7 grid gap-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/22 p-4 text-sm text-white/72">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-300/10 text-xs text-cyan-200">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><p className="text-sm font-black text-white">Private</p><p className="mt-1 text-xs leading-5 text-white/42">Results stay in your workspace.</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><p className="text-sm font-black text-white">No hidden runs</p><p className="mt-1 text-xs leading-5 text-white/42">Credit usage stays visible.</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><p className="text-sm font-black text-white">Cancel anytime</p><p className="mt-1 text-xs leading-5 text-white/42">Manage your plan anytime.</p></div>
            </div>
          </div>

          <div className="rounded-[38px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_30px_120px_rgba(0,0,0,.42)] md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Payment</p>
                <p className="mt-1 text-sm text-white/48">{status}</p>
              </div>
              <p className="rounded-full border border-white/10 bg-black/24 px-3 py-1 text-xs text-white/45">English · Dark checkout</p>
            </div>
            <div id="paddle-checkout-frame" className="min-h-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-[#07101d] p-1" />
            {failed && (
              <button
                type="button"
                onClick={async () => {
                  await loadPaddle();
                  getPaddleWindow().Paddle?.Checkout.open({
                    items: [{ priceId: plan.priceId, quantity: 1 }],
                    customer: { email: user?.primaryEmailAddress?.emailAddress || undefined },
                    customData: { clerk_user_id: user?.id || "", email: user?.primaryEmailAddress?.emailAddress || "", plan: plan.name },
                    settings: { theme: "dark", locale: "en", successUrl: `${window.location.origin}/dashboard?checkout=success` },
                  });
                }}
                className="mt-4 w-full rounded-2xl bg-white px-5 py-4 text-sm font-black text-black"
              >
                Open secure fallback checkout
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
