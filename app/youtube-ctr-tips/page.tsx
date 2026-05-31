import RelatedTools from "../components/related-tools";
import SiteFooter from "../components/site-footer";

export const metadata = {
  title: "YouTube CTR Tips for Better Titles and Thumbnails | HookSignals",
  description:
    "Learn practical YouTube CTR tips for improving titles, thumbnails and first impressions without relying on clickbait.",
};

const tips = [
  {
    title: "Make the promise clear",
    desc: "Viewers should understand what they will get before they click. Confusing titles reduce trust and weaken CTR.",
  },
  {
    title: "Use curiosity without misleading",
    desc: "Curiosity works best when it creates interest while still matching the actual content of the video.",
  },
  {
    title: "Keep thumbnail text short",
    desc: "Thumbnail text needs to be readable at small mobile sizes. Shorter phrases usually perform better.",
  },
  {
    title: "Do not repeat the title",
    desc: "The thumbnail and title should work together. Repeating the same message wastes valuable space.",
  },
];

export default function YouTubeCTRTipsPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">
            ← HookSignals
          </a>

          <a
            href="/thumbnail-text-checker"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black"
          >
            Check Thumbnail Text
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.025] p-8 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            YouTube CTR Strategy
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            YouTube CTR Tips
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Click-through rate starts with the first impression. Strong titles
            and thumbnails make the value of a video easier to understand before
            the viewer decides to click.
          </p>
        </section>

        <section className="mt-14 space-y-10">
          <div>
            <h2 className="text-3xl font-semibold">
              CTR is not just about being loud
            </h2>

            <p className="mt-5 leading-8 text-white/65">
              Many creators think higher CTR only comes from louder thumbnails
              or more aggressive titles. In practice, strong CTR usually comes
              from clarity, contrast and a title-thumbnail pair that quickly
              explains why the video matters.
            </p>

            <p className="mt-5 leading-8 text-white/65">
              The goal is not to trick viewers. The goal is to make the right
              viewer understand the promise quickly enough to click.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
              >
                <h3 className="text-2xl font-semibold">{tip.title}</h3>
                <p className="mt-4 leading-7 text-white/55">{tip.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-3xl font-semibold">
              What usually lowers CTR
            </h2>

            <div className="mt-6 space-y-4">
              {[
                "The title is too vague to create a reason to click.",
                "The thumbnail has too many words or visual elements.",
                "The title and thumbnail repeat the same idea.",
                "The promise sounds interesting but does not match the video.",
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

          <div className="rounded-[32px] border border-emerald-300/20 bg-emerald-300/[0.06] p-8">
            <h2 className="text-3xl font-semibold">
              Improve your title and thumbnail before publishing
            </h2>

            <p className="mt-4 max-w-2xl leading-8 text-white/65">
              Use HookSignals to generate stronger titles, check thumbnail text
              clarity and improve the first impression of your content.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/youtube-title-generator"
                className="rounded-2xl bg-emerald-400 px-6 py-3 font-semibold text-black"
              >
                Title Generator
              </a>

              <a
                href="/thumbnail-text-checker"
                className="rounded-2xl border border-white/10 bg-black/30 px-6 py-3 font-semibold text-white"
              >
                Thumbnail Text Checker
              </a>
            </div>
          </div>
        </section>

        <RelatedTools primary="youtube-title-analyzer" secondary="youtube-video-analyzer" context="Apply these CTR principles — score your title for click-through potential now." />
      </section>

      <SiteFooter />
    </main>
  );
}