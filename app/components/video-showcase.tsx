const showcases = [
  ["YouTube Shorts teardown", "AI retention review", "14:22"],
  ["TikTok SEO optimization", "Hook rewrite workflow", "09:11"],
  ["Thumbnail packaging", "CTR clarity analysis", "06:48"],
];

export default function VideoShowcase() {
  return (
    <section className="mt-16 grid gap-5 lg:grid-cols-3">
      {showcases.map(([title, subtitle, time], index) => (
        <div
          key={title}
          className={`group relative overflow-hidden rounded-[34px] border border-white/10 bg-[#04070d] transition hover:-translate-y-1 hover:border-cyan-300/25 hs-slide-up hs-delay-${index + 1}`}
        >
          <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.18),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,.18),transparent_28%),linear-gradient(135deg,#07111f,#04070d)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />

            <div className="absolute left-5 top-5 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
              Video breakdown
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 text-3xl text-white backdrop-blur-xl transition group-hover:scale-110">
                ▶
              </div>
            </div>

            <div className="absolute bottom-5 right-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-bold text-white/80 backdrop-blur-xl">
              {time}
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm uppercase tracking-[0.14em] text-cyan-300">Creator systems</p>
            <h3 className="mt-4 text-2xl font-black tracking-tight">{title}</h3>
            <p className="mt-3 leading-7 text-white/55">{subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
