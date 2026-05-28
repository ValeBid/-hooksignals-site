"use client";

import PremiumToolShell from "../components/premium-tool-shell";
import { useState } from "react";
import CopyButton from "../components/copy-button";
import RelatedTools from "../components/related-tools";

function generateScript(topic: string) {
  const cleanTopic = topic.trim() || "your idea";
  return {
    hook: `Most creators explain ${cleanTopic.toLowerCase()} too slowly. Here is the faster way to open it.`,
    body: [
      "Start with the tension before giving context.",
      "Give the viewer one clear reason to keep watching.",
      "Show the mistake, contrast or result as early as possible.",
      "Remove any line that does not move the viewer toward the payoff.",
    ],
    payoff: `By the end, the viewer should understand exactly how to approach ${cleanTopic.toLowerCase()} differently.`,
    cta: "Save this workflow before you record your next Short.",
  };
}

const scriptPrinciples = [
  ["Hook", "Open with tension, contrast or an immediate reason to keep watching."],
  ["Beat", "Each sentence should move the viewer closer to the payoff."],
  ["Payoff", "Close the curiosity gap you opened in the first seconds."],
];

export default function ShortsScriptGeneratorClient() {
  const [topic, setTopic] = useState("Why small creators struggle on YouTube Shorts");
  const [script, setScript] = useState<null | ReturnType<typeof generateScript>>(generateScript("Why small creators struggle on YouTube Shorts"));
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    setScript(null);
    setTimeout(() => {
      setScript(generateScript(topic));
      setLoading(false);
    }, 450);
  }

  return (
    <PremiumToolShell badge="Short-form workflow" title="Shorts Script Generator" description="Build a retention-focused Short from hook to payoff. Use the script as a first draft, then analyze the opening before recording." primaryHref="/hook-analyzer" primaryLabel="Analyze Hook" secondaryHref="/tools" secondaryLabel="All Tools">
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
          <div className="mb-5 rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4"><p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Script input</p><p className="mt-2 text-sm leading-6 text-white/50">Start with a specific topic. The output gives you a hook, retention beats, payoff and next workflow step.</p></div>
          <label className="mb-3 block text-sm font-semibold text-white/62">Enter your Shorts topic</label>
          <textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Example: Why small creators struggle on YouTube Shorts" className="min-h-[210px] w-full resize-none rounded-2xl border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40" />
          <button onClick={handleGenerate} disabled={loading} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Building script workflow..." : "Generate Script Workflow"}</button>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {loading && <div><p className="text-sm font-semibold text-cyan-300">Building retention-focused script...</p><div className="mt-6 space-y-4"><div className="h-4 w-full animate-pulse rounded-full bg-white/10" /><div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" /><div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" /><div className="mt-7 h-28 animate-pulse rounded-2xl bg-white/10" /></div></div>}
          {script && <div><p className="mb-4 text-sm font-semibold text-cyan-300">Generated script workflow</p><div className="space-y-4"><div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5"><p className="mb-2 text-xs uppercase tracking-[0.2em] text-cyan-300">Hook</p><p className="leading-7 text-white/80">“{script.hook}”</p><CopyButton text={script.hook} /></div>{script.body.map((line, index) => <div key={line} className="rounded-2xl border border-white/10 bg-black/35 p-5 leading-7 text-white/75"><p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">Beat {index + 1}</p><p>{line}</p><CopyButton text={line} /></div>)}<div className="rounded-2xl border border-violet-300/20 bg-violet-300/[0.05] p-5"><p className="mb-2 text-xs uppercase tracking-[0.2em] text-violet-300">Payoff</p><p className="leading-7 text-white/75">“{script.payoff}”</p><CopyButton text={script.payoff} /></div><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">CTA</p><p className="leading-7 text-white/75">“{script.cta}”</p><CopyButton text={script.cta} /></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><a href="/hook-analyzer" className="rounded-2xl bg-white px-6 py-3 text-center font-bold text-black transition hover:bg-white/90">Analyze the Hook</a><a href="/thumbnail-text-checker" className="rounded-2xl border border-white/10 bg-black/25 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10">Check Packaging</a></div></div>}
        </div>
      </div>
      <section className="mt-6 grid gap-4 md:grid-cols-3">{scriptPrinciples.map(([title, desc]) => <div key={title} className="rounded-[22px] border border-white/10 bg-black/20 p-5"><p className="text-sm font-bold uppercase tracking-[0.14em] text-violet-300">Script principle</p><h2 className="mt-3 text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-white/50">{desc}</p></div>)}</section>
      <RelatedTools />
    </PremiumToolShell>
  );
}
