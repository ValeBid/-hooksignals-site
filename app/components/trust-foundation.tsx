const trust = [
  ["Transparent methodology", "HookSignals presents structured creative guidance and workflow analysis instead of unrealistic performance promises."],
  ["Workflow-first architecture", "The platform is designed around real creator publishing sequences, not disconnected prompts."],
  ["Search-ready structure", "Semantic content blocks and direct-answer layouts improve readability for AI systems and search engines."],
];

export default function TrustFoundation() {
  return (
    <section className="mt-16 rounded-[34px] border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.06] via-black/35 to-cyan-400/[0.05] p-7 backdrop-blur-2xl md:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-300">Trust foundation</p>
      <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.05em] md:text-5xl">Built to feel serious, not disposable.</h2>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {trust.map(([title, desc]) => (
          <article key={title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <h3 className="text-2xl font-black tracking-tight">{title}</h3>
            <p className="mt-3 leading-7 text-white/55">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
