const tools = [
  {
    name: "Hook Analyzer",
    desc: "Score the first 3 seconds of your video idea before you publish.",
    tag: "Creator Signal",
    href: "/hook-analyzer",
  },
  {
    name: "Hook Improver",
    desc: "Turn weak hooks into sharper, more curiosity-driven versions.",
    tag: "AI Workflow",
    href: "/hook-improver",
  },
  {
    name: "YouTube Hook Generator",
    desc: "Create stronger opening lines for YouTube videos and Shorts.",
    tag: "Hook Engine",
    href: "/youtube-hook-generator",
  },
  {
    name: "YouTube Title Generator",
    desc: "Generate clickable YouTube titles built for curiosity and CTR.",
    tag: "CTR Engine",
    href: "/youtube-title-generator",
  },
  {
    name: "Shorts Script Generator",
    desc: "Build fast-paced Shorts scripts designed for retention.",
    tag: "Script Workflow",
    href: "/shorts-script-generator",
  },
  {
    name: "Thumbnail Text Checker",
    desc: "Check if your thumbnail text is short, readable and CTR-friendly.",
    tag: "Thumbnail CTR",
    href: "/thumbnail-text-checker",
  },
];

const clusters = [
  "Hook examples",
  "Title formulas",
  "Shorts scripts",
  "Retention tips",
  "Thumbnail clarity",
  "Creator workflow",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#123a2c_0%,transparent_34%),radial-gradient(circle_at_70%_10%,#1f2937_0%,transparent_30%)] opacity-70" />

        <div className="relative mx-auto max-w-7xl px-6 py-6">
          <nav className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30">
                <span className="font-bold text-emerald-300">H</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                HookSignals
              </span>
            </a>

            <div className="hidden items-center gap-6 text-sm text-white/50 md:flex">
              <a href="/tools">Tools</a>
              <a href="/viral-hook-examples">Examples</a>
              <a href="/viewer-retention-tips">Retention</a>
            </div>

            <a
              href="/hook-analyzer"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black"
            >
              Start Free
            </a>
          </nav>

          <div className="mx-auto max-w-4xl pb-20 pt-24 text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              AI creator workflow tools for better content decisions
            </div>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Improve hooks, titles and retention before you publish.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
              HookSignals helps creators test video hooks, improve titles,
              structure Shorts scripts and sharpen publishing decisions with
              fast AI-assisted workflow tools.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/hook-analyzer"
                className="w-full rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black sm:w-auto"
              >
                Analyze Your First Hook
              </a>

              <a
                href="/tools"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white sm:w-auto"
              >
                Explore All Tools
              </a>
            </div>

            <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-14 w-full rounded-2xl border border-white/10 bg-black px-5 text-white outline-none placeholder:text-white/30"
              />

              <button className="h-14 rounded-2xl bg-white px-8 font-semibold text-black transition hover:opacity-90">
                Join Free Beta
              </button>
            </div>

            <p className="mt-4 text-sm text-white/40">
              Early access for creators building stronger hooks, titles and
              short-form workflows.
            </p>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium text-emerald-300">
              Creator workflow tools
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              A signal hub for hooks, titles, thumbnails and retention.
            </h2>
          </div>

          <a href="/tools" className="text-sm font-medium text-emerald-300">
            View all tools →
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-6 transition hover:border-emerald-300/40 hover:from-emerald-300/[0.08]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/50">
                  {tool.tag}
                </span>
                <span className="text-white/25 transition group-hover:text-emerald-300">
                  →
                </span>
              </div>

              <h3 className="text-xl font-semibold">{tool.name}</h3>
              <p className="mt-3 leading-7 text-white/50">{tool.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <p className="mb-3 text-sm font-medium text-emerald-300">
            Built as a search asset
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Every tool and example page becomes a new traffic entry point.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/55">
            HookSignals is structured around creator search intent: hooks,
            titles, retention, scripts and thumbnails. Each page links users
            toward tools that solve the next step in the workflow.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {clusters.map((cluster) => (
              <span
                key={cluster}
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/55"
              >
                {cluster}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-10 text-sm text-white/40">
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-wrap gap-4">
            <a href="/tools">All Tools</a>
            <a href="/hook-analyzer">Hook Analyzer</a>
            <a href="/hook-improver">Hook Improver</a>
            <a href="/youtube-hook-generator">YouTube Hook Generator</a>
            <a href="/youtube-title-generator">YouTube Title Generator</a>
            <a href="/shorts-script-generator">Shorts Script Generator</a>
            <a href="/thumbnail-text-checker">Thumbnail Text Checker</a>
            <a href="/sitemap.xml">Sitemap</a>
          </div>

          <p className="mt-6">
            HookSignals helps creators test hooks, titles, scripts and content
            signals before publishing.
          </p>
        </div>
      </footer>
    </main>
  );
}