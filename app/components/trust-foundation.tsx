const trust = [
  {
    title: "No fake growth promises",
    desc: "HookSignals does not claim guaranteed views, followers or revenue. It helps creators improve the parts they can control before publishing.",
  },
  {
    title: "Workflow-first analysis",
    desc: "The product is organized around the real publishing sequence: hook, script, title, thumbnail and retention cues.",
  },
  {
    title: "Practical output feedback",
    desc: "Each check should explain what is weak, why it matters and what to try next instead of returning generic AI text.",
  },
];

const proofPoints = [
  ["Input", "A rough video idea, weak opening line or unclear thumbnail text."],
  ["Analysis", "Clarity, curiosity, specificity, viewer promise and retention risk."],
  ["Output", "A cleaner version plus the reasoning behind the improvement."],
];

export default function TrustFoundation() {
  return (
    <section className="mt-16 rounded-[34px] border border-white/10 bg-white/[0.025] p-7 backdrop-blur-2xl md:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">Trust foundation</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.045em] md:text-5xl">Serious creator tools should be honest about what they can improve.</h2>
        </div>
        <p className="max-w-md leading-7 text-white/52">The promise is not magic growth. The promise is a cleaner pre-publish decision before the content goes live.</p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {trust.map((item) => (
          <article key={item.title} className="rounded-[24px] border border-white/10 bg-black/24 p-5">
            <h3 className="text-2xl font-black tracking-tight">{item.title}</h3>
            <p className="mt-3 leading-7 text-white/55">{item.desc}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-4 rounded-[28px] border border-cyan-300/16 bg-cyan-300/[0.035] p-5 md:grid-cols-3">
        {proofPoints.map(([label, text]) => (
          <div key={label}>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">{label}</p>
            <p className="mt-3 leading-7 text-white/58">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
