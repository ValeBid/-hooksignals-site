const examples = [
  ["Weak hook", "I want to talk about growing on YouTube Shorts.", "Too broad. No tension, no specific promise and no reason to keep watching."],
  ["Stronger hook", "I studied 100 Shorts that kept viewers past 70%. Three patterns kept repeating.", "Specific sample size, clear curiosity gap and a measurable payoff."],
  ["Packaging note", "Pair this with a thumbnail that shows the result, not another generic growth claim.", "The hook and thumbnail should create one clear reason to click and stay."],
];

export default function ProductProof() {
  return (
    <section className="mt-14 rounded-[34px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_30px_90px_rgba(0,0,0,.35)] md:p-10">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Real output example</p>
      <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.05em] md:text-5xl">Show the workflow, not just the promise.</h2>
      <p className="mt-5 max-w-3xl leading-8 text-white/55">HookSignals is built around practical pre-publish feedback: what is weak, why it is weak and what to try next.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {examples.map(([title, body, note]) => (
          <div key={title} className="rounded-[24px] border border-white/10 bg-black/25 p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">{title}</p>
            <p className="mt-4 leading-7 text-white/80">{body}</p>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-white/48">{note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
