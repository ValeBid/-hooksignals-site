import PremiumToolShell from "../components/premium-tool-shell";

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

const tools = [
  {
    name: "Hook Analyzer",
    desc: "Score your opening line for clarity, curiosity and retention strength.",
    href: "/hook-analyzer",
    group: "Analyze",
  },
  {
    name: "Hook Improver",
    desc: "Rewrite weak hooks into sharper, more curiosity-driven versions.",
    href: "/hook-improver",
    group: "Improve",
  },
  {
    name: "YouTube Hook Generator",
    desc: "Generate stronger opening lines for YouTube videos and Shorts.",
    href: "/youtube-hook-generator",
    group: "Generate",
  },
  {
    name: "TikTok Hook Generator",
    desc: "Create TikTok hooks designed to stop the scroll quickly.",
    href: "/tiktok-hook-generator",
    group: "Generate",
  },
  {
    name: "YouTube Title Generator",
    desc: "Generate clickable YouTube titles built around curiosity and CTR.",
    href: "/youtube-title-generator",
    group: "Package",
  },
  {
    name: "Shorts Script Generator",
    desc: "Build fast-paced Shorts scripts designed for retention.",
    href: "/shorts-script-generator",
    group: "Script",
  },
  {
    name: "Thumbnail Text Checker",
    desc: "Check if thumbnail text is short, readable and CTR-friendly.",
    href: "/thumbnail-text-checker",
    group: "CTR",
  },
  {
    name: "Viewer Retention Tips",
    desc: "Learn retention principles for Shorts, TikTok and YouTube.",
    href: "/viewer-retention-tips",
    group: "Retention",
  },
  {
    name: "Viral Hook Examples",
    desc: "Study hook examples and short-form patterns.",
    href: "/viral-hook-examples",
    group: "Research",
  },
];

export default function ToolsPage() {
  return (
    <PremiumToolShell
      badge="Creator tool suite"
      title="A sharper workflow for every video before you publish."
      description="Move from hook diagnosis to title, script, thumbnail and retention checks inside one focused creator workflow."
      primaryHref="/hook-analyzer"
      primaryLabel="Start analysis"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className="rounded-[28px] border border-white/10 bg-black/25 p-6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.06]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">
              {tool.group}
            </p>
            <h2 className="mt-5 text-2xl font-black tracking-tight">
              {tool.name}
            </h2>
            <p className="mt-4 leading-7 text-white/58">{tool.desc}</p>
            <p className="mt-7 text-sm font-bold text-cyan-300">Open →</p>
          </a>
        ))}
      </div>

      <section className="mt-8 rounded-[30px] border border-cyan-300/20 bg-cyan-300/[0.06] p-6 md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">
          Recommended workflow
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-tight">
          Start with the hook. Then lock the title, script and thumbnail.
        </h2>
        <p className="mt-5 max-w-3xl leading-8 text-white/58">
          A stronger hook improves retention, a clearer title improves clicks,
          and a sharper thumbnail improves the first impression.
        </p>
      </section>
    </PremiumToolShell>
  );
}