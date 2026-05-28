import SiteFooter from "./components/site-footer";
import WorkflowBanner from "./components/workflow-banner";
import PricingPreview from "./components/pricing-preview";
import WorkspacePreview from "./components/workspace-preview";
import AnimatedDashboard from "./components/animated-dashboard";
import VideoShowcase from "./components/video-showcase";
import StickyCTA from "./components/sticky-cta";
import LiveCreatorMetrics from "./components/live-creator-metrics";
import AIAnswerLayout from "./components/ai-answer-layout";
import InternalLinkMesh from "./components/internal-link-mesh";
import CreatorPaths from "./components/creator-paths";
import TrustFoundation from "./components/trust-foundation";
import StructuredData from "./components/structured-data";
import ProductProof from "./components/product-proof";
import "./components/premium-motion.css";
import "./components/mobile-cinematic.css";

export const metadata = {
  title: "HookSignals | Free AI Creator Tools for Hooks, Retention & Thumbnails",
  description:
    "Analyze hooks, improve retention, check thumbnail clarity and build stronger creator workflows before publishing.",
  alternates: { canonical: "https://hooksignals.com" },
  openGraph: {
    title: "HookSignals — Free AI Creator Tools",
    description: "Analyze hooks, retention, thumbnails and creator workflows before publishing.",
    url: "https://hooksignals.com",
    siteName: "HookSignals",
    type: "website",
  },
};

const productTools = [
  ["Hook Analyzer", "Score curiosity, clarity and retention pull.", "/hook-analyzer", "↗"],
  ["Hook Improver", "Rewrite weak openings into stronger hooks.", "/hook-improver", "✦"],
  ["Script Generator", "Turn validated hooks into Shorts scripts.", "/shorts-script-generator", "▣"],
  ["Thumbnail Checker", "Check mobile readability and CTR clarity.", "/thumbnail-text-checker", "◈"],
];

const proofStats = [
  ["Free", "Start with public creator tools"],
  ["Beta", "Premium workflows are early access"],
  ["4", "Core pre-publish checks"],
  ["SEO", "Built for creator search intent"],
];

function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-300/20 via-sky-400/10 to-violet-400/15 shadow-lg shadow-cyan-500/15 hs-pulse-glow">
      <div className="absolute inset-1 rounded-xl border border-white/10" />
      <span className="text-lg font-black tracking-[-0.08em] text-cyan-100">HS</span>
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative hs-float-soft">
      <div className="absolute -inset-10 rounded-[54px] bg-gradient-to-br from-cyan-400/18 via-sky-400/10 to-violet-500/18 blur-3xl" />
      <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[#050811]/95 p-4 shadow-[0_40px_120px_rgba(0,0,0,.55)] backdrop-blur-2xl hs-scan-line">
        <div className="rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_28%_20%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(129,140,248,0.22),transparent_26%),linear-gradient(135deg,#07111c,#030508)] p-5">
          <div className="flex items-center justify-between text-xs text-white/55">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1">Creator workflow preview</span>
            <span>Pre-publish checks</span>
          </div>
          <div className="mt-10 max-w-md hs-slide-up">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Hook analysis</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">The first 3 seconds decide everything.</h2>
            <p className="mt-4 leading-7 text-white/58">Check the opening promise, curiosity gap and packaging before you publish.</p>
          </div>
          <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen overflow-hidden bg-[#020408] pb-28 text-white hs-mobile-safe">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(6,182,212,0.16),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.18),transparent_30%),linear-gradient(180deg,#020408_0%,#05070b_55%,#020408_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />

          <div className="relative mx-auto max-w-[1480px] px-5 py-5 md:px-8 hs-mobile-cinematic">
            <nav className="sticky top-4 z-50 flex items-center justify-between rounded-[26px] border border-white/10 bg-black/30 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl md:px-6">
              <a href="/" className="flex items-center gap-3" aria-label="HookSignals home">
                <LogoMark />
                <div>
                  <span className="block text-xl font-black tracking-tight">HookSignals</span>
                  <span className="hidden text-xs uppercase tracking-[0.16em] text-cyan-300 sm:block">Creator Tools</span>
                </div>
              </a>
              <div className="hidden items-center gap-8 text-sm text-white/58 lg:flex">
                <a className="transition hover:text-white" href="/tools">Tools</a>
                <a className="transition hover:text-white" href="/hook-analyzer">Analyzer</a>
                <a className="transition hover:text-white" href="/pricing">Beta</a>
                <a className="transition hover:text-white" href="/blog">Resources</a>
                <a className="transition hover:text-white" href="/seo">SEO Hub</a>
              </div>
              <a href="/hook-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-4 py-2.5 text-sm font-black text-black shadow-[0_20px_40px_rgba(34,211,238,.24)] transition hover:scale-[1.02] md:px-5">Start free</a>
            </nav>

            <section className="grid gap-10 pb-16 pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-24 lg:pt-24 hs-mobile-stack">
              <div>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-100 shadow-lg shadow-violet-500/10 hs-slide-up">
                  <span className="text-cyan-300">✦</span>Free creator workflow tools
                </div>
                <h1 className="max-w-5xl text-6xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl xl:text-[92px] hs-slide-up hs-delay-1">
                  Analyze.<br />
                  <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">Improve.</span><br />
                  Grow.
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-white/62 md:text-xl hs-slide-up hs-delay-2 hs-mobile-text">
                  Analyze hooks, rewrite weak openings, check thumbnail clarity and build stronger content decisions before publishing.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row hs-slide-up hs-delay-3">
                  <a href="/hook-analyzer" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-8 py-4 text-base font-black text-black shadow-[0_24px_60px_rgba(34,211,238,.22)] transition hover:scale-[1.02]">Analyze a Hook <span className="transition group-hover:translate-x-1">→</span></a>
                  <a href="/tools" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-4 text-base font-bold text-white transition hover:bg-white/10">Explore tools</a>
                </div>
                <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 hs-slide-up hs-delay-4">
                  {productTools.map(([name, desc, href, icon]) => (
                    <a key={href} href={href} className="group rounded-[22px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.08] hs-mobile-card">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 shadow-lg shadow-cyan-500/10">{icon}</div>
                      <p className="font-semibold text-white">{name}</p>
                      <p className="mt-1 text-sm text-white/45">{desc}</p>
                    </a>
                  ))}
                </div>
              </div>
              <HeroMockup />
            </section>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 hs-slide-up hs-mobile-card">
              {proofStats.map(([value, label]) => (
                <div key={value} className="rounded-[20px] border border-white/6 bg-black/25 p-5">
                  <p className="text-3xl font-black tracking-tight text-white">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/45">{label}</p>
                </div>
              ))}
            </div>

            <LiveCreatorMetrics />
            <ProductProof />
            <WorkflowBanner />
            <AnimatedDashboard />
            <VideoShowcase />
            <CreatorPaths />
            <TrustFoundation />
            <AIAnswerLayout />
            <InternalLinkMesh />
            <WorkspacePreview />
            <PricingPreview />

            <section className="mt-16 rounded-[38px] border border-cyan-300/20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.02))] p-8 text-center shadow-[0_40px_120px_rgba(34,211,238,.1)] md:p-14">
              <h2 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">Build better creator workflows before publishing.</h2>
              <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/58">Start with a hook, improve the script, test the thumbnail and publish with stronger retention signals.</p>
              <a href="/hook-analyzer" className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 font-black text-black transition hover:scale-[1.02]">Start analyzing →</a>
            </section>
          </div>
        </section>
        <SiteFooter />
        <StickyCTA />
      </main>
    </>
  );
}
