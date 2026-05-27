"use client";

import SiteFooter from "../components/site-footer";
import { useState } from "react";
import RelatedTools from "../components/related-tools";
import CopyButton from "../components/copy-button";

type HookAnalysis = {
  score: number;
  clarity: number;
  curiosity: number;
  retention: number;
  grade: string;
  verdict: string;
  feedback: string[];
  improved: string[];
};

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-emerald-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function HookAnalyzerPage() {
  const [hook, setHook] = useState("");
  const [result, setResult] = useState<null | HookAnalysis>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"ai" | "fallback" | "">("");

  async function handleAnalyze() {
    const trimmedHook = hook.trim();

    if (trimmedHook.length < 8) {
      setError("Enter a hook with at least 8 characters.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setMode("");

    try {
      const response = await fetch("/api/analyze-hook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hook: trimmedHook }),
      });

      const data = await response.json();

      if (!response.ok || !data?.analysis) {
        throw new Error(data?.error || "Hook analysis failed.");
      }

      setResult(data.analysis);
      setMode(data.mode === "ai" ? "ai" : "fallback");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hook analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">
            ← HookSignals
          </a>

          <a
            href="/hook-improver"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black"
          >
            Hook Improver
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            Creator Signal Tool
          </p>

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

              {error && (
                <p className="mt-3 rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-5 w-full rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Analyzing..." : "Analyze Hook"}
              </button>

              <p className="mt-4 text-xs leading-5 text-white/35">
                Early access: analysis quality may vary while the scoring engine is being tuned.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              {!loading && !result && (
                <div>
                  <p className="text-sm text-white/45">Result preview</p>

                  <h2 className="mt-4 text-3xl font-semibold">
                    Your hook score will appear here.
                  </h2>

                  <p className="mt-4 leading-7 text-white/50">
                    HookSignals checks whether your opening line is clear,
                    specific and strong enough to keep viewers watching.
                  </p>

                  <div className="mt-8 grid gap-3">
                    <a
                      href="/hook-improver"
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-emerald-300/30"
                    >
                      Improve weak hooks →
                    </a>

                    <a
                      href="/shorts-script-generator"
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-emerald-300/30"
                    >
                      Generate Shorts scripts →
                    </a>
                  </div>
                </div>
              )}

              {loading && (
                <div>
                  <p className="text-sm text-emerald-300">
                    Analyzing signal...
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>
              )}

              {result && (
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-white/45">Overall Score</p>
                    {mode && (
                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/40">
                        {mode === "ai" ? "AI analysis" : "Beta fallback"}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-end gap-3">
                    <h2 className="text-7xl font-bold text-emerald-300">
                      {result.score}
                    </h2>

                    <span className="mb-3 text-white/40">
                      /100 · {result.grade}
                    </span>
                  </div>

                  <p className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 leading-7 text-white/65">
                    {result.verdict}
                  </p>

                  {result.feedback?.length > 0 && (
                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="mb-3 text-sm font-semibold text-white/55">Key feedback</p>
                      <ul className="space-y-2 text-sm leading-6 text-white/58">
                        {result.feedback.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

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
            <p className="mb-3 text-sm font-semibold text-emerald-300">
              Improved hook ideas
            </p>

            <div className="grid gap-4">
              {result.improved.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5 leading-7 text-white/75"
                >
                  <p>“{item}”</p>

                  <CopyButton text={item} />
                </div>
              ))}
            </div>

            <a
              href="/hook-improver"
              className="mt-7 inline-block rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
            >
              Improve More Hooks
            </a>
          </section>
        )}

        <RelatedTools />
      </section>

      <SiteFooter />
    </main>
  );
}
