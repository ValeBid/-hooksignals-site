type CreatorAnalysisCardsProps = {
  title?: string;
  items?: [string, string, string][];
};

const defaultItems: [string, string, string][] = [
  ["First 3 seconds", "Opening promise must be obvious before the viewer decides to swipe.", "High impact"],
  ["Curiosity gap", "The hook should create a specific unanswered question, not vague mystery.", "Retention lever"],
  ["Next action", "Move the user into a rewrite, script or thumbnail check without breaking workflow.", "Workflow"],
];

export default function CreatorAnalysisCards({ title = "Creator insight layer", items = defaultItems }: CreatorAnalysisCardsProps) {
  return (
    <section className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-5 md:p-7">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-cyan-300">Creator insight</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">{title}</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/45">Creator OS</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(([heading, body, label]) => (
          <div key={heading} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">{label}</p>
            <h3 className="mt-3 text-xl font-black tracking-tight text-white">{heading}</h3>
            <p className="mt-3 leading-7 text-white/52">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
