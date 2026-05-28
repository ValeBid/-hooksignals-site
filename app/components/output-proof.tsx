const examples = [
  {
    label: "Weak opener",
    before: "How to get more views on YouTube Shorts",
    beforeScore: 48,
    after: "I studied 100 Shorts that held viewers past 70%. Three patterns kept repeating.",
    afterScore: 91,
    notes: ["Specific proof source", "Clear curiosity gap", "Immediate retention promise"],
  },
  {
    label: "Vague story",
    before: "I learned a lot from quitting my job",
    beforeScore: 52,
    after: "I quit my 9-5 and lost $14,000 before my first real sale. Here is what I fixed.",
    afterScore: 88,
    notes: ["Sharper stakes", "Concrete loss", "Clear reason to keep watching"],
  },
  {
    label: "Flat tutorial",
    before: "Here are some editing tips for creators",
    beforeScore: 44,
    after: "These three editing mistakes make Shorts feel slow in the first 5 seconds.",
    afterScore: 86,
    notes: ["Viewer pain first", "Specific count", "Faster payoff"],
  },
];

export default function OutputProof() {
  return (
    <section className="mt-16 rounded-[38px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_90px_rgba(0,0,0,.32)] md:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Real output preview</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-5xl">Show the stronger version before you publish.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/55">
            HookSignals is built to turn vague openings into specific, testable creator packaging. No fake growth promise — just clearer decisions before upload.
          </p>
          <a href="/hook-analyzer" className="mt-7 inline-flex rounded-2xl bg-white px-6 py-3 font-black text-black transition hover:bg-white/90">Analyze my hook</a>
        </div>

        <div className="rounded-[30px] border border-cyan-300/20 bg-black/28 p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm">
            <span className="text-cyan-300">Hook score lift</span>
            <span className="text-white/42">Example outputs</span>
          </div>
          <div className="mt-5 space-y-4">
            {examples.map((item) => (
              <article key={item.before} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/38">{item.label}</p>
                  <div className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-sm font-black text-cyan-200">
                    {item.beforeScore} → {item.afterScore}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-red-300/10 bg-red-300/[0.035] p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-red-200/60">Before</p>
                    <p className="mt-3 leading-7 text-white/62">“{item.before}”</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.055] p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">After</p>
                    <p className="mt-3 leading-7 text-white/82">“{item.after}”</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.notes.map((note) => (
                    <span key={note} className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/50">{note}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
