const showcases = [
  ["Hook teardown", "Spot weak context-heavy openings before recording.", "Step 01", "Hook clarity"],
  ["Script structure", "Turn the best hook into a tighter beat-by-beat Short.", "Step 02", "Retention flow"],
  ["Packaging check", "Pair the hook with sharper thumbnail and title copy.", "Step 03", "CTR clarity"],
];

export default function VideoShowcase() {
  return (
    <section className="mt-16 grid gap-5 lg:grid-cols-3">
      {showcases.map(([title, subtitle, step, signal], index) => (
        <div key={title} className={`group relative overflow-hidden rounded-[34px] border border-white/10 bg-[#04070d] transition hover:-translate-y-1 hover:border-cyan-300/25 hs-slide-up hs-delay-${index + 1}`}>
          <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.16),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,.14),transparent_28%),linear-gradient(135deg,#07111f,#04070d)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />
            <div className="absolute left-5 top-5 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">Workflow card</div>
            <div className="absolute inset-x-6 top-20 space-y-3">
              <div className="h-3 w-3/4 rounded-full bg-cyan-300/35" />
              <div className="h-3 w-1/2 rounded-full bg-violet-300/30" />
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/35">Creator action</p>
                <p className="mt-2 text-sm leading-6 text-white/70">{subtitle}</p>
              </div>
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
              <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-bold text-white/80 backdrop-blur-xl">{signal}</div>
              <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-bold text-white/80 backdrop-blur-xl">{step}</div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm uppercase tracking-[0.14em] text-cyan-300">Creator workflow</p>
            <h3 className="mt-4 text-2xl font-black tracking-tight">{title}</h3>
            <p className="mt-3 leading-7 text-white/55">{subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
