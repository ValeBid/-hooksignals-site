export const metadata = {
  title: "Creator Tools | HookSignals",
  description:
    "Explore HookSignals creator tools for hooks, titles, retention and content optimization.",
};

const tools = [
  {
    name: "Hook Analyzer",
    desc: "Score your opening line for clarity, curiosity and retention.",
    href: "/hook-analyzer",
  },
  {
    name: "Hook Improver",
    desc: "Turn weak hooks into stronger creator-ready variations.",
    href: "/hook-improver",
  },
  {
    name: "YouTube Hook Generator",
    desc: "Generate stronger opening lines for YouTube videos and Shorts.",
    href: "/youtube-hook-generator",
  },
  {
    name: "YouTube Title Generator",
    desc: "Create clickable YouTube titles built around curiosity and CTR.",
    href: "/youtube-title-generator",
  },
  {
    name: "TikTok Hook Generator",
    desc: "Generate TikTok hooks designed to stop the scroll.",
    href: "/tiktok-hook-generator",
  },
  {
    name: "Shorts Script Generator",
    desc: "Generate fast-paced Shorts scripts designed for retention.",
    href: "/shorts-script-generator",
  },
  {
    name: "Viral Hook Examples",
    desc: "Study hook examples and patterns for short-form content.",
    href: "/viral-hook-examples",
  },
  {
    name: "Viewer Retention Tips",
    desc: "Learn retention strategies for Shorts, TikTok and YouTube.",
    href: "/viewer-retention-tips",
  },
{
  name: "YouTube Thumbnail Tips",
  desc: "Improve CTR with stronger thumbnail strategy and clarity.",
  href: "/youtube-thumbnail-tips",
},
{
  name: "Thumbnail Text Checker",
  desc: "Check if your thumbnail text is short, readable and CTR-friendly.",
  href: "/thumbnail-text-checker",
},
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-6xl px-6 py-8">
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

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            Creator Tool Directory
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
            Creator Tools
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Explore AI-powered tools for improving hooks, titles, retention and
            creator workflow before publishing.
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-emerald-300/40 hover:bg-emerald-300/[0.06]"
            >
              <h2 className="text-2xl font-semibold">{tool.name}</h2>
              <p className="mt-4 leading-7 text-white/55">{tool.desc}</p>
              <p className="mt-6 text-sm font-medium text-emerald-300">
                Open tool →
              </p>
            </a>
          ))}
        </section>
      </section>
    </main>
  );
}