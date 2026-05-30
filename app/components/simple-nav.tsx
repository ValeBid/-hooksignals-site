const links = [
  ["YouTube Analyzer", "/youtube-video-analyzer"],
  ["Hook Analyzer", "/hook-analyzer"],
  ["Tools", "/tools"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
];

export default function SimpleNav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/8 bg-[#020408]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-4 md:px-8">
        <a href="/" className="flex items-center gap-3" aria-label="HookSignals home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/22 bg-cyan-400/10">
            <span className="text-xs font-black tracking-[-0.08em] text-cyan-300">HS</span>
          </div>
          <div>
            <span className="block text-base font-black tracking-tight text-white">HookSignals</span>
            <span className="hidden text-[10px] uppercase tracking-[0.16em] text-cyan-300 sm:block">Creator Intelligence</span>
          </div>
        </a>

        <div className="hidden items-center gap-6 text-sm text-white/55 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-white">
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/sign-in"
            className="hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.08] sm:inline-flex"
          >
            Sign in
          </a>
          <a
            href="/youtube-video-analyzer"
            className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-4 py-2 text-sm font-black text-black shadow-[0_12px_28px_rgba(34,211,238,.18)] transition hover:scale-[1.01]"
          >
            Analyze Video
          </a>
        </div>
      </div>
    </nav>
  );
}
