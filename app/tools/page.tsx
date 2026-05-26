import SiteFooter from "../components/site-footer";
export const metadata = {
  title: "Creator Tools | HookSignals",
  description:
    "Explore HookSignals tools for hooks, titles, thumbnails, scripts and viewer retention.",
};

const tools = [
  {
    name: "Hook Analyzer",
    desc: "Score your opening line for clarity, curiosity and retention strength.",
    href: "/hook-analyzer",
    group: "Hook Tools",
  },
  {
    name: "Hook Improver",
    desc: "Rewrite weak hooks into sharper, more curiosity-driven versions.",
    href: "/hook-improver",
    group: "Hook Tools",
  },
  {
    name: "YouTube Hook Generator",
    desc: "Generate stronger opening lines for YouTube videos and Shorts.",
    href: "/youtube-hook-generator",
    group: "Hook Tools",
  },
  {
    name: "TikTok Hook Generator",
    desc: "Create TikTok hooks designed to stop the scroll quickly.",
    href: "/tiktok-hook-generator",
    group: "Hook Tools",
  },
  {
    name: "YouTube Title Generator",
    desc: "Generate clickable YouTube titles built around curiosity and CTR.",
    href: "/youtube-title-generator",
    group: "Title Tools",
  },
  {
    name: "Shorts Script Generator",
    desc: "Build fast-paced Shorts scripts designed for retention.",
    href: "/shorts-script-generator",
    group: "Script Tools",
  },
  {
    name: "Thumbnail Text Checker",
    desc: "Check if thumbnail text is short, readable and CTR-friendly.",
    href: "/thumbnail-text-checker",
    group: "CTR Tools",
  },
  {
    name: "Viewer Retention Tips",
    desc: "Learn retention principles for Shorts, TikTok and YouTube.",
    href: "/viewer-retention-tips",
    group: "Retention",
  },
  {
    name: "Viral Hook Examples",
    desc: "Study hook examples and patterns for short-form content.",
    href: "/viral-hook-examples",
    group: "Examples",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">
            ← HookSignals
          </a>

          <a
            href="/hook-analyzer"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black"
          >
            Start Free
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            Creator Tool Directory
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Tools for stronger content decisions.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Use HookSignals to improve hooks, titles, scripts, thumbnails and
            retention before publishing. Start with one tool, then move through
            the workflow.
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-emerald-300/40 hover:bg-emerald-300/[0.06]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/45">
                  {tool.group}
                </span>

                <span className="text-white/25 transition group-hover:text-emerald-300">
                  →
                </span>
              </div>

              <h2 className="text-2xl font-semibold">{tool.name}</h2>
              <p className="mt-4 leading-7 text-white/55">{tool.desc}</p>

              <p className="mt-6 text-sm font-medium text-emerald-300">
                Open tool →
              </p>
            </a>
          ))}
        </section>

        <section className="mt-14 rounded-[32px] border border-white/10 bg-white/[0.04] p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Recommended workflow
          </p>

          <h2 className="text-3xl font-semibold tracking-tight">
            Start with the hook. Then improve the title, script and thumbnail.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-white/55">
            Creator performance is rarely decided by one element. A stronger
            hook improves retention, a clearer title improves clicks, and a
            sharper thumbnail improves the first impression.
          </p>
        </section>
      </section>

      <SiteFooter />
    </main>
  );
}