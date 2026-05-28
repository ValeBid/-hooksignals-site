"use client";

import PremiumToolShell from "../components/premium-tool-shell";
import { useState } from "react";
import CopyButton from "../components/copy-button";
import RelatedTools from "../components/related-tools";

function generateScript(topic: string) {
  const cleanTopic = topic.trim();

  return {
    hook: `If ${cleanTopic.toLowerCase()} feels hard, this is the part most creators miss.`,
    body: [
      `Most creators start with the idea instead of the tension.`,
      `The first line needs to make the viewer feel a gap they want closed.`,
      `Give context fast, then move into the proof or payoff without filler.`,
      `End with a next step that feels natural, not forced.`,
    ],
    cta: `Before you post your next Short, fix the hook and packaging first.`,
  };
}

const scriptPrinciples = [
  ["Hook", "Open with tension, contrast or an immediate reason to keep watching."],
  ["Pacing", "Remove filler and make every beat move the idea forward."],
  ["Retention", "Each line should make the next line feel necessary."],
];

export default function ShortsScriptGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState<null | ReturnType<typeof generateScript>>(null);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    setScript(null);
    setTimeout(() => {
      setScript(generateScript(topic));
      setLoading(false);
    }, 700);
  }

  return (
    <PremiumToolShell
      badge="AI Shorts workflow"
      title="Shorts Script Generator"
      description="Generate a short-form script structure built around hook strength, pacing and retention. Use it as a premium first draft before recording."
      primaryHref="/hook-analyzer"
      primaryLabel="Analyze Hook"
      secondaryHref="/tools"
      secondaryLabel="All Tools"
    >
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
          <div className="mb-5 rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Script input</p>
            <p className="mt-2 text-sm leading-6 text-white/50">Start with the topic. The workflow will structure it into a retention-first Short.</p>
          </div>

          <label className="mb-3 block text-sm font-semibold text-white/62">Enter your Shorts topic</label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: Why small creators struggle on YouTube Shorts..."
            className="min-h-[210px] w-full resize-none rounded-2xl border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Script"}
          </button>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {!loading && !script && (
            <div>
              <p className="text-sm font-semibold text-cyan-300">Script preview</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Your Shorts structure will appear here.</h2>
              <p className="mt-4 leading-7 text-white/52">Strong Shorts scripts open fast, create momentum and remove filler before the viewer loses attention.</p>
              <div className="mt-8 grid gap-3">
                {scriptPrinciples.map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="font-bold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/45">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div>
              <p className="text-sm font-semibold text-cyan-300">Building retention-focused script...</p>
              <div className="mt-6 space-y-4">
                <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" />
                <div className="mt-7 h-28 animate-pulse rounded-2xl bg-white/10" />
              </div>
            </div>
          )}

          {script && (
            <div>
              <p className="mb-4 text-sm font-semibold text-cyan-300">Generated script structure</p>
              <div className="space-y-4">
                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-cyan-300">Hook</p>
                  <p className="leading-7 text-white/80">“{script.hook}”</p>
                  <CopyButton text={script.hook} />
                </div>
                {script.body.map((line, index) => (
                  <div key={line} className="rounded-2xl border border-white/10 bg-black/35 p-5 leading-7 text-white/75">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">Beat {index + 1}</p>
                    <p>{line}</p>
                    <CopyButton text={line} />
                  </div>
                ))}
                <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">CTA</p>
                  <p className="leading-7 text-white/75">“{script.cta}”</p>
                  <CopyButton text={script.cta} />
                </div>
              </div>
              <a href="/hook-improver" className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 font-bold text-black transition hover:bg-white/90">Improve the Hook</a>
            </div>
          )}
        </div>
      </div>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {scriptPrinciples.map(([title, desc]) => (
          <div key={title} className="rounded-[22px] border border-white/10 bg-black/20 p-5">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-3 leading-7 text-white/50">{desc}</p>
          </div>
        ))}
      </section>
      <RelatedTools />
    </PremiumToolShell>
  );
}
