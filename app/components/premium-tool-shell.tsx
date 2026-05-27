import SiteFooter from "./site-footer";

type PremiumToolShellProps = {
  badge: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function PremiumToolShell({
  badge,
  title,
  description,
  primaryHref = "/hook-analyzer",
  primaryLabel = "Analyze Hook",
  secondaryHref = "/tools",
  secondaryLabel = "All Tools",
  children,
  footer,
}: PremiumToolShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030507] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(34,197,94,0.12),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(124,58,237,0.14),transparent_30%),radial-gradient(circle_at_70%_75%,rgba(14,165,233,0.08),transparent_26%),linear-gradient(180deg,#030507_0%,#05070b_55%,#030507_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-400/8 blur-[110px]" />

        <div className="relative mx-auto max-w-[1240px] px-5 py-5 md:px-8">
          <nav className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.035] px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl md:px-6">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-400/10 shadow-lg shadow-emerald-500/10">
                <span className="text-xl font-black text-emerald-300">↗</span>
              </div>
              <span className="text-lg font-semibold tracking-tight md:text-xl">HookSignals</span>
            </a>

            <div className="flex items-center gap-3">
              <a
                href={secondaryHref}
                className="hidden rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 sm:inline-flex"
              >
                {secondaryLabel}
              </a>
              <a
                href={primaryHref}
                className="rounded-2xl bg-emerald-400 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
              >
                {primaryLabel}
              </a>
            </div>
          </nav>

          <section className="py-10 md:py-14">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-100 shadow-lg shadow-violet-500/10">
              <span className="text-emerald-300">✦</span>
              {badge}
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl md:text-7xl">
              {title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/62 md:text-xl">
              {description}
            </p>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/25 backdrop-blur-xl md:rounded-[36px] md:p-7">
            {children}
          </section>

          {footer}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
