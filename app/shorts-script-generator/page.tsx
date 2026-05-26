"use client";

import { useState } from "react";

function generateScript(topic: string) {
  return [
    `Most creators misunderstand ${topic.toLowerCase()}.`,
    `The real problem is not what people think.`,
    `Here is the simple shift that changes results fast.`,
    `Try this before posting your next Short.`,
  ];
}

export default function ShortsScriptGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!topic.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setScript(generateScript(topic));
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
            href="/tools"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black"
          >
            All Tools
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            AI Shorts Workflow
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Shorts Script Generator
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Generate short-form script structures designed for retention,
            pacing and fast viewer attention.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5 md:p-7">
              <label className="mb-3 block text-sm font-medium text-white/60">
                Enter your Shorts topic
              </label>

              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Example: Why small creators struggle on YouTube Shorts..."
                className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-[#050505] p-5 text-base text-white outline-none placeholder:text-white/25"
              />

              <button
                onClick={handleGenerate}
                className="mt-5 w-full rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
              >
                {loading ? "Generating..." : "Generate Script"}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              {!loading && script.length === 0 && (
                <div>
                  <p className="text-sm text-white/45">
                    Script preview
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold">
                    Your Shorts structure will appear here.
                  </h2>

                  <p className="mt-4 leading-7 text-white/50">
                    Strong Shorts scripts move quickly and create momentum from
                    sentence to sentence.
                  </p>
                </div>
              )}

              {loading && (
                <div>
                  <p className="text-sm text-emerald-300">
                    Building your Shorts script...
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>
              )}

              {script.length > 0 && (
                <div>
                  <p className="mb-4 text-sm font-semibold text-emerald-300">
                    Generated script
                  </p>

                  <div className="space-y-4">
                    {script.map((line, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-white/10 bg-black/35 p-5 leading-7 text-white/75"
                      >
                        {line}
                      </div>
                    ))}
                  </div>

                  <a
                    href="/hook-improver"
                    className="mt-6 inline-block rounded-2xl bg-white px-6 py-3 font-semibold text-black"
                  >
                    Improve Hooks
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            ["Fast Pacing", "Short-form scripts should move quickly."],
            ["Retention", "Every line should create momentum."],
            ["Structure", "Strong scripts guide the viewer naturally."],
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