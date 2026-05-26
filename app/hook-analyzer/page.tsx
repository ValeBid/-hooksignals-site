"use client";

import { useState } from "react";

export const metadata = {
  title: "Hook Analyzer for YouTube, TikTok and Shorts | HookSignals",
  description:
    "Analyze your video hook and improve the first 3 seconds of your content.",
};

function scoreHook(text: string) {
  let score = 50;

  if (text.length > 40) score += 10;
  if (text.includes("?")) score += 10;

  const powerWords = [
    "secret",
    "mistake",
    "stop",
    "grow",
    "viral",
    "fast",
    "why",
    "best",
    "worst",
    "hack",
  ];

  powerWords.forEach((word) => {
    if (text.toLowerCase().includes(word)) {
      score += 4;
    }
  });

  if (score > 100) score = 100;

  return {
    overall: score,
    clarity: Math.min(100, score - 5),
    curiosity: Math.min(100, score + 3),
    retention: Math.min(100, score - 2),
  };
}

export default function HookAnalyzerPage() {
  const [hook, setHook] = useState("");
  const [result, setResult] = useState<null | {
    overall: number;
    clarity: number;
    curiosity: number;
    retention: number;
  }>(null);

  function analyze() {
    if (!hook.trim()) return;

    const scores = scoreHook(hook);

    setResult(scores);
  }

  return (
    <main className="min-h-screen bg-[#070708] px-6 py-12 text-white">
      <section className="mx-auto max-w-4xl">
        <a href="/" className="text-sm text-white/50">
          ← Back to homepage
        </a>

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <p className="mb-4 text-sm font-medium text-emerald-300">
            Creator Signal Tool
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Hook Analyzer
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/60">
            Test your video hook before publishing. Analyze curiosity,
            retention and clarity signals in seconds.
          </p>

          <div className="mt-8">
            <label className="mb-3 block text-sm text-white/60">
              Paste your hook
            </label>

            <textarea
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="Example: Stop making these 3 mistakes if you want your Shorts to grow..."
              className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/40 p-5 text-white outline-none placeholder:text-white/25"
            />

            <button
              onClick={analyze}
              className="mt-5 rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
            >
              Analyze Hook
            </button>
          </div>
        </div>

        {result && (
          <section className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm text-white/45">Overall Score</p>
              <h2 className="mt-3 text-6xl font-bold text-emerald-300">
                {result.overall}
              </h2>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Clarity</span>
                    <span>{result.clarity}</span>
                  </div>

                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-emerald-300"
                      style={{ width: `${result.clarity}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Curiosity</span>
                    <span>{result.curiosity}</span>
                  </div>

                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-emerald-300"
                      style={{ width: `${result.curiosity}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Retention</span>
                    <span>{result.retention}</span>
                  </div>

                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-emerald-300"
                      style={{ width: `${result.retention}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mt-14">
          <h2 className="text-3xl font-semibold">
            What makes a strong hook?
          </h2>

          <p className="mt-5 leading-8 text-white/55">
            Strong hooks create curiosity quickly, make a clear promise and
            immediately tell viewers why they should continue watching.
          </p>
        </section>
      </section>
    </main>
  );
}