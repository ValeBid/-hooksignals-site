export const metadata = {
  title: "Viral Title Examples | YouTube Title Ideas | HookSignals",
  description:
    "Explore viral YouTube title examples built for curiosity, clicks and audience retention.",
};

const titles = [
  "Why Your Shorts Stop Growing After 300 Views",
  "I Tested Viral Hooks for 7 Days",
  "This Small Change Doubled My Retention",
  "Most Creators Ignore This YouTube Mistake",
  "The Hook Formula That Changed My Videos",
  "Stop Posting Until You Fix This",
];

export default function ViralTitleExamplesPage() {
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
            Creator Inspiration Library
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Viral Title Examples
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Study title structures designed for clicks, curiosity and stronger
            audience retention across YouTube and Shorts.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/youtube-title-generator"
              className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black"
            >
              Generate Titles
            </a>

            <a
              href="/hook-analyzer"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white"
            >
              Analyze Hooks
            </a>
          </div>
        </section>

        <section className="mt-14">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Title collection
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Strong titles create instant curiosity.
          </h2>

          <div className="mt-8 grid gap-4">
            {titles.map((title) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
              >
                <p className="text-xl leading-8 text-white/75">
                  “{title}”
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[32px] border border-emerald-300/20 bg-emerald-300/[0.06] p-7 md:p-10">
          <h2 className="text-3xl font-semibold">
            Better titles start with better structure.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            HookSignals helps creators improve titles, hooks and retention
            signals before publishing.
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