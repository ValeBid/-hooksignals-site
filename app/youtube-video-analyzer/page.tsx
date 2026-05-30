"use client";

import { useState } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import RelatedTools from "../components/related-tools";
import { trackEvent } from "../lib/analytics";

const comingSoonFeatures = [
  {
    title: "Live YouTube data",
    desc: "Views, likes, subscribers and upload date pulled from the real video — no estimates.",
  },
  {
    title: "Opening transcript analysis",
    desc: "When available, the first 30 seconds of transcript feed directly into the hook score.",
  },
  {
    title: "Packaging comparison",
    desc: "Hook strength scored against the title and thumbnail promise for alignment.",
  },
  {
    title: "Retention risk prediction",
    desc: "Early drop-off probability estimated from the hook, title and platform.",
  },
];

export default function YoutubeVideoAnalyzerPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean, source: "youtube_analyzer_early_access" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      trackEvent({ name: "email_submit", props: { source: "youtube_analyzer_early_access" } });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PremiumToolShell
      badge="Early access"
      title="YouTube Video Analyzer"
      description="Paste any YouTube URL to fetch real performance data — views, likes, transcript — then get an AI analysis of hook strength, packaging and retention risk."
      primaryHref="/hook-analyzer"
      primaryLabel="Analyze Hook Text"
      secondaryHref="/tools"
      secondaryLabel="All Tools"
    >
      {/* Early access card */}
      <div className="rounded-[34px] border border-cyan-300/22 bg-[linear-gradient(135deg,rgba(34,211,238,.08),rgba(124,58,237,.06))] p-7 shadow-[0_28px_80px_rgba(34,211,238,.08)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div>
            <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.09] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
              Coming soon
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
              Full YouTube data analysis is on the way.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/58">
              We are finalising the live data pipeline. When it launches, paste any public
              YouTube URL to get real views, likes, transcript and a full AI breakdown of
              hook strength, packaging and retention risk.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/42">
              Enter your email below to be first to know when it goes live.
            </p>
          </div>

          {/* Email capture */}
          <div className="rounded-[28px] border border-white/10 bg-black/30 p-6">
            {!submitted ? (
              <form onSubmit={handleNotify} className="grid gap-3">
                <p className="text-sm font-black text-white">Get early access</p>
                <p className="text-xs leading-5 text-white/45">
                  We will notify you when YouTube video analysis launches — and give you early access before general release.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@email.com"
                  className="rounded-2xl border border-white/10 bg-[#050914] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/24 focus:border-cyan-300/40"
                />
                {error && (
                  <p className="text-xs text-red-300">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 py-3.5 text-sm font-black text-black transition hover:scale-[1.01] disabled:opacity-60"
                >
                  {loading ? "Saving…" : "Notify me when live →"}
                </button>
                <p className="text-[11px] text-white/28">No spam. One email when it launches.</p>
              </form>
            ) : (
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] p-5">
                <p className="font-black text-cyan-200">✓ You are on the list.</p>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  We will email you as soon as YouTube video analysis is live.
                </p>
                <p className="mt-4 text-sm font-black text-white/55">
                  In the meantime, score any hook with the Hook Analyzer:
                </p>
                <a
                  href="/hook-analyzer"
                  className="mt-3 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-black text-black transition hover:bg-white/90"
                >
                  Analyze a hook →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* What it will do */}
      <section className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
          What YouTube Video Analyzer will do
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-white">
          Real data. AI analysis. Pre-publish decisions.
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {comingSoonFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-[22px] border border-white/10 bg-black/22 p-5"
            >
              <p className="font-black text-white">{f.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/48">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Hook Analyzer now */}
      <section className="mt-5 rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.07),rgba(0,0,0,.4))] p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
          Available now
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-white">
          Score your opening hook while you wait.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/52">
          The Hook Analyzer is live today. Paste your first line, select the platform,
          and get a full score — clarity, curiosity, retention risk and improvement suggestions.
          Free to start, no card required.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="/hook-analyzer"
            className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-3.5 text-sm font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.18)] transition hover:scale-[1.01]"
          >
            Open Hook Analyzer →
          </a>
          <a
            href="/youtube-title-analyzer"
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-black text-white transition hover:bg-white/[0.07]"
          >
            Analyze a title
          </a>
        </div>
      </section>

      <div className="mt-6">
        <RelatedTools />
      </div>
    </PremiumToolShell>
  );
}
