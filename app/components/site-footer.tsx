const toolLinks = [
  ["Hook Analyzer", "/hook-analyzer"],
  ["Hook Improver", "/hook-improver"],
  ["YouTube Hook Generator", "/youtube-hook-generator"],
  ["Shorts Script Generator", "/shorts-script-generator"],
  ["Thumbnail Checker", "/thumbnail-text-checker"],
];

const resourceLinks = [
  ["YouTube CTR Tips", "/youtube-ctr-tips"],
  ["Viewer Retention Tips", "/viewer-retention-tips"],
  ["Hook Psychology", "/hook-psychology"],
  ["All Tools", "/tools"],
  ["Sitemap", "/sitemap.xml"],
];

const platformLinks = [
  ["Pricing", "/pricing"],
  ["Workspace", "/workspace"],
  ["Tools Dashboard", "/tools"],
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020406] px-5 pb-10 pt-20 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,197,94,0.10),transparent_26%),radial-gradient(circle_at_80%_0%,rgba(124,58,237,0.12),transparent_30%)]" />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-400/10 shadow-lg shadow-emerald-500/10">
                <span className="text-xl font-black text-emerald-300">↗</span>
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight">HookSignals</p>
                <p className="text-sm text-white/40">Premium creator workflow tools</p>
              </div>
            </div>

            <p className="mt-6 text-base leading-8 text-white/52">
              Analyze hooks, improve scripts, validate thumbnails and optimize creator decisions before publishing your next video.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/tools"
                className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
              >
                Explore Tools
              </a>
              <a
                href="/pricing"
                className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-white/80 transition hover:bg-white/10"
              >
                Pricing Preview
              </a>
            </div>
          </div>

          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-white/38">
              Product
            </p>
            <div className="space-y-4 text-white/58">
              {toolLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="block transition hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-white/38">
              Resources
            </p>
            <div className="space-y-4 text-white/58">
              {resourceLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="block transition hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-white/38">
              Platform
            </p>

            <div className="space-y-4 text-white/58">
              {platformLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="block transition hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-violet-400/20 bg-violet-500/10 p-6">
              <p className="text-xl font-bold tracking-tight">Built for creators</p>
              <p className="mt-3 text-sm leading-7 text-white/55">
                HookSignals is designed for YouTube creators, Shorts editors and growth-focused content teams.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-sm text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© 2026 HookSignals. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <a href="/sitemap.xml" className="transition hover:text-white">
              Sitemap
            </a>
            <a href="/pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="/workspace" className="transition hover:text-white">
              Workspace
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
