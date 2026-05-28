const workflowSteps = [
  ["Analyze", "Check whether the first line is clear, specific and worth watching."],
  ["Improve", "Rewrite weak openings into sharper hooks before recording."],
  ["Package", "Check title and thumbnail clarity before the video goes live."],
  ["Iterate", "Use the feedback to build a repeatable pre-publish workflow."],
];

export default function LiveCreatorMetrics() {
  return (
    <section className="mt-16 rounded-[34px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_35px_110px_rgba(0,0,0,.42)] backdrop-blur-2xl md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Creator workflow</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-5xl">A practical loop before you publish.</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-white/45">HookSignals is built around a simple utility loop: analyze the idea, improve the hook, check the packaging and publish with fewer avoidable mistakes.</p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workflowSteps.map(([label, desc], index) => (
          <div key={label} className="rounded-[26px] border border-white/10 bg-black/25 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">0{index + 1}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.7)]" />
            </div>
            <p className="mt-7 text-2xl font-black tracking-[-0.04em] text-white">{label}</p>
            <p className="mt-3 text-sm leading-6 text-white/45">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
