"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import CopyButton from "./copy-button";

// ─── Types ────────────────────────────────────────────────────────────────────
type HookAnalysis = {
  hookScore: number;
  clarityScore: number;
  curiosityScore: number;
  retentionRisk: number;
  pattern: string;
  weakness: string;
  improvedHook: string;
  variants: string[];
  retentionNotes: string[];
  scoreRationale?: string[];
  audienceTrigger?: string;
  titlePairings?: string[];
  thumbnailAngles?: string[];
};

// ─── Derived metrics ──────────────────────────────────────────────────────────
function ctrPotential(hookScore: number, curiosityScore: number): number {
  return Math.min(96, Math.max(8, Math.round(hookScore * 0.58 + curiosityScore * 0.42)));
}

function packagingScore(clarityScore: number, curiosityScore: number): number {
  return Math.min(96, Math.max(8, Math.round((clarityScore + curiosityScore) / 2)));
}

function scoreLabel(s: number): string {
  if (s >= 85) return "Scroll-stopper";
  if (s >= 72) return "Strong angle";
  if (s >= 58) return "Promising draft";
  if (s >= 42) return "Needs sharper stakes";
  return "Weak hook";
}

function riskProfile(r: number) {
  if (r <= 35) return { label: "Low", textClass: "text-emerald-300", dot: "bg-emerald-400", border: "border-emerald-300/25 bg-emerald-300/[0.07]" };
  if (r <= 65) return { label: "Medium", textClass: "text-yellow-300", dot: "bg-yellow-400", border: "border-yellow-300/25 bg-yellow-300/[0.07]" };
  return { label: "High", textClass: "text-red-400", dot: "bg-red-400", border: "border-red-400/25 bg-red-400/[0.07]" };
}

// ─── Main Arc Gauge ───────────────────────────────────────────────────────────
// 240° sweep, starts at ~8 o'clock, ends at ~4 o'clock (bottom gap centered).
function ArcGauge({
  score,
  size = 210,
  mounted,
}: {
  score: number;
  size?: number;
  mounted: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const r = size * 0.36;
  const cx = size / 2;
  const cy = size * 0.54;
  const circ = 2 * Math.PI * r;
  const trackLen = (240 / 360) * circ;
  const filled = ((mounted ? score : 0) / 100) * trackLen;
  const grad0 = score >= 72 ? "#22d3ee" : score >= 50 ? "#fbbf24" : "#f87171";
  const grad1 = score >= 72 ? "#818cf8" : score >= 50 ? "#f97316" : "#dc2626";

  return (
    <svg
      width={size}
      height={Math.round(size * 0.72)}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: "visible" }}
      role="img"
      aria-label={`Hook score: ${score} out of 100`}
    >
      <defs>
        <linearGradient id={`ag-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={grad0} />
          <stop offset="100%" stopColor={grad1} />
        </linearGradient>
        <filter id={`af-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Track */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={size * 0.088}
        strokeDasharray={`${trackLen} ${circ - trackLen}`}
        strokeLinecap="round"
        transform={`rotate(150 ${cx} ${cy})`}
      />
      {/* Glow halo */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={grad0}
        strokeWidth={size * 0.088}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        transform={`rotate(150 ${cx} ${cy})`}
        opacity={0.18}
        style={{ filter: `blur(${size * 0.035}px)`, transition: "stroke-dasharray 1.1s cubic-bezier(0.34,1.56,0.64,1)" }}
      />
      {/* Fill arc */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={`url(#ag-${uid})`}
        strokeWidth={size * 0.088}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        transform={`rotate(150 ${cx} ${cy})`}
        filter={`url(#af-${uid})`}
        style={{ transition: "stroke-dasharray 1.1s cubic-bezier(0.34,1.56,0.64,1)" }}
      />

      {/* Score */}
      <text
        x={cx}
        y={cy - size * 0.02}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: size * 0.31, fontWeight: 900, fill: "white", letterSpacing: "-0.04em", fontFamily: "inherit" }}
      >
        {score}
      </text>
      <text
        x={cx}
        y={cy + size * 0.2}
        textAnchor="middle"
        style={{ fontSize: size * 0.085, fill: "rgba(255,255,255,0.38)", fontFamily: "inherit" }}
      >
        /100
      </text>
    </svg>
  );
}

// ─── Mini Arc for secondary metrics ──────────────────────────────────────────
function MiniArc({
  score,
  size = 86,
  color = "#22d3ee",
  mounted,
}: {
  score: number;
  size?: number;
  color?: string;
  mounted: boolean;
}) {
  const r = size * 0.37;
  const cx = size / 2;
  const cy = size * 0.54;
  const circ = 2 * Math.PI * r;
  const trackLen = (240 / 360) * circ;
  const filled = ((mounted ? score : 0) / 100) * trackLen;

  return (
    <svg width={size} height={Math.round(size * 0.72)} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={size * 0.1}
        strokeDasharray={`${trackLen} ${circ - trackLen}`}
        strokeLinecap="round"
        transform={`rotate(150 ${cx} ${cy})`}
      />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={color}
        strokeWidth={size * 0.1}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        transform={`rotate(150 ${cx} ${cy})`}
        style={{ transition: "stroke-dasharray 0.95s ease-out", transitionDelay: "0.12s" }}
      />
      <text
        x={cx} y={cy - size * 0.02}
        textAnchor="middle" dominantBaseline="middle"
        style={{ fontSize: size * 0.3, fontWeight: 900, fill: "white", fontFamily: "inherit" }}
      >
        {score}
      </text>
    </svg>
  );
}

