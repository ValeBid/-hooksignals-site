import SiteFooter from "./components/site-footer";
import BrandOrb from "./components/brand-orb";
import WorkflowBanner from "./components/workflow-banner";
import PricingPreview from "./components/pricing-preview";
import WorkspacePreview from "./components/workspace-preview";

export const metadata = {
  title: "HookSignals | Premium AI Creator Tools for YouTube and Shorts",
  description:
    "AI-powered creator workflow tools for hooks, scripts, thumbnails and retention. Analyze, improve and generate better video ideas before publishing.",
  alternates: {
    canonical: "https://hooksignals.com",
  },
};

const productTools = [
  ["Hook Analyzer", "Find what works", "/hook-analyzer", "↗"],
  ["Hook Improver", "Make it sharper", "/hook-improver", "✦"],
  ["Script Generator", "Build Shorts scripts", "/shorts-script-generator", "▣"],
  ["Thumbnail Checker", "Improve clarity", "/thumbnail-text-checker", "◈"],
];

const stats = [
  ["Hook", "Analyze the first seconds."],
  ["Title", "Clarify click intent."],
  ["Script", "Structure retention."],
  ["Package", "Improve first impression."],
];

const authority = [
  ["Creator psychology", "A stronger opening reduces early drop-off and gives the viewer a clear reason to stay."],
  ["Workflow discipline", "HookSignals connects hook, title, script and packaging instead of treating each tool as isolated."],
  ["Pre-publish clarity", "Use the system before posting so weak ideas are improved before they reach the feed."],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030507] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(34,197,94,0.12),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.14),transparent_30%),radial-gradient(circle_at_70%_75%,rgba(14,165,233,0.08),transparent_26%),linear-gradient(180deg,#030507_0%,#05070b_55%,#030507_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-400/8 blur-[120px]" />

        <div className="relative mx-auto max-w-[1480px] px-5 py-5 md:px-8">
          <nav className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.035] px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl md:px-6">
            <a href="/" className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-400/10 shadow-lg shadow-emerald-500/10">
                <span className="text-xl font-black text-emerald-300">↗</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">HookSignals</span>
            </a>

            <div className="hidden items-center gap-8 text-sm text-white/58 lg:flex">
              <a className="transition hover:text-white" href="/tools">Tools</a>
              <a className="transition hover:text-white" href="/hook-analyzer">Analyzer</a>
              <a className="transition hover:text-white" href="/pricing">Pricing</a>
              <a className="transition hover:text-white" href="/workspace">Workspace</a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/pricing"
                className="hidden rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 md:inline-flex"
              >
                Pricing
              </a>
              <a
                href="/hook-analyzer"
                className="rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
              >
                Start Free
              </a>
            </div>
          </nav>

          <section className="grid gap-10 pb-14 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pb-18 lg:pt-18">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-100 shadow-lg shadow-violet-500/10">
                <span className="text-emerald-300">✦</span>
                AI-powered creator workflow
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.06em] text-white md:text-7xl xl:text-[88px]">
                Create hooks that <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-300 bg-clip-text text-transparent">stop the scroll.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62 md:text-xl">
                A premium creator intelligence workflow for hooks, titles, scripts and retention before your content goes live.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/tools"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-8 py-4 text-base font-bold text-black shadow-2xl shadow-emerald-500/18 transition hover:bg-emerald-300"
                >
                  Explore All Tools
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="/hook-analyzer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.035] px-8 py-4 text-base font-bold text-white transition hover:bg-white/10"
                >
                  Analyze a Hook
                </a>
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {productTools.map(([name, desc, href, icon]) => (
                  <a
                    key={href}
                    href={href}
                    className="group rounded-[20px] border border-white/10 bg-white/[0.035] p-4 transition hover:border-emerald-300/30 hover:bg-white/[0.07]"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-300 shadow-lg shadow-emerald-500/10">
                      {icon}
                    </div>
                    <p className="font-semibold text-white">{name}</p>
                    <p className="mt-1 text-sm text-white/45">{desc}</p>
                  </a>
                ))}
              </div>
            </div>

            <BrandOrb
              title="Built for serious creator workflows."
              description="HookSignals connects hook analysis, title clarity, script pacing and packaging signals inside one premium pre-publish system."
            />
          </section>

          <div className="grid gap-3 rounded-[24px] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={value} className="rounded-[18px] bg-black/25 p-4">
                <p className="text-lg font-black tracking-tight text-white">{value}</p>
                <p className="mt-1 text-sm leading-6 text-white/45">{label}</p>
              </div>
            ))}
          </div>

          <WorkflowBanner />

          <section className="mt-12 grid gap-4 md:grid-cols-3">
            {authority.map(([title, desc]) => (
              <div
                key={title}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/20"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] text-sm font-black text-emerald-300">
                  HS
                </div>
                <h2 className="text-2xl font-black tracking-tight">{title}</h2>
                <p className="mt-4 leading-7 text-white/52">{desc}</p>
              </div>
            ))}
          </section>

          <WorkspacePreview />
          <PricingPreview />

          <section className="py-16 md:py-20">
            <div className="rounded-[32px] border border-emerald-300/20 bg-emerald-300/[0.06] p-7 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
                Start with the hook
              </p>
              <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
                Improve the first seconds before the algorithm gets a vote.
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-white/58">
                Use HookSignals to check clarity, curiosity and retention risk before publishing. Then move through title, script and packaging tools in one connected workflow.
              </p>
              <a
                href="/hook-analyzer"
                className="mt-8 inline-flex rounded-2xl bg-emerald-400 px-7 py-4 font-bold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
              >
                Open Hook Analyzer
              </a>
            </div>
          </section>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
