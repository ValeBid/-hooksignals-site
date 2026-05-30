"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./motion";

const EASE = "easeOut" as const;

const fadeCard = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const hoverProps = { y: -5, transition: { duration: 0.2, ease: EASE } };

const hookScores = [
  { label: "Clarity", value: 88 },
  { label: "Curiosity", value: 86 },
  { label: "Retention pull", value: 82 },
];

function MiniBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400"
        initial={{ width: "0%" }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
      />
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section className="mx-auto mt-20 max-w-[1320px] px-5 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-10 max-w-2xl"
      >
        <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Predictor suite</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
          Every signal you need before you hit publish.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* Card 1 — YouTube Video Analyzer (large, 2/3) — flagship */}
        <motion.a
          href="/youtube-video-analyzer"
          {...fadeCard(0)}
          whileHover={hoverProps}
          className="group relative overflow-hidden rounded-[32px] border border-cyan-300/22 bg-[radial-gradient(circle_at_80%_10%,rgba(34,211,238,.10),transparent_40%),rgba(255,255,255,0.04)] p-6 md:col-span-2 md:p-8 cursor-pointer"
        >
          <div className="absolute right-0 top-0 h-[220px] w-[220px] -translate-y-1/3 translate-x-1/3 rounded-full bg-cyan-400/14 blur-[80px]" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-full border border-cyan-300/22 bg-cyan-300/[0.10] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
                Flagship
              </span>
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white/40">
                Live YouTube data
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">
              YouTube Video Analyzer
            </h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/52">
              Paste any YouTube URL to fetch real views, likes, transcript and subscribers — then get an AI analysis of hook strength, packaging and retention risk.
            </p>

            <div className="mt-6 grid gap-3">
              {hookScores.map((s) => (
                <div key={s.label}>
                  <div className="mb-1.5 flex justify-between text-xs text-white/45">
                    <span>{s.label}</span>
                    <span className="font-bold text-white/60">{s.value}/100</span>
                  </div>
                  <MiniBar value={s.value} />
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm font-black text-cyan-300 transition group-hover:translate-x-1">
              Analyze YouTube Video →
            </p>
          </div>
        </motion.a>

        {/* Card 2 — Outlier Score (small) */}
        <motion.div
          {...fadeCard(0.08)}
          className="relative overflow-hidden rounded-[32px] border border-cyan-300/20 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,.12),transparent_55%),linear-gradient(135deg,rgba(34,211,238,.06),rgba(168,85,247,.06))] p-6 md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,.12),transparent_50%)]" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-violet-300/20 bg-violet-300/[0.08] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-violet-200">
              Detect
            </span>
            <p className="mt-5 text-sm text-white/50">Outlier potential</p>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-2 text-7xl font-black tracking-[-0.06em] text-cyan-200"
            >
              8.7<span className="text-4xl text-cyan-300/70">×</span>
            </motion.p>
            <p className="mt-3 text-sm leading-6 text-white/50">
              Expected outlier multiplier detected in this hook and title pairing.
            </p>
          </div>
        </motion.div>

        {/* Card 3 — CTR Signal */}
        <motion.a
          href="/hook-analyzer"
          {...fadeCard(0.12)}
          whileHover={hoverProps}
          className="group rounded-[32px] border border-white/10 bg-black/24 p-6 cursor-pointer"
        >
          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white/45">
            Package
          </span>
          <h3 className="mt-4 text-xl font-black text-white">CTR Potential</h3>
          <p className="mt-2 text-sm leading-6 text-white/48">Title and thumbnail click signal before publishing.</p>

          <div className="mt-6">
            <div className="flex items-end justify-between">
              <AnimatedCounter to={90} duration={1.4} className="text-5xl font-black text-white" />
              <span className="mb-2 text-white/38">/100</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-sky-400"
                initial={{ width: "0%" }}
                whileInView={{ width: "90%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
              />
            </div>
          </div>
          <p className="mt-5 text-sm font-black text-cyan-300 transition group-hover:translate-x-1">Analyze title →</p>
        </motion.a>

        {/* Card 4 — Retention Risk */}
        <motion.a
          href="/hook-analyzer"
          {...fadeCard(0.16)}
          whileHover={hoverProps}
          className="group rounded-[32px] border border-white/10 bg-black/24 p-6 cursor-pointer"
        >
          <span className="inline-flex rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-amber-200">
            Risk
          </span>
          <h3 className="mt-4 text-xl font-black text-white">Retention Risk</h3>
          <p className="mt-2 text-sm leading-6 text-white/48">Early drop-off probability from the opening signal.</p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {[18, 22, 14].map((v, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.035] p-3 text-center">
                <p className="text-xl font-black text-white">{v}%</p>
                <p className="mt-1 text-[10px] text-white/38">{["30s", "60s", "End"][i]}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm font-black text-cyan-300 transition group-hover:translate-x-1">Check risk →</p>
        </motion.a>

        {/* Card 5 — Thumbnail Check */}
        <motion.a
          href="/thumbnail-text-checker"
          {...fadeCard(0.2)}
          whileHover={hoverProps}
          className="group rounded-[32px] border border-white/10 bg-black/24 p-6 cursor-pointer"
        >
          <span className="inline-flex rounded-full border border-violet-300/18 bg-violet-300/[0.06] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-violet-200">
            Visual
          </span>
          <h3 className="mt-4 text-xl font-black text-white">Thumbnail Check</h3>
          <p className="mt-2 text-sm leading-6 text-white/48">Mobile readability score for your thumbnail text.</p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs text-white/35 uppercase tracking-[0.14em] font-bold">Example text</p>
            <p className="mt-2 text-2xl font-black text-white">"Stop Doing This"</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "78%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
              <span className="text-xs font-black text-white/50">78/100</span>
            </div>
          </div>
          <p className="mt-5 text-sm font-black text-cyan-300 transition group-hover:translate-x-1">Check thumbnail →</p>
        </motion.a>

        {/* Card 6 — Workflow (large, 2/3) */}
        <motion.div
          {...fadeCard(0.24)}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,.10),transparent_45%),linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.018))] p-6 md:col-span-2 md:p-8"
        >
          <span className="inline-flex rounded-full border border-cyan-300/18 bg-cyan-300/[0.08] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
            Workflow
          </span>
          <h3 className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">
            One signal. Four decisions before publish.
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/52">
            Every tool in HookSignals feeds the next decision in your pre-publish checklist. Analyze the hook, then lock the title, thumbnail and script.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              { step: "01", title: "Analyze", desc: "Score the opening hook." },
              { step: "02", title: "Improve", desc: "Rewrite weak signals." },
              { step: "03", title: "Package", desc: "Align title + thumbnail." },
              { step: "04", title: "Publish", desc: "Ship with confidence." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="rounded-[22px] border border-white/10 bg-black/24 p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">{step}</p>
                <p className="mt-2 font-black text-white">{title}</p>
                <p className="mt-1 text-xs leading-5 text-white/42">{desc}</p>
              </div>
            ))}
          </div>

          <a
            href="/tools"
            className="mt-6 inline-flex rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.07] px-6 py-3 text-sm font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]"
          >
            View all tools →
          </a>
        </motion.div>

        {/* Card 7 — Script Generator */}
        <motion.a
          href="/shorts-script-generator"
          {...fadeCard(0.28)}
          whileHover={hoverProps}
          className="group rounded-[32px] border border-white/10 bg-black/24 p-6 cursor-pointer"
        >
          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white/45">
            Script
          </span>
          <h3 className="mt-4 text-xl font-black text-white">Shorts Script Builder</h3>
          <p className="mt-2 text-sm leading-6 text-white/48">Retention-focused scripts from hook to CTA.</p>
          <div className="mt-5 space-y-2">
            {["Hook → tension", "Beat → context", "Payoff → action"].map((line) => (
              <p key={line} className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-xs font-bold text-white/55">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-5 text-sm font-black text-cyan-300 transition group-hover:translate-x-1">Build script →</p>
        </motion.a>

      </div>
    </section>
  );
}
