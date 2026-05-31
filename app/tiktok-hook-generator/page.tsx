"use client";

import { useState } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import CopyButton from "../components/copy-button";
import RelatedTools from "../components/related-tools";

function generateTikTokHooks(topic: string): string[] {
  const clean = topic.trim().replace(/[.!?]+$/, "") || "this";
  const lower = clean.toLowerCase();
  return [
    `Stop scrolling. This is why your ${lower} is losing viewers in the first second.`,
    `I tested ${lower} every day for 30 days. The result was not what I expected.`,
    `Most creators get ${lower} wrong before they even start recording.`,
    `If your ${lower} content is not growing, this is the reason.`,
    `The one change I made to ${lower} that nobody talks about.`,
  ];
}

const tiktokPrinciples = [
  ["Fast start", "TikTok viewers decide in under one second whether to keep watching."],
  ["Pattern interrupt", "The first word or image must break the scroll — not ease into it."],
  ["Specific tension", "Generic curiosity does not hold. Name a specific fear, mistake or result."],
];

export default function TikTokHookGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    setHooks([]);
    setTimeout(() => {
      setHooks(generateTikTokHooks(topic));
      setLoading(false);
    }, 350);
  }

  return (
    <PremiumToolShell
      badge="TikTok creator tool"
      title="TikTok Hook Generator"
      description="Generate stronger TikTok opening lines built for scroll stopping, curiosity and audience retention in the first seconds."
      primaryHref="/hook-analyzer"
      primaryLabel="Score Your Hook"
      secondaryHref="/tools"
      secondaryLabel="All Tools"
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Input */}
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
          <div className="mb-5 rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">TikTok topic</p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Be specific. The more concrete the topic, the more usable the hook directions.
            </p>
          </div>
          <label className="mb-3 block text-sm font-semibold text-white/62">
            Describe your TikTok idea
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: Why small creators struggle to grow on TikTok in the first 90 days"
            className="min-h-[180px] w-full resize-none rounded-2xl border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating hooks…" : "Generate TikTok Hooks"}
          </button>
          <p className="mt-3 text-xs text-white/30">
            Pick your strongest hook and score it with the Hook Analyzer before posting.
          </p>
        </div>

        {/* Output */}
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {loading && (
            <div>
              <p className="text-sm text-cyan-300">Generating hook directions…</p>
              <div className="mt-6 space-y-3">
                <div className="h-14 animate-pulse rounded-2xl bg-white/10" />
                <div className="h-14 animate-pulse rounded-2xl bg-white/10" />
                <div className="h-14 animate-pulse rounded-2xl bg-white/10" />
              </div>
            </div>
          )}
          {!loading && hooks.length === 0 && (
            <div className="rounded-[22px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm text-cyan-300">Generated hooks will appear here</p>
              <h2 className="mt-4 max-w-md text-2xl font-black tracking-tight">
                Enter your idea and generate 5 hook directions.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/48">
                Each hook uses a different angle — mistake, scroll-stop, test-proof,
                warning and curiosity gap.
              </p>
            </div>
          )}
          {!loading && hooks.length > 0 && (
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.14em] text-cyan-300">
                Generated TikTok hooks
              </p>
              <div className="grid gap-3">
                {hooks.map((h) => (
                  <div
                    key={h}
                    className="rounded-[22px] border border-white/10 bg-black/25 p-5"
                  >
                    <p className="leading-7 text-white/80">&ldquo;{h}&rdquo;</p>
                    <CopyButton text={h} />
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <a
                  href="/hook-analyzer"
                  className="block rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-5 py-3.5 text-center text-sm font-black text-black transition hover:scale-[1.01]"
                >
                  Score your best hook →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Principles */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {tiktokPrinciples.map(([title, desc]) => (
          <div key={title} className="rounded-[22px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">{title}</p>
            <p className="mt-3 leading-7 text-white/50">{desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mt-5 rounded-[24px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.07),rgba(124,58,237,.05))] p-6 md:p-8">
        <h2 className="text-2xl font-black tracking-tight">
          A hook is not finished until it passes a clarity check.
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-white/60">
          Use the generator to find angles. Use the Hook Analyzer to score the best one
          for clarity, curiosity gap and retention pull before posting.
        </p>
        <a
          href="/hook-analyzer"
          className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-3.5 text-sm font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.18)] transition hover:scale-[1.01]"
        >
          Open Hook Analyzer →
        </a>
      </section>

      <RelatedTools primary="hook-analyzer" secondary="hook-improver" context="Score the TikTok hook you generated, then refine the weakest signal." />
    </PremiumToolShell>
  );
}
