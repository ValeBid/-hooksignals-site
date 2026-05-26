import SiteFooter from "./components/site-footer";

const primaryTools = [
  {
    name: "Hook Analyzer",
    desc: "Score your opening line for clarity, curiosity and retention strength.",
    href: "/hook-analyzer",
    tag: "Start here",
  },
  {
    name: "Hook Improver",
    desc: "Turn rough video ideas into sharper hook variations.",
    href: "/hook-improver",
    tag: "Rewrite",
  },
  {
    name: "Shorts Script Generator",
    desc: "Build a short-form script structure with hook, beats and CTA.",
    href: "/shorts-script-generator",
    tag: "Script",
  },
  {
    name: "Thumbnail Text Checker",
    desc: "Check whether thumbnail text is short, readable and CTR-friendly.",
    href: "/thumbnail-text-checker",
    tag: "CTR",
  },
];

const workflow = [
  {
    step: "01",
    title: "Test the hook",
    desc: "Find weak openings before viewers drop.",
  },
  {
    step: "02",
    title: "Improve the idea",
    desc: "Rewrite rough angles into sharper hooks.",
  },
  {
    step: "03",
    title: "Shape the script",
    desc: "Build momentum line by line.",
  },
  {
    step: "04",
    title: "Check first impression",
    desc: "Review titles and thumbnail text before posting.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,#065f46_0%,transparent_32%),radial-gradient(circle_at_88%_12%,#1f2937_0%,transparent_34%),linear-gradient(180deg,transparent_0%,#070708_92%)] opacity-90" />

        <div className="relative mx-auto max-w-7xl px-6 py-6">
          <nav className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/30">
                <span className="font-bold text-emerald-300">H</span>
              </div>

              <span className="text-lg font-semibold tracking-tight">
                HookSignals
              </span>
            </a>

            <div className="hidden items-center gap-6 text-sm text-white/50 md:flex">
              <a className="transition hover:text-white" href="/tools">
                Tools
              </a>
              <a className="transition hover:text-white" href="/hook-psychology">
                Hook Psychology
              </a>
              <a className="transition hover:text-white" href="/youtube-ctr-tips">
                CTR Tips
              </a>
            </div>

            <a
              href="/hook-analyzer"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Start Free
            </a>
          </nav>

          <div className="grid gap-12 pb-20 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Pre-publish workflow tools for creators
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
                Improve the first impression of every video before you publish.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                HookSignals helps creators review hooks, improve scripts, test
                thumbnail text and make better publishing decisions before a
                video goes live.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/hook-analyzer"
                  className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black transition hover:opacity-90"
                >
                  Analyze a Hook
                </a>

                <a
                  href="/tools"
                  className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white transition hover:border-emerald-300/30"
                >
                  Explore Tools
                </a>
              </div>

              <p className="mt-6 max-w-xl text-sm leading-6 text-white/40">
                Built for creators who want a faster review loop before posting:
                hooks, scripts, titles and thumbnail text in one focused
                workflow.
              </p>
            </div>

            <div className="rounded-[36px] border border-white/10 bg-black/45 p-5 shadow-2xl shadow-emerald-950/20 backdrop-blur">
              <div className="rounded-[28px] border border-white/10 bg-[#09090a] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/40">Signal preview</p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      Before publishing
                    </h2>
                  </div>

                  <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-black">
                    Live workflow
                  </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <p className="text-sm text-white/40">Creator input</p>
                  <p className="mt-3 leading-7 text-white/75">
                    “Why your Shorts stop growing after 300 views”
                  </p>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {[
                    ["Clarity", "82"],
                    ["Curiosity", "88"],
                    ["Retention", "79"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <p className="text-xs text-white/35">{label}</p>
                      <p className="mt-2 text-3xl font-semibold text-emerald-300">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5">
                  <p className="text-sm font-semibold text-emerald-300">
                    Suggested direction
                  </p>
                  <p className="mt-3 leading-7 text-white/65">
                    Make the opening more specific and create a clearer reason
                    to keep watching after the first sentence.
                  </p>
                </div>

                <div className="mt-4 grid gap-3">
                  {["Rewrite hook", "Shape script", "Check thumbnail text"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/55"
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium text-emerald-300">
            Creator workflow
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            A focused review loop for the moments that decide performance.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((item) => (
            <div
              key={item.step}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
            >
              <p className="text-sm font-semibold text-emerald-300">
                {item.step}
              </p>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-7 text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium text-emerald-300">
              Core tools
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              Start with the hook. Then improve the script, title and thumbnail.
            </h2>
          </div>

          <a href="/tools" className="text-sm font-medium text-emerald-300">
            View all tools →
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {primaryTools.map((tool) => (
            <a
              key={tool.href}
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
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 md:p-10">
            <p className="mb-3 text-sm font-medium text-emerald-300">
              Why it exists
            </p>

            <h2 className="text-3xl font-semibold tracking-tight">
              Most creator tools start after publishing. HookSignals starts
              before.
            </h2>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 md:p-10">
            <p className="leading-8 text-white/60">
              The goal is not to replace creator judgment. The goal is to give
              creators a faster review loop for hooks, titles, thumbnails and
              scripts before they publish. Better first impressions can improve
              clicks, retention and the quality of creative decisions.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}