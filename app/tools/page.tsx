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

const workflow = [
  ["01", "Diagnose", "Find the weak point in the opening promise."],
  ["02", "Improve", "Rewrite the hook and tighten the script angle."],
  ["03", "Package", "Align title and thumbnail with one clear payoff."],
  ["04", "Publish", "Use retention cues before the idea goes live."],
];

const tools = [
  {
    name: "Hook Analyzer",
    desc: "Score your opening line for clarity, curiosity and retention strength.",
    href: "/hook-analyzer",
    group: "Diagnose",
    use: "Use first when the idea feels unclear.",
    primary: true,
  },
  {
    name: "YouTube Video Analyzer",
    desc: "Paste a YouTube URL to fetch real video data and get an AI hook analysis.",
    href: "/youtube-video-analyzer",
    group: "Intelligence",
    use: "Use to analyze any public YouTube video with real data.",
    primary: true,
  },
  {
    name: "Hook Improver",
    desc: "Rewrite weak hooks into sharper, more curiosity-driven versions.",
    href: "/hook-improver",
    group: "Improve",
    use: "Use after you know what is weak.",
    primary: false,
  },
  {
    name: "YouTube Hook Generator",
    desc: "Generate stronger opening lines for YouTube videos and Shorts.",
    href: "/youtube-hook-generator",
    group: "Generate",
    use: "Use when you need more opening angles.",
    primary: false,
  },
  {
    name: "TikTok Hook Generator",
    desc: "Create TikTok hooks designed to stop the scroll quickly.",
    href: "/tiktok-hook-generator",
    group: "Generate",
    use: "Use for short-form concepts and fast tests.",
    primary: false,
  },
  {
    name: "YouTube Title Generator",
    desc: "Generate clickable YouTube titles built around curiosity and CTR.",
    href: "/youtube-title-generator",
    group: "Package",
    use: "Use before locking the final topic promise.",
    primary: false,
  },
  {
    name: "Shorts Script Generator",
    desc: "Build fast-paced Shorts scripts designed for retention.",
    href: "/shorts-script-generator",
    group: "Script",
    use: "Use after the hook angle is validated.",
    primary: false,
  },
  {
    name: "Thumbnail Text Checker",
    desc: "Check if thumbnail text is short, readable and CTR-friendly.",
    href: "/thumbnail-text-checker",
    group: "Package",
    use: "Use before designing or publishing the thumbnail.",
    primary: false,
  },
  {
    name: "Viewer Retention Tips",
    desc: "Learn retention principles for Shorts, TikTok and YouTube.",
    href: "/viewer-retention-tips",
    group: "Publish",
    use: "Use when the structure needs stronger pacing.",
    primary: false,
  },
  {
    name: "Viral Hook Examples",
    desc: "Study hook examples and short-form patterns.",
    href: "/viral-hook-examples",
    group: "Research",
    use: "Use before creating a new batch of ideas.",
    primary: false,
  },
];

export default function ToolsPage() {
  return (
    <PremiumToolShell
      badge="Creator operating workflow"
      title="Move from rough idea to cleaner publishing decision."
      description="HookSignals is organized around the real creator workflow: diagnose the opening, improve the angle, package the promise and publish with stronger retention cues."
      primaryHref="/hook-analyzer"
      primaryLabel="Start with diagnosis"
    >
      <section className="grid gap-3 rounded-[30px] border border-white/10 bg-white/[0.025] p-4 md:grid-cols-4 md:p-5">
        {workflow.map(([step, title, text]) => (
          <div key={step} className="rounded-[22px] border border-white/10 bg-black/25 p-5">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">{step}</p>
            <h2 className="mt-3 text-xl font-black tracking-tight">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/48">{text}</p>
          </div>
        ))}
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className={`group rounded-[28px] border p-6 transition hover:-translate-y-0.5 ${
              tool.primary
                ? 'border-cyan-300/25 bg-cyan-300/[0.05] hover:border-cyan-300/40 hover:bg-cyan-300/[0.08]'
                : 'border-white/10 bg-black/24 hover:border-cyan-300/28 hover:bg-cyan-300/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className={`text-xs font-black uppercase tracking-[0.14em] ${tool.primary ? 'text-cyan-300' : 'text-white/35'}`}>
                {tool.group}
              </p>
              {tool.primary && (
                <span className="rounded-full border border-cyan-300/22 bg-cyan-300/[0.09] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.1em] text-cyan-200">
                  Featured
                </span>
              )}
            </div>
            <h2 className="mt-4 text-xl font-black tracking-tight text-white">
              {tool.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/55">{tool.desc}</p>
            <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs leading-5 text-white/40">
              {tool.use}
            </p>
            <p className={`mt-5 text-sm font-black transition group-hover:text-white ${tool.primary ? 'text-cyan-300' : 'text-cyan-300/70'}`}>
              Open →
            </p>
          </a>
        ))}
      </div>

      <section className="mt-8 rounded-[30px] border border-cyan-300/18 bg-cyan-300/[0.045] p-6 md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">
          Recommended workflow
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-tight">
          Start with the hook. Then lock the title, script and thumbnail.
        </h2>
        <p className="mt-5 max-w-3xl leading-8 text-white/58">
          A stronger hook improves retention, a clearer title improves clicks,
          and a sharper thumbnail improves the first impression. Treat every tool as one part of the same publishing decision.
        </p>
      </section>
    </PremiumToolShell>
  );
}
