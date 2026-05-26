export const metadata = {
  title: "Shorts Title Ideas | YouTube Shorts Title Examples | HookSignals",
  description:
    "Explore YouTube Shorts title ideas designed for curiosity, clicks and better creator workflow.",
};

const categories = [
  {
    name: "Curiosity Titles",
    titles: [
      "Why Your Shorts Stop at 300 Views",
      "This Is What Kills Most Shorts",
      "The First 3 Seconds Matter More Than You Think",
    ],
  },
  {
    name: "Problem Titles",
    titles: [
      "Stop Making This Shorts Mistake",
      "Why Small Creators Lose Retention",
      "Your Shorts Are Too Slow at the Start",
    ],
  },
  {
    name: "Experiment Titles",
    titles: [
      "I Tested 20 Shorts Hooks",
      "I Changed One Line and Views Improved",
      "I Tried Viral Shorts Formulas for 7 Days",
    ],
  },
];

export default function ShortsTitleIdeasPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">
            ← HookSignals
          </a>

          <a
            href="/youtube-title-generator"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black"
          >
            Title Generator
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            Shorts Title Library
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Shorts Title Ideas
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Explore YouTube Shorts title ideas built around curiosity, clarity
            and click intent. Use these structures to improve your first
            impression before publishing.
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
              View Viral Titles
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
                {category.titles.map((title) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-black/30 p-5 text-white/70"
                  >
                    “{title}”
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14 rounded-[32px] border border-emerald-300/20 bg-emerald-300/[0.06] p-7 md:p-10">
          <h2 className="text-3xl font-semibold">
            Pair every Shorts title with a strong hook.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            A title can earn the click, but the hook keeps the viewer. Use
            HookSignals to improve both before publishing.
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