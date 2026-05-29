const toolLinks = [
  ["Hook Analyzer", "/hook-analyzer"],
  ["Hook Improver", "/hook-improver"],
  ["Title Generator", "/youtube-title-generator"],
  ["Thumbnail Checker", "/thumbnail-text-checker"],
];

const resourceLinks = [
  ["YouTube CTR Tips", "/youtube-ctr-tips"],
  ["Retention Tips", "/viewer-retention-tips"],
  ["Hook Psychology", "/hook-psychology"],
  ["All Tools", "/tools"],
];

const legalLinks = [
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Refund Policy", "/refund-policy"],
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020406] px-5 py-10 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(124,58,237,0.08),transparent_30%)]" />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.15fr_0.7fr_0.7fr_0.9fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-400/10 shadow-lg shadow-cyan-500/10">
                <span className="text-sm font-black tracking-[-0.08em] text-cyan-300">HS</span>
              </div>
              <div>
                <p className="text-xl font-black tracking-tight">HookSignals</p>
                <p className="text-xs text-white/40">Creator intelligence workflow</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/52">
              Analyze hooks, improve scripts and check packaging before publishing.
            </p>

            <p className="mt-3 text-sm text-white/42">
              Support: <a className="text-cyan-300 transition hover:text-cyan-200" href="mailto:support@hooksignals.com">support@hooksignals.com</a>
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/35">Product</p>
            <div className="space-y-3 text-sm text-white/58">
              {toolLinks.map(([label, href]) => (
                <a key={label} href={href} className="block transition hover:text-white">{label}</a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/35">Resources</p>
            <div className="space-y-3 text-sm text-white/58">
              {resourceLinks.map(([label, href]) => (
                <a key={label} href={href} className="block transition hover:text-white">{label}</a>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-cyan-300/15 bg-cyan-300/[0.06] p-5">
            <p className="text-lg font-black tracking-tight">Ready to test a hook?</p>
            <p className="mt-2 text-sm leading-6 text-white/52">Start with the analyzer, then upgrade when the workflow becomes useful.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/hook-analyzer" className="rounded-2xl bg-cyan-300 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-cyan-200">Analyze hook</a>
              <a href="/pricing" className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-white/80 transition hover:bg-white/10">Pricing</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© 2026 HookSignals. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-white">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
