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
import "./components/premium-motion.css";
import "./components/mobile-cinematic.css";

export const metadata = {
  title: "HookSignals | AI Creator OS for Hooks, Retention & Thumbnails",
  description:
    "HookSignals helps short-form creators analyze hooks, improve retention, optimize thumbnails and build stronger creator workflows before publishing.",
  keywords: [
    "AI hook analyzer",
    "creator retention analytics",
    "YouTube Shorts tools",
    "TikTok creator tools",
    "thumbnail CTR checker",
    "shorts script generator",
    "creator workflow AI",
    "AI creator OS",
  ],
  alternates: {
    canonical: "https://hooksignals.com",
  },
  openGraph: {
    title: "HookSignals — AI Creator Operating System",
    description:
      "Analyze hooks, retention, thumbnails and creator workflows before publishing.",
    url: "https://hooksignals.com",
    siteName: "HookSignals",
    type: "website",
  },
};

const productTools = [
  ["Hook Analyzer", "Score curiosity, clarity and retention pull.", "/hook-analyzer", "↗"],
  ["Hook Improver", "Rewrite weak openings into stronger hooks.", "/hook-improver", "✦"],
  ["Script Generator", "Turn validated hooks into Shorts scripts.", "/shorts-script-generator", "▣"],
  ["Thumbnail Intelligence", "Check mobile readability and CTR clarity.", "/thumbnail-text-checker", "◈"],
];

const stats = [
  ["86/100", "Sample Hook Score"],
  ["67.3%", "Avg. retention signal"],
  ["9.4%", "Thumbnail CTR model"],
  ["24.8K", "Creator growth scenario"],
];

const authority = [
  ["Creator SEO infrastructure", "Built around YouTube Shorts SEO, TikTok discovery systems, AI hook analysis and retention-first publishing workflows."],
  ["Professional workflow system", "Every layer pushes toward stronger watch retention, clearer messaging and better algorithmic packaging before publishing."],
  ["Premium creator intelligence", "HookSignals combines hook analysis, title optimization, script structure and thumbnail readability in one connected system."],
];

const comparison = [
  ["Traditional workflow", "Multiple disconnected tools, weak retention analysis and manual packaging decisions."],
  ["HookSignals workflow", "Unified AI workflow with hook intelligence, creator SEO optimization and retention-focused publishing systems."],
];

const videoMocks = [
  ["Hook teardown", "00:18", "Opening risk detected", "Clarity 82"],
  ["Shorts script", "00:42", "Retention beat map", "Pacing 91"],
  ["Thumbnail check", "00:09", "Text overload reduced", "Readability 88"],
];

function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-300/20 via-sky-400/10 to-violet-400/15 shadow-lg shadow-cyan-500/15 hs-pulse-glow">
      <div className="absolute inset-1 rounded-xl border border-white/10" />
      <span className="text-lg font-black tracking-[-0.08em] text-cyan-100">HS</span>
    </div>
  );
}

function VideoMockup() {
  return (
    <div className="relative hs-float-soft">
      <div className="absolute -inset-10 rounded-[54px] bg-gradient-to-br from-cyan-400/18 via-sky-400/10 to-violet-500/18 blur-3xl" />
      <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[#050811]/95 p-4 shadow-[0_40px_120px_rgba(0,0,0,.55)] backdrop-blur-2xl hs-scan-line">
        <div className="aspect-[16/10] overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_28%_20%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(129,140,248,0.22),transparent_26%),linear-gradient(135deg,#07111c,#030508)] p-5">
          <div className="flex items-center justify-between text-xs text-white/55">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1">Live creator workflow</span>
            <span>AI retention engine</span>
          </div>
          <div className="mt-10 max-w-md hs-slide-up">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Creator intelligence layer</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">The first 3 seconds decide everything.</h2>
            <p className="mt-4 leading-7 text-white/58">Analyze hooks, titles, thumbnails and pacing before the algorithm scores your content.</p>
          </div>
          <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400" />
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {videoMocks.map(([title, time, desc, score], index) => (
            <div key={title} className={`rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-white/[0.08] hs-slide-up hs-delay-${index + 1}`}>
              <div className="mb-4 flex items-center justify-between text-xs text-white/45">
                <span>{time}</span>
                <span className="text-cyan-300">●</span>
              </div>
              <p className="font-bold text-white">{title}</p>
              <p className="mt-1 text-sm text-white/45">{desc}</p>
              <p className="mt-3 text-sm font-black text-cyan-300">{score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
