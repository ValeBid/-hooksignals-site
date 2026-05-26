"use client";

import { useState } from "react";
import RelatedTools from "../components/related-tools";

function analyzeHook(text: string) {
  let score = 45;
  const clean = text.toLowerCase();
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  if (text.length >= 35) score += 8;
  if (text.length >= 70) score += 6;
  if (text.includes("?")) score += 7;
  if (wordCount <= 18) score += 6;

  ["mistake", "stop", "secret", "grow", "viral", "views", "why", "hidden", "simple"].forEach(
    (word) => {
      if (clean.includes(word)) score += 4;
    }
  );

  score = Math.min(100, score);

  return {
    score,
    clarity: Math.min(100, Math.max(35, score - 4)),
    curiosity: Math.min(100, Math.max(35, score + 5)),
    retention: Math.min(100, Math.max(35, score - 1)),
    grade:
      score >= 85 ? "Excellent" : score >= 72 ? "Strong" : score >= 58 ? "Decent" : "Weak",
    verdict:
      score >= 85
        ? "This hook is sharp, specific and likely to stop the scroll."
        : score >= 72
        ? "This hook is strong, but it can become more specific."
        : score >= 58
        ? "This hook is usable, but it needs more tension and clarity."
        : "This hook is too vague. Make the promise sharper and faster.",
    improved: [
      "If your videos stop growing, your first 3 seconds are probably the reason.",
      "Stop posting until your opening line creates a clear reason to keep watching.",
      "Most creators lose viewers before the value of the video is even clear.",
    ],
  };
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-emerald-300" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function HookAnalyzerPage() {
  const [hook, setHook] = useState("");
  const [result, setResult] = useState<null | ReturnType<typeof analyzeHook>>(null);
  const [loading, setLoading] = useState(false);

  function handleAnalyze() {
    if (!hook.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult(analyzeHook(hook));
      setLoading(false);
    }, 650);
  }

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">← HookSignals</a>
          <a href="/hook-improver" className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black">
            Hook Improver
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">Creator Signal Tool</p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Hook Analyzer
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Score your video hook for clarity, curiosity and retention before publishing.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5 md:p-7">
              <label className="mb-3 block text-sm font-medium text-white/60">
                Paste your hook
              </label>

              <textarea
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                placeholder="Example: If your Shorts stop at 300 views, your first 3 seconds are probably the reason..."
                className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-[#050505] p-5 text-base text-white outline-none placeholder:text-white/25"
              />

              <button
                onClick={handleAnalyze}
                className="mt-5 w-full rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
              >
                {loading ? "Analyzing..." : "Analyze Hook"}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              {!loading && !result && (
                <div>
                  <p className="text-sm text-white/45">Result preview</p>
                  <h2 className="mt-4 text-3xl font-semibold">Your hook score will appear here.</h2>
                  <p className="mt-4 leading-7 text-white/50">
                    HookSignals checks whether your opening line is clear, specific and strong enough to keep viewers watching.
                  </p>
                </div>
              )}

              {loading && (
                <div>
                  <p className="text-sm text-emerald-300">Analyzing signal...</p>
                  <div className="mt-6 space-y-3">
                    <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>
              )}

              {result && (
                <div>
                  <p className="text-sm text-white/45">Overall Score</p>
                  <div className="mt-3 flex items-end gap-3">
                    <h2 className="text-7xl font-bold text-emerald-300">{result.score}</h2>
                    <span className="mb-3 text-white/40">/100 · {result.grade}</span>
                  </div>

                  <p className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 leading-7 text-white/65">
                    {result.verdict}
                  </p>

                  <div className="mt-6 space-y-5">
                    <ScoreBar label="Clarity" value={result.clarity} />
                    <ScoreBar label="Curiosity" value={result.curiosity} />
                    <ScoreBar label="Retention" value={result.retention} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {result && (
          <section className="mt-10 rounded-[32px] border border-emerald-300/20 bg-emerald-300/[0.06] p-7 md:p-10">
            <p className="mb-3 text-sm font-semibold text-emerald-300">Improved hook ideas</p>

            <div className="grid gap-4">
              {result.improved.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/30 p-5 leading-7 text-white/75">
                  “{item}”
                </div>
              ))}
            </div>

            <a href="/hook-improver" className="mt-7 inline-block rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black">
              Improve More Hooks
            </a>
          </section>
        )}
        <RelatedTools />
      </section>
    </main>
  );
}