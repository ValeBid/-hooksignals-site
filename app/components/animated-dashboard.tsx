const dashboardRows = [
  ["Hook clarity", "92", "+18%"],
  ["Curiosity gap", "87", "+14%"],
  ["Retention risk", "Low", "-31%"],
  ["Thumbnail read", "89", "+22%"],
];

const timeline = [
  ["00:00", "Pattern interrupt"],
  ["00:03", "Context lock"],
  ["00:08", "Proof beat"],
  ["00:18", "Payoff setup"],
];

export default function AnimatedDashboard() {
  return (
    <section className="mt-16 rounded-[36px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_40px_120px_rgba(0,0,0,.45)] backdrop-blur-2xl md:p-9">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Animated creator dashboard</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">See the publishing risk before you post.</h2>
          <p className="mt-6 text-lg leading-8 text-white/55">A premium creator workflow should not feel like a form. HookSignals turns hooks, titles, thumbnail copy and pacing into a live pre-publish intelligence surface.</p>
        </div>

        <div className="relative overflow-hidden rounded-[34px] border border-cyan-300/15 bg-[#050914] p-5 hs-scan-line">
          <div className="absolute right-6 top-6 h-28 w-28 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-sm text-cyan-300">HookSignals OS</p>
              <h3 className="mt-1 text-2xl font-black tracking-tight">Creator Readiness Score</h3>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-200">Live</div>
          </div>

          <div className="relative mt-6 grid gap-4 md:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Overall score</p>
              <div className="mt-4 text-7xl font-black tracking-[-0.08em] text-cyan-200">91</div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400" />
              </div>
              <p className="mt-4 text-sm leading-6 text-white/50">Ready for publish. Weakest point: thumbnail specificity.</p>
            </div>

            <div className="space-y-3">
              {dashboardRows.map(([label, score, delta]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                  <span className="text-white/62">{label}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-black text-white">{score}</span>
                    <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-xs font-bold text-cyan-200">{delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-5 grid gap-3 md:grid-cols-4">
            {timeline.map(([time, event]) => (
              <div key={time} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="font-black text-cyan-300">{time}</p>
                <p className="mt-2 text-sm text-white/55">{event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
