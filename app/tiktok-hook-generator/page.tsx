export const metadata = {
  title: "TikTok Hook Generator | Viral TikTok Hooks | HookSignals",
  description:
    "Generate stronger TikTok hooks designed for retention, curiosity and scroll stopping.",
};

const hookIdeas = [
  "Nobody talks about this TikTok growth mistake.",
  "This changed my views almost instantly.",
  "Stop scrolling if you want better engagement.",
  "I tested viral TikTok hooks for 7 days.",
  "This is why your videos stop growing.",
];

export default function TikTokHookGeneratorPage() {
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
            TikTok Creator Tool
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            TikTok Hook Generator
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Generate stronger TikTok opening lines built for scroll stopping,
            curiosity and audience retention in the first seconds.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-5 md:p-7">
            <label className="mb-3 block text-sm font-medium text-white/60">
              Describe your TikTok idea
            </label>

            <textarea
              placeholder="Example: A TikTok about why small creators struggle to grow..."
              className="min-h-[150px] w-full rounded-2xl border border-white/10 bg-[#050505] p-5 text-base text-white outline-none placeholder:text-white/25"
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="/hook-analyzer"
                className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black"
              >
                Analyze Your Hook
              </a>

              <a
                href="/viral-hook-examples"
                className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white"
              >
                View Hook Examples
              </a>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            TikTok hook ideas
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Fast curiosity wins attention.
          </h2>

          <div className="mt-6 grid gap-4">
            {hookIdeas.map((hook) => (
              <div
                key={hook}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-white/70"
              >
                “{hook}”
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            [
              "Fast Start",
              "TikTok viewers decide extremely quickly whether to continue watching.",
            ],
            [
              "Emotion",
              "Hooks with tension, surprise or emotion perform better.",
            ],
            [
              "Curiosity",
              "A strong information gap increases retention.",
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
            Improve your first 3 seconds.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            Most TikTok videos lose viewers immediately because the opening is
            too weak or generic. Test your hooks before publishing.
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