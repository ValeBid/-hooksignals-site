import SiteFooter from "./components/site-footer";

export const metadata = {
  title: "HookSignals | Premium AI Creator Tools for YouTube and Shorts",
  description:
    "AI-powered creator workflow tools for hooks, scripts, thumbnails and retention. Analyze, improve and generate better video ideas before publishing.",
  alternates: {
    canonical: "https://hooksignals.com",
  },
};

const productTools = [
  {
    name: "Hook Analyzer",
    desc: "Find what works",
    href: "/hook-analyzer",
    icon: "↗",
  },
  {
    name: "Hook Improver",
    desc: "Make it sharper",
    href: "/hook-improver",
    icon: "✦",
  },
  {
    name: "Script Generator",
    desc: "Build full Shorts scripts",
    href: "/shorts-script-generator",
    icon: "▣",
  },
  {
    name: "Thumbnail Checker",
    desc: "Boost CTR clarity",
    href: "/thumbnail-text-checker",
    icon: "◈",
  },
];

const scoreBreakdown = [
  ["Attention", "92/100", "w-[92%]"],
  ["Relevance", "85/100", "w-[85%]"],
  ["Emotional Impact", "90/100", "w-[90%]"],
  ["Clarity", "78/100", "w-[78%]"],
  ["Viral Potential", "88/100", "w-[88%]"],
];

const sideNav = [
  "Dashboard",
  "Hook Analyzer",
  "Hook Improver",
  "Script Generator",
  "Thumbnail Checker",
  "History",
  "Favorites",
  "Settings",
];

const stats = [
  ["10K+", "Creators"],
  ["100K+", "Hooks analyzed"],
  ["95%", "Workflow coverage"],
  ["24/7", "AI-powered"],
];

