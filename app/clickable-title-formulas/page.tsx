export const metadata = {
  title: "Clickable Title Formulas | YouTube CTR Formulas",
  description:
    "Learn clickable title formulas designed for curiosity, higher CTR and better YouTube performance.",
};

const formulas = [
  {
    title: "Problem Formula",
    example: "Why Your Shorts Stop Growing After 300 Views",
  },
  {
    title: "Experiment Formula",
    example: "I Tested Viral Hooks for 7 Days",
  },
  {
    title: "Secret Formula",
    example: "The Hook Strategy Nobody Talks About",
  },
  {
    title: "Transformation Formula",
    example: "This Small Change Doubled My Retention",
  },
  {
    title: "Warning Formula",
    example: "Stop Posting Until You Fix This",
  },
];

export default function ClickableTitleFormulasPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">
            ← HookSignals
          </a>

          <a
            href="/youtube-title-generator"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70"
          >
            Title Generator
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            Creator Framework Library
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Clickable Title Formulas
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Learn title structures designed to improve curiosity, click-through
            rate and audience attention across YouTube and Shorts.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/youtube-title-generator"
              className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black"
            >
              Generate Titles
            </a>

            <a
              href="/viral-title-examples"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white"
            >
              View Title Examples
            </a>
          </div>
        </section>

        <section className="mt-14">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Formula collection
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Strong titles follow recognizable patterns.
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
              "Curiosity",
              "Titles should create an information gap immediately.",
            ],
            [
              "Clarity",
              "The viewer must understand the promise instantly.",
            ],
            [
              "CTR",
              "Good titles increase clicks without feeling misleading.",
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
            Better titles create stronger first impressions.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            Use HookSignals to improve hooks, titles and retention before your
            content goes live.
          </p>

          <a
            href="/youtube-title-generator"
            className="mt-7 inline-block rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
          >
            Open Title Generator
          </a>
        </section>
      </section>
    </main>
  );
}