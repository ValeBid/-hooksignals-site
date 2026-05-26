export const metadata = {
  title: "YouTube Hook Generator | Create Better Video Hooks | HookSignals",
  description:
    "Generate stronger YouTube hooks for Shorts, long-form videos, podcasts and creator content.",
};

const hookExamples = [
  "Stop making this mistake if your videos die after 300 views.",
  "I tested this for 7 days and the result surprised me.",
  "Most creators ignore this, but it changes everything.",
  "If you only fix one thing in your next video, fix this.",
  "Your first 3 seconds are probably costing you views.",
];

export default function YouTubeHookGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#070708] px-6 py-12 text-white">
      <section className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-white/50">
          ← Back to HookSignals
        </a>

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <p className="mb-4 text-sm font-medium text-emerald-300">
            YouTube Creator Tool
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            YouTube Hook Generator
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Create stronger opening lines for YouTube videos, Shorts and creator
            content. A good hook gives viewers a reason to keep watching in the
            first few seconds.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6">
            <label className="mb-3 block text-sm text-white/60">
              Describe your video idea
            </label>

            <textarea
              placeholder="Example: A video about why small YouTube channels stop growing..."
              className="min-h-[160px] w-full rounded-2xl border border-white/10 bg-black/40 p-5 text-white outline-none placeholder:text-white/25"
            />

            <a
              href="/hook-analyzer"
              className="mt-5 inline-block rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
            >
              Analyze Your Hook
            </a>
          </div>
        </div>

        <section className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-semibold">
              What makes a good YouTube hook?
            </h2>
            <p className="mt-4 leading-8 text-white/55">
              A strong YouTube hook is clear, specific and emotionally charged.
              It should tell the viewer why the next few seconds matter. Weak
              hooks usually start too slowly or sound too generic.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-semibold">
              Best hook structure
            </h2>
            <p className="mt-4 leading-8 text-white/55">
              The strongest hooks usually combine a problem, a promise and a
              curiosity gap. The viewer should immediately understand what they
              will gain by staying.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-semibold">
            YouTube hook examples
          </h2>

          <div className="mt-6 grid gap-4">
            {hookExamples.map((hook) => (
              <div
                key={hook}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-white/70"
              >
                “{hook}”
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[32px] border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-3xl font-semibold">
            Improve your hook before publishing
          </h2>

          <p className="mt-5 leading-8 text-white/55">
            After writing your hook, run it through the Hook Analyzer to check
            clarity, curiosity and retention strength. This helps creators avoid
            weak openings before the video goes live.
          </p>

          <a
            href="/hook-analyzer"
            className="mt-7 inline-block rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
          >
            Open Hook Analyzer
          </a>
        </section>
      </section>
    </main>
  );
}