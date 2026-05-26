export const metadata = {
  title: "YouTube Title Generator | Create Better Video Titles | HookSignals",
  description:
    "Generate stronger YouTube titles for Shorts, long-form videos and creator content with HookSignals.",
};

const titleExamples = [
  "I Fixed My First 3 Seconds and My Views Changed",
  "Why Your Shorts Stop at 300 Views",
  "The Hook Formula Small Creators Ignore",
  "I Tested 20 YouTube Titles. This One Won.",
  "Stop Posting Until You Fix This Title Mistake",
];

export default function YouTubeTitleGeneratorPage() {
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
            YouTube Creator Tool
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            YouTube Title Generator
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Create stronger YouTube titles built around clarity, curiosity and
            click intent. Use title ideas as a starting point, then test the
            video hook before publishing.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-5 md:p-7">
            <label className="mb-3 block text-sm font-medium text-white/60">
              Describe your video topic
            </label>

            <textarea
              placeholder="Example: A video about why small YouTube channels stop growing..."
              className="min-h-[150px] w-full rounded-2xl border border-white/10 bg-[#050505] p-5 text-base text-white outline-none placeholder:text-white/25"
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="/hook-analyzer"
                className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black"
              >
                Analyze Hook
              </a>

              <a
                href="#examples"
                className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white"
              >
                See Title Examples
              </a>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Clear Promise", "The viewer should instantly know the payoff."],
            ["Curiosity Gap", "The title should create a reason to click."],
            ["Audience Fit", "The title must match the viewer's real problem."],
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

        <section id="examples" className="mt-14">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Title examples
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Strong titles make the click feel obvious.
          </h2>

          <div className="mt-6 grid gap-4">
            {titleExamples.map((title) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-white/70"
              >
                “{title}”
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[32px] border border-emerald-300/20 bg-emerald-300/[0.06] p-7 md:p-10">
          <h2 className="text-3xl font-semibold">
            Pair every title with a stronger hook.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            A title gets the click. A hook keeps the viewer. Use HookSignals to
            test both sides of the creator workflow before your video goes live.
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