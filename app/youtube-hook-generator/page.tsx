import FAQBlock from "../components/faq-block";
export const metadata = {
  title: "YouTube Hook Generator | Create Better Video Hooks | HookSignals",
  description:
    "Generate stronger YouTube hooks for Shorts, long-form videos and creator content with HookSignals.",
};

const hookExamples = [
  "If your Shorts die after 300 views, your first 3 seconds are probably making this mistake.",
  "I studied 100 viral videos. The best ones all started like this.",
  "Stop posting until you fix this one part of your video.",
  "Most small creators lose viewers before the video even starts.",
  "This simple hook formula makes people stay longer.",
];

export default function YouTubeHookGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <section className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between">
          <a href="/" className="text-sm text-white/50">
            ← HookSignals
          </a>

          <a
            href="/hook-analyzer"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70"
          >
            Analyze Hook
          </a>
        </nav>

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-7 md:p-12">
          <p className="mb-4 text-sm font-semibold text-emerald-300">
            YouTube Creator Tool
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            YouTube Hook Generator
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Create stronger opening lines for YouTube videos, Shorts and creator
            content. A good hook gives viewers a reason to keep watching in the
            first few seconds.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-5 md:p-7">
            <label className="mb-3 block text-sm font-medium text-white/60">
              Describe your video idea
            </label>

            <textarea
              placeholder="Example: A video about why small YouTube channels stop growing..."
              className="min-h-[150px] w-full rounded-2xl border border-white/10 bg-[#050505] p-5 text-base text-white outline-none placeholder:text-white/25"
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="/hook-analyzer"
                className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-semibold text-black"
              >
                Analyze Your Hook
              </a>

              <a
                href="#examples"
                className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold text-white"
              >
                See Examples
              </a>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Clarity", "Make the promise instantly understandable."],
            ["Curiosity", "Open a gap the viewer wants closed."],
            ["Retention", "Connect the hook to the next 5–10 seconds."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-6"
            >
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-white/50">{desc}</p>
            </div>
          ))}
        </section>

        <section id="examples" className="mt-14">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Hook examples
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Copy the structure, not the exact words.
          </h2>

          <div className="mt-6 grid gap-4">
            {hookExamples.map((hook) => (
              <div
                key={hook}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-white/70"
              >
                “{hook}”
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[32px] border border-emerald-300/20 bg-emerald-300/[0.06] p-7 md:p-10">
          <h2 className="text-3xl font-semibold">
            Test your hook before publishing.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            Do not guess if your opening line is strong. Run it through
            HookSignals and check clarity, curiosity and retention strength
            before the video goes live.
          </p>

          <a
            href="/hook-analyzer"
            className="mt-7 inline-block rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black"
          >
            Open Hook Analyzer
          </a>
        </section>
        <FAQBlock
          items={[
            {
              question: "What is a YouTube hook?",
              answer:
                "A YouTube hook is the opening line or first few seconds that gives viewers a reason to keep watching. A strong hook is clear, specific and curiosity-driven.",
            },
            {
              question: "Why do hooks matter for Shorts?",
              answer:
                "Shorts viewers decide very quickly whether to keep watching. A weak opening can reduce retention before the video has a chance to deliver value.",
            },
            {
              question: "How can I make my hook better?",
              answer:
                "Make the promise clearer, add a specific problem or outcome, and remove slow introductions. The viewer should immediately understand why the next seconds matter.",
            },
          ]}
        />
      </section>
    </main>
  );
}