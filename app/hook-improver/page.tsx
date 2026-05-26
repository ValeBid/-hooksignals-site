"use client";

import { useState } from "react";

function improveHook(input: string) {
  const topic = input.trim() || "your video idea";

  return [
    `If ${topic.toLowerCase()} is not working, this is probably why.`,
    `Stop making this mistake with ${topic.toLowerCase()}.`,
    `I fixed one thing in ${topic.toLowerCase()} and the result changed fast.`,
  ];
}

export default function HookImproverPage() {
  const [hook, setHook] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function handleImprove() {
    if (!hook.trim()) return;

    setLoading(true);
    setResults([]);

    setTimeout(() => {
      setResults(improveHook(hook));
      setLoading(false);
    }, 700);
  }

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">
            ← HookSignals
          </a>

          <a
            href="/hook-analyzer"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70"
          >
            Hook Analyzer
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            AI Hook Workflow
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Hook Improver
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Turn a weak opening line into stronger hook variations built for
            clarity, curiosity and retention.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5 md:p-7">
              <label className="mb-3 block text-sm font-medium text-white/60">
                Paste your current hook or video idea
              </label>

              <textarea
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                placeholder="Example: My video is about why small creators do not grow..."
                className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-[#050505] p-5 text-base text-white outline-none placeholder:text-white/25"
              />

              <button
                onClick={handleImprove}
                className="mt-5 w-full rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
              >
                {loading ? "Improving..." : "Improve Hook"}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              {!loading && results.length === 0 && (
                <div>
                  <p className="text-sm text-white/45">Output preview</p>
                  <h2 className="mt-4 text-3xl font-semibold">
                    Better hook versions will appear here.
                  </h2>
                  <p className="mt-4 leading-7 text-white/50">
                    The goal is not to make the hook longer. The goal is to make
                    the reason to keep watching obvious.
                  </p>
                </div>
              )}

              {loading && (
                <div>
                  <p className="text-sm text-emerald-300">
                    Building stronger hooks...
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>
              )}

              {results.length > 0 && (
                <div>
                  <p className="mb-4 text-sm font-semibold text-emerald-300">
                    Improved hooks
                  </p>

                  <div className="space-y-4">
                    {results.map((result) => (
                      <div
                        key={result}
                        className="rounded-2xl border border-white/10 bg-black/35 p-5 leading-7 text-white/75"
                      >
                        “{result}”
                      </div>
                    ))}
                  </div>

                  <a
                    href="/hook-analyzer"
                    className="mt-6 inline-block rounded-2xl bg-white px-6 py-3 font-semibold text-black"
                  >
                    Analyze These Hooks
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            ["Sharper", "Removes vague language and weak openings."],
            ["More Specific", "Adds clearer stakes and a stronger promise."],
            ["Retention Focused", "Creates a reason to watch the next line."],
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