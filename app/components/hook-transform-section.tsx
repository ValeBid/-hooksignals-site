"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ─── Example data — clearly not real user data ─────────────────────────────
const WEAK = {
  text: "This changed everything",
  score: 12,
  clarityScore: 18,
  curiosityScore: 14,
  retentionRisk: 91,
  pattern: "Vague personal opener",
  diagnosis:
    "No subject, no payoff, no tension. The viewer has no idea what changed, why it matters, or whether they should care.",
};

const STRONG = {
  text: "I changed one line in my Shorts intro and first-30s retention improved by 26 points",
  score: 84,
  clarityScore: 88,
  curiosityScore: 83,
  retentionRisk: 17,
  pattern: "Specific test with measurable outcome",
  diagnosis:
    "Names the action, the format, the metric and the result. The viewer understands the payoff before the second sentence.",
};

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Score bar ─────────────────────────────────────────────────────────────
function Bar({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "red" | "cyan";
}) {
  const trackClass = accent === "cyan"
    ? "bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400"
    : "bg-gradient-to-r from-red-500 to-orange-400";

  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-white/50">{label}</span>
        <span className="font-semibold text-white/60">{value}/100</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <motion.div
          className={`h-full rounded-full ${trackClass}`}
          initial={{ width: "0%" }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Hook card ─────────────────────────────────────────────────────────────
function HookCard({
  hook,
  variant,
}: {
  hook: typeof WEAK;
  variant: "weak" | "strong";
}) {
  const isStrong = variant === "strong";
  const scoreColor = isStrong ? "text-cyan-300" : "text-red-400";
  const riskLabel = hook.retentionRisk > 65 ? "Critical" : hook.retentionRisk > 35 ? "Medium" : "Low";
  const riskClass = hook.retentionRisk > 65
    ? "border-red-400/25 bg-red-400/[0.07] text-red-400"
    : hook.retentionRisk > 35
    ? "border-yellow-300/25 bg-yellow-300/[0.07] text-yellow-300"
    : "border-emerald-300/25 bg-emerald-300/[0.07] text-emerald-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: isStrong ? 0.12 : 0, ease: EASE }}
      className={`rounded-[28px] border p-5 md:p-6 ${
        isStrong
          ? "border-cyan-300/22 bg-[linear-gradient(135deg,rgba(34,211,238,.07),rgba(124,58,237,.05))]"
          : "border-red-400/18 bg-red-400/[0.04]"
      }`}
    >
      {/* Label */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${
            isStrong
              ? "border-cyan-300/22 bg-cyan-300/[0.09] text-cyan-200"
              : "border-red-400/22 bg-red-400/[0.09] text-red-300"
          }`}
        >
          {isStrong ? "After" : "Before"}
        </span>
        <span className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black ${riskClass}`}>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
          Risk: {riskLabel}
        </span>
      </div>

      {/* Hook text */}
      <div className={`mb-5 rounded-[18px] border p-4 ${
        isStrong ? "border-cyan-300/15 bg-black/22" : "border-red-400/12 bg-black/22"
      }`}>
        <p className="text-sm font-black uppercase tracking-[0.12em] text-white/35 mb-2">
          Hook
        </p>
        <p className="leading-7 text-white/82 text-sm">
          &ldquo;{hook.text}&rdquo;
        </p>
      </div>

      {/* Score */}
      <div className="mb-5 flex items-end gap-3">
        <span className={`text-6xl font-black leading-none tracking-tight ${scoreColor}`}>
          {hook.score}
        </span>
        <span className="mb-2 text-white/35">/100</span>
        <span className="mb-1.5 text-sm font-black text-white/55">{hook.pattern}</span>
      </div>

      {/* Bars */}
      <div className="mb-5 space-y-3">
        <Bar label="Clarity" value={hook.clarityScore} accent={isStrong ? "cyan" : "red"} />
        <Bar label="Curiosity gap" value={hook.curiosityScore} accent={isStrong ? "cyan" : "red"} />
        <Bar
          label="Retention strength"
          value={100 - hook.retentionRisk}
          accent={isStrong ? "cyan" : "red"}
        />
      </div>

      {/* Diagnosis */}
      <div className={`rounded-2xl border p-4 text-sm leading-6 text-white/60 ${
        isStrong
          ? "border-cyan-300/12 bg-cyan-300/[0.04]"
          : "border-white/10 bg-black/22"
      }`}>
        <p className="mb-1 text-[10px] font-black uppercase tracking-[0.14em] text-white/35">
          {isStrong ? "Why it works" : "Why it fails"}
        </p>
        <p>{hook.diagnosis}</p>
      </div>
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────
export default function HookTransformSection() {
  return (
    <section className="mx-auto mt-14 max-w-[1320px] px-5 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: EASE }}
        className="mb-10"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/45">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
          Example Analysis — not real user data
        </div>
        <h2 className="max-w-3xl text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
          See what the analyzer actually does.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/55">
          The same hook, before and after analysis. HookSignals scores clarity,
          curiosity gap, retention risk and pattern — then shows you exactly why
          it works or fails.
        </p>
      </motion.div>

      {/* Before / After grid */}
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <HookCard hook={WEAK} variant="weak" />

        {/* Connector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="hidden flex-col items-center gap-2 md:flex"
        >
          <div className="h-px w-8 bg-white/20" />
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-sm font-black text-cyan-300">
            →
          </div>
          <div className="h-px w-8 bg-white/20" />
        </motion.div>

        {/* Mobile arrow */}
        <div className="flex justify-center md:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-sm font-black text-cyan-300">
            ↓
          </div>
        </div>

        <HookCard hook={STRONG} variant="strong" />
      </div>

      {/* Score delta callout */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        className="mt-6 grid gap-3 rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:grid-cols-3"
      >
        {[
          { label: "Hook score", before: WEAK.score, after: STRONG.score, suffix: "/100" },
          { label: "Clarity", before: WEAK.clarityScore, after: STRONG.clarityScore, suffix: "/100" },
          { label: "Retention risk", before: WEAK.retentionRisk, after: STRONG.retentionRisk, suffix: "%", invert: true },
        ].map(({ label, before, after, suffix, invert }) => {
          const diff = invert ? before - after : after - before;
          return (
            <div key={label} className="rounded-2xl border border-white/10 bg-black/24 p-4">
              <p className="text-xs text-white/38">{label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-white/35 line-through">{before}{suffix}</span>
                <span className="text-2xl font-black text-cyan-300">{after}{suffix}</span>
              </div>
              <p className="mt-1 text-xs font-black text-cyan-300">
                {invert ? `−${diff}` : `+${diff}`} {invert ? "lower risk" : "improvement"}
              </p>
            </div>
          );
        })}
      </motion.div>

      {/* CTA */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href="/hook-analyzer"
          className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-3.5 text-sm font-black text-black shadow-[0_20px_48px_rgba(34,211,238,.18)] transition hover:scale-[1.01]"
        >
          Analyze your hook →
        </Link>
        <Link
          href="/viral-hook-examples"
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-black text-white/70 transition hover:bg-white/[0.07]"
        >
          See more examples
        </Link>
      </div>
    </section>
  );
}
