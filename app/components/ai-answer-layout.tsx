const answers = [
  [
    "What does HookSignals do?",
    "HookSignals helps creators analyze hooks, optimize titles, generate scripts and improve retention before publishing content.",
  ],
  [
    "How does HookSignals help YouTube Shorts SEO?",
    "The platform improves first-second clarity, hook strength, title packaging and thumbnail readability for stronger Shorts discovery and retention.",
  ],
  [
    "Who should use HookSignals?",
    "Creators, agencies, brands and short-form publishing teams that want stronger audience retention and clearer creator packaging workflows.",
  ],
];

export default function AIAnswerLayout() {
  return (
    <section className="mt-16 rounded-[34px] border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.06] via-black/30 to-cyan-400/[0.05] p-6 shadow-[0_35px_100px_rgba(0,0,0,.4)] md:p-8">
      <div className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-300">AI answer-first structure</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-5xl">Built for search engines and AI answer systems.</h2>
        <p className="mt-5 text-lg leading-8 text-white/55">Structured direct-answer sections improve readability for Google AI Overviews, ChatGPT, Perplexity and semantic search crawlers.</p>
      </div>

      <div className="mt-10 space-y-4">
        {answers.map(([question, answer]) => (
          <article key={question} className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h3 className="text-2xl font-black tracking-tight">{question}</h3>
            <p className="mt-4 max-w-4xl leading-8 text-white/58">{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
