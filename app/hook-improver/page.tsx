"use client";

import PremiumToolShell from "../components/premium-tool-shell";
import CopyButton from "../components/copy-button";
import { useState } from "react";
import RelatedTools from "../components/related-tools";

type RewriteVersion = [string, string, string];

function improveHook(input: string) {
  const idea = input.trim();
  return {
    framework:
      "Four rewrite angles applied to your input: pain-first, warning hook, authority gap, and proof angle.",
    versions: [
      [
        `If ${idea.toLowerCase()} is not working, this is probably the reason.`,
        "Pain-first",
        "Opens with the viewer's frustration so the opening feels immediately relevant.",
      ],
      [
        `Stop making this mistake with ${idea.toLowerCase()} before your next post.`,
        "Warning hook",
        "Uses a mistake pattern to create urgency and a reason to keep watching.",
      ],
      [
        `Most creators misunderstand ${idea.toLowerCase()} because they miss this one signal.`,
        "Authority gap",
        "Creates a curiosity loop by implying the viewer is missing something specific.",
      ],
      [
        `I changed one thing about ${idea.toLowerCase()} and the results improved fast.`,
        "Proof angle",
        "Leads with a result instead of a claim — makes the payoff concrete.",
      ],
    ] as RewriteVersion[],
  };
}

const principles = [
  ["Sharper", "Removes vague openings and weak promises."],
  ["More Specific", "Creates clearer stakes for the viewer."],
  ["Retention Focused", "Makes the next sentence feel worth watching."],
];

const rewriteAngles = [
  [
    "Pain-first hook",
    "Start with the viewer's current frustration so the opening feels immediately relevant.",
  ],
  [
    "Proof-first hook",
    "Lead with a test, result or measurable change instead of a generic claim.",
  ],
  [
    "Mistake hook",
    "Use a clear mistake pattern when the viewer needs to avoid doing something costly.",
  ],
  [
    "Curiosity gap",
    "Open a loop, but make the topic and payoff specific enough to avoid clickbait.",
  ],
];

const examples = [
  [
    "Weak",
    "This changed everything",
    "I changed one line in my Shorts intro and retention jumped in 48 hours",
  ],
  [
    "Weak",
    "You need to know this",
    "Most new creators lose viewers because their first sentence has no payoff",
  ],
  [
    "Weak",
    "Here is my advice",
    "Stop writing hooks before you know the viewer's exact fear",
  ],
];

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
    <PremiumToolShell
      badge="Hook rewriter"
      title="Turn a weak opening into 4 testable hooks."
      description="Paste any rough video idea or weak hook. Get four rewritten versions — each using a different psychological angle — ready to test in the analyzer."
      primaryHref="/hook-analyzer"
      primaryLabel="Score a Hook"
    >
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        {/* Input panel */}
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
          <div className="mb-5 rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">
              Rewrite engine
            </p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Turn a weak idea into testable hooks with different psychological angles.
            </p>
          </div>

          <label
            htmlFor="hook-improver-input"
            className="mb-3 block text-sm font-semibold text-white/62"
          >
            Paste your rough hook or video idea
          </label>
          <textarea
            id="hook-improver-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: A video about why small creators struggle to grow on YouTube..."
            className="min-h-[210px] w-full resize-none rounded-2xl border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-cyan-300/40"
          />

          <button
            type="button"
            onClick={handleImprove}
            disabled={loading}
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Improving..." : "Improve Hook"}
          </button>

          <p className="mt-4 text-xs leading-5 text-white/35">
            Use this after the analyzer flags weak clarity, low curiosity or high retention risk.
          </p>
        </div>

        {/* Output panel */}
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {!loading && !result && (
            <div>
              <p className="text-sm font-semibold text-cyan-300">Output preview</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">
                Stronger hooks will appear here.
              </h2>
              <p className="mt-4 leading-7 text-white/52">
                HookSignals rewrites rough ideas into specific, curiosity-driven openings.
              </p>
              <div className="mt-8 grid gap-3">
                {principles.map(([title, desc]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <p className="font-bold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/45">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div>
              <p className="text-sm font-semibold text-cyan-300">
                Building stronger hooks...
              </p>
              <div className="mt-6 space-y-4">
                <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" />
                <div className="mt-7 h-24 animate-pulse rounded-2xl bg-white/10" />
              </div>
            </div>
          )}

          {result && (
            <div>
              {/* Framework note */}
              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-white/38">
                  Rewrite approach
                </p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  {result.framework}
                </p>
              </div>

              {/* Rewrite versions */}
              <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
                Rewrite variations
              </p>
              <div className="mt-3 grid gap-3">
                {result.versions.map(([version, angle, rationale]) => (
                  <div
                    key={version}
                    className="rounded-[22px] border border-white/10 bg-black/30 p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-300">
                      {angle}
                    </p>
                    <p className="mt-3 leading-7 text-white/78">
                      &ldquo;{version}&rdquo;
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/38">{rationale}</p>
                    <CopyButton text={version} />
                  </div>
                ))}
              </div>

              <a
                href="/hook-analyzer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-6 py-3.5 font-black text-black transition hover:scale-[1.01]"
              >
                Score these hooks in the analyzer
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Rewrite principles */}
      <section className="mt-8 rounded-[34px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">
          How to improve a weak hook
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
          Rewrite for promise, tension and retention.
        </h2>
        <p className="mt-4 max-w-4xl leading-8 text-white/55">
          A useful hook rewrite makes the viewer understand the subject faster, feel a clear
          reason to continue, and see the connection between the opening line, title and
          thumbnail.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {rewriteAngles.map(([title, desc]) => (
            <article
              key={title}
              className="rounded-[24px] border border-white/10 bg-black/24 p-5"
            >
              <h3 className="text-xl font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/52">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Before / after examples */}
      <section className="mt-6 rounded-[34px] border border-white/10 bg-black/24 p-6 md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-violet-200">
          Before and after examples
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
          Replace vague openings with specific viewer payoff.
        </h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {examples.map(([label, weak, strong]) => (
            <article
              key={weak}
              className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5"
            >
              <p className="text-xs font-black uppercase tracking-[0.14em] text-white/35">
                {label}
              </p>
              <p className="mt-4 text-sm leading-6 text-white/45">&ldquo;{weak}&rdquo;</p>
              <p className="mt-4 text-sm font-black text-cyan-200">Improved</p>
              <p className="mt-2 text-sm leading-6 text-white/72">&ldquo;{strong}&rdquo;</p>
            </article>
          ))}
        </div>
      </section>

      <RelatedTools primary="hook-analyzer" secondary="youtube-title-analyzer" context="Check the score of your improved hook, or align it with your title." />
    </PremiumToolShell>
  );
}
