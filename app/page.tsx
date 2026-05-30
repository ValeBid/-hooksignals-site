import SiteFooter from "./components/site-footer";
import StructuredData from "./components/structured-data";
import StickyCTA from "./components/sticky-cta";
import PredictorHero from "./components/predictor-hero";
import RetentionCurveSection from "./components/retention-curve";
import BentoGrid from "./components/bento-grid";
import { FadeIn } from "./components/motion";
import HookTransformSection from "./components/hook-transform-section";
import "./components/premium-motion.css";
import "./components/mobile-cinematic.css";

export const metadata = {
  title: "HookSignals Video Performance Predictor | Predict Before You Publish",
  description:
    "Predict video performance before publishing. Analyze your title, hook, thumbnail text and niche to find retention risks, CTR potential and outlier signals.",
  alternates: { canonical: "https://hooksignals.com" },
  openGraph: {
    title: "HookSignals Video Performance Predictor",
    description:
      "Analyze your title, hook and thumbnail text before publishing. Detect weak packaging, retention risks and outlier potential in seconds.",
    url: "https://hooksignals.com",
    siteName: "HookSignals",
    type: "website",
  },
};

function FinalCTA() {
  return (
    <FadeIn>
    <section className="mx-auto mt-20 max-w-[1320px] px-5 pb-24 md:px-8">
      <div className="overflow-hidden rounded-[40px] border border-cyan-300/20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.16),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.025))] p-8 text-center shadow-[0_30px_100px_rgba(34,211,238,.10)] md:p-14">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Start predicting</p>
        <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">
          Make the video stronger before the audience decides.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/58">
          Use HookSignals to preview title strength, hook clarity, thumbnail promise and outlier potential before publishing.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/youtube-video-analyzer"
            className="inline-flex justify-center rounded-2xl bg-white px-8 py-4 font-black text-black transition hover:scale-[1.02]"
          >
            Analyze YouTube Video
          </a>
          <a
            href="/hook-analyzer"
            className="inline-flex justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.08] px-8 py-4 font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]"
          >
            Analyze Hook Text
          </a>
        </div>
        <p className="mt-6 text-sm text-white/35">No signup needed for a preview score. Full analysis uses 5 credits.</p>
      </div>
    </section>
    </FadeIn>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen overflow-hidden bg-[#020408] text-white hs-mobile-safe">
        <PredictorHero />
        <RetentionCurveSection />
        <BentoGrid />
        <HookTransformSection />
        <FinalCTA />
        <SiteFooter />
        <StickyCTA />
      </main>
    </>
  );
}
