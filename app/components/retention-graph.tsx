type RetentionGraphProps = {
  title?: string;
  points?: number[];
};

export default function RetentionGraph({ title = "Retention curve preview", points = [92, 84, 76, 72, 68, 64] }: RetentionGraphProps) {
  return (
    <section className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-5 md:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-cyan-300">Retention visual</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">{title}</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/45">First 10 sec</span>
      </div>

      <div className="relative h-56 overflow-hidden rounded-[24px] border border-white/10 bg-[#050914] p-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px] opacity-35" />
        <div className="relative flex h-full items-end gap-3">
          {points.map((point, index) => (
            <div key={`${point}-${index}`} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-2xl bg-gradient-to-t from-violet-400/45 via-sky-400/55 to-cyan-300/80 shadow-[0_0_24px_rgba(34,211,238,.18)]" style={{ height: `${point}%` }} />
              <span className="text-[10px] font-bold text-white/35">{index === 0 ? "0s" : `${index * 2}s`}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
