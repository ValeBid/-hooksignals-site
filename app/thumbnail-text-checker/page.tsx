"use client";

import { useState } from "react";

function checkThumbnailText(text: string) {
  let score = 55;

  if (text.length > 0 && text.length <= 28) score += 20;
  if (text.length > 28 && text.length <= 45) score += 10;
  if (text.includes("!")) score += 5;
  if (text.split(" ").length <= 5) score += 10;

  if (score > 100) score = 100;

  return {
    score,
    verdict:
      score >= 80
        ? "Strong thumbnail text. Short, clear and easy to read."
        : score >= 65
        ? "Decent thumbnail text. Try making it shorter and sharper."
        : "Weak thumbnail text. Too vague, long or hard to read quickly.",
    suggestion:
      score >= 80
        ? "Keep the message simple and make sure it supports your video title."
        : "Use fewer words. Make the viewer understand the idea in one glance.",
  };
}

export default function ThumbnailTextCheckerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<null | ReturnType<typeof checkThumbnailText>>(null);

  function handleCheck() {
    if (!text.trim()) return;
    setResult(checkThumbnailText(text));
  }

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">
            ← HookSignals
          </a>

          <a
            href="/youtube-thumbnail-tips"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black"
          >
            Thumbnail Tips
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            YouTube CTR Tool
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Thumbnail Text Checker
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Check if your thumbnail text is short, readable and clear enough to
            work inside the YouTube feed.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5 md:p-7">
              <label className="mb-3 block text-sm font-medium text-white/60">
                Enter thumbnail text
              </label>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Example: Stop Doing This"
                className="min-h-[160px] w-full rounded-2xl border border-white/10 bg-[#050505] p-5 text-base text-white outline-none placeholder:text-white/25"
              />

              <button
                onClick={handleCheck}
                className="mt-5 w-full rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
              >
                Check Thumbnail Text
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              {!result && (
                <div>
                  <p className="text-sm text-white/45">Result preview</p>
                  <h2 className="mt-4 text-3xl font-semibold">
                    Your thumbnail score will appear here.
                  </h2>
                  <p className="mt-4 leading-7 text-white/50">
                    Strong thumbnail text is short, readable and aligned with the
                    video title.
                  </p>
                </div>
              )}

              {result && (
                <div>
                  <p className="text-sm text-white/45">Thumbnail Text Score</p>
                  <div className="mt-3 flex items-end gap-3">
                    <h2 className="text-7xl font-bold text-emerald-300">
                      {result.score}
                    </h2>
                    <span className="mb-3 text-white/40">/100</span>
                  </div>

                  <p className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4 leading-7 text-white/65">
                    {result.verdict}
                  </p>

                  <p className="mt-4 leading-7 text-white/50">
                    {result.suggestion}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            ["Short", "Thumbnail text should be readable at small feed size."],
            ["Clear", "The message should be understood in one glance."],
            ["Aligned", "The thumbnail should support the title, not repeat it."],
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