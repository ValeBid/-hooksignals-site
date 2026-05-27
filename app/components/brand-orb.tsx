type BrandOrbProps = {
  label?: string;
  title: string;
  description: string;
};

export default function BrandOrb({
  label = "Creator Intelligence",
  title,
  description,
}: BrandOrbProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#05070b] p-6 shadow-2xl shadow-black/30 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.16),transparent_22%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.12),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.12),transparent_30%)]" />

      <div className="absolute right-[-80px] top-[-80px] h-[240px] w-[240px] rounded-full border border-emerald-300/10 bg-emerald-300/[0.05] blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          {label}
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
              {title}
            </h2>

            <p className="mt-5 text-base leading-8 text-white/58 md:text-lg">
              {description}
            </p>
          </div>

          <div className="relative flex h-[240px] items-center justify-center">
            <div className="absolute h-[220px] w-[220px] rounded-full border border-white/10" />
            <div className="absolute h-[170px] w-[170px] rounded-full border border-emerald-300/20" />
            <div className="absolute h-[120px] w-[120px] rounded-full border border-violet-300/20" />

            <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-[28px] border border-emerald-300/20 bg-emerald-300/[0.08] shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
              <span className="text-3xl font-black text-emerald-300">HS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
