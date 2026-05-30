"use client";

import { useState } from "react";
import { trackEvent } from "../lib/analytics";

type Props = {
  source?: string;
  heading?: string;
  subheading?: string;
  compact?: boolean;
};

export default function EmailCapture({
  source = "homepage_email_capture",
  heading = "Get sharper creator decisions before you publish.",
  subheading = "Join the HookSignals creator list for new AI tools, example analyses, retention notes and launch discounts.",
  compact = false,
}: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, source }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not save email.");

      trackEvent({ name: "email_submit", props: { source } });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save email.");
    } finally {
      setLoading(false);
    }
  }

  if (compact) {
    return (
      <div className="rounded-[28px] border border-cyan-300/18 bg-cyan-300/[0.055] p-5 md:p-6">
        {!submitted ? (
          <>
            <p className="text-sm font-black text-white">Weekly Creator Intelligence</p>
            <p className="mt-1 text-xs leading-5 text-white/52">New tools, hook examples and creator workflow updates.</p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="your@email.com"
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40"
              />
              <button
                disabled={loading}
                type="submit"
                className="shrink-0 rounded-2xl bg-cyan-300 px-4 py-2.5 text-sm font-black text-black transition hover:bg-cyan-200 disabled:opacity-60"
              >
                {loading ? "…" : "Join"}
              </button>
            </form>
            {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
            <p className="mt-2 text-[11px] text-white/30">No spam. Unsubscribe anytime.</p>
          </>
        ) : (
          <p className="text-sm font-black text-cyan-200">✓ You are on the list.</p>
        )}
      </div>
    );
  }

  return (
    <section className="mt-10 rounded-[38px] border border-cyan-300/20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.02))] p-8 shadow-[0_40px_120px_rgba(34,211,238,.10)] md:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Weekly creator intelligence</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.05em] md:text-5xl">{heading}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/58">{subheading}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/42">
            <span>✓ New AI tool releases</span>
            <span>✓ Hook trend breakdowns</span>
            <span>✓ Retention framework updates</span>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-black/28 p-5 md:p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="grid gap-3">
              <label className="text-sm font-semibold text-white/62">Email address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="creator@email.com"
                className="rounded-2xl border border-white/10 bg-[#050914] px-4 py-4 text-white outline-none placeholder:text-white/24 focus:border-cyan-300/45"
              />
              {error && (
                <p className="rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>
              )}
              <button
                disabled={loading}
                type="submit"
                className="rounded-2xl bg-cyan-300 px-5 py-4 font-black text-black transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Saving…" : "Join free"}
              </button>
              <p className="text-xs leading-5 text-white/35">No spam. Product updates, creator workflow examples and discounts only.</p>
            </form>
          ) : (
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] p-5">
              <p className="text-xl font-black text-cyan-200">You are on the list.</p>
              <p className="mt-3 leading-7 text-white/55">Next step: analyze a real hook and save the result to your workspace.</p>
              <a href="/youtube-video-analyzer" className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">
                Analyze a video →
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
