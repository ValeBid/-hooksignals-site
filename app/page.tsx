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
import OutputProof from "./components/output-proof";
import CreatorCaseStudy from "./components/creator-case-study";
import EmailCapture from "./components/email-capture";
import ExampleAnalyses from "./components/example-analyses";
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
  ["9", "Focused tools for the pre-publish workflow"],
  ["5 credits", "One premium hook analysis"],
  ["Pro", "Best plan for weekly creators"],
  ["SEO", "Built as a search-first creator acquisition engine"],
];

function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-300/16 via-sky-400/8 to-violet-400/12 shadow-lg shadow-cyan-500/10 hs-pulse-glow">
      <div className="absolute inset-1 rounded-xl border border-white/10" />
      <span className="text-lg font-black tracking-[-0.08em] text-cyan-100">HS</span>
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative hs-float-soft">
      <div className="absolute -inset-10 rounded-[54px] bg-gradient-to-br from-cyan-400/10 via-sky-400/6 to-violet-500/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[#050811]/95 p-4 shadow-[0_32px_90px_rgba(0,0,0,.48)] backdrop-blur-2xl hs-scan-line">
        <div className="rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_28%_20%,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(129,140,248,0.13),transparent_26%),linear-gradient(135deg,#07111c,#030508)] p-5">
          <div className="flex items-center justify-between text-xs text-white/55">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1">Creator workflow preview</span>
            <span>Pre-publish checks</span>
          </div>
          <div className="mt-10 max-w-md hs-slide-up">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Hook analysis</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">Find the weak point before viewers do.</h2>
            <p className="mt-4 leading-7 text-white/58">Check the opening promise, curiosity gap and packaging before you publish.</p>
          </div>
          <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400" />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[["Score", "78/100"], ["Risk", "Medium"], ["Next", "Rewrite"]].map(([k, v]) => <div key={k} className="rounded-2xl border border-white/10 bg-black/24 p-4"><p className="text-xs uppercase tracking-[0.14em] text-white/35">{k}</p><p className="mt-2 font-black text-cyan-200">{v}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function PurchaseBand() {
  return (
    <section className="mt-10 rounded-[34px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.10),rgba(124,58,237,.08))] p-6 shadow-[0_28px_100px_rgba(34,211,238,.10)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Creator Pro workflow</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-5xl">Turn one idea into a full publish-ready package.</h2>
          <p className="mt-4 max-w-3xl leading-8 text-white/58">Premium analysis unlocks deeper hook variants, title pairings, thumbnail angles and saved workflow history before you publish.</p>
        </div>
        <div className="grid gap-3">
          <a href="/checkout/pro" className="rounded-2xl bg-white px-6 py-4 text-center text-sm font-black text-black transition hover:scale-[1.01]">Start Creator Pro</a>
          <a href="/hook-analyzer" className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-center text-sm font-black text-white transition hover:bg-white/10">Analyze a hook first</a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen overflow-hidden bg-[#020408] pb-28 text-white hs-mobile-safe">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(6,182,212,0.10),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.11),transparent_30%),linear-gradient(180deg,#020408_0%,#05070b_55%,#020408_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

          <div className="relative mx-auto max-w-[1480px] px-5 py-5 md:px-8 hs-mobile-cinematic">
            <nav className="sticky top-4 z-50 flex items-center justify-between rounded-[26px] border border-white/10 bg-black/30 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl md:px-6">
              <a href="/" className="flex items-center gap-3" aria-label="HookSignals home">
                <LogoMark />
                <div>
                  <span className="block text-xl font-black tracking-tight">HookSignals</span>
                  <span className="hidden text-xs uppercase tracking-[0.16em] text-cyan-300 sm:block">Creator Intelligence</span>
                </div>
              </a>
              <div className="hidden items-center gap-8 text-sm text-white/58 lg:flex">
                <a className="transition hover:text-white" href="/tools">Tools</a>
                <a className="transition hover:text-white" href="/hook-analyzer">Analyzer</a>
                <a className="transition hover:text-white" href="/pricing">Pricing</a>
                <a className="transition hover:text-white" href="/blog">Resources</a>
                <a className="transition hover:text-white" href="/seo">SEO Hub</a>
              </div>
              <div className="flex items-center gap-2">
                <a href="/hook-analyzer" className="hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-black text-white transition hover:bg-white/10 sm:inline-flex">Analyze free</a>
                <a href="/checkout/pro" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-4 py-2.5 text-sm font-black text-black shadow-[0_16px_34px_rgba(34,211,238,.18)] transition hover:scale-[1.01] md:px-5">Start Pro</a>
              </div>
            </nav>

            <section className="grid gap-10 pb-16 pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-24 lg:pt-24 hs-mobile-stack">
              <div>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/24 bg-cyan-300/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100 shadow-lg shadow-cyan-500/5 hs-slide-up">
                  <span className="text-cyan-300">✦</span>Pre-publish creator workflow
                </div>
                <h1 className="max-w-5xl text-6xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl xl:text-[92px] hs-slide-up hs-delay-1">
                  Improve the idea<br />
                  <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">before</span> you publish.
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-white/62 md:text-xl hs-slide-up hs-delay-2 hs-mobile-text">
                  Diagnose weak hooks, sharpen the title and thumbnail, then publish with a clearer reason for viewers to click and keep watching.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row hs-slide-up hs-delay-3">
                  <a href="/hook-analyzer" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-8 py-4 text-base font-black text-black shadow-[0_20px_48px_rgba(34,211,238,.18)] transition hover:scale-[1.01]">Analyze a hook <span className="transition group-hover:translate-x-1">→</span></a>
                  <a href="/checkout/pro" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.08] px-8 py-4 text-base font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]">Start Creator Pro</a>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/42">
                  <span>✓ 7-day trial if enabled</span><span>✓ 5 credits per analysis</span><span>✓ Secure checkout by Paddle</span>
                </div>
                <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 hs-slide-up hs-delay-4">
                  {productTools.map(([name, desc, href, icon]) => (
                    <a key={href} href={href} className="group rounded-[22px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.07] hs-mobile-card">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/18 bg-cyan-300/8 text-cyan-300 shadow-lg shadow-cyan-500/5">{icon}</div>
                      <p className="font-semibold text-white">{name}</p>
                      <p className="mt-1 text-sm text-white/45">{desc}</p>
                    </a>
                  ))}
                </div>
              </div>
              <HeroMockup />
            </section>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_16px_60px_rgba(0,0,0,.36)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 hs-slide-up hs-mobile-card">
              {proofStats.map(([value, label]) => (
                <div key={value} className="rounded-[20px] border border-white/6 bg-black/22 p-5">
                  <p className="text-3xl font-black tracking-tight text-white">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/45">{label}</p>
                </div>
              ))}
            </div>

            <PurchaseBand />
            <LiveCreatorMetrics />
            <EmailCapture />
            <ExampleAnalyses />
            <ProductProof />
            <OutputProof />
            <CreatorCaseStudy />
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
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href="/hook-analyzer" className="inline-flex rounded-2xl bg-white px-8 py-4 font-black text-black transition hover:scale-[1.02]">Start analyzing →</a><a href="/checkout/pro" className="inline-flex rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.08] px-8 py-4 font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]">Start Pro →</a></div>
            </section>
          </div>
        </section>
        <SiteFooter />
        <StickyCTA />
      </main>
    </>
  );
}
