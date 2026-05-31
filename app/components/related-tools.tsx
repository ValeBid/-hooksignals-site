type Tool = {
  name: string;
  href: string;
  desc: string;
  cta: string;
};

const allTools: Record<string, Tool> = {
  "hook-analyzer": {
    name: "Hook Analyzer",
    href: "/hook-analyzer",
    desc: "Score your opening line for clarity, curiosity gap and retention risk.",
    cta: "Score your hook →",
  },
  "hook-improver": {
    name: "Hook Improver",
    href: "/hook-improver",
    desc: "Rewrite weak hooks into sharper, tension-driven versions with named angles.",
    cta: "Rewrite your hook →",
  },
  "youtube-video-analyzer": {
    name: "YouTube Video Analyzer",
    href: "/youtube-video-analyzer",
    desc: "Paste any YouTube URL and get real metadata with AI packaging analysis.",
    cta: "Analyze a video →",
  },
  "youtube-title-analyzer": {
    name: "YouTube Title Analyzer",
    href: "/youtube-title-analyzer",
    desc: "Score your title for CTR potential, clarity, curiosity gap and keyword placement.",
    cta: "Score your title →",
  },
  "shorts-script-generator": {
    name: "Shorts Script Generator",
    href: "/shorts-script-generator",
    desc: "Build retention-focused scripts with a structured hook, beat and payoff.",
    cta: "Build a script →",
  },
  "thumbnail-text-checker": {
    name: "Thumbnail Text Checker",
    href: "/thumbnail-text-checker",
    desc: "Check whether your thumbnail text is short, readable and CTR-friendly.",
    cta: "Check thumbnail →",
  },
  "viral-hook-examples": {
    name: "Viral Hook Examples",
    href: "/viral-hook-examples",
    desc: "Study hook patterns across 6 types — curiosity gap, proof, warning and more.",
    cta: "Study examples →",
  },
};

type RelatedToolsProps = {
  primary: keyof typeof allTools;
  secondary?: keyof typeof allTools;
  heading?: string;
  context?: string;
  exclude?: keyof typeof allTools;
};

export default function RelatedTools({
  primary,
  secondary,
  heading = "Up next in your workflow",
  context,
}: RelatedToolsProps) {
  const primaryTool = allTools[primary];
  const secondaryTool = secondary ? allTools[secondary] : null;

  return (
    <section className="mt-14">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7 md:p-10">
        <p className="mb-1 text-sm font-black uppercase tracking-[0.14em] text-cyan-300">
          {heading}
        </p>
        {context && (
          <p className="mt-2 mb-6 max-w-xl text-sm leading-6 text-white/52">{context}</p>
        )}

        <div className={`mt-5 grid gap-4 ${secondaryTool ? "md:grid-cols-2" : ""}`}>
          {/* Primary — emphasized */}
          <a
            href={primaryTool.href}
            className="group rounded-[24px] border border-cyan-300/22 bg-[linear-gradient(135deg,rgba(34,211,238,.07),rgba(124,58,237,.04))] p-6 transition hover:border-cyan-300/40"
          >
            <p className="text-lg font-black text-white">{primaryTool.name}</p>
            <p className="mt-2 text-sm leading-6 text-white/52">{primaryTool.desc}</p>
            <p className="mt-5 text-sm font-black text-cyan-300 transition group-hover:translate-x-1">
              {primaryTool.cta}
            </p>
          </a>

          {/* Secondary — quieter */}
          {secondaryTool && (
            <a
              href={secondaryTool.href}
              className="group rounded-[24px] border border-white/10 bg-black/24 p-6 transition hover:border-white/18"
            >
              <p className="text-lg font-black text-white">{secondaryTool.name}</p>
              <p className="mt-2 text-sm leading-6 text-white/48">{secondaryTool.desc}</p>
              <p className="mt-5 text-sm font-black text-white/45 transition group-hover:text-white/70">
                {secondaryTool.cta}
              </p>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