// ─── Score bar ────────────────────────────────────────────────────────────────
function ScoreBar({ label, value, mounted }: { label: string; value: number; mounted: boolean }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="text-white/52">{label}</span>
        <span className="font-semibold text-white/65">{value}/100</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400"
          style={{ width: mounted ? `${value}%` : "0%", transition: "width 0.9s ease-out" }}
        />
      </div>
    </div>
  );
}

// ─── Locked output items (shown in upgrade CTA) ───────────────────────────────
const lockedOutputs = [
  { title: "10 advanced rewrites", desc: "More angles for curiosity, proof, pain, contrast and speed." },
  { title: "5 title pairings", desc: "Match the hook with click intent instead of guessing." },
  { title: "5 thumbnail angles", desc: "Turn the same promise into a visual stopping point." },
  { title: "Saved workflow history", desc: "Keep analyses, rewrites and packaging ideas in one dashboard." },
];

// ─── Workflow next steps ──────────────────────────────────────────────────────
const workflowActions = [
  { step: "01", name: "Improve Hook", href: "/hook-improver", desc: "Turn the strongest rewrite into more punchy first-line variants." },
  { step: "02", name: "Generate Title", href: "/youtube-title-generator", desc: "Match the hook promise with a title that increases click intent." },
  { step: "03", name: "Check Thumbnail", href: "/thumbnail-text-checker", desc: "Make sure the visual promise is readable and consistent with the hook." },
  { step: "04", name: "Write Script Opener", href: "/shorts-script-generator", desc: "Build the first 10 seconds around the hook, title and thumbnail angle." },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function HookAnalysisResult({
  result,
  mode,
}: {
  result: HookAnalysis;
  mode: "ai" | "rules" | null;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => cancelAnimationFrame(raf);
  }, []);

  const ctr = ctrPotential(result.hookScore, result.curiosityScore);
  const pkg = packagingScore(result.clarityScore, result.curiosityScore);
  const risk = riskProfile(result.retentionRisk);
  const label = scoreLabel(result.hookScore);

  const rationale = result.scoreRationale?.length
    ? result.scoreRationale
    : [result.weakness, "Score reflects clarity, curiosity and first-second retention risk."];
  const titlePairings = result.titlePairings?.length
    ? result.titlePairings
    : ["The mistake behind this result", "What changed after the first test", "I tested this so you do not have to"];
  const thumbnailAngles = result.thumbnailAngles?.length
    ? result.thumbnailAngles
    : ["Before / after contrast", "One bold result word", "Mistake label over the key moment"];

  return (
    <div className="grid gap-5">

      {/* ── Hero: gauge + breakdown ─────────────────────────────────────── */}
      <div className="rounded-[28px] border border-cyan-300/18 bg-[linear-gradient(135deg,rgba(6,182,212,.07),rgba(124,58,237,.05))] p-5 shadow-[0_28px_80px_rgba(0,0,0,.35)] md:p-7">
        {/* Status bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-cyan-300/22 bg-cyan-300/[0.09] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-cyan-100">
              {mode === "ai" ? "AI analysis" : "Hook analysis"}
            </div>
            {mode === "rules" && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/38">
                Rule-based scoring
              </span>
            )}
          </div>
          <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${risk.border}`}>
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${risk.dot}`} />
            <span className={risk.textClass}>Retention risk: {risk.label}</span>
          </div>
        </div>

        {/* Gauge + scores */}
        <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
          {/* Left: gauge */}
          <div className="flex flex-col items-center gap-3">
            <ArcGauge score={result.hookScore} size={200} mounted={mounted} />
            <div className="text-center">
              <p className="text-xl font-black tracking-tight text-white">{label}</p>
              <p className="mt-1 max-w-[200px] text-xs leading-5 text-white/45">
                {result.hookScore >= 72
                  ? "Strong retention pull. Package the same promise in the title and thumbnail."
                  : "Sharpen the payoff and tension before publishing."}
              </p>
            </div>
          </div>

          {/* Right: bars + mini metrics */}
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <ScoreBar label="Clarity" value={result.clarityScore} mounted={mounted} />
              <ScoreBar label="Curiosity gap" value={result.curiosityScore} mounted={mounted} />
              <ScoreBar label="Retention strength" value={100 - result.retentionRisk} mounted={mounted} />
            </div>

            {/* CTR potential + Packaging score */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[20px] border border-cyan-300/18 bg-black/24 p-3 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300/80">
                  CTR Potential
                </p>
                <div className="flex justify-center py-1">
                  <MiniArc score={ctr} color="#22d3ee" mounted={mounted} />
                </div>
                <p className="text-xs text-white/38">Hook × curiosity</p>
              </div>
              <div className="rounded-[20px] border border-violet-300/18 bg-black/24 p-3 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-violet-300/80">
                  Packaging Score
                </p>
                <div className="flex justify-center py-1">
                  <MiniArc score={pkg} color="#a78bfa" mounted={mounted} />
                </div>
                <p className="text-xs text-white/38">Clarity × curiosity</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pattern + audience trigger ──────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-black/24 p-5">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-white/38">
            Pattern classification
          </p>
          <p className="font-black leading-7 text-white">{result.pattern}</p>
          <p className="mt-3 text-sm leading-7 text-white/50">{result.weakness}</p>
        </div>
        <div className="rounded-[24px] border border-violet-300/15 bg-violet-300/[0.05] p-5">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-violet-300/80">
            Audience trigger
          </p>
          <p className="leading-7 text-white/75">
            {result.audienceTrigger ?? "The viewer needs a clear payoff and a reason to keep watching."}
          </p>
        </div>
      </div>

      {/* ── Improved hook + variants ────────────────────────────────────── */}
      <div className="rounded-[28px] border border-white/10 bg-black/22 p-5 md:p-7">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
              Improved hook
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">Sharper versions to test</h2>
          </div>
          <Link
            href="/checkout/pro"
            className="rounded-2xl border border-cyan-300/28 bg-cyan-300/[0.07] px-5 py-2.5 text-sm font-black text-cyan-100 transition hover:bg-cyan-300/[0.13]"
          >
            Unlock full workflow
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Primary improved hook */}
          <div className="md:col-span-2 rounded-[22px] border border-cyan-300/22 bg-cyan-300/[0.06] p-5 leading-7 text-white/85">
            <p>&ldquo;{result.improvedHook}&rdquo;</p>
            <CopyButton text={result.improvedHook} />
          </div>

          {/* Variants */}
          {result.variants.map((v) => (
            <div
              key={v}
              className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 leading-7 text-white/72"
            >
              <p>&ldquo;{v}&rdquo;</p>
              <CopyButton text={v} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Score rationale ─────────────────────────────────────────────── */}
      <div className="rounded-[24px] border border-white/10 bg-black/22 p-5">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/38">
          Why this score?
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {rationale.map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/62"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-300/22 bg-emerald-300/[0.09] text-xs text-emerald-300">
                ✓
              </span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Retention notes ─────────────────────────────────────────────── */}
      <div className="rounded-[24px] border border-white/10 bg-black/22 p-5">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/38">
          Retention notes
        </p>
        <div className="grid gap-3">
          {result.retentionNotes.map((note, i) => (
            <div
              key={note}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 leading-7 text-white/62"
            >
              <span className="mt-0.5 shrink-0 font-black text-violet-400">0{i + 1}</span>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Title pairings + thumbnail angles ───────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-white/38">
            Title pairings
          </p>
          <div className="space-y-2">
            {titlePairings.map((item) => (
              <p
                key={item}
                className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white/62"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-white/38">
            Thumbnail angles
          </p>
          <div className="space-y-2">
            {thumbnailAngles.map((item) => (
              <p
                key={item}
                className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white/62"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Upgrade CTA ─────────────────────────────────────────────────── */}
      <div className="rounded-[30px] border border-cyan-300/22 bg-[linear-gradient(135deg,rgba(34,211,238,.10),rgba(124,58,237,.08))] p-5 shadow-[0_26px_90px_rgba(34,211,238,.09)] md:p-7">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
              Unlock the full analysis
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
              Turn this score into a publish-ready package.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">
              Creator Pro unlocks deeper rewrites, title pairings, thumbnail angles and saved workflow history so hook, title and visual promise work together.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/28 p-5">
            <div className="grid gap-3">
              {lockedOutputs.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.09] text-xs text-cyan-200">
                    🔒
                  </span>
                  <div>
                    <p className="text-sm font-black text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-white/45">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/checkout/pro"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-5 py-4 text-sm font-black text-black transition hover:scale-[1.01]"
            >
              Unlock with Creator Pro
            </Link>
            <p className="mt-3 text-center text-xs text-white/35">
              Secure checkout by Paddle · credits attach to dashboard
            </p>
          </div>
        </div>
      </div>

      {/* ── Continue workflow ────────────────────────────────────────────── */}
      <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-5 md:p-7">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
          Next recommended workflow
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-tight">
          Do not stop at the hook. Package the whole idea.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/52">
          A strong hook still needs a matching title, thumbnail and first 10 seconds before publishing.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {workflowActions.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-[22px] border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/28 hover:bg-cyan-300/[0.05]"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300">
                Step {tool.step}
              </p>
              <h3 className="mt-2 text-lg font-black text-white">{tool.name}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/48">{tool.desc}</p>
              <p className="mt-3 text-xs font-black text-cyan-200">Continue →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
