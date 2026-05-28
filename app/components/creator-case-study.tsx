const steps = [
  ["Rough idea", "A creator wants to make a Short about getting more views, but the opening is generic and the thumbnail promise is unclear."],
  ["Hook fix", "The opening changes from a broad claim into a specific pattern: 'I studied 100 Shorts that held viewers past 70%. Three patterns kept repeating.'"],
  ["Package fix", "The title and thumbnail stop repeating generic growth language and point to one concrete payoff the viewer can understand quickly."],
  ["Publish check", "The final idea has a clearer reason to click, a stronger first sentence and a more obvious retention path."],
];

export default function CreatorCaseStudy() {
  return (
    <section className="mt-14 rounded-[34px] border border-white/10 bg-black/24 p-6 shadow-[0_22px_70px_rgba(0,0,0,.28)] md:p-9">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-300">Example workflow</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] md:text-5xl">How one rough idea becomes a cleaner publishing decision.</h2>
          <p className="mt-5 leading-8 text-white/55">This is the product promise in practical terms: not guaranteed growth, but clearer creative decisions before the video goes live.</p>
        </div>

        <div className="space-y-3">
          {steps.map(([title, text], index) => (
            <article key={title} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
              <div className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-sm font-black text-cyan-300">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">{title}</h3>
                  <p className="mt-2 leading-7 text-white/55">{text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
