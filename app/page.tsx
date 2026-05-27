import SiteFooter from "./components/site-footer";
import BrandOrb from "./components/brand-orb";
import WorkflowBanner from "./components/workflow-banner";

export const metadata = {
  title: "HookSignals | Premium AI Creator Tools for YouTube and Shorts",
  description:
    "AI-powered creator workflow tools for hooks, scripts, thumbnails and retention. Analyze, improve and generate better video ideas before publishing.",
  alternates: {
    canonical: "https://hooksignals.com",
  },
};

const productTools = [
  {
    name: "Hook Analyzer",
    desc: "Find what works",
    href: "/hook-analyzer",
    icon: "↗",
  },
  {
    name: "Hook Improver",
    desc: "Make it sharper",
    href: "/hook-improver",
    icon: "✦",
  },
  {
    name: "Script Generator",
    desc: "Build full Shorts scripts",
    href: "/shorts-script-generator",
    icon: "▣",
  },
  {
    name: "Thumbnail Checker",
    desc: "Boost CTR clarity",
    href: "/thumbnail-text-checker",
    icon: "◈",
  },
];

const scoreBreakdown = [
  { label: "Attention", value: "92/100", width: "92%" },
  { label: "Relevance", value: "85/100", width: "85%" },
  { label: "Emotional Impact", value: "90/100", width: "90%" },
  { label: "Clarity", value: "78/100", width: "78%" },
  { label: "Viral Potential", value: "88/100", width: "88%" },
];

const sideNav = [
  "Dashboard",
  "Hook Analyzer",
  "Hook Improver",
  "Script Generator",
  "Thumbnail Checker",
  "History",
  "Favorites",
  "Settings",
];

const stats = [
  ["10K+", "Creators"],
  ["100K+", "Hooks analyzed"],
  ["95%", "Workflow coverage"],
  ["24/7", "AI-powered"],
];

const workflowSteps = [
  {
    title: "Analyze the opening",
    desc: "Score the hook for attention, clarity and retention before the video goes live.",
  },
  {
    title: "Rewrite weak angles",
    desc: "Turn rough ideas into sharper hooks with stronger curiosity and specificity.",
  },
  {
    title: "Build the script",
    desc: "Create a short-form structure with hook, beats and a clear payoff.",
  },
  {
    title: "Check the click",
    desc: "Validate thumbnail text and title clarity before publishing.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030507] text-white">
      <section className="relative min-h-screen overflow-hidden border-b border-white/10">
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
              <a className="transition hover:text-white" href="/youtube-hook-generator">Generator</a>
              <a className="transition hover:text-white" href="/youtube-ctr-tips">Resources</a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/tools"
                className="hidden rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 md:inline-flex"
              >
                Dashboard
              </a>
              <a
                href="/hook-analyzer"
                className="rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
              >
                Get Started Free →
              </a>
            </div>
          </nav>

          <div className="grid gap-10 pb-16 pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pt-20">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-100 shadow-lg shadow-violet-500/10">
                <span className="text-emerald-300">✦</span>
                AI-powered creator tools
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.06em] text-white md:text-7xl xl:text-[88px]">
                Create hooks that <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-300 bg-clip-text text-transparent">stop the scroll.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62 md:text-xl">
                A premium pre-publish workflow for creators. Analyze hooks,
                improve scripts, check thumbnail text and ship stronger videos
                before your audience ever sees them.
              </p>
