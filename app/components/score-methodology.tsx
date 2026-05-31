const sources = [
  "YouTube Data API",
  "Public video metadata",
  "Title structure analysis",
  "Hook pattern analysis",
  "Packaging analysis",
];

const isItems = ["Directional guidance before you publish"];

const isNotItems = [
  "Guaranteed views",
  "Actual YouTube CTR",
  "Actual retention data",
];

export default function ScoreMethodology() {
  return (
    <section className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
        How scores work
      </p>
      <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-white">
        What HookSignals scores — and what it doesn&apos;t.
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-[1fr_1fr_1fr]">
        {/* Data sources */}
        <div className="rounded-[22px] border border-white/10 bg-black/24 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
            Data sources
          </p>
          <ul className="mt-4 space-y-2.5">
            {sources.map((s) => (
              <li key={s} className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-[10px] text-cyan-300">◆</span>
                <span className="text-sm leading-5 text-white/70">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What scores are */}
        <div className="rounded-[22px] border border-emerald-300/18 bg-emerald-300/[0.04] p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
            Scores are
          </p>
          <ul className="mt-4 space-y-2.5">
            {isItems.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-sm text-emerald-300">✓</span>
                <span className="text-sm leading-6 text-white/70">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-5 text-white/35">
            Scores indicate which packaging elements are weak before publishing — not after.
          </p>
        </div>

        {/* What scores are not */}
        <div className="rounded-[22px] border border-white/10 bg-black/24 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-white/38">
            Scores are not
          </p>
          <ul className="mt-4 space-y-2.5">
            {isNotItems.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 text-xs text-white/35">✗</span>
                <span className="text-sm leading-6 text-white/52">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-5 text-white/35">
            Actual CTR, retention curves and view counts are only available inside YouTube Studio.
          </p>
        </div>
      </div>
    </section>
  );
}
