const tools = [
  {
    name: "Hook Analyzer",
    desc: "Score the first 3 seconds of your video idea before you publish.",
    tag: "Creator Signal",
  },
  {
    name: "Title Scorer",
    desc: "Improve click potential with clarity, curiosity and intent scoring.",
    tag: "CTR Engine",
  },
  {
    name: "Thumbnail Text Checker",
    desc: "Check if your thumbnail copy is readable, sharp and scroll-stopping.",
    tag: "Visual Signal",
  },
  {
    name: "AI Visibility Score",
    desc: "Preview how your content could appear across search and AI answers.",
    tag: "Future SEO",
  },
  {
    name: "Shorts Script Cleaner",
    desc: "Turn rough ideas into tight, retention-focused short-form scripts.",
    tag: "Workflow",
  },
  {
    name: "Caption Optimizer",
    desc: "Format captions for TikTok, Reels and Shorts with cleaner structure.",
    tag: "Distribution",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f2937_0%,transparent_35%),radial-gradient(circle_at_70%_20%,#0f766e33_0%,transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30 flex items-center justify-center">
                <span className="text-emerald-300 font-bold">H</span>
              </div>
              <span className="font-semibold tracking-tight text-lg">HookSignals</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
              <span>Tools</span>
              <span>Workflows</span>
              <span>Resources</span>
              <span>Pricing</span>
            </div>

            <button className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black">
              Start Free
            </button>
          </nav>

          <div className="mx-auto max-w-4xl pt-24 pb-20 text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Built for creators who want better signals before publishing
            </div>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Optimize every hook, title and clip before it goes live.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
              HookSignals gives creators fast AI-powered feedback on hooks,
              titles, thumbnails, scripts and visibility signals — in one clean
              workflow.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/hook-analyzer" className="w-full rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black sm:w-auto">
  Analyze Your First Hook
</a>
              <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white sm:w-auto">
                Explore Tools
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 text-left">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-2xl font-semibold">6</p>
                <p className="text-sm text-white/45">launch tools</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-2xl font-semibold">0–100</p>
                <p className="text-sm text-white/45">signal scoring</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-2xl font-semibold">SEO</p>
                <p className="text-sm text-white/45">ready pages</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm font-medium text-emerald-300">
              Creator workflow tools
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              One signal hub for better content decisions.
            </h2>
          </div>
          <p className="hidden max-w-md text-sm leading-6 text-white/45 md:block">
            Start with lightweight tools. Expand into searchable workflows,
            scoring pages and AI visibility assets over time.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article
              key={tool.name}
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

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="mb-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-2/3 rounded-full bg-emerald-300" />
                </div>
                <p className="text-xs text-white/35">
                  Instant scoring · AI recommendations · SEO-ready workflow
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 text-sm font-medium text-emerald-300">
                Built to compound
              </p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Every tool becomes a traffic entry point.
              </h2>
            </div>
            <p className="text-lg leading-8 text-white/55">
              HookSignals is designed as a utility ecosystem: tools, use-case
              pages, related workflows and internal links that grow into a
              search asset over time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}