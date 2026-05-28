const examples = [
  {
    label: "Weak hook",
    text: "I want to talk about growing on YouTube Shorts.",
    note: "Too broad. No tension, no specific promise and no reason to keep watching.",
  },
  {
    label: "Stronger hook",
    text: "I studied 100 Shorts that kept viewers past 70%. Three patterns kept repeating.",
    note: "Specific sample size, clear curiosity gap and a measurable payoff.",
  },
  {
    label: "Thumbnail fix",
    text: "Before: 'Growth Tips'. After: '3 Shorts Patterns I Found'.",
    note: "The second version is concrete, easier to scan on mobile and tied to the hook.",
  },
  {
    label: "Retention cue",
    text: "Open with the result, explain the pattern, then show the mistake most creators make.",
    note: "This gives the viewer a reason to stay through the explanation instead of dropping after the claim.",
  },
];

export default function ProductProof() {
  return (
    <section className="mt-14 rounded-[30px] border border-white/10 bg-white/[0.025] p-6 shadow-[0_22px_70px_rgba(0,0,0,.28)] md:p-9">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">Creator proof workflow</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.045em] md:text-5xl">Make the improvement obvious before the creator clicks publish.</h2>
        </div>
        <p className="max-w-md leading-7 text-white/52">HookSignals should not feel like another prompt box. It should show what changed, why it matters and what to test next.</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {examples.map((item) => (
          <article key={item.label} className="rounded-[24px] border border-white/10 bg-black/22 p-5 transition hover:border-cyan-300/25">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">{item.label}</p>
            <p className="mt-4 min-h-[84px] leading-7 text-white/82">{item.text}</p>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-white/48">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
