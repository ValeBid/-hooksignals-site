"use client";

import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    Paddle?: {
      Environment?: {
        set: (environment: "sandbox" | "production") => void;
      };
      Initialize: (options: { token: string }) => void;
      Checkout: {
        open: (options: { items: Array<{ priceId: string; quantity: number }> }) => void;
      };
    };
  }
}

type PaddleCheckoutButtonProps = {
  priceId?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
const paddleEnvironment = process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? "sandbox" : "production";

export default function PaddleCheckoutButton({
  priceId,
  children,
  variant = "primary",
}: PaddleCheckoutButtonProps) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const className = useMemo(() => {
    const base = "mt-8 w-full rounded-2xl px-5 py-4 font-bold transition disabled:cursor-not-allowed disabled:opacity-50";
    if (variant === "primary") {
      return `${base} bg-emerald-400 text-black hover:bg-emerald-300`;
    }
    return `${base} border border-white/10 bg-white/[0.04] text-white hover:bg-white/10`;
  }, [variant]);

  useEffect(() => {
    if (!clientToken) {
      setError("Paddle client token missing");
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://cdn.paddle.com/paddle/v2/paddle.js"]');

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
    script.onerror = () => setError("Paddle.js failed to load");
    document.body.appendChild(script);
  }, []);

  function openCheckout() {
    if (!priceId) {
      setError("Price ID missing");
      return;
    }

    if (!window.Paddle || !isReady) {
      setError("Checkout is still loading");
      return;
    }

    window.Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
    });
  }

  return (
    <div>
      <button className={className} disabled={!isReady || !priceId} onClick={openCheckout} type="button">
        {children}
      </button>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </div>
  );
}
