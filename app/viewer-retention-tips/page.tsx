"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PremiumToolShell from "../components/premium-tool-shell";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/motion";
import FAQBlock from "../components/faq-block";
import RelatedTools from "../components/related-tools";

// ─── Illustrative retention data — clearly labeled ─────────────────────────
const retentionCompare = [
  { label: "0s",  weak: 100, strong: 100 },
  { label: "5s",  weak: 72,  strong: 95  },
  { label: "10s", weak: 52,  strong: 88  },
  { label: "20s", weak: 38,  strong: 79  },
  { label: "30s", weak: 29,  strong: 71  },
  { label: "45s", weak: 23,  strong: 62  },
  { label: "60s", weak: 19,  strong: 55  },
];

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-[#09111f] px-4 py-3 text-sm shadow-xl">
      <p className="mb-2 text-xs font-bold text-white/45">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-xs font-black" style={{ color: entry.color }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  );
}

const tips = [
  {
    step: "01",
    title: "Start with the outcome, not the setup",
    desc: "The fastest way to improve retention is to move the payoff earlier. Viewers need to see why the next 60 seconds matters within the first 5.",
    color: "border-cyan-300/20 bg-cyan-300/[0.05]",
    label: "text-cyan-300",
  },
  {
    step: "02",
    title: "Remove every sentence that does not move the idea forward",
    desc: "Most videos have 10–15 seconds of filler before the real content begins. Each filler second increases early drop-off probability.",
    color: "border-violet-300/20 bg-violet-300/[0.05]",
    label: "text-violet-300",
  },
  {
    step: "03",
    title: "Open curiosity loops — and actually close them",
    desc: "State something that creates a question: 'The reason most creators get this wrong is...' Then deliver the answer. Loops that stay open feel like clickbait.",
    color: "border-sky-300/20 bg-sky-300/[0.05]",
    label: "text-sky-300",
  },
  {
    step: "04",
    title: "Match your hook promise to the visual",
    desc: "If the hook says 'I changed one line', the viewer expects to see that line. Mismatched packaging creates confusion that kills retention.",
    color: "border-amber-300/20 bg-amber-300/[0.05]",
    label: "text-amber-300",
  },
  {
    step: "05",
    title: "Use pattern interrupts to reset attention",
    desc: "Every 15–20 seconds, viewer attention naturally dips. A visual change, tonal shift, or new tension point resets the attention clock.",
    color: "border-emerald-300/20 bg-emerald-300/[0.05]",
    label: "text-emerald-300",
  },
];

const faqs = [
  {
    question: "What is the most common retention mistake?",
    answer:
      "Opening with context instead of tension. Most videos explain what they are about before giving viewers a reason to care. Strong hooks reverse this — tension first, context second.",
  },
  {
    question: "Why do viewers leave after the first 5 seconds?",
    answer:
      "The hook failed to make the payoff feel worth the next 30 seconds. When the viewer cannot see the value immediately, they swipe to something clearer.",
  },
  {
    question: "Do hooks affect overall retention or just the first seconds?",
    answer:
      "A strong hook sets up expectations. When content delivers on those expectations, viewers stay longer. A weak hook creates a mismatch that damages retention throughout the video.",
  },
  {
    question: "How does HookSignals help with retention?",
    answer:
      "HookSignals scores the opening line for clarity, curiosity gap and retention risk before publishing. The score shows where the hook is weak and what to change before the video goes live.",
  },
];

export default function ViewerRetentionTipsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <PremiumToolShell
      badge="Retention framework"
      title="Viewer Retention Tips"
      description="Retention is built before the video is recorded. These five principles reduce early drop-off, improve watch-through rate and make your opening line earn the next 60 seconds."
      primaryHref="/hook-analyzer"
      primaryLabel="Check Your Hook"
      secondaryHref="/retention-hook-examples"
      secondaryLabel="Hook Examples"
    >

      {/* Retention comparison chart */}
      <FadeIn>
        <section className="rounded-[28px] border border-white/10 bg-white/[0.025] p-5 md:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
                Illustrative retention comparison
              </p>
              <p className="mt-1 text-xs text-white/38">
                Example data only — not based on real channel performance
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-5 rounded-full bg-white/30" />
                Weak hook
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-5 rounded-full bg-cyan-300" />
                Strong hook
              </span>
            </div>
          </div>
          <div className="h-[240px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={retentionCompare} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="strongFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}    />
                    </linearGradient>
                    <linearGradient id="weakFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#94a3b8" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "rgba(255,255,255,0.30)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(v: number) => `${v}%`}
                    tick={{ fill: "rgba(255,255,255,0.30)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 25, 50, 75, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="weak"
                    name="Weak hook"
                    stroke="rgba(148,163,184,0.45)"
                    strokeWidth={1.5}
                    fill="url(#weakFill)"
                    strokeDasharray="4 3"
                    dot={false}
                    isAnimationActive
                    animationDuration={1200}
                  />
                  <Area
                    type="monotone"
                    dataKey="strong"
                    name="Strong hook"
                    stroke="#22d3ee"
                    strokeWidth={2.5}
                    fill="url(#strongFill)"
                    dot={false}
                    isAnimationActive
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full animate-pulse rounded-2xl bg-white/[0.04]" />
            )}
          </div>
        </section>
      </FadeIn>

      {/* 5 tips */}
      <div className="mt-6">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/35">
          Five retention principles
        </p>
        <StaggerContainer className="grid gap-3">
          {tips.map((tip) => (
            <StaggerItem key={tip.step}>
              <div className={`rounded-[22px] border p-5 ${tip.color}`}>
                <div className="flex gap-4">
                  <span className={`shrink-0 text-xs font-black ${tip.label}`}>{tip.step}</span>
                  <div>
                    <p className="font-black text-white">{tip.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/58">{tip.desc}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Retention signal callout */}
      <FadeIn>
        <section className="mt-6 rounded-[28px] border border-cyan-300/18 bg-[linear-gradient(135deg,rgba(34,211,238,.07),rgba(124,58,237,.05))] p-5 md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
            Pre-publish retention check
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight">
            Test retention signals before the video goes live.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">
            HookSignals scores the opening line for clarity, curiosity gap, platform pacing and retention risk. Fix weak signals before publishing instead of reading analytics after.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/hook-analyzer"
              className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-6 py-3 text-sm font-black text-black transition hover:scale-[1.01]"
            >
              Analyze your hook
            </a>
            <a
              href="/retention-hook-examples"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-black text-white/70 transition hover:bg-white/[0.07]"
            >
              View retention hook examples
            </a>
          </div>
        </section>
      </FadeIn>

      <div className="mt-8">
        <FAQBlock items={faqs} />
        <RelatedTools />
      </div>
    </PremiumToolShell>
  );
}
