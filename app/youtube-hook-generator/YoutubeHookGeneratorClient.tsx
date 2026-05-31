"use client";

import { useMemo, useState } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import FAQBlock from "../components/faq-block";
import CopyButton from "../components/copy-button";

const faqItems = [
  { question: "What is a YouTube hook?", answer: "A YouTube hook is the opening line or first few seconds that gives viewers a reason to keep watching. A strong hook is clear, specific and curiosity-driven." },
  { question: "Why do hooks matter for Shorts?", answer: "Shorts viewers decide very quickly whether to keep watching. A weak opening can reduce retention before the video has a chance to deliver value." },
  { question: "Does a generated hook guarantee views?", answer: "No. A hook can improve the opening signal, but topic demand, packaging, audience fit and delivery still matter." },
];

const patterns = [
  ["Mistake reveal", "Most creators lose viewers because they start with context instead of tension."],
  ["Proof-backed", "I studied 100 videos and found the same first-3-seconds pattern."],
  ["Before/after", "Your video idea is good, but this opening makes people swipe."],
];

function generateHooks(topic: string) {
  const clean = topic.trim().replace(/[.!?]+$/, "");
  const subject = clean || "your video idea";
  return [
    `Most creators explain ${subject} too slowly. Start with this instead.`,
    `If ${subject} is not getting views, the first 3 seconds are probably the problem.`,
    `I would not publish a video about ${subject} until the hook passes this test.`,
    `Here is the fastest way to make ${subject} feel worth watching.`,
    `The biggest mistake with ${subject} is giving context before creating curiosity.`,
  ];
}

export default function YoutubeHookGeneratorClient() {
  const [topic, setTopic] = useState("Why small YouTube channels stop growing");
  const hooks = useMemo(() => generateHooks(topic), [topic]);

  return (
    <>
      <PremiumToolShell badge="YouTube creator workflow" title="YouTube Hook Generator" description="Turn a rough video idea into sharper opening lines, then send the best one into the Hook Analyzer before publishing." primaryHref="/hook-analyzer" primaryLabel="Analyze Best Hook" secondaryHref="/tools" secondaryLabel="All Tools">
        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
            <div className="mb-5 rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4"><p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Creator input</p><p className="mt-2 text-sm leading-6 text-white/50">Start with the actual video idea, not a generic keyword. The hook should create a reason to keep watching.</p></div>
            <label className="mb-3 block text-sm font-semibold text-white/62">Describe your video idea</label>
            <textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Example: Why small YouTube channels stop growing" className="min-h-[190px] w-full resize-none rounded-2xl border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40" />
            <div className="mt-5 grid gap-3 sm:grid-cols-2"><a href="/hook-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 text-center font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01]">Analyze a hook →</a><a href="/shorts-script-generator" className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-center font-bold text-white transition hover:bg-white/10">Build script →</a></div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Generated hook directions</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Pick one angle. Then test it.</h2>
            <div className="mt-6 grid gap-3">
              {hooks.map((hook) => <div key={hook} className="rounded-[22px] border border-white/10 bg-black/25 p-5"><p className="leading-7 text-white/75">“{hook}”</p><CopyButton text={hook} /></div>)}
            </div>
          </div>
        </section>
        <section className="mt-6 grid gap-4 md:grid-cols-3">{patterns.map(([title, desc]) => <div key={title} className="rounded-[22px] border border-white/10 bg-black/20 p-5"><p className="text-sm font-bold uppercase tracking-[0.14em] text-violet-300">Pattern</p><h2 className="mt-3 text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-white/50">{desc}</p></div>)}</section>
        <section className="mt-6 rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-6 md:p-8"><h2 className="text-2xl font-black tracking-tight md:text-3xl">A hook is not finished until it survives a clarity check.</h2><p className="mt-4 max-w-3xl leading-8 text-white/60">Use this page to generate angles. Use Hook Analyzer to score the best one for clarity, curiosity and retention pull. Then turn the winner into a script.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href="/hook-analyzer" className="rounded-2xl bg-white px-7 py-4 text-center font-black text-black transition hover:scale-[1.01]">Open Hook Analyzer</a><a href="/thumbnail-text-checker" className="rounded-2xl border border-white/10 bg-black/20 px-7 py-4 text-center font-bold text-white transition hover:bg-white/10">Check thumbnail text</a></div></section>
        <FAQBlock items={faqItems} />
      </PremiumToolShell>
    </>
  );
}
