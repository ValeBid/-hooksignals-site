"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";

declare global {
  interface Window {
    Paddle?: {
      Environment?: { set: (environment: "sandbox" | "production") => void };
      Initialize: (options: { token: string }) => void;
      Checkout: {
        open: (options: {
          items: Array<{ priceId: string; quantity: number }>;
          customer?: { email?: string };
          customData?: Record<string, string>;
          settings?: { theme?: "light" | "dark"; successUrl?: string };
        }) => void;
      };
    };
  }
}

type PaddleCheckoutButtonProps = {
  priceId?: string;
  planName?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  successUrl?: string;
};

const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
const paddleEnvironment = process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? "sandbox" : "production";

export default function PaddleCheckoutButton({
  priceId,
  planName = "",
  children,
  variant = "primary",
  successUrl,
}: PaddleCheckoutButtonProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const className = useMemo(() => {
    const base = "mt-8 w-full rounded-2xl px-5 py-4 font-bold transition disabled:cursor-not-allowed disabled:opacity-50";
    return variant === "primary"
      ? `${base} bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 text-black hover:scale-[1.01]`
      : `${base} border border-white/10 bg-white/[0.04] text-white hover:bg-white/10`;
  }, [variant]);

  useEffect(() => {
    if (!clientToken) { setError("Checkout is not configured"); return; }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://cdn.paddle.com/paddle/v2/paddle.js"]'
    );

    const initialize = () => {
      if (!window.Paddle) return;
      window.Paddle.Environment?.set(paddleEnvironment);
      window.Paddle.Initialize({ token: clientToken });
      setIsReady(true);
      setError(null);
    };

    if (existingScript) {
      if (window.Paddle) initialize();
      else existingScript.addEventListener("load", initialize, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = initialize;
    script.onerror = () => setError("Checkout failed to load");
    document.body.appendChild(script);
  }, []);

  function openCheckout() {
    if (!priceId) { setError("Price ID missing"); return; }
    if (!window.Paddle || !isReady) { setError("Checkout is loading"); return; }
    if (!isLoaded || !isSignedIn || !user) { setError("Sign in before purchasing"); return; }

    window.Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: { email: user.primaryEmailAddress?.emailAddress },
      // clerk_user_id is required for the webhook to map the payment to an account.
      customData: {
        clerk_user_id: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        plan: planName,
      },
      settings: {
        theme: "dark",
        ...(successUrl ? { successUrl } : {}),
      },
    });
  }

  return (
    <div>
      <button
        className={className}
        disabled={!isReady || !priceId || !isLoaded}
        onClick={openCheckout}
        type="button"
      >
        {!isLoaded ? "Loading…" : children}
      </button>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </div>
  );
}
