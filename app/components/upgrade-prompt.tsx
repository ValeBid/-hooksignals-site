type UpgradePromptProps = {
  title: string;
  description: string;
};

export default function UpgradePrompt({ title, description }: UpgradePromptProps) {
  return (
    <div className="mt-8 rounded-[28px] border border-emerald-300/20 bg-emerald-300/[0.05] p-6 shadow-xl shadow-emerald-500/5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            Premium workflow layer
          </p>

          <h3 className="mt-3 text-3xl font-black tracking-tight text-white">
            {title}
          </h3>

          <p className="mt-4 text-base leading-7 text-white/60">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-black transition hover:bg-emerald-300">
            Coming Soon
          </button>

          <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 font-bold text-white transition hover:bg-white/10">
            Explore Free Tools
          </button>
        </div>
      </div>
    </div>
  );
}
