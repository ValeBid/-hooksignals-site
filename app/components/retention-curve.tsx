"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EASE = "easeOut" as const;

const retentionData = [
  { label: "0s",  average: 100, predicted: 100 },
  { label: "10s", average: 76,  predicted: 92  },
  { label: "20s", average: 58,  predicted: 82  },
  { label: "30s", average: 47,  predicted: 74  },
  { label: "40s", average: 39,  predicted: 67  },
  { label: "50s", average: 34,  predicted: 62  },
  { label: "60s", average: 30,  predicted: 58  },
  { label: "70s", average: 27,  predicted: 55  },
  { label: "80s", average: 25,  predicted: 52  },
  { label: "End", average: 22,  predicted: 49  },
];

const insights = [
  { stat: "40–60%", text: "Viewer loss in the first 30 seconds with a weak hook" },
  { stat: "+27pts",  text: "Average retention lift with a specific, tension-driven opening" },
  { stat: "3 sec",   text: "The window HookSignals optimizes most aggressively" },
];

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-[#09111f] px-4 py-3 text-sm shadow-xl">
      <p className="mb-2 font-bold text-white/50">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="font-black" style={{ color: entry.color }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  );
}

export default function RetentionCurveSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="mx-auto mt-20 max-w-[1320px] px-5 md:px-8">
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
            HookSignals models expected viewer retention from your hook, title and platform. Catch the weak opening before it erodes your watch time.
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
            href="/hook-analyzer"
            className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-3.5 text-sm font-black text-black shadow-[0_20px_48px_rgba(34,211,238,.18)] transition hover:scale-[1.01]"
          >
            Predict my retention →
          </a>
        </motion.div>

        {/* Right: chart */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">Predicted retention curve</p>
              <p className="mt-1 text-sm text-white/48">Example analysis — 90-second video</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/45">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-5 rounded-full bg-white/30" /> Average
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-5 rounded-full bg-cyan-300" /> With HookSignals
              </span>
            </div>
          </div>

          <div className="h-[300px] sm:h-[340px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={retentionData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="predictedFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="averageFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#94a3b8" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "rgba(255,255,255,0.32)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(v: number) => `${v}%`}
                    tick={{ fill: "rgba(255,255,255,0.32)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 25, 50, 75, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="average"
                    name="Average video"
                    stroke="rgba(148,163,184,0.5)"
                    strokeWidth={1.5}
                    fill="url(#averageFill)"
                    strokeDasharray="4 3"
                    dot={false}
                    isAnimationActive
                    animationDuration={1200}
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    name="With HookSignals"
                    stroke="#22d3ee"
                    strokeWidth={2.5}
                    fill="url(#predictedFill)"
                    dot={false}
                    isAnimationActive
                    animationDuration={1400}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full animate-pulse rounded-2xl bg-white/5" />
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-cyan-300/14 bg-cyan-300/[0.055] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">What this shows</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              The cyan curve models predicted retention when hook strength, platform pacing and title alignment are optimized. The gap is your opportunity cost before publishing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
