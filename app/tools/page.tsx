import PremiumToolShell from "../components/premium-tool-shell";

export const metadata = {
  title: "AI Creator Tools for Hooks, Titles, Scripts & Retention | HookSignals",
  description:
    "Use HookSignals creator tools to analyze hooks, improve titles, generate Shorts scripts, check thumbnail clarity and strengthen retention before publishing.",
  alternates: { canonical: "https://hooksignals.com/tools" },
  openGraph: {
    title: "AI Creator Tools | HookSignals",
    description:
      "Analyze hooks, improve titles, check thumbnail clarity and build stronger pre-publish creator workflows.",
    url: "https://hooksignals.com/tools",
    siteName: "HookSignals",
    type: "website",
  },
};

const tools = [
  { name: "Hook Analyzer", desc: "Score your opening line for clarity, curiosity and retention strength.", href: "/hook-analyzer", group: "Analyze", icon: "↗", use: "Before recording" },
  { name: "Hook Improver", desc: "Rewrite weak hooks into sharper, more curiosity-driven versions.", href: "/hook-improver", group: "Improve", icon: "✦", use: "When the opening feels flat" },
  { name: "YouTube Hook Generator", desc: "Generate stronger opening lines for YouTube videos and Shorts.", href: "/youtube-hook-generator", group: "Generate", icon: "◈", use: "For fresh angle options" },
  { name: "TikTok Hook Generator", desc: "Create TikTok hooks designed to stop the scroll quickly.", href: "/tiktok-hook-generator", group: "Generate", icon: "▣", use: "For short-form concepts" },
  { name: "YouTube Title Generator", desc: "Generate clickable YouTube titles built around curiosity and CTR.", href: "/youtube-title-generator", group: "Package", icon: "T", use: "Before thumbnail lock" },
  { name: "Shorts Script Generator", desc: "Build fast-paced Shorts scripts designed for retention.", href: "/shorts-script-generator", group: "Script", icon: "S", use: "After hook validation" },
  { name: "Thumbnail Text Checker", desc: "Check if thumbnail text is short, readable and CTR-friendly.", href: "/thumbnail-text-checker", group: "CTR", icon: "C", use: "Before upload" },
  { name: "Viewer Retention Tips", desc: "Learn retention principles for Shorts, TikTok and YouTube.", href: "/viewer-retention-tips", group: "Retention", icon: "R", use: "For creative diagnosis" },
  { name: "Viral Hook Examples", desc: "Study hook examples and patterns for short-form content.", href: "/viral-hook-examples", group: "Research", icon: "V", use: "For pattern mining" },
];

const workflow = [
  ["01", "Diagnose", "Run the raw idea through hook and retention checks before editing."],
  ["02", "Sharpen", "Rewrite vague promises into cleaner curiosity and clearer stakes."],
  ["03", "Package", "Align title, thumbnail text and first line around one promise."],
  ["04", "Publish", "Use the final output as a pre-publish decision checklist."],
];

export default function ToolsPage() {
  return (
    <PremiumToolShell badge="Creator tool suite" title="A sharper workflow for every video before you publish." description="Move from hook diagnosis to title, script, thumbnail and retention checks inside one focused creator workflow instead of scattered generic prompts." primaryHref="/hook-analyzer" primaryLabel="Start analysis">
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {[["Hook", "Opening promise and curiosity gap"], ["Package", "Title, thumbnail and click clarity"], ["Retention", "Script pacing and viewer pull"]].map(([title, desc]) => (
          <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/10">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">{title}</p>
            <p className="mt-3 text-sm leading-6 text-white/52">{desc}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <a key={tool.href} href={tool.href} className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-black/25 p-5 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.06] md:p-6">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-300/10 blur-3xl transition group-hover:bg-violet-400/15" />
            <div className="relative mb-8 flex items-center justify-between">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/48">{tool.group}</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-sm font-black text-cyan-300 shadow-lg shadow-cyan-500/10 transition group-hover:scale-105">{tool.icon}</span>
            </div>
            <h2 className="relative text-2xl font-black tracking-tight">{tool.name}</h2>
            <p className="relative mt-4 leading-7 text-white/58">{tool.desc}</p>
            <div className="relative mt-7 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/35">{tool.use}</p>
              <p className="text-sm font-bold text-cyan-300">Open →</p>
            </div>
          </a>
        ))}
      </div>

      <section className="mt-6 rounded-[30px] border border-cyan-300/20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.13),transparent_28%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02))] p-6 md:p-8">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">Recommended workflow</p>
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">Start with the hook. Then lock the title, script and thumbnail.</h2>
        <p className="mt-5 max-w-3xl leading-8 text-white/58">Creator performance is rarely decided by one element. A stronger hook improves retention, a clearer title improves clicks, and a sharper thumbnail improves the first impression.</p>
        <div className="mt-7 grid gap-3 md:grid-cols-4">
          {workflow.map(([step, title, desc]) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-black/24 p-4">
              <p className="text-xs font-black text-cyan-300">{step}</p>
              <h3 className="mt-3 font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PremiumToolShell>
  );
}
