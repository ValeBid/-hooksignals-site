export const metadata = {
  title: "Retention Hook Examples | Viewer Retention Hooks | HookSignals",
  description:
    "Explore retention-focused hook examples designed to keep viewers watching longer.",
};

const examples = [
  {
    category: "Open Loop Hooks",
    hooks: [
      "Watch until the end because this changes everything.",
      "The last mistake is the one most creators never notice.",
      "This gets worse the longer you ignore it.",
    ],
  },
  {
    category: "Fast Problem Hooks",
    hooks: [
      "Your viewers are leaving in the first 3 seconds.",
      "This intro mistake destroys retention instantly.",
      "Most Shorts lose viewers before the point is clear.",
    ],
  },
  {
    category: "Curiosity Retention Hooks",
    hooks: [
      "I tested viral hooks and found a surprising pattern.",
      "Nobody talks about this retention trick anymore.",
      "This one sentence changed my watch time.",
    ],
  },
];

export default function RetentionHookExamplesPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">
            ← HookSignals
          </a>

          <a
            href="/viewer-retention-tips"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black"
          >
            Retention Tips
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            Retention Hook Library
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Retention Hook Examples
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Explore hook examples designed to increase watch time, improve
            pacing and keep viewers engaged longer.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/hook-analyzer"
              className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black"
            >
              Analyze Hooks
            </a>

            <a
              href="/viewer-retention-tips"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white"
            >
              View Retention Tips
            </a>
          </div>
        </section>

        <section className="mt-14 grid gap-6">
          {examples.map((group) => (
            <div
              key={group.category}
              className="rounded-[32px] border border-white/10 bg-white/[0.035] p-6 md:p-8"
            >
              <h2 className="text-3xl font-semibold">{group.category}</h2>

              <div className="mt-6 grid gap-4">
                {group.hooks.map((hook) => (
                  <div
                    key={hook}
                    className="rounded-2xl border border-white/10 bg-black/30 p-5 text-white/70"
                  >
                    “{hook}”
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14 rounded-[32px] border border-emerald-300/20 bg-emerald-300/[0.06] p-7 md:p-10">
          <h2 className="text-3xl font-semibold">
            Retention starts with the opening.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            Use HookSignals to improve retention, pacing and first impression
            quality before publishing your content.
          </p>

          <a
            href="/hook-improver"
            className="mt-7 inline-block rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
          >
            Open Hook Improver
          </a>
        </section>
      </section>
    </main>
  );
}