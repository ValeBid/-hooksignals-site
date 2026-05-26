"use client";

import { useState } from "react";
import CopyButton from "../components/copy-button";
import RelatedTools from "../components/related-tools";

function generateScript(topic: string) {
  const cleanTopic = topic.trim();

  return {
    hook: `If ${cleanTopic.toLowerCase()} feels hard, this is the part most people miss.`,
    body: [
      `Most creators start with the wrong angle.`,
      `The real problem is not the idea — it is the way the first seconds are structured.`,
      `Start with tension, then give the viewer a clear reason to stay.`,
      `Make every sentence pull them into the next one.`,
    ],
    cta: `Before you post your next Short, fix the hook first.`,
  };
}

export default function ShortsScriptGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState<null | ReturnType<typeof generateScript>>(null);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!topic.trim()) return;

    setLoading(true);
    setScript(null);

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

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            AI Shorts Workflow
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Shorts Script Generator
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Generate a short-form script structure built around hook strength,
            pacing and retention. Use it as a first draft before recording.
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
              {!loading && !script && (
                <div>
                  <p className="text-sm text-white/45">Script preview</p>
                  <h2 className="mt-4 text-3xl font-semibold">
                    Your Shorts structure will appear here.
                  </h2>
                  <p className="mt-4 leading-7 text-white/50">
                    Strong Shorts scripts open fast, create momentum and remove
                    filler before the viewer loses attention.
                  </p>
                </div>
              )}

              {loading && (
                <div>
                  <p className="text-sm text-emerald-300">
                    Building retention-focused script...
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>
              )}

              {script && (
                <div>
                  <p className="mb-4 text-sm font-semibold text-emerald-300">
                    Generated script structure
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5">
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-emerald-300">
                        Hook
                      </p>
                      <p className="leading-7 text-white/80">“{script.hook}”</p>
                      <CopyButton text={script.hook} />
                    </div>

                    {script.body.map((line, index) => (
                      <div
                        key={line}
                        className="rounded-2xl border border-white/10 bg-black/35 p-5 leading-7 text-white/75"
                      >
                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">
                          Beat {index + 1}
                        </p>

                        <p>{line}</p>

                        <CopyButton text={line} />
                      </div>
                    ))}

                    <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">
                        CTA
                      </p>

                      <p className="leading-7 text-white/75">“{script.cta}”</p>

                      <CopyButton text={script.cta} />
                    </div>
                  </div>

                  <a
                    href="/hook-improver"
                    className="mt-6 inline-block rounded-2xl bg-white px-6 py-3 font-semibold text-black"
                  >
                    Improve the Hook
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            ["Hook", "Open with tension or a clear reason to keep watching."],
            ["Pacing", "Remove filler and move the idea forward quickly."],
            ["Retention", "Every line should make the next line feel necessary."],
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