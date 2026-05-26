import RelatedTools from "../components/related-tools";
import SiteFooter from "../components/site-footer";

export const metadata = {
  title: "Hook Psychology for YouTube Shorts and TikTok | HookSignals",
  description:
    "Learn why strong hooks work, how creators stop the scroll, and how viewer psychology affects retention on Shorts, TikTok and YouTube.",
};

const principles = [
  {
    title: "Curiosity Gap",
    desc: "Strong hooks create an unanswered question in the viewer’s mind. The brain naturally wants closure.",
  },
  {
    title: "Specificity",
    desc: "Vague hooks feel generic. Specific hooks create trust and immediate context.",
  },
  {
    title: "Tension",
    desc: "The best hooks create a subtle emotional tension that makes the next sentence feel necessary.",
  },
  {
    title: "Fast Clarity",
    desc: "Viewers should understand the topic immediately without needing extra effort.",
  },
];

export default function HookPsychologyPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">
            ← HookSignals
          </a>

          <a
            href="/hook-analyzer"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black"
          >
            Analyze Hooks
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.025] p-8 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            Creator Psychology
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Hook Psychology Explained
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            The first seconds of a video decide whether viewers stay or leave.
            Strong hooks are not random. They use attention psychology,
            curiosity and clarity to stop the scroll.
          </p>
        </section>

        <section className="mt-14 space-y-10">
          <div>
            <h2 className="text-3xl font-semibold">
              Why hooks matter more than most creators think
            </h2>

            <p className="mt-5 leading-8 text-white/65">
              On YouTube Shorts, TikTok and Instagram Reels, viewers make
              decisions extremely fast. Most videos are judged in the first few
              seconds. If the opening feels vague, slow or confusing, retention
              drops immediately.
            </p>

            <p className="mt-5 leading-8 text-white/65">
              Strong hooks help creators create momentum early. They communicate
              value quickly, introduce tension and create a reason for the
              viewer to continue watching.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {principles.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
              >
                <h3 className="text-2xl font-semibold">{item.title}</h3>

                <p className="mt-4 leading-7 text-white/55">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-3xl font-semibold">
              What weak hooks usually look like
            </h2>

            <div className="mt-6 space-y-4">
              {[
                "Long introductions before the real topic starts.",
                "Generic phrases without a clear promise.",
                "No emotional tension or curiosity.",
                "Slow pacing that wastes the first seconds.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5 text-white/65"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">
              The goal is not clickbait
            </h2>

            <p className="mt-5 leading-8 text-white/65">
              Strong hooks are often confused with clickbait. In reality,
              effective hooks simply communicate value faster. The goal is not
              to trick viewers. The goal is to make the value of the content
              obvious immediately.
            </p>

            <p className="mt-5 leading-8 text-white/65">
              Creators who combine clarity with curiosity usually perform better
              over time because viewers understand what they are watching while
              still feeling motivated to continue.
            </p>
          </div>

          <div className="rounded-[32px] border border-emerald-300/20 bg-emerald-300/[0.06] p-8">
            <h2 className="text-3xl font-semibold">
              Improve your next hook
            </h2>

            <p className="mt-4 max-w-2xl leading-8 text-white/65">
              Use HookSignals tools to analyze weak openings, generate stronger
              hook structures and improve retention before publishing.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/hook-analyzer"
                className="rounded-2xl bg-emerald-400 px-6 py-3 font-semibold text-black"
              >
                Hook Analyzer
              </a>

              <a
                href="/hook-improver"
                className="rounded-2xl border border-white/10 bg-black/30 px-6 py-3 font-semibold text-white"
              >
                Hook Improver
              </a>
            </div>
          </div>
        </section>

        <RelatedTools />
      </section>

      <SiteFooter />
    </main>
  );
}