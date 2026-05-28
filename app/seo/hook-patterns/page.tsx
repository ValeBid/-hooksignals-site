const patterns = [
  {
    title: 'Mistake reveal hook',
    example: 'Most creators lose viewers because they explain before creating tension.',
    useCase: 'Use this when the audience already feels the problem but does not know the cause.',
  },
  {
    title: 'Proof-backed hook',
    example: 'I studied 100 viral Shorts and found the same first-three-second pattern.',
    useCase: 'Use this when you can attach data, testing, or observation to the promise.',
  },
  {
    title: 'Before-after hook',
    example: 'Your idea is good, but this opening makes people swipe.',
    useCase: 'Use this when you want to show transformation or contrast quickly.',
  },
  {
    title: 'Contrarian hook',
    example: 'The advice most creators follow is exactly why their retention drops.',
    useCase: 'Use this when your angle challenges a common creator belief.',
  },
];

export const metadata = {
  title: 'YouTube Hook Patterns for Better Retention | HookSignals',
  description: 'A practical library of YouTube and Shorts hook patterns for improving clarity, curiosity and retention.',
};

export default function HookPatternsSeoPage() {
  return (
    <main className="min-h-screen bg-[#030507] px-5 py-16 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Creator SEO library</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-0.06em] md:text-7xl">
            YouTube hook patterns that improve the first 3 seconds.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
            Use these hook structures to create stronger opening lines for Shorts, TikTok, Reels and YouTube videos. Each pattern is built around clarity, curiosity and retention pull.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/hook-analyzer" className="rounded-2xl bg-white px-7 py-4 text-center font-black text-black">Analyze your hook</a>
            <a href="/youtube-hook-generator" className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-center font-black text-white">Generate hooks</a>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {patterns.map((pattern) => (
            <article key={pattern.title} className="rounded-[28px] border border-white/10 bg-black/25 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-300">Pattern</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">{pattern.title}</h2>
              <p className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] p-4 leading-7 text-cyan-100">“{pattern.example}”</p>
              <p className="mt-5 leading-8 text-white/55">{pattern.useCase}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[30px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
          <h2 className="text-4xl font-black tracking-[-0.05em]">How to choose the right hook pattern</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-5"><h3 className="text-xl font-black">Use proof when trust is low</h3><p className="mt-3 leading-7 text-white/50">Numbers and tests make the hook feel earned instead of generic.</p></div>
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-5"><h3 className="text-xl font-black">Use contrast when the topic is common</h3><p className="mt-3 leading-7 text-white/50">A familiar topic needs a surprising angle to stop the scroll.</p></div>
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-5"><h3 className="text-xl font-black">Use a mistake when pain is obvious</h3><p className="mt-3 leading-7 text-white/50">Mistake framing works when the viewer already wants to avoid a bad outcome.</p></div>
          </div>
        </section>
      </div>
    </main>
  );
}
