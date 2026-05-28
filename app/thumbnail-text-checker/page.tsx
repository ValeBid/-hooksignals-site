"use client";

import { useState } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import CopyButton from "../components/copy-button";
import RelatedTools from "../components/related-tools";

function checkThumbnailText(text: string) {
  let score = 55;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  if (text.length > 0 && text.length <= 28) score += 20;
  if (text.length > 28 && text.length <= 45) score += 10;
  if (text.includes("!")) score += 5;
  if (wordCount <= 5) score += 10;
  score = Math.min(100, score);

  return {
    score,
    wordCount,
    readability: Math.min(100, score + (wordCount <= 4 ? 6 : -6)),
    contrast: text.length <= 32 ? 88 : 70,
    density: wordCount <= 5 ? 91 : 62,
    grade: score >= 85 ? "Excellent" : score >= 72 ? "Strong" : score >= 60 ? "Decent" : "Weak",
    verdict:
      score >= 85
        ? "Strong thumbnail text. It is short, clear and easy to read at mobile feed size."
        : score >= 72
        ? "Good thumbnail text. It can still become sharper with fewer words or stronger contrast."
        : score >= 60
        ? "Usable, but it may be too generic, long or hard to scan quickly."
        : "Weak thumbnail text. Make it shorter, clearer and easier to scan.",
    suggestions: ["Use fewer words.", "Make the message readable at mobile feed size.", "Let the thumbnail support the title instead of repeating it."],
  };
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div><div className="mb-2 flex justify-between text-sm"><span className="text-white/55">{label}</span><span className="font-bold text-white/75">{value}/100</span></div><div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400" style={{ width: `${value}%` }} /></div></div>;
}

export default function ThumbnailTextCheckerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<null | ReturnType<typeof checkThumbnailText>>(null);
  function handleCheck() { if (!text.trim()) return; setResult(checkThumbnailText(text)); }

  return (
    <PremiumToolShell badge="YouTube CTR tool" title="Thumbnail Text Checker" description="Check whether your thumbnail text is short, readable and clear enough to work inside the YouTube feed." primaryHref="/youtube-title-generator" primaryLabel="Generate Title" secondaryHref="/tools" secondaryLabel="All Tools">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
          <div className="mb-5 rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4"><p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Packaging input</p><p className="mt-2 text-sm leading-6 text-white/50">Test whether the thumbnail message survives mobile feed scanning.</p></div>
          <label className="mb-3 block text-sm font-semibold text-white/62">Enter thumbnail text</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Example: Stop Doing This" className="min-h-[210px] w-full resize-none rounded-2xl border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40" />
          <button onClick={handleCheck} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01]">Check Thumbnail Text</button>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {!result && <div><p className="text-sm text-cyan-300">Result preview</p><h2 className="mt-4 text-3xl font-black tracking-tight">Your thumbnail score will appear here.</h2><p className="mt-4 leading-7 text-white/50">Strong thumbnail text is short, readable and aligned with the video title.</p><div className="mt-8 grid gap-3"><a href="/youtube-title-generator" className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-cyan-300/30">Generate stronger titles →</a><a href="/youtube-ctr-tips" className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-cyan-300/30">Learn thumbnail strategy →</a></div></div>}
          {result && <div><p className="text-sm text-cyan-300">Thumbnail text score</p><div className="mt-3 flex items-end gap-3"><h2 className="text-7xl font-black text-cyan-300">{result.score}</h2><span className="mb-3 text-white/40">/100 · {result.grade}</span></div><p className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 leading-7 text-white/65">{result.verdict}</p><div className="mt-5 grid gap-4 md:grid-cols-3"><Metric label="Readability" value={result.readability} /><Metric label="Text density" value={result.density} /><Metric label="Contrast risk" value={result.contrast} /></div><div className="mt-5 space-y-3">{result.suggestions.map((suggestion) => <div key={suggestion} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white/60">{suggestion}</div>)}</div><CopyButton text={text} /></div>}
        </div>
      </div>
      <section className="mt-6 grid gap-4 md:grid-cols-3">{[["Short", "Thumbnail text should be readable at small feed size."], ["Clear", "The message should be understood in one glance."], ["Aligned", "The thumbnail should support the title, not repeat it."]].map(([title, desc]) => <div key={title} className="rounded-[22px] border border-white/10 bg-black/20 p-5"><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-white/50">{desc}</p></div>)}</section>
      <RelatedTools />
    </PremiumToolShell>
  );
}
