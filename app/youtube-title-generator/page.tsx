"use client";

import { useState } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import CopyButton from "../components/copy-button";
import RelatedTools from "../components/related-tools";

function generateTitles(topic: string): string[] {
  const clean = topic.trim().replace(/[.!?]+$/, "") || "your video topic";
  const lower = clean.toLowerCase();
  return [
    `The ${lower} mistake most creators make before publishing`,
    `I tested ${lower} for 30 days — here is what actually worked`,
    `Why ${lower} stops working after the first few videos`,
    `${clean}: what nobody explains to new creators`,
    `Stop guessing — this is what strong ${lower} actually looks like`,
  ];
}

const titlePrinciples = [
  ["Clear promise", "The viewer should instantly understand the payoff before clicking."],
  ["Curiosity gap", "The title should create a reason to click without being vague."],
  ["Audience fit", "Strong titles name the viewer's specific problem, not a generic topic."],
];

export default function YouTubeTitleGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    setTitles([]);
    setTimeout(() => {
      setTitles(generateTitles(topic));
      setLoading(false);
    }, 380);
  }

  return (
    <PremiumToolShell
      badge="YouTube creator tool"
      title="YouTube Title Generator"
      description="Generate stronger YouTube title directions built around clarity, curiosity and click intent. Then test the hook before publishing."
      primaryHref="/youtube-title-analyzer"
      primaryLabel="Analyze Title"
      secondaryHref="/tools"
      secondaryLabel="All Tools"
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Input */}
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
          <div className="mb-5 rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Title input</p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Describe your video topic specifically. The more concrete the input, the more useful the title directions.
            </p>
          </div>
          <label className="mb-3 block text-sm font-semibold text-white/62">
            Describe your video topic
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: Why small YouTube channels stop growing after 1000 subscribers"
            className="min-h-[180px] w-full resize-none rounded-2xl border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating title directions…" : "Generate Title Directions"}
          </button>
          <p className="mt-3 text-xs text-white/30">
            Use these as starting directions. Score the winner with the Title Analyzer before publishing.
          </p>
        </div>

        {/* Output */}
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {loading && (
            <div>
              <p className="text-sm text-cyan-300">Generating title directions…</p>
              <div className="mt-6 space-y-3">
                <div className="h-12 animate-pulse rounded-2xl bg-white/10" />
                <div className="h-12 animate-pulse rounded-2xl bg-white/10" />
                <div className="h-12 animate-pulse rounded-2xl bg-white/10" />
              </div>
            </div>
          )}
          {!loading && titles.length === 0 && (
            <div className="rounded-[22px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm text-cyan-300">Title directions will appear here</p>
              <h2 className="mt-4 max-w-md text-2xl font-black tracking-tight">
                Enter your topic and click Generate.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/48">
                You will get 5 title directions to work with. Each uses a different angle —
                mistake, proof, contrast, curiosity and promise.
              </p>
            </div>
          )}
          {!loading && titles.length > 0 && (
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.14em] text-cyan-300">
                Generated title directions
              </p>
              <div className="grid gap-3">
                {titles.map((t) => (
                  <div
                    key={t}
                    className="rounded-[22px] border border-white/10 bg-black/25 p-5"
                  >
                    <p className="leading-7 text-white/80">&ldquo;{t}&rdquo;</p>
                    <CopyButton text={t} />
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <a
                  href="/youtube-title-analyzer"
                  className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-5 py-3 text-center text-sm font-black text-black transition hover:scale-[1.01]"
                >
                  Score a title →
                </a>
                <a
                  href="/hook-analyzer"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/[0.07]"
                >
                  Score the hook
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Principles */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {titlePrinciples.map(([title, desc]) => (
          <div key={title} className="rounded-[22px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">{title}</p>
            <p className="mt-3 leading-7 text-white/50">{desc}</p>
          </div>
        ))}
      </section>

      {/* CTA to Title Analyzer */}
      <section className="mt-5 rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-6 md:p-8">
        <h2 className="text-2xl font-black tracking-tight">
          Score a title before you commit to it.
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-white/60">
          Use the generator to explore directions. Use the Title Analyzer to score
          the best one for CTR potential, keyword placement and length before publishing.
        </p>
        <a
          href="/youtube-title-analyzer"
          className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-3.5 text-sm font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.18)] transition hover:scale-[1.01]"
        >
          Open Title Analyzer →
        </a>
      </section>

      <RelatedTools primary="youtube-title-analyzer" secondary="hook-analyzer" context="Score the title you just generated for CTR potential and clarity before publishing." />
    </PremiumToolShell>
  );
}
