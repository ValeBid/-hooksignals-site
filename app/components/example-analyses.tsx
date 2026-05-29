const examples = [
  {
    label: "Example analysis",
    hook: "I stopped doing cardio for 30 days",
    context: "Fitness · YouTube Shorts · Men trying to lose fat",
    score: "73",
    issue: "Strong experiment framing, but the payoff needs a clearer surprise or visual result.",
    rewrite: "I stopped doing cardio for 30 days — and one fat-loss result surprised me",
  },
  {
    label: "Example analysis",
    hook: "Nobody talks about this YouTube mistake",
    context: "Creator education · TikTok · New creators",
    score: "61",
    issue: "The curiosity gap exists, but the phrase is too familiar. It needs a more specific mistake.",
    rewrite: "Most new creators lose viewers in the first 2 seconds because of this one mistake",
  },
  {
    label: "Example analysis",
    hook: "I uploaded 100 shorts in 30 days and only one changed everything",
    context: "Creator growth · YouTube Shorts · Small channels",
    score: "78",
    issue: "Good scale and curiosity. The strongest version should reveal what changed without giving away the full answer.",
    rewrite: "I uploaded 100 shorts in 30 days — only one broke the pattern",
  },
];

const useCases = [
  "Creators checking whether an idea has a strong first 3 seconds.",
  "Editors comparing hook, title and thumbnail alignment before upload.",
  "Small teams saving repeatable pre-publish decisions in one workspace.",
  "New channels learning why a hook feels vague before they record.",
  "Agencies reviewing multiple short-form concepts before sending to clients.",
];

export default function ExampleAnalyses() {
  return (
    <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[38px] border border-white/10 bg-white/[0.035] p-7 md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Example analyses</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-5xl">See what the output feels like before using credits.</h2>
        <p className="mt-5 max-w-2xl leading-8 text-white/55">
          These are sample analyses built from common creator scenarios. They show the type of feedback HookSignals is designed to produce.
        </p>
        <div className="mt-8 grid gap-4">
          {examples.map((example) => (
            <article key={example.hook} className="rounded-[28px] border border-white/10 bg-black/24 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-cyan-200">{example.label}</p>
                <p className="text-3xl font-black text-cyan-300">{example.score}</p>
              </div>
              <h3 className="mt-4 text-2xl font-black tracking-tight text-white">“{example.hook}”</h3>
              <p className="mt-2 text-sm text-white/38">{example.context}</p>
              <p className="mt-4 leading-7 text-white/55">{example.issue}</p>
              <div className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.055] p-4 leading-7 text-white/75">
                Better angle: “{example.rewrite}”
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-[38px] border border-white/10 bg-black/24 p-7 md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-200">Creator use cases</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">What creators use it for.</h2>
        <p className="mt-5 leading-8 text-white/55">
          This is not fake social proof. These are the concrete jobs the product is built to handle.
        </p>
        <div className="mt-8 grid gap-3">
          {useCases.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 leading-7 text-white/62">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
