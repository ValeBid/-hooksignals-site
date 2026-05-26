"use client";

import { useState } from "react";

function scoreHook(text: string) {
  let score = 42;

  const clean = text.toLowerCase();

  if (text.length > 35) score += 8;
  if (text.length > 70) score += 7;
  if (text.includes("?")) score += 8;

  const powerWords = [
    "mistake",
    "stop",
    "secret",
    "grow",
    "viral",
    "views",
    "fast",
    "why",
    "never",
    "before",
    "hidden",
    "simple",
  ];

  powerWords.forEach((word) => {
    if (clean.includes(word)) score += 4;
  });

  if (score > 100) score = 100;

  const clarity = Math.min(100, Math.max(35, score - 4));
  const curiosity = Math.min(100, Math.max(35, score + 5));
  const retention = Math.min(100, Math.max(35, score - 1));

  return {
    overall: score,
    clarity,
    curiosity,
    retention,
    verdict:
      score >= 80
        ? "Strong hook. Good chance of stopping the scroll."
        : score >= 60
        ? "Decent hook. It needs more tension or specificity."
        : "Weak hook. Make it sharper, more specific and more curiosity-driven.",
    rewrite:
      score >= 80
        ? "Try making the promise even more specific for your audience."
        : "If your videos are not growing, your first 3 seconds are probably making this mistake.",
  };
}

export default function HookAnalyzerPage() {
  const [hook, setHook] = useState("");
  const [result, setResult] = useState<null | ReturnType<typeof scoreHook>>(null);
  const [loading, setLoading] = useState(false);

  function analyze() {
    if (!hook.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult(scoreHook(hook));
      setLoading(false);
    }, 650);
  }

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">
            ← HookSignals
          </a>

          <a
            href="/youtube-hook-generator"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70"
          >
            Hook Generator
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            Creator Signal Tool
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Hook Analyzer
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Score the first 3 seconds of your YouTube, TikTok or Shorts idea.
            Get instant feedback on clarity, curiosity and retention strength.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5 md:p-7">
              <label className="mb-3 block text-sm font-medium text-white/60">
                Paste your hook
              </label>

              <textarea
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                placeholder="Example: If your Shorts die after 300 views, your first 3 seconds are probably making this mistake..."
                className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-[#050505] p-5 text-base text-white outline-none placeholder:text-white/25"
              />

              <button
                onClick={analyze}
                className="mt-5 w-full rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
              >
                {loading ? "Analyzing..." : "Analyze Hook"}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              {!result && !loading && (
                <div>
                  <p className="text-sm text-white/45">Result preview</p>
                  <h2 className="mt-4 text-3xl font-semibold">
                    Your score will appear here.
                  </h2>
                  <p className="mt-4 leading-7 text-white/50">
                    HookSignals checks if your opening line is specific, clear,
                    curiosity-driven and strong enough to keep viewers watching.
                  </p>
                </div>
              )}

              {loading && (
                <div>
                  <p className="text-sm text-emerald-300">Analyzing signal...</p>
                  <div className="mt-6 space-y-3">
                    <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-4/5 animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>
              )}

              {result && (
                <div>
                  <p className="text-sm text-white/45">Overall Score</p>
                  <div className="mt-3 flex items-end gap-3">
                    <h2 className="text-7xl font-bold text-emerald-300">
                      {result.overall}
                    </h2>
                    <span className="mb-3 text-white/40">/100</span>
                  </div>

                  <p className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 leading-7 text-white/65">
                    {result.verdict}
                  </p>

                  <div className="mt-6 space-y-5">
                    {[
                      ["Clarity", result.clarity],
                      ["Curiosity", result.curiosity],
                      ["Retention", result.retention],
                    ].map(([label, value]) => (
                      <div key={label}>
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
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {result && (
          <section className="mt-10 rounded-[32px] border border-emerald-300/20 bg-emerald-300/[0.06] p-7 md:p-10">
            <p className="mb-3 text-sm font-semibold text-emerald-300">
              Suggested improvement
            </p>

            <h2 className="text-3xl font-semibold">
              Make the hook more specific.
            </h2>

            <p className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5 text-lg leading-8 text-white/70">
              “{result.rewrite}”
            </p>

            <a
              href="/youtube-hook-generator"
              className="mt-7 inline-block rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
            >
              Generate More Hook Ideas
            </a>
          </section>
        )}

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            ["Clarity", "Can viewers understand the promise instantly?"],
            ["Curiosity", "Does the hook create an open loop?"],
            ["Retention", "Does it lead naturally into the next seconds?"],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
            >
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-white/50">{desc}</p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}