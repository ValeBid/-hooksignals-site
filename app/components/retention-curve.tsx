"use client";

import { motion } from "framer-motion";

const EASE = "easeOut" as const;

const insights = [
  { stat: "40–60%", text: "Typical viewer loss in the first 30 seconds when the opening line lacks a clear subject or tension" },
  { stat: "9 signals", text: "Hook strength, clarity, curiosity gap, CTR potential, retention risk and 4 more — scored per analysis" },
  { stat: "3 sec", text: "The opening window HookSignals analyzes most closely — the decision window before a viewer scrolls away" },
];

const outputScores = [
  { label: "Packaging", value: 90, color: "from-cyan-300 to-sky-400", text: "text-cyan-300" },
  { label: "Hook strength", value: 85, color: "from-cyan-300 to-violet-400", text: "text-cyan-300" },
  { label: "CTR potential", value: 88, color: "from-sky-400 to-violet-400", text: "text-sky-300" },
];

export default function RetentionCurveSection() {
  return (
    <section className="mx-auto mt-14 max-w-[1320px] px-5 md:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">Retention intelligence</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
            See the drop-off before your audience does.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/58">
            HookSignals analyzes your hook, title and platform context for retention signals. Find the weak opening before it costs you watch time.
          </p>

          <div className="mt-8 grid gap-4">
            {insights.map(({ stat, text }) => (
              <div key={stat} className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/[0.035] p-4">
                <span className="shrink-0 text-2xl font-black text-cyan-300">{stat}</span>
                <p className="text-sm leading-6 text-white/58">{text}</p>
              </div>
            ))}
          </div>

          <a
            href="/youtube-video-analyzer"
            className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-3.5 text-sm font-black text-black shadow-[0_20px_48px_rgba(34,211,238,.18)] transition hover:scale-[1.01]"
          >
            Analyze a YouTube video →
          </a>
        </motion.div>

        {/* Right: real output preview */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8"
        >
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">Analysis output</p>
            <p className="mt-1 text-sm text-white/48">What the YouTube Video Analyzer returns</p>
          </div>

          {/* Score bars */}
          <div className="space-y-4">
            {outputScores.map(({ label, value, color, text }, i) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-white/70">{label}</span>
                  <span className={`text-lg font-black ${text}`}>{value}<span className="text-sm text-white/30">/100</span></span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${color}`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
                  />
                </div>
              </div>
            ))}

            {/* Retention risk */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-white/70">Retention risk</span>
                <span className="rounded-full border border-emerald-300/25 bg-emerald-300/[0.09] px-2.5 py-0.5 text-xs font-black text-emerald-300">Low</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "15%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.36, ease: EASE }}
                />
              </div>
            </div>
          </div>

          {/* Diagnosis sample */}
          <div className="mt-6 rounded-2xl border border-cyan-300/14 bg-cyan-300/[0.055] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Title diagnosis</p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              The title leverages a specific result and clear subject. The viewer knows the payoff before the second sentence. Hook and title alignment is strong.
            </p>
          </div>

          {/* Output fields list */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["Better titles", "Hook rewrites", "Thumbnail text", "Description angle"].map((field) => (
              <div key={field} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2">
                <span className="text-[10px] text-cyan-300">✓</span>
                <span className="text-xs text-white/50">{field}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