const workflowSteps = [
  {
    title: "Analyze the opening",
    desc: "Score the hook for attention, clarity and retention before the video goes live.",
  },
  {
    title: "Rewrite weak angles",
    desc: "Turn rough ideas into sharper hooks with stronger curiosity and specificity.",
  },
  {
    title: "Build the script",
    desc: "Create a short-form structure with hook, beats and a clear payoff.",
  },
  {
    title: "Check the click",
    desc: "Validate thumbnail text and title clarity before publishing.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030507] text-white">
      <section className="relative min-h-screen overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(34,197,94,0.12),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.14),transparent_30%),radial-gradient(circle_at_70%_75%,rgba(14,165,233,0.08),transparent_26%),linear-gradient(180deg,#030507_0%,#05070b_55%,#030507_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-400/8 blur-[120px]" />

        <div className="relative mx-auto max-w-[1480px] px-5 py-5 md:px-8">
          <nav className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.035] px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl md:px-6">
            <a href="/" className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-400/10 shadow-lg shadow-emerald-500/10">
                <span className="text-xl font-black text-emerald-300">↗</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">HookSignals</span>
            </a>

            <div className="hidden items-center gap-8 text-sm text-white/58 lg:flex">
              <a className="transition hover:text-white" href="/tools">Tools</a>
              <a className="transition hover:text-white" href="/hook-analyzer">Analyzer</a>
              <a className="transition hover:text-white" href="/youtube-hook-generator">Generator</a>
              <a className="transition hover:text-white" href="/youtube-ctr-tips">Resources</a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/tools"
                className="hidden rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 md:inline-flex"
              >
                Dashboard
              </a>
              <a
                href="/hook-analyzer"
                className="rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
              >
                Get Started Free →
              </a>
            </div>
          </nav>

          <div className="grid gap-10 pb-16 pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pt-20">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-100 shadow-lg shadow-violet-500/10">
                <span className="text-emerald-300">✦</span>
                AI-powered creator tools
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.06em] text-white md:text-7xl xl:text-[88px]">
                Create hooks that <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-300 bg-clip-text text-transparent">stop the scroll.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62 md:text-xl">
                A premium pre-publish workflow for creators. Analyze hooks,
                improve scripts, check thumbnail text and ship stronger videos
                before your audience ever sees them.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/tools"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-8 py-4 text-base font-bold text-black shadow-2xl shadow-emerald-500/18 transition hover:bg-emerald-300"
                >
                  Explore All Tools
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="/hook-analyzer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.035] px-8 py-4 text-base font-bold text-white transition hover:bg-white/10"
                >
                  See How It Works
                  <span>▷</span>
                </a>
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {productTools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.href}
                    className="group rounded-[20px] border border-white/10 bg-white/[0.035] p-4 transition hover:border-emerald-300/30 hover:bg-white/[0.07]"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-300 shadow-lg shadow-emerald-500/10">
                      {tool.icon}
                    </div>
                    <p className="font-semibold text-white">{tool.name}</p>
                    <p className="mt-1 text-sm text-white/45">{tool.desc}</p>
                  </a>
                ))}
              </div>

              <div className="mt-9 grid max-w-3xl grid-cols-2 gap-3 rounded-[24px] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/20 sm:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div key={label} className="rounded-[18px] bg-black/25 p-4">
                    <p className="text-3xl font-black tracking-tight text-white">{value}</p>
                    <p className="mt-1 text-sm text-white/45">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[36px] bg-gradient-to-br from-emerald-400/12 via-transparent to-violet-500/18 blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-emerald-300/20 bg-[#070a0f]/90 shadow-2xl shadow-violet-950/25 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-5 py-4">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-300" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">Last 7 days</div>
                </div>

                <div className="grid min-h-[560px] lg:grid-cols-[210px_1fr]">
                  <aside className="hidden border-r border-white/10 bg-black/20 p-5 lg:block">
                    <div className="mb-8 flex items-center gap-2 font-semibold">
                      <span className="text-emerald-300">↗</span>
                      HookSignals
                    </div>
                    <div className="space-y-2">
                      {sideNav.map((item) => (
                        <div
                          key={item}
                          className={`rounded-2xl px-4 py-3 text-sm ${item === "Hook Analyzer" ? "bg-white/10 text-white" : "text-white/45"}`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-10 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
                      <p className="font-semibold">Upgrade to Pro</p>
                      <p className="mt-2 text-xs leading-5 text-white/45">Unlock deeper creator signals.</p>
                      <button className="mt-4 rounded-xl bg-violet-500 px-4 py-2 text-sm font-bold text-white">Upgrade Now</button>
                    </div>
                  </aside>

                  <div className="p-4 md:p-7">
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-emerald-300">Hook Analyzer</p>
                        <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Creator signal dashboard</h2>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/50">Example output</span>
                    </div>

                    <div className="grid gap-4 xl:grid-cols-[0.86fr_1.14fr]">
                      <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                        <p className="text-sm font-semibold text-white/70">Overall Score</p>
                        <div className="mx-auto mt-6 flex h-40 w-40 items-center justify-center rounded-full border-[13px] border-emerald-400 shadow-[inset_0_0_0_18px_rgba(255,255,255,0.03)] md:h-44 md:w-44">
                          <div className="text-center">
                            <p className="text-5xl font-black">87</p>
                            <p className="text-sm text-white/45">/100</p>
                          </div>
                        </div>
                        <p className="mt-5 text-center font-bold text-emerald-300">Excellent hook</p>
                        <p className="mt-1 text-center text-sm text-white/45">Strong viral potential</p>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                        <p className="text-sm font-semibold text-white/70">Score Breakdown</p>
                        <div className="mt-6 space-y-5">
                          {scoreBreakdown.map(([label, value, width]) => (
                            <div key={label}>
                              <div className="mb-2 flex justify-between text-sm">
                                <span className="text-white/60">{label}</span>
                                <span className="text-white/75">{value}</span>
                              </div>
                              <div className="h-2 rounded-full bg-white/10">
                                <div className={`h-2 rounded-full bg-gradient-to-r from-violet-500 to-emerald-300 ${width}`} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 xl:grid-cols-2">
                      <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                        <p className="font-semibold">Best Hook Moments</p>
                        <div className="mt-4 space-y-3 text-sm text-white/58">
                          <p><span className="rounded-lg bg-white/10 px-2 py-1 text-white/55">0:02</span> The secret that changed everything... <span className="float-right font-bold text-white">95%</span></p>
                          <p><span className="rounded-lg bg-white/10 px-2 py-1 text-white/55">0:05</span> You will not believe what happens next... <span className="float-right font-bold text-white">89%</span></p>
                          <p><span className="rounded-lg bg-white/10 px-2 py-1 text-white/55">0:08</span> Here is why most creators fail... <span className="float-right font-bold text-emerald-300">82%</span></p>
                        </div>
                      </div>

                      <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                        <p className="font-semibold">Suggestions</p>
                        <div className="mt-4 space-y-3 text-sm">
                          <p className="rounded-2xl bg-black/25 p-3 text-white/60"><span className="text-emerald-300">+</span> Add more emotional trigger</p>
                          <p className="rounded-2xl bg-black/25 p-3 text-white/60"><span className="text-emerald-300">+</span> Make it more specific</p>
                          <p className="rounded-2xl bg-black/25 p-3 text-white/60"><span className="text-emerald-300">+</span> Add curiosity gap</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-sm text-white/45">Viral Potential</p>
                          <p className="text-2xl font-black text-emerald-300">High</p>
                          <p className="text-sm text-white/45">92% chance of strong retention</p>
                        </div>
                        <div className="flex h-24 flex-1 items-end gap-2 sm:pl-8">
                          {[18, 24, 31, 42, 36, 45, 50, 68, 69, 76].map((height, index) => (
                            <span key={index} className="flex-1 rounded-t-full bg-gradient-to-t from-emerald-500/15 to-emerald-300" style={{ height: `${height}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-[#030507] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">Creator workflow</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">One focused loop before every upload.</h2>
            <p className="mt-5 text-lg leading-8 text-white/55">
              HookSignals is designed around the decisions that happen before publishing: opening line, script structure, thumbnail clarity and retention risk.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <div key={step.title} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/15">
                <p className="mb-8 text-sm font-bold text-violet-300">0{index + 1}</p>
                <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-4 leading-7 text-white/52">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
