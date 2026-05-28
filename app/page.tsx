import SiteFooter from "./components/site-footer";
import BrandOrb from "./components/brand-orb";
import WorkflowBanner from "./components/workflow-banner";
import PricingPreview from "./components/pricing-preview";
import WorkspacePreview from "./components/workspace-preview";
import "./components/premium-motion.css";

export const metadata = {
  title: "HookSignals | AI Hook Analyzer, Creator SEO Intelligence & Viral Content Workflow",
  description:
    "Professional AI-powered creator workflow platform for YouTube Shorts, TikTok hooks, retention analysis, thumbnail optimization and creator SEO intelligence.",
  keywords: [
    "AI hook analyzer",
    "TikTok SEO tools",
    "YouTube SEO AI",
    "AI creator tools",
    "viral hook generator",
    "shorts script generator",
    "creator workflow AI",
    "thumbnail optimization",
  ],
  alternates: {
    canonical: "https://hooksignals.com",
  },
  openGraph: {
    title: "HookSignals — AI Creator Intelligence Platform",
    description:
      "Analyze hooks, optimize titles, generate scripts and improve creator retention before publishing.",
    url: "https://hooksignals.com",
    siteName: "HookSignals",
    type: "website",
  },
};

const productTools = [
  ["AI Hook Analyzer", "Score clarity, curiosity and retention risk.", "/hook-analyzer", "↗"],
  ["Hook Improver", "Rewrite weak openings into sharper hooks.", "/hook-improver", "✦"],
  ["Shorts Script Generator", "Create structured short-form scripts fast.", "/shorts-script-generator", "▣"],
  ["Thumbnail Text Checker", "Make thumbnail copy clearer before posting.", "/thumbnail-text-checker", "◈"],
];

const stats = [
  ["4.3M+", "AI hook checks processed"],
  ["92%", "Creator clarity score improvement"],
  ["12s", "Average workflow completion"],
  ["24/7", "AI workflow availability"],
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

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020408] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(6,182,212,0.14),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.16),transparent_30%),radial-gradient(circle_at_70%_75%,rgba(14,165,233,0.08),transparent_26%),linear-gradient(180deg,#020408_0%,#05070b_55%,#020408_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[140px]" />

        <div className="relative mx-auto max-w-[1480px] px-5 py-5 md:px-8">
          <nav className="sticky top-4 z-50 flex items-center justify-between rounded-[26px] border border-white/10 bg-black/30 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl md:px-6">
            <a href="/" className="flex items-center gap-3" aria-label="HookSignals home">
              <LogoMark />
              <div>
                <span className="block text-xl font-black tracking-tight">HookSignals</span>
                <span className="text-xs uppercase tracking-[0.16em] text-cyan-300">Creator Intelligence</span>
              </div>
            </a>

            <div className="hidden items-center gap-8 text-sm text-white/58 lg:flex">
              <a className="transition hover:text-white" href="/tools">Tools</a>
              <a className="transition hover:text-white" href="/hook-analyzer">Analyzer</a>
              <a className="transition hover:text-white" href="/pricing">Pricing</a>
              <a className="transition hover:text-white" href="/workspace">Workspace</a>
              <a className="transition hover:text-white" href="/blog">Blog</a>
            </div>

            <div className="flex items-center gap-3">
              <a href="/pricing" className="hidden rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 md:inline-flex">Pricing</a>
              <a href="/hook-analyzer" className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-5 py-2.5 text-sm font-black text-black shadow-[0_20px_40px_rgba(34,211,238,.24)] transition hover:scale-[1.02]">Start Free</a>
            </div>
          </nav>

          <section className="grid gap-10 pb-16 pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-24 lg:pt-24">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-100 shadow-lg shadow-violet-500/10 hs-slide-up">
                <span className="text-cyan-300">✦</span>
                AI creator workflow platform for YouTube Shorts & TikTok SEO
              </div>

              <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.08em] text-white md:text-7xl xl:text-[96px] hs-slide-up hs-delay-1">
                Create content that <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">wins attention instantly.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/62 md:text-xl hs-slide-up hs-delay-2">
                HookSignals helps creators analyze hooks, optimize titles, generate Shorts scripts and improve retention before publishing.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row hs-slide-up hs-delay-3">
                <a href="/tools" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-8 py-4 text-base font-black text-black shadow-[0_24px_60px_rgba(34,211,238,.22)] transition hover:scale-[1.02]">Explore All Tools <span className="transition group-hover:translate-x-1">→</span></a>
                <a href="/hook-analyzer" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-4 text-base font-bold text-white transition hover:bg-white/10">Analyze a Hook</a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 hs-slide-up hs-delay-4">
                {productTools.map(([name, desc, href, icon]) => (
                  <a key={href} href={href} className="group rounded-[22px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-white/[0.08] hover:-translate-y-1">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 shadow-lg shadow-cyan-500/10">{icon}</div>
                    <p className="font-semibold text-white">{name}</p>
                    <p className="mt-1 text-sm text-white/45">{desc}</p>
                  </a>
                ))}
              </div>
            </div>

            <VideoMockup />
          </section>

          <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4 hs-slide-up">
            {stats.map(([value, label]) => (
              <div key={value} className="rounded-[20px] border border-white/6 bg-black/25 p-5">
                <p className="text-3xl font-black tracking-tight text-white">{value}</p>
                <p className="mt-2 text-sm leading-6 text-white/45">{label}</p>
              </div>
            ))}
          </div>

          <WorkflowBanner />

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            {authority.map(([title, desc], index) => (
              <div key={title} className={`rounded-[30px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-xl hs-slide-up hs-delay-${index + 1}`}>
                <LogoMark />
                <h2 className="mt-5 text-3xl font-black tracking-tight">{title}</h2>
                <p className="mt-4 leading-7 text-white/52">{desc}</p>
              </div>
            ))}
          </section>

          <section className="mt-14 rounded-[34px] border border-cyan-300/10 bg-gradient-to-br from-cyan-400/[0.05] via-black/40 to-violet-500/[0.05] p-8 shadow-[0_30px_100px_rgba(0,0,0,.45)]">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Why creators switch</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">One connected workflow instead of disconnected creator tools.</h2>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {comparison.map(([title, desc]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-black/25 p-7 backdrop-blur-xl">
                  <h3 className="text-2xl font-black tracking-tight">{title}</h3>
                  <p className="mt-4 leading-7 text-white/55">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <WorkspacePreview />
          <PricingPreview />

          <section className="py-20 md:py-24">
            <div className="rounded-[36px] border border-cyan-300/20 bg-gradient-to-br from-cyan-400/[0.08] via-sky-400/[0.04] to-violet-500/[0.08] p-8 shadow-[0_40px_120px_rgba(0,0,0,.45)]">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Creator workflow engine</p>
              <h2 className="mt-4 max-w-5xl text-4xl font-black tracking-[-0.05em] md:text-6xl">Improve the first seconds before the algorithm gets a vote.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/58">Use HookSignals to optimize hooks, titles, scripts and thumbnails before publishing. Build stronger retention systems and improve creator packaging quality across YouTube Shorts and TikTok.</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="/hook-analyzer" className="inline-flex rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-8 py-4 font-black text-black shadow-[0_24px_60px_rgba(34,211,238,.22)] transition hover:scale-[1.02]">Open Hook Analyzer</a>
                <a href="/pricing" className="inline-flex rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-4 font-bold text-white transition hover:bg-white/10">View Pricing</a>
              </div>
            </div>
          </section>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
