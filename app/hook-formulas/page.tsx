export const metadata = {
  title: "Hook Formulas | Viral Hook Structures | HookSignals",
  description:
    "Learn high-performing hook formulas used in YouTube Shorts, TikTok and creator content.",
};

const formulas = [
  {
    title: "Problem + Curiosity",
    example: "If your videos stop growing after 300 views, this is probably why.",
  },
  {
    title: "Hidden Truth",
    example: "Nobody talks about this YouTube retention mistake.",
  },
  {
    title: "Transformation",
    example: "This simple hook change doubled my audience retention.",
  },
  {
    title: "Experiment",
    example: "I tested viral hooks for 7 days. Here’s what happened.",
  },
  {
    title: "Warning",
    example: "Stop posting until you fix this first.",
  },
];

export default function HookFormulasPage() {
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
            Creator Framework Library
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Hook Formulas
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Learn proven hook structures designed for curiosity, retention and
            scroll-stopping creator content.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/hook-analyzer"
              className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black"
            >
              Test Your Hook
            </a>

            <a
              href="/viral-hook-examples"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white"
            >
              View Examples
            </a>
          </div>
        </section>

        <section className="mt-14">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Formula collection
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Strong hooks follow recognizable patterns.
          </h2>

          <div className="mt-8 grid gap-4">
            {formulas.map((formula) => (
              <div
                key={formula.title}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
              >
                <div className="mb-4 inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/50">
                  {formula.title}
                </div>

                <p className="text-xl leading-8 text-white/75">
                  “{formula.example}”
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            [
              "Clarity",
              "The viewer should instantly understand the point.",
            ],
            [
              "Emotion",
              "Strong hooks create tension, surprise or desire.",
            ],
            [
              "Retention",
              "The hook must naturally lead into the next sentence.",
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
            Build better hooks before publishing.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            HookSignals helps creators improve opening lines before videos go
            live by analyzing clarity, curiosity and retention strength.
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