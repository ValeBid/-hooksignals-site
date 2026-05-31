"use client";

import { motion } from "framer-motion";

const EASE = "easeOut" as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: EASE },
});

// ─── Workflow stage visual ────────────────────────────────────────────────────
function WorkflowStage({
  step,
  label,
  title,
  desc,
  metrics,
  accent,
}: {
  step: string;
  label: string;
  title: string;
  desc: string;
  metrics: { key: string; value: string; sub?: string }[];
  accent: "cyan" | "violet" | "sky";
}) {
  const accentClass = {
    cyan: "border-cyan-300/22 bg-cyan-300/[0.055] text-cyan-300",
    violet: "border-violet-300/22 bg-violet-300/[0.055] text-violet-300",
    sky: "border-sky-300/22 bg-sky-300/[0.055] text-sky-300",
  }[accent];

  const accentText = {
    cyan: "text-cyan-300",
    violet: "text-violet-300",
    sky: "text-sky-300",
  }[accent];

  return (
    <div className="rounded-[28px] border border-white/10 bg-black/22 p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${accentClass}`}>
          {step} — {label}
        </span>
      </div>
      <h3 className="text-xl font-black tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/52">{desc}</p>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {metrics.map(({ key, value, sub }) => (
          <div key={key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-center">
            <p className={`text-xl font-black ${accentText}`}>{value}</p>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/35">{key}</p>
            {sub && <p className="mt-0.5 text-[9px] text-white/25">{sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Packaging comparison ─────────────────────────────────────────────────────
function PackagingComparison() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-5 md:p-7">
      <div className="mb-5 flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
        <p className="text-xs font-black uppercase tracking-[0.14em] text-white/45">Packaging comparison</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Weak packaging */}
        <div className="rounded-[22px] border border-red-400/18 bg-red-400/[0.04] p-5">
          <span className="mb-3 inline-flex rounded-full border border-red-400/22 bg-red-400/[0.09] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-red-300">
            Weak packaging
          </span>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-3 mb-4">
            <p className="text-xs text-white/35 mb-1">Title</p>
            <p className="text-sm font-black text-white/70">"My YouTube Growth Journey"</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-3 mb-4">
            <p className="text-xs text-white/35 mb-1">Hook</p>
            <p className="text-sm text-white/60">"Today I want to talk about something I learned..."</p>
          </div>
          <div className="space-y-2">
            {[["Hook score", "18"], ["CTR potential", "24"], ["Retention risk", "High"]].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                <span className="text-xs text-white/40">{k}</span>
                <span className="text-xs font-black text-red-400">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strong packaging */}
        <div className="rounded-[22px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.06),rgba(124,58,237,.04))] p-5">
          <span className="mb-3 inline-flex rounded-full border border-cyan-300/22 bg-cyan-300/[0.09] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-200">
            Strong packaging
          </span>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-3 mb-4">
            <p className="text-xs text-white/35 mb-1">Title</p>
            <p className="text-sm font-black text-white">"I posted 90 days straight and only 3 videos got traction"</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-3 mb-4">
            <p className="text-xs text-white/35 mb-1">Hook</p>
            <p className="text-sm text-white/80">"After 87 failed videos, I found one pattern that changed everything about how I write hooks."</p>
          </div>
          <div className="space-y-2">
            {[["Hook score", "82"], ["CTR potential", "88"], ["Retention risk", "Low"]].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                <span className="text-xs text-white/40">{k}</span>
                <span className="text-xs font-black text-cyan-300">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Platform signal cards ────────────────────────────────────────────────────
function PlatformSignals() {
  const platforms = [
    {
      name: "YouTube Shorts",
      hook: "3-second window",
      note: "HookSignals scores the first line for swipe risk. A vague or slow subject costs the view before the second sentence.",
      signal: "Swipe risk score",
      accent: "cyan" as const,
    },
    {
      name: "TikTok",
      hook: "First word matters",
      note: "Topic and subject placement in the first spoken line affects distribution. HookSignals flags late-topic hooks.",
      signal: "Topic placement check",
      accent: "violet" as const,
    },
    {
      name: "YouTube Long-form",
      hook: "30-second retention gate",
      note: "The opening promise must carry attention past the 30-second gate. HookSignals scores title-to-hook alignment.",
      signal: "Promise alignment score",
      accent: "sky" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {platforms.map(({ name, hook, note, signal, accent }) => {
        const accentText = { cyan: "text-cyan-300", violet: "text-violet-300", sky: "text-sky-300" }[accent];
        const accentBorder = { cyan: "border-cyan-300/18 bg-cyan-300/[0.05]", violet: "border-violet-300/18 bg-violet-300/[0.05]", sky: "border-sky-300/18 bg-sky-300/[0.05]" }[accent];
        const accentSignal = { cyan: "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200", violet: "border-violet-300/20 bg-violet-300/[0.08] text-violet-200", sky: "border-sky-300/20 bg-sky-300/[0.08] text-sky-200" }[accent];
        return (
          <div key={name} className={`rounded-[24px] border p-5 ${accentBorder}`}>
            <p className={`text-xs font-black uppercase tracking-[0.14em] ${accentText}`}>{name}</p>
            <p className="mt-3 text-lg font-black text-white">{hook}</p>
            <p className="mt-2 text-sm leading-6 text-white/52">{note}</p>
            <div className="mt-4">
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${accentSignal}`}>
                {signal}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function CreatorAuthoritySection() {
  return (
    <section className="mx-auto mt-14 max-w-[1320px] px-5 md:px-8">
      {/* Section header */}
      <motion.div {...fade()} className="mb-10 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Creator intelligence</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
          The full pre-publish workflow in one platform.
        </h2>
        <p className="mt-5 text-lg leading-8 text-white/55">
          From hook analysis to packaging comparison and platform-specific retention signals — every signal you need before you publish.
        </p>
      </motion.div>

      {/* Workflow stages */}
      <motion.div {...fade(0.08)} className="grid gap-4 md:grid-cols-3 mb-6">
        <WorkflowStage
          step="01"
          label="Diagnose"
          title="Hook scoring"
          desc="Score your opening line for clarity, curiosity gap and retention strength across platforms."
          accent="cyan"
          metrics={[
            { key: "Clarity", value: "88" },
            { key: "Curiosity", value: "83" },
            { key: "Risk", value: "Low" },
          ]}
        />
        <WorkflowStage
          step="02"
          label="Improve"
          title="Hook rewriting"
          desc="Turn vague openings into specific, tension-driven hooks with four named rewrite angles."
          accent="violet"
          metrics={[
            { key: "Variants", value: "4×" },
            { key: "Score lift", value: "+51" },
            { key: "Angles", value: "Named" },
          ]}
        />
        <WorkflowStage
          step="03"
          label="Package"
          title="Title + thumbnail"
          desc="Align the hook promise with a CTR-optimized title and thumbnail text before the idea goes live."
          accent="sky"
          metrics={[
            { key: "CTR", value: "88" },
            { key: "Length", value: "Optimal" },
            { key: "Keywords", value: "Early" },
          ]}
        />
      </motion.div>

      {/* Packaging comparison */}
      <motion.div {...fade(0.14)} className="mb-6">
        <PackagingComparison />
      </motion.div>

      {/* Platform signals */}
      <motion.div {...fade(0.18)}>
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-white/38">Platform-specific signals</p>
          <p className="mt-2 text-2xl font-black tracking-tight text-white">Every platform has a different hook window.</p>
        </div>
        <PlatformSignals />
      </motion.div>

      {/* CTA */}
      <motion.div {...fade(0.22)} className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="/youtube-video-analyzer"
          className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-3.5 text-sm font-black text-black shadow-[0_20px_48px_rgba(34,211,238,.18)] transition hover:scale-[1.01]"
        >
          Analyze a YouTube video →
        </a>
        <a
          href="/hook-analyzer"
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-black text-white/70 transition hover:bg-white/[0.07]"
        >
          Score your hook text
        </a>
      </motion.div>
    </section>
  );
}
