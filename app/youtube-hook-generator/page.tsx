import PremiumToolShell from "../components/premium-tool-shell";
import FAQSchema from "../components/faq-schema";
import FAQBlock from "../components/faq-block";

export const metadata = {
  title: "YouTube Hook Generator | Create Better Video Hooks | HookSignals",
  description:
    "Generate stronger YouTube hooks for Shorts, long-form videos and creator content with HookSignals.",
};

const faqItems = [
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
];

const hookExamples = [
  "If your Shorts stop growing after 300 views, your first 3 seconds are probably making this mistake.",
  "I studied 100 viral videos. The best ones all started like this.",
  "Stop posting until you fix this one part of your video.",
  "Most small creators lose viewers before the video even starts.",
  "This simple hook formula makes people stay longer.",
];

const hookPrinciples = [
  ["Clarity", "Make the promise instantly understandable."],
  ["Curiosity", "Open a gap the viewer wants closed."],
  ["Retention", "Connect the hook to the next 5–10 seconds."],
];

export default function YouTubeHookGeneratorPage() {
  return (
    <>
      <FAQSchema items={faqItems} />
      <PremiumToolShell
        badge="YouTube creator tool"
        title="YouTube Hook Generator"
        description="Create stronger opening lines for YouTube videos, Shorts and creator content. A good hook gives viewers a reason to keep watching in the first few seconds."
        primaryHref="/hook-analyzer"
        primaryLabel="Analyze Hook"
      >
        <section className="rounded-[24px] border border-white/10 bg-black/30 p-5 md:p-7">
          <label className="mb-3 block text-sm font-semibold text-white/62">
            Describe your video idea
          </label>

          <textarea
            placeholder="Example: A video about why small YouTube channels stop growing..."
            className="min-h-[160px] w-full resize-none rounded-2xl border border-white/10 bg-[#050505] p-5 text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-emerald-300/35"
          />

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="/hook-analyzer"
              className="rounded-2xl bg-emerald-400 px-7 py-4 text-center font-bold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
            >
              Analyze Your Hook
            </a>

            <a
              href="#examples"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-center font-bold text-white transition hover:bg-white/10"
            >
              See Examples
            </a>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {hookPrinciples.map(([title, desc]) => (
            <div key={title} className="rounded-[22px] border border-white/10 bg-black/20 p-5">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-white/50">{desc}</p>
            </div>
          ))}
        </section>

        <section id="examples" className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-7">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-emerald-300">
            Hook examples
          </p>

          <h2 className="text-2xl font-black tracking-tight md:text-3xl">
            Copy the structure, not the exact words.
          </h2>

          <div className="mt-6 grid gap-4">
            {hookExamples.map((hook) => (
              <div key={hook} className="rounded-2xl border border-white/10 bg-black/25 p-5 text-white/72">
                “{hook}”
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[24px] border border-emerald-300/20 bg-emerald-300/[0.06] p-6 md:p-8">
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">
            Test your hook before publishing.
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-white/60">
            Do not guess if your opening line is strong. Run it through HookSignals and check clarity, curiosity and retention strength before the video goes live.
          </p>

          <a
            href="/hook-analyzer"
            className="mt-7 inline-flex rounded-2xl bg-emerald-400 px-7 py-4 font-bold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
          >
            Open Hook Analyzer
          </a>
        </section>

        <FAQBlock items={faqItems} />
      </PremiumToolShell>
    </>
  );
}
