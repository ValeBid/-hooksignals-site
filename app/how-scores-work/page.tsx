import SimpleNav from "../components/simple-nav";
import SiteFooter from "../components/site-footer";
import ScoreMethodology from "../components/score-methodology";

export const metadata = {
  title: "How Scores Work",
  description:
    "HookSignals scores are directional publishing signals based on public YouTube metadata, title structure, hook patterns and packaging analysis — not guaranteed views or actual YouTube Studio metrics.",
  alternates: { canonical: "https://hooksignals.com/how-scores-work" },
};

export default function HowScoresWorkPage() {
  return (
    <div className="min-h-screen bg-[#030507] text-white">
      <SimpleNav />
      <main className="mx-auto max-w-[1280px] px-5 py-16 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
            Transparency
          </p>
          <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] md:text-6xl">
            How scores work.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/55">
            HookSignals scores are directional signals based on publicly available data
            and packaging analysis. They are designed to help creators identify weak
            signals before publishing — not to predict or guarantee performance.
          </p>
        </div>

        <div className="mt-12">
          <ScoreMethodology />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-black/24 p-6">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">
              What the analyzer actually does
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-white/62">
              {[
                "Fetches public video metadata via the YouTube Data API — title, views, likes, duration and thumbnail URL.",
                "Analyzes title structure for clarity, curiosity gap, keyword placement and character length.",
                "Scores the hook and opening signals across 9 packaging dimensions.",
                "Returns improvement suggestions — alternative titles, hook rewrites, thumbnail text and a description angle.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1 shrink-0 text-[10px] text-cyan-300">◆</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/24 p-6">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-white/38">
              What the analyzer does not do
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-white/62">
              {[
                "Does not access your YouTube account or YouTube Studio.",
                "Does not read private analytics — actual CTR, watch time or audience retention curves.",
                "Does not guarantee views, clicks or channel growth.",
                "Does not access private or unlisted video data.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1 shrink-0 text-xs text-white/28">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-cyan-300/18 bg-cyan-300/[0.045] p-6">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">
            How to use scores effectively
          </p>
          <p className="mt-3 text-sm leading-7 text-white/62">
            A high score does not guarantee a video will perform well. A low score
            does not mean a video will fail. Scores indicate which packaging elements —
            title clarity, hook strength, curiosity gap, keyword placement — are weak
            relative to known patterns. Use them as a pre-publish checklist, not a
            performance prediction.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/youtube-video-analyzer"
              className="rounded-2xl bg-cyan-300 px-5 py-2.5 text-sm font-black text-black transition hover:bg-cyan-200"
            >
              Analyze a video
            </a>
            <a
              href="/hook-analyzer"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-black text-white/70 transition hover:bg-white/[0.08]"
            >
              Score a hook
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
