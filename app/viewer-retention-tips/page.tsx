import FAQBlock from "../components/faq-block";
import SiteFooter from "../components/site-footer";

export const metadata = {
  title: "Viewer Retention Tips | Improve Audience Retention | HookSignals",
  description:
    "Learn viewer retention strategies for YouTube Shorts, TikTok and creator content.",
};

const tips = [
  {
    title: "Start Faster",
    desc: "Most viewers decide within seconds whether to continue watching.",
  },
  {
    title: "Remove Filler",
    desc: "Every unnecessary second lowers retention and weakens pacing.",
  },
  {
    title: "Open Curiosity Loops",
    desc: "Give viewers a reason to stay for the next sentence.",
  },
  {
    title: "Use Pattern Interrupts",
    desc: "Visual or tonal changes help reset viewer attention.",
  },
  {
    title: "Create Momentum",
    desc: "Each line should naturally pull viewers into the next moment.",
  },
];

export default function ViewerRetentionTipsPage() {
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
            Creator Retention Library
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Viewer Retention Tips
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Learn retention strategies designed to keep viewers watching longer
            across YouTube Shorts, TikTok and creator content.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/hook-analyzer"
              className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black"
            >
              Analyze Your Hook
            </a>

            <a
              href="/shorts-hook-ideas"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white"
            >
              View Hook Ideas
            </a>
          </div>
        </section>

        <section className="mt-14">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Retention strategies
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Retention is built moment by moment.
          </h2>

          <div className="mt-8 grid gap-4">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
              >
                <h3 className="text-2xl font-semibold">{tip.title}</h3>

                <p className="mt-4 leading-8 text-white/60">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            [
              "Hooks",
              "Strong hooks improve the first critical seconds.",
            ],
            [
              "Pacing",
              "Fast pacing reduces viewer drop-off.",
            ],
            [
              "Curiosity",
              "Open loops increase audience attention.",
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
            Better retention starts before publishing.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            Use HookSignals to test hooks, titles and retention signals before
            your content goes live.
          </p>

          <a
            href="/hook-analyzer"
            className="mt-7 inline-block rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
          >
            Open Hook Analyzer
          </a>
        </section>

        <FAQBlock
          items={[
            {
              question: "What improves viewer retention?",
              answer:
                "Viewer retention improves when videos move quickly, remove filler and continuously create reasons to keep watching.",
            },
            {
              question: "Why do viewers leave early?",
              answer:
                "Most viewers leave because the opening is slow, confusing or does not clearly explain why the video matters.",
            },
            {
              question: "Do hooks affect retention?",
              answer:
                "Yes. The hook strongly affects whether viewers continue watching after the first few seconds. Better hooks often improve overall retention.",
            },
          ]}
        />
      </section>

      <SiteFooter />
    </main>
  );
}
