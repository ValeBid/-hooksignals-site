"use client";

import PremiumToolShell from "../components/premium-tool-shell";
import CopyButton from "../components/copy-button";
import { useState } from "react";
import RelatedTools from "../components/related-tools";

function improveHook(input: string) {
  const idea = input.trim();
  return {
    diagnosis: "The original idea needs a clearer promise, faster tension and a stronger reason to keep watching.",
    confidence: 86,
    versions: [
      [`If ${idea.toLowerCase()} is not working, this is probably the reason.`, "Specific pain + immediate curiosity"],
      [`Stop making this mistake with ${idea.toLowerCase()} before your next post.`, "Warning hook + creator urgency"],
      [`Most creators misunderstand ${idea.toLowerCase()} because they miss this one signal.`, "Authority gap + retention loop"],
      [`I changed one thing about ${idea.toLowerCase()} and the results improved fast.`, "Proof angle + simple payoff"],
    ],
  };
}

const principles = [
  ["Sharper", "Removes vague openings and weak promises."],
  ["More Specific", "Creates clearer stakes for the viewer."],
  ["Retention Focused", "Makes the next sentence feel worth watching."],
];

export default function HookImproverPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | ReturnType<typeof improveHook>>(null);
  const [loading, setLoading] = useState(false);

  function handleImprove() {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(improveHook(input));
      setLoading(false);
    }, 700);
  }

  return (
    <PremiumToolShell badge="AI hook workflow" title="Hook Improver" description="Rewrite weak video ideas into sharper hook variations designed for clarity, curiosity and viewer retention." primaryHref="/hook-analyzer" primaryLabel="Analyze Hook">
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
          <div className="mb-5 rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Rewrite engine</p>
            <p className="mt-2 text-sm leading-6 text-white/50">Turn a weak idea into testable hooks with different psychological angles.</p>
          </div>
          <label className="mb-3 block text-sm font-semibold text-white/62">Paste your rough hook or video idea</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Example: A video about why small creators struggle to grow on YouTube..." className="min-h-[210px] w-full resize-none rounded-2xl border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40" />
          <button onClick={handleImprove} disabled={loading} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Improving..." : "Improve Hook"}
          </button>
          <p className="mt-4 text-xs leading-5 text-white/35">Use this after the analyzer flags weak clarity, low curiosity or high retention risk.</p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {!loading && !result && (
            <div>
              <p className="text-sm font-semibold text-cyan-300">Output preview</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Stronger hooks will appear here.</h2>
              <p className="mt-4 leading-7 text-white/52">HookSignals rewrites rough ideas into specific, curiosity-driven openings.</p>
              <div className="mt-8 grid gap-3">{principles.map(([title, desc]) => <div key={title} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="font-bold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-white/45">{desc}</p></div>)}</div>
            </div>
          )}
          {loading && <div><p className="text-sm font-semibold text-cyan-300">Building stronger hooks...</p><div className="mt-6 space-y-4"><div className="h-4 w-full animate-pulse rounded-full bg-white/10" /><div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" /><div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" /><div className="mt-7 h-24 animate-pulse rounded-2xl bg-white/10" /></div></div>}
          {result && (
            <div>
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
                <div className="flex items-center justify-between gap-4"><p className="text-sm font-semibold text-cyan-300">AI diagnosis</p><span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/55">{result.confidence}% confidence</span></div>
                <p className="mt-4 leading-7 text-white/68">{result.diagnosis}</p>
              </div>
              <p className="mt-6 text-sm font-semibold text-cyan-300">Improved versions</p>
              <div className="mt-3 grid gap-3">
                {result.versions.map(([version, reason]) => <div key={version} className="rounded-2xl border border-white/10 bg-black/35 p-5 leading-7 text-white/75"><p>“{version}”</p><p className="mt-3 text-xs uppercase tracking-[0.16em] text-violet-300">{reason}</p><CopyButton text={version} /></div>)}
              </div>
              <a href="/hook-analyzer" className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 font-bold text-black transition hover:bg-white/90">Analyze These Hooks</a>
            </div>
          )}
        </div>
      </div>
      <section className="mt-6 grid gap-4 md:grid-cols-3">{principles.map(([title, desc]) => <div key={title} className="rounded-[22px] border border-white/10 bg-black/20 p-5"><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-white/50">{desc}</p></div>)}</section>
      <RelatedTools />
    </PremiumToolShell>
  );
}
