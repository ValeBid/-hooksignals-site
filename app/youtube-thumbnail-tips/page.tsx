export const metadata = {
  title: "YouTube Thumbnail Tips | Improve CTR | HookSignals",
  description:
    "Learn YouTube thumbnail tips designed to improve click-through rate, clarity and visual impact.",
};

const tips = [
  {
    title: "Use fewer words",
    desc: "Most thumbnails perform better when the text is short, readable and instantly clear.",
  },
  {
    title: "Create contrast",
    desc: "The subject, background and text should be visually separated at small screen sizes.",
  },
  {
    title: "Show emotion",
    desc: "Faces, tension and clear visual stakes can make the click feel more urgent.",
  },
  {
    title: "Match the title",
    desc: "A strong thumbnail supports the title instead of repeating the exact same message.",
  },
  {
    title: "Avoid clutter",
    desc: "Too many objects make the thumbnail harder to understand in the feed.",
  },
];

export default function YouTubeThumbnailTipsPage() {
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
            YouTube CTR Library
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            YouTube Thumbnail Tips
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Learn thumbnail principles that help creators improve clarity,
            click-through rate and first impression quality before publishing.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/youtube-title-generator"
              className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black"
            >
              Generate Better Titles
            </a>

            <a
              href="/hook-analyzer"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white"
            >
              Analyze Hook
            </a>
          </div>
        </section>

        <section className="mt-14">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Thumbnail strategy
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            A strong thumbnail makes the title easier to click.
          </h2>

          <div className="mt-8 grid gap-4">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
              >
                <h3 className="text-2xl font-semibold">{tip.title}</h3>
                <p className="mt-4 leading-8 text-white/60">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            ["CTR", "The thumbnail should make the click feel obvious."],
            ["Clarity", "The idea must be readable at mobile feed size."],
            ["Alignment", "The title and thumbnail should work together."],
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
            Strong thumbnails need strong titles.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            Use HookSignals to improve your video title and hook before your
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