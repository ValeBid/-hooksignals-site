"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SiteFooter from "./site-footer";
import StickyCTA from "./sticky-cta";
import type { ReactNode } from "react";

const SPRING = [0.16, 1, 0.3, 1] as const;

const navLinks = [
  ["YouTube Analyzer", "/youtube-video-analyzer"],
  ["Hook Analyzer", "/hook-analyzer"],
  ["Tools", "/tools"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
];

type PremiumToolShellProps = {
  badge: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function PremiumToolShell({
  badge,
  title,
  description,
  primaryHref = "/youtube-video-analyzer",
  primaryLabel = "Analyze Video",
  secondaryHref = "/tools",
  secondaryLabel = "All Tools",
  children,
  footer,
}: PremiumToolShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#020408] pb-28 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(6,182,212,0.14),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.16),transparent_30%),radial-gradient(circle_at_70%_75%,rgba(14,165,233,0.08),transparent_26%),linear-gradient(180deg,#020408_0%,#05070b_55%,#020408_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
        <div className="absolute left-1/2 top-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[130px]" />

        <div className="relative mx-auto max-w-[1320px] px-5 py-5 md:px-8">
          {/* Nav */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: SPRING }}
            className="sticky top-4 z-50 rounded-[26px] border border-white/10 bg-black/30 shadow-2xl shadow-black/30 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <a href="/" className="flex items-center gap-3" aria-label="HookSignals home">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/22 bg-cyan-400/[0.12]">
                  <span className="text-sm font-black tracking-[-0.08em] text-cyan-300">HS</span>
                </div>
                <div>
                  <span className="block text-lg font-black tracking-tight">HookSignals</span>
                  <span className="hidden text-xs uppercase tracking-[0.16em] text-cyan-300 sm:block">
                    Creator Intelligence
                  </span>
                </div>
              </a>

              <div className="hidden items-center gap-6 text-sm text-white/55 lg:flex">
                {navLinks.map(([label, href]) => (
                  <a
                    key={href}
                    className="transition-colors duration-200 hover:text-white"
                    href={href}
                  >
                    {label}
                  </a>
                ))}
                <a href="/dashboard" className="transition-colors duration-200 hover:text-white">
                  Dashboard
                </a>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={secondaryHref}
                  className="hidden rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/[0.07] sm:inline-flex"
                >
                  {secondaryLabel}
                </a>
                <a
                  href={primaryHref}
                  className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-4 py-2 text-sm font-black text-black shadow-[0_16px_34px_rgba(34,211,238,.20)] transition hover:scale-[1.02] md:px-5"
                >
                  {primaryLabel}
                </a>
                {/* Mobile hamburger */}
                <button
                  type="button"
                  onClick={() => setMobileOpen((v) => !v)}
                  className="ml-1 flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/[0.08] lg:hidden"
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

            {/* Mobile drawer */}
            {mobileOpen && (
              <div className="border-t border-white/10 px-4 pb-4 pt-3 lg:hidden">
                <div className="grid gap-1">
                  {navLinks.map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      className="rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-white/70 transition hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    href="/dashboard"
                    className="rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-white/70 transition hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </a>
                  <a
                    href="/sign-in"
                    className="mt-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-bold text-white/70 transition hover:bg-white/[0.07]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign in
                  </a>
                </div>
              </div>
            )}
          </motion.nav>

          {/* Hero */}
          <section className="py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: SPRING }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-100 shadow-lg shadow-violet-500/10"
            >
              <span className="text-cyan-300">✦</span>
              {badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14, ease: SPRING }}
              className="max-w-5xl text-4xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-5xl md:text-7xl"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: SPRING }}
              className="mt-6 max-w-3xl text-base leading-8 text-white/60 md:text-xl"
            >
              {description}
            </motion.p>
          </section>

          {children}

          {footer}
        </div>
      </section>

      <SiteFooter />
      <StickyCTA />
    </main>
  );
}
