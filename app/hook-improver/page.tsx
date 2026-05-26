"use client";

import { useState } from "react";
import RelatedTools from "../components/related-tools";

function improveHook(input: string) {
  const idea = input.trim();

  return {
    diagnosis:
      "The original idea needs a clearer promise, faster tension and a stronger reason to keep watching.",
    versions: [
      `If ${idea.toLowerCase()} is not working, this is probably the reason.`,
      `Stop making this mistake with ${idea.toLowerCase()} before your next post.`,
      `Most creators misunderstand ${idea.toLowerCase()} because they miss this one signal.`,
      `I changed one thing about ${idea.toLowerCase()} and the results improved fast.`,
    ],
  };
}

export default function HookImproverPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | ReturnType<typeof improveHook>>(null);
  const [loading, setLoading] = useState(false);

  function handleImprove() {
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult(improveHook(input));
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
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black"
          >
            Analyze Hook
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            AI Hook Workflow
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Hook Improver
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Rewrite weak video ideas into sharper hook variations designed for
            clarity, curiosity and viewer retention.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5 md:p-7">
              <label className="mb-3 block text-sm font-medium text-white/60">
                Paste your rough hook or video idea
              </label>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Example: A video about why small creators struggle to grow on YouTube..."
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
              {!loading && !result && (
                <div>
                  <p className="text-sm text-white/45">Output preview</p>
                  <h2 className="mt-4 text-3xl font-semibold">
                    Stronger hooks will appear here.
                  </h2>
                  <p className="mt-4 leading-7 text-white/50">
                    HookSignals rewrites rough ideas into more specific,
                    curiosity-driven openings.
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

              {result && (
                <div>
                  <p className="text-sm text-white/45">Diagnosis</p>
                  <p className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 leading-7 text-white/65">
                    {result.diagnosis}
                  </p>

                  <p className="mt-6 text-sm font-semibold text-emerald-300">
                    Improved versions
                  </p>

                  <div className="mt-4 space-y-4">
                    {result.versions.map((version) => (
                      <div
                        key={version}
                        className="rounded-2xl border border-white/10 bg-black/35 p-5 leading-7 text-white/75"
                      >
                        “{version}”
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
            ["Sharper", "Removes vague openings and weak promises."],
            ["More Specific", "Creates clearer stakes for the viewer."],
            ["Retention Focused", "Makes the next sentence feel worth watching."],
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

        <RelatedTools />
      </section>
    </main>
  );
}