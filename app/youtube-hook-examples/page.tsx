export const metadata = {
  title: "YouTube Hook Examples | Viral Video Hook Ideas | HookSignals",
  description:
    "Explore YouTube hook examples for Shorts, long-form videos and creator content. Learn hook patterns that improve retention.",
};

const categories = [
  {
    name: "Problem Hooks",
    hooks: [
      "If your videos stop growing after 300 views, this is probably why.",
      "Most small creators lose viewers before the video even starts.",
      "Your first 3 seconds are probably costing you views.",
    ],
  },
  {
    name: "Curiosity Hooks",
    hooks: [
      "I tested 50 YouTube hooks. These 3 worked best.",
      "Nobody talks about this retention mistake.",
      "This simple hook formula changed my videos.",
    ],
  },
  {
    name: "Warning Hooks",
    hooks: [
      "Stop posting until you fix this opening line.",
      "Do not start your Shorts like this.",
      "If your intro sounds like this, viewers will leave.",
    ],
  },
];

export default function YouTubeHookExamplesPage() {
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

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            YouTube Hook Library
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            YouTube Hook Examples
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Study YouTube hook examples designed for curiosity, clarity and
            audience retention. Use these patterns to improve the first seconds
            of your videos.
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
              Generate Hooks
            </a>
          </div>
        </section>

        <section className="mt-14 grid gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="rounded-[32px] border border-white/10 bg-white/[0.035] p-6 md:p-8"
            >
              <h2 className="text-3xl font-semibold">{category.name}</h2>

              <div className="mt-6 grid gap-4">
                {category.hooks.map((hook) => (
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
            Use examples, then test your own hook.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            Examples help you understand patterns, but your own hook still needs
            to be tested for clarity, curiosity and retention strength.
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