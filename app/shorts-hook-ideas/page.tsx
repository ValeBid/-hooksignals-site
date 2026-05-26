export const metadata = {
  title: "Shorts Hook Ideas | YouTube Shorts Hooks | HookSignals",
  description:
    "Explore YouTube Shorts hook ideas designed for better retention, curiosity and scroll-stopping openings.",
};

const ideas = [
  "If your Shorts stop at 300 views, check your first 3 seconds.",
  "This is the hook mistake small creators keep making.",
  "I changed one sentence and my retention improved.",
  "Most Shorts fail before the viewer understands the point.",
  "Use this hook formula if your videos feel too slow.",
  "Your opening line should make skipping feel expensive.",
];

export default function ShortsHookIdeasPage() {
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
            Analyze Hook
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            Shorts Creator Library
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Shorts Hook Ideas
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Use these YouTube Shorts hook ideas to create stronger openings,
            improve retention and give viewers a reason to keep watching.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/hook-analyzer"
              className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black"
            >
              Test Your Hook
            </a>

            <a
              href="/youtube-hook-generator"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white"
            >
              Generate More Hooks
            </a>
          </div>
        </section>

        <section className="mt-14">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Shorts hook ideas
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            The first sentence decides if the viewer stays.
          </h2>

          <div className="mt-6 grid gap-4">
            {ideas.map((idea) => (
              <div
                key={idea}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-white/70"
              >
                “{idea}”
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            ["Speed", "Shorts hooks must get to the point immediately."],
            ["Specificity", "Specific hooks beat vague motivational openings."],
            ["Payoff", "The viewer needs to understand what they will gain."],
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
            Do not publish weak openings.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            Before publishing, run your Shorts hook through HookSignals and
            check whether it has enough clarity, curiosity and retention power.
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