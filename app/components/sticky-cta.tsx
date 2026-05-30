"use client";

import { motion } from "framer-motion";

export default function StickyCTA() {
  return (
    <motion.div
      initial={{ y: 96, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        delay: 1.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed inset-x-0 bottom-4 z-[90] flex justify-center px-4"
    >
      <div className="flex w-full max-w-4xl items-center justify-between gap-4 rounded-[24px] border border-cyan-300/18 bg-black/60 px-5 py-4 shadow-[0_20px_80px_rgba(0,0,0,.55)] backdrop-blur-2xl">
        <div className="min-w-0">
          <p className="truncate text-sm font-black uppercase tracking-[0.14em] text-cyan-300">
            Creator intelligence workflow
          </p>
          <p className="mt-1 truncate text-sm text-white/55 md:text-base">
            Analyze hooks, titles, thumbnails and retention before publishing.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="/hook-analyzer"
            className="hidden rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-bold text-white transition hover:bg-white/[0.09] md:inline-flex"
          >
            Analyze Free
          </a>

          <a
            href="/checkout/pro"
            className="animate-pulse-ring relative rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-5 py-3 text-sm font-black text-black shadow-[0_18px_40px_rgba(34,211,238,.22)] transition hover:scale-[1.02]"
          >
            Start Pro
          </a>
        </div>
      </div>
    </motion.div>
  );
}
