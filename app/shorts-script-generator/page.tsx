"use client";

import PremiumToolShell from "../components/premium-tool-shell";
import { useState } from "react";
import CopyButton from "../components/copy-button";
import RelatedTools from "../components/related-tools";

function generateScript(topic: string) {
  const cleanTopic = topic.trim();

  return {
    hook: `If ${cleanTopic.toLowerCase()} feels hard, this is the part most people miss.`,
    body: [
      `Most creators start with the wrong angle.`,
      `The real problem is not the idea — it is the way the first seconds are structured.`,
      `Start with tension, then give the viewer a clear reason to stay.`,
      `Make every sentence pull them into the next one.`,
    ],
    cta: `Before you post your next Short, fix the hook first.`,
  };
}

const scriptPrinciples = [
  ["Hook", "Open with tension or a clear reason to keep watching."],
  ["Pacing", "Remove filler and move the idea forward quickly."],
  ["Retention", "Every line should make the next line feel necessary."],
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
      description="Generate a short-form script structure built around hook strength, pacing and retention. Use it as a first draft before recording."
      primaryHref="/hook-analyzer"
      primaryLabel="Analyze Hook"
      secondaryHref="/tools"
      secondaryLabel="All Tools"
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[24px] border border-white/10 bg-black/30 p-5 md:p-7">
          <label className="mb-3 block text-sm font-semibold text-white/62">
            Enter your Shorts topic
          </label>

          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: Why small creators struggle on YouTube Shorts..."
            className="min-h-[190px] w-full resize-none rounded-2xl border border-white/10 bg-[#050505] p-5 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-emerald-300/35"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-5 w-full rounded-2xl bg-emerald-400 px-7 py-4 font-bold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Script"}
          </button>

          <p className="mt-4 text-xs leading-5 text-white/35">
            Build the script after the hook angle is clear. Then test the opening before publishing.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 md:p-7">
          {!loading && !script && (
            <div>
              <p className="text-sm font-semibold text-emerald-300">Script preview</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">
                Your Shorts structure will appear here.
              </h2>
              <p className="mt-4 leading-7 text-white/52">
                Strong Shorts scripts open fast, create momentum and remove filler before the viewer loses attention.
              </p>

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
              <p className="text-sm font-semibold text-emerald-300">Building retention-focused script...</p>
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
              <p className="mb-4 text-sm font-semibold text-emerald-300">Generated script structure</p>

              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-emerald-300">Hook</p>
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

              <a
                href="/hook-improver"
                className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 font-bold text-black transition hover:bg-white/90"
              >
                Improve the Hook
              </a>
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
