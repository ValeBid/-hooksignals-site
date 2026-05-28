"use client";

import { useState } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import CopyButton from "../components/copy-button";
import RelatedTools from "../components/related-tools";

type ThumbnailResult = {
  score: number;
  lengthScore: number;
  clarityScore: number;
  mobileScore: number;
  verdict: string;
  feedback: string[];
  rewrites: string[];
};

const principles = [
  ["Readable", "The viewer should understand the text at phone-feed size."],
  ["Different", "The thumbnail should add a second angle instead of repeating the title."],
  ["Specific", "Use concrete words, numbers, mistakes or outcomes when possible."],
];

function Metric({ label, value }: { label: string; value: number }) {
  return <div><div className="mb-2 flex justify-between text-sm"><span className="text-white/55">{label}</span><span className="font-bold text-white/75">{value}/100</span></div><div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400" style={{ width: `${value}%` }} /></div></div>;
}

export default function ThumbnailTextCheckerPage() {
  const [text, setText] = useState("Stop Doing This");
  const [result, setResult] = useState<null | ThumbnailResult>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheck() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/analyze-thumbnail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: trimmed }) });
      const data = await response.json();
      if (!response.ok || !data?.analysis) throw new Error(data?.error || "Thumbnail analysis failed.");
      setResult(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Thumbnail analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PremiumToolShell badge="Packaging workflow" title="Thumbnail Text Checker" description="Check whether your thumbnail text is readable, specific and strong enough for mobile first impressions." primaryHref="/youtube-title-generator" primaryLabel="Generate Title" secondaryHref="/tools" secondaryLabel="All Tools">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
          <div className="mb-5 rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4"><p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Thumbnail packaging</p><p className="mt-2 text-sm leading-6 text-white/50">Short text wins when it creates a fast second reason to click. Test the words before designing the thumbnail.</p></div>
          <label className="mb-3 block text-sm font-semibold text-white/62">Enter thumbnail text</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Example: Stop Doing This" className="min-h-[210px] w-full resize-none rounded-2xl border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40" />
          {error && <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
          <button onClick={handleCheck} disabled={loading} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Checking thumbnail signal..." : "Check Thumbnail Text"}</button>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {!loading && !result && <div><p className="text-sm text-cyan-300">Packaging preview</p><h2 className="mt-4 text-3xl font-black tracking-tight">Run a mobile-readability check before publishing.</h2><p className="mt-4 leading-7 text-white/50">The best thumbnail text is short enough to scan and different enough to support the title.</p><div className="mt-8 grid gap-3">{principles.map(([title, desc]) => <div key={title} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="font-bold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-white/45">{desc}</p></div>)}</div></div>}
          {loading && <div className="space-y-4"><p className="text-sm text-cyan-300">Analyzing readability...</p><div className="h-28 animate-pulse rounded-3xl bg-white/10" /><div className="h-3 animate-pulse rounded-full bg-white/10" /><div className="h-3 w-3/4 animate-pulse rounded-full bg-white/10" /></div>}
          {result && <div><p className="text-sm text-cyan-300">Thumbnail text score</p><div className="mt-3 flex items-end gap-3"><h2 className="text-7xl font-black text-cyan-300">{result.score}</h2><span className="mb-3 text-white/40">/100</span></div><p className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 leading-7 text-white/65">{result.verdict}</p><div className="mt-5 grid gap-4 md:grid-cols-3"><Metric label="Length" value={result.lengthScore} /><Metric label="Clarity" value={result.clarityScore} /><Metric label="Mobile" value={result.mobileScore} /></div><div className="mt-5 space-y-3">{result.feedback.map((suggestion) => <div key={suggestion} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white/60">{suggestion}</div>)}</div><div className="mt-5 grid gap-3 md:grid-cols-3">{result.rewrites.map((rewrite) => <div key={rewrite} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] p-4 text-white/75"><p>“{rewrite}”</p><CopyButton text={rewrite} /></div>)}</div><div className="mt-6 grid gap-3 sm:grid-cols-2"><a href="/youtube-title-generator" className="rounded-2xl bg-white px-6 py-3 text-center font-bold text-black transition hover:bg-white/90">Generate matching title</a><a href="/hook-analyzer" className="rounded-2xl border border-white/10 bg-black/25 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10">Analyze hook</a></div></div>}
        </div>
      </div>
      <section className="mt-6 grid gap-4 md:grid-cols-3">{principles.map(([title, desc]) => <div key={title} className="rounded-[22px] border border-white/10 bg-black/20 p-5"><p className="text-sm font-bold uppercase tracking-[0.14em] text-violet-300">Packaging rule</p><h2 className="mt-3 text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-white/50">{desc}</p></div>)}</section>
      <RelatedTools />
    </PremiumToolShell>
  );
}
