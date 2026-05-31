import PremiumToolShell from "../components/premium-tool-shell";
import { FadeIn } from "../components/motion";

export const metadata = {
  title: "AI Creator Tools for Hooks, Titles, Scripts & Retention",
  description:
    "Use HookSignals creator tools to analyze hooks, improve titles, generate Shorts scripts, check thumbnail clarity and strengthen retention before publishing.",
  alternates: { canonical: "https://hooksignals.com/tools" },
  openGraph: {
    title: "AI Creator Tools",
    description:
      "Analyze hooks, improve titles, check thumbnail clarity and build stronger pre-publish creator workflows.",
    url: "https://hooksignals.com/tools",
    siteName: "HookSignals",
    type: "website",
  },
};

type Tool = {
  name: string;
  desc: string;
  href: string;
  stage: string;
  cta: string;
  accent?: boolean;
};

const supporting: Tool[] = [
  {
    name: "Hook Analyzer",
    desc: "Score your opening line for clarity, curiosity gap and retention risk across platforms.",
    href: "/hook-analyzer",
    stage: "Analyze",
    cta: "Score your hook →",
    accent: true,
  },
  {
    name: "YouTube Title Analyzer",
    desc: "Score your title for CTR potential, clarity, curiosity gap and keyword placement.",
    href: "/youtube-title-analyzer",
    stage: "Analyze",
    cta: "Score your title →",
    accent: true,
  },
  {
    name: "Hook Improver",
    desc: "Rewrite weak hooks into sharper, tension-driven versions with named rewrite angles.",
    href: "/hook-improver",
    stage: "Improve",
    cta: "Rewrite your hook →",
  },
  {
    name: "YouTube Hook Generator",
    desc: "Generate stronger opening lines for YouTube videos and Shorts.",
    href: "/youtube-hook-generator",
    stage: "Improve",
    cta: "Generate hooks →",
  },
  {
    name: "TikTok Hook Generator",
    desc: "Create TikTok hooks designed to stop the scroll in the first word.",
    href: "/tiktok-hook-generator",
    stage: "Improve",
    cta: "Generate TikTok hooks →",
  },
  {
    name: "YouTube Title Generator",
    desc: "Generate clickable YouTube titles built around curiosity and CTR signals.",
    href: "/youtube-title-generator",
    stage: "Package",
    cta: "Generate titles →",
  },
  {
    name: "Thumbnail Text Checker",
    desc: "Check if thumbnail text is short, readable and CTR-friendly before designing.",
    href: "/thumbnail-text-checker",
    stage: "Package",
    cta: "Check thumbnail →",
  },
  {
    name: "Shorts Script Generator",
    desc: "Build retention-focused Shorts scripts with a structured hook, beat and payoff.",
    href: "/shorts-script-generator",
    stage: "Script",
    cta: "Build a script →",
  },
  {
    name: "Viral Hook Examples",
    desc: "Study hook patterns across 6 types — proof, warning, curiosity gap and more.",
    href: "/viral-hook-examples",
    stage: "Research",
    cta: "Study patterns →",
  },
  {
    name: "Viewer Retention Tips",
    desc: "Learn retention principles for Shorts, TikTok and YouTube long-form.",
    href: "/viewer-retention-tips",
    stage: "Research",
    cta: "Read tips →",
  },
];

const stageColor: Record<string, string> = {
  Analyze: "text-cyan-300",
  Improve: "text-violet-300",
  Package: "text-sky-300",
  Script: "text-emerald-300",
  Research: "text-amber-300",
};

export default function ToolsPage() {
  return (
    <PremiumToolShell
      badge="Creator tool suite"
      title="Every pre-publish signal in one place."
      description="Paste a URL, a hook, or a title. Get scores, diagnosis and rewrites before the video goes live."
      primaryHref="/youtube-video-analyzer"
      primaryLabel="Analyze YouTube Video"
    >
      {/* Flagship card — YouTube Video Analyzer */}
      <FadeIn>
        <a
          href="/youtube-video-analyzer"
          className="group block rounded-[32px] border border-cyan-300/30 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.12),transparent_40%),linear-gradient(135deg,rgba(34,211,238,.06),rgba(124,58,237,.04))] p-7 transition hover:border-cyan-300/50 md:p-9"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/[0.12] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
              Flagship
            </span>
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white/40">
              Live YouTube data
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
            YouTube Video Analyzer
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-white/58">
            Paste any public YouTube URL. The analyzer fetches real metadata via the YouTube Data API — views, likes, duration, thumbnail — then runs AI packaging analysis across 9 signals and returns scored output with title rewrites, hook alternatives and thumbnail ideas.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Packaging score", val: "0–100" },
              { label: "Hook strength", val: "0–100" },
              { label: "CTR potential", val: "0–100" },
              { label: "Retention risk", val: "Low / Med / High" },
            ].map(({ label, val }) => (
              <div key={label} className="rounded-[18px] border border-white/10 bg-black/24 px-4 py-3">
                <p className="text-xs text-white/40">{label}</p>
                <p className="mt-1 text-sm font-black text-white/80">{val}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-sm font-black text-cyan-300 transition group-hover:translate-x-1">
              Analyze a video →
            </span>
            <span className="text-xs text-white/35">Also returns: better titles, opening hook ideas, thumbnail text, description angle</span>
          </div>
        </a>
      </FadeIn>

      {/* Supporting tools grid */}
      <FadeIn delay={0.08}>
        <div className="mt-6">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/35">
            Supporting tools
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {supporting.map((tool) => {
              const stageClass = stageColor[tool.stage] ?? "text-white/40";
              return (
                <a
                  key={tool.href}
                  href={tool.href}
                  className={`group block rounded-[26px] border p-6 transition hover:-translate-y-0.5 ${
                    tool.accent
                      ? "border-cyan-300/20 bg-cyan-300/[0.04] hover:border-cyan-300/35 hover:bg-cyan-300/[0.07]"
                      : "border-white/10 bg-black/22 hover:border-white/18 hover:bg-white/[0.03]"
                  }`}
                >
                  <p className={`text-[10px] font-black uppercase tracking-[0.14em] ${stageClass}`}>
                    {tool.stage}
                  </p>
                  <h3 className="mt-3 text-lg font-black tracking-tight text-white">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/52">{tool.desc}</p>
                  <p className={`mt-5 text-sm font-black transition group-hover:translate-x-0.5 ${tool.accent ? "text-cyan-300" : "text-cyan-300/65 group-hover:text-cyan-300"}`}>
                    {tool.cta}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </PremiumToolShell>
  );
}
