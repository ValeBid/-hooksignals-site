import PremiumToolShell from "../components/premium-tool-shell";

export const metadata = {
  title: "Free AI Creator Tools | HookSignals",
  description:
    "Use free creator tools for hooks, titles, thumbnails, scripts and viewer retention before publishing.",
  alternates: { canonical: "https://hooksignals.com/tools" },
  openGraph: {
    title: "Free AI Creator Tools | HookSignals",
    description:
      "Use HookSignals tools to analyze hooks, improve titles, check thumbnail clarity and build stronger pre-publish workflows.",
    url: "https://hooksignals.com/tools",
    siteName: "HookSignals",
    type: "website",
  },
};

const tools = [
  { name: "Hook Analyzer", desc: "Score your opening line for clarity, curiosity and retention strength.", href: "/hook-analyzer", group: "Hook Tools", icon: "↗" },
  { name: "Hook Improver", desc: "Rewrite weak hooks into sharper, more curiosity-driven versions.", href: "/hook-improver", group: "Hook Tools", icon: "✦" },
  { name: "YouTube Hook Generator", desc: "Generate stronger opening lines for YouTube videos and Shorts.", href: "/youtube-hook-generator", group: "Hook Tools", icon: "◈" },
  { name: "TikTok Hook Generator", desc: "Create TikTok hooks designed to stop the scroll quickly.", href: "/tiktok-hook-generator", group: "Hook Tools", icon: "▣" },
  { name: "YouTube Title Generator", desc: "Generate clickable YouTube titles built around curiosity and CTR.", href: "/youtube-title-generator", group: "Title Tools", icon: "T" },
  { name: "Shorts Script Generator", desc: "Build fast-paced Shorts scripts designed for retention.", href: "/shorts-script-generator", group: "Script Tools", icon: "S" },
  { name: "Thumbnail Text Checker", desc: "Check if thumbnail text is short, readable and CTR-friendly.", href: "/thumbnail-text-checker", group: "CTR Tools", icon: "C" },
  { name: "Viewer Retention Tips", desc: "Learn retention principles for Shorts, TikTok and YouTube.", href: "/viewer-retention-tips", group: "Retention", icon: "R" },
  { name: "Viral Hook Examples", desc: "Study hook examples and patterns for short-form content.", href: "/viral-hook-examples", group: "Examples", icon: "V" },
];

const workflow = [["01", "Analyze", "Find the weak point before publishing."], ["02", "Improve", "Rewrite vague hooks into sharper openings."], ["03", "Package", "Pair the hook with a clearer title and thumbnail."], ["04", "Publish", "Use retention signals before the video goes live."]];

export default function ToolsPage() {
  return (
    <PremiumToolShell badge="Free creator tools" title="Useful creator tools before you publish." description="Move from hook analysis to title, script, thumbnail and retention checks without relying on scattered generic AI prompts." primaryHref="/hook-analyzer" primaryLabel="Start Free">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <a key={tool.href} href={tool.href} className="group rounded-[24px] border border-white/10 bg-black/25 p-5 shadow-xl shadow-black/10 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.06] md:p-6">
            <div className="mb-8 flex items-center justify-between"><span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/45">{tool.group}</span><span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-sm font-black text-cyan-300 shadow-lg shadow-cyan-500/10 transition group-hover:scale-105">{tool.icon}</span></div>
            <h2 className="text-2xl font-bold tracking-tight">{tool.name}</h2><p className="mt-4 leading-7 text-white/55">{tool.desc}</p><p className="mt-7 text-sm font-bold text-cyan-300">Open tool →</p>
          </a>
        ))}
      </div>
      <section className="mt-6 rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-6 md:p-8"><p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">Recommended workflow</p><h2 className="text-2xl font-black tracking-tight md:text-3xl">Start with the hook. Then improve the title, script and thumbnail.</h2><p className="mt-5 max-w-3xl leading-8 text-white/58">Creator performance is rarely decided by one element. A stronger hook improves retention, a clearer title improves clicks, and a sharper thumbnail improves the first impression.</p><div className="mt-7 grid gap-3 md:grid-cols-4">{workflow.map(([step, title, desc]) => <div key={step} className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-xs font-black text-cyan-300">{step}</p><h3 className="mt-3 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/48">{desc}</p></div>)}</div></section>
    </PremiumToolShell>
  );
}
