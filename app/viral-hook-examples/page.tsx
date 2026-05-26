export const metadata = {
  title: "Viral Hook Examples | Better YouTube & TikTok Hooks | HookSignals",
  description:
    "Explore viral hook examples for YouTube, TikTok and Shorts creators. Learn what makes viewers keep watching.",
};

const examples = [
  {
    hook: "If your Shorts die after 300 views, this is probably why.",
    type: "Problem + Curiosity",
  },
  {
    hook: "I tested 50 viral hooks. These 3 worked best.",
    type: "Experiment",
  },
  {
    hook: "Most creators are losing views because of this mistake.",
    type: "Warning",
  },
  {
    hook: "This simple change doubled my audience retention.",
    type: "Transformation",
  },
  {
    hook: "Nobody talks about this YouTube growth strategy.",
    type: "Hidden Insight",
  },
];

export default function ViralHookExamplesPage() {
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
            Analyze Hooks
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            Creator Inspiration Library
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Viral Hook Examples
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Study real hook structures used across YouTube, TikTok and Shorts.
            Learn what creates curiosity, clarity and retention in the first
            seconds of a video.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/hook-analyzer"
              className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black"
            >
              Analyze Your Hook
            </a>

            <a
              href="/youtube-hook-generator"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white"
            >
              Generate Hook Ideas
            </a>
          </div>
        </section>

        <section className="mt-14">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Hook collection
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Strong hooks create an instant reason to continue watching.
          </h2>

          <div className="mt-8 grid gap-4">
            {examples.map((example) => (
              <div
                key={example.hook}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
              >
                <div className="mb-4 inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/50">
                  {example.type}
                </div>

                <p className="text-xl leading-8 text-white/75">
                  “{example.hook}”
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            [
              "Curiosity",
              "The viewer should feel an information gap immediately.",
            ],
            [
              "Specificity",
              "Generic hooks perform worse than precise promises.",
            ],
            [
              "Retention",
              "The hook should naturally lead into the next sentence.",
            ],
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

        <section className="mt-14 rounded-[32px] border border-emerald-300/20 bg-emerald-300/[0.06] p-7 md:p-10">
          <h2 className="text-3xl font-semibold">
            Test your own hook before publishing.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            Do not guess if your opening line is strong. Use HookSignals to
            analyze clarity, curiosity and retention before your video goes
            live.
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