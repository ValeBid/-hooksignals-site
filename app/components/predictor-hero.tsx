"use client";

import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { trackEvent } from "../lib/analytics";

const EASE = "easeOut" as const;

const scores = [
  { label: "Win Score", value: 87 },
  { label: "Hook Strength", value: 85 },
  { label: "Retention Potential", value: 82 },
  { label: "CTR Potential", value: 90 },
];

const navLinks = [
  { label: "YouTube Analyzer", href: "/youtube-video-analyzer" },
  { label: "Tools", href: "/tools" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-300/20 via-sky-400/10 to-violet-400/20 shadow-lg shadow-cyan-500/10">
      <div className="absolute inset-1 rounded-xl border border-white/8" />
      <svg width="26" height="26" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M18 20v24M18 32h28M46 20v24" stroke="#22d3ee" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="50" cy="15" r="4" fill="#22d3ee"/>
      </svg>
    </div>
  );
}

function ScoreBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/24 p-3.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/58">{label}</span>
        <span className="font-black text-white">{value}/100</span>
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400"
          initial={{ width: "0%" }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, delay, ease: EASE }}
        />
      </div>
    </div>
  );
}

function PredictorCard() {
  return (
    <div className="hs-float-soft relative">
      <div className="absolute -inset-8 rounded-[48px] bg-gradient-to-br from-cyan-400/16 via-transparent to-violet-500/16 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
        className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#050816]/88 p-5 shadow-[0_34px_110px_rgba(0,0,0,.55)] backdrop-blur-2xl"
      >
        <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,.14),transparent_30%),radial-gradient(circle_at_82%_10%,rgba(168,85,247,.14),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.018))] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Example Analysis</p>
              <p className="mt-2 text-sm leading-5 text-white/60 max-w-[230px]">
                "I uploaded 100 shorts in 30 days and only one changed everything"
              </p>
            </div>
            <div className="shrink-0 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-right">
              <p className="text-[10px] text-white/48">Outlier</p>
              <p className="text-xl font-black text-cyan-200">8.7×</p>
            </div>
          </div>

          <div className="mt-5 grid gap-2.5">
            {scores.map((s, i) => (
              <ScoreBar key={s.label} label={s.label} value={s.value} delay={0.55 + i * 0.1} />
            ))}
          </div>

          <div className="mt-5 rounded-3xl border border-violet-300/14 bg-violet-300/[0.055] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-200">Example Insight</p>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Strong packaging. Move the result to second 1–3 instead of the setup to push retention above 75%.
            </p>
          </div>

          <a
            href="/hook-analyzer"
            className="mt-4 block rounded-2xl border border-cyan-300/18 bg-cyan-300/[0.055] p-3 text-center text-sm font-black text-cyan-200 transition hover:bg-cyan-300/[0.12]"
          >
            Run your own analysis →
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function PredictorHero() {
  const [hook, setHook] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(6,182,212,0.14),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.13),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(14,165,233,0.08),transparent_34%),linear-gradient(180deg,#020408_0%,#05070d_55%,#020408_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative z-40 mx-auto max-w-[1440px] px-5 md:px-8"
      >
        <div className="flex items-center justify-between py-5">
          <a href="/" className="flex items-center gap-3" aria-label="HookSignals home">
            <LogoMark />
            <div>
              <span className="block text-lg font-black tracking-tight text-white">HookSignals</span>
              <span className="hidden text-xs uppercase tracking-[0.16em] text-cyan-300 sm:block">Creator Intelligence</span>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-white/58 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} className="transition hover:text-white" href={link.href}>{link.label}</a>
            ))}
            <a href="/dashboard" className="transition hover:text-white text-white/58">Dashboard</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="/sign-in" className="hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-white/70 transition hover:bg-white/10 sm:inline-flex">
              Sign in
            </a>
            <a href="/youtube-video-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-4 py-2.5 text-sm font-black text-black shadow-[0_16px_34px_rgba(34,211,238,.18)] transition hover:scale-[1.01] md:px-5">
              Analyze Video
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/[0.08] lg:hidden"
              aria-label="Toggle navigation"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                {mobileOpen ? (
                  <>
                    <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/10 pb-4 pt-3 lg:hidden">
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/[0.04] hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="/dashboard" className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/[0.04] hover:text-white" onClick={() => setMobileOpen(false)}>Dashboard</a>
              <a href="/sign-in" className="mt-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-bold text-white/70 transition hover:bg-white/[0.07]" onClick={() => setMobileOpen(false)}>Sign in</a>
            </div>
          </div>
        )}
      </motion.header>

      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 pb-24 pt-12 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:pb-32 lg:pt-20">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/24 bg-cyan-300/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100 shadow-lg shadow-cyan-500/5">
            <span className="text-cyan-300">✦</span> HookSignals Video Performance Predictor
          </motion.div>

          <motion.p variants={fadeUp} className="text-sm font-black uppercase tracking-[0.2em] text-violet-200/90">
            Predict Video Performance Before You Publish
          </motion.p>

          <motion.h1 variants={fadeUp} className="mt-5 max-w-5xl text-6xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl xl:text-[96px]">
            Predict.<br />Perfect.<br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">Publish.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-lg leading-8 text-white/62 md:text-xl">
            Analyze your title, hook, and thumbnail before publishing. Detect retention risks, weak packaging, and outlier potential in seconds.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 rounded-[28px] border border-cyan-300/18 bg-[linear-gradient(135deg,rgba(34,211,238,.055),rgba(0,0,0,.52))] p-5 shadow-[0_24px_64px_rgba(0,0,0,.4)] backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[11px] text-cyan-300">✦</span>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-white/50">Score your opening line</p>
            </div>
            <div className="flex gap-2.5">
              <input
                value={hook}
                onChange={(e) => setHook(e.target.value.slice(0, 500))}
                placeholder="Paste your hook or opening line..."
                className="flex-1 min-w-0 rounded-2xl border border-white/12 bg-black/40 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/22 focus:border-cyan-300/40 transition"
              />
              <a
                href={`/hook-analyzer${hook.trim() ? `?hook=${encodeURIComponent(hook.trim())}` : ""}`}
                className="shrink-0 inline-flex items-center rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-5 py-3 text-sm font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.22)] transition hover:scale-[1.01] whitespace-nowrap"
              >
                Score Hook →
              </a>
            </div>
            <div className="mt-3.5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/28">Try an example:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "I uploaded 100 Shorts in 30 days. Only 3 worked.",
                  "The thumbnail mistake that killed my last 5 videos",
                  "I changed one line in my intro and retention jumped 26 points",
                ].map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setHook(ex)}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-left text-xs text-white/48 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.06] hover:text-white/75"
                  >
                    &ldquo;{ex.length > 42 ? ex.slice(0, 42) + "…" : ex}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-4 sm:flex-row">
            <a
              href="/youtube-video-analyzer"
              onClick={() => trackEvent({ name: "cta_click", props: { label: "Analyze YouTube Video", destination: "/youtube-video-analyzer", location: "hero_primary" } })}
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-8 py-4 text-base font-black text-black shadow-[0_20px_48px_rgba(34,211,238,.18)] transition hover:scale-[1.01]"
            >
              Analyze YouTube Video <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/hook-analyzer"
              onClick={() => trackEvent({ name: "cta_click", props: { label: "Analyze Hook Text", destination: "/hook-analyzer", location: "hero_secondary" } })}
              className="inline-flex items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.08] px-8 py-4 text-base font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]"
            >
              Analyze Hook Text
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-5 text-sm text-white/42">
            <span>✓ Live YouTube data</span>
            <span>✓ AI hook + packaging scoring</span>
            <span>✓ Free to start — no card required</span>
          </motion.div>
        </motion.div>

        <PredictorCard />
      </div>
    </section>
  );
}
