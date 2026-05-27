import PremiumToolShell from "../components/premium-tool-shell";
import FAQBlock from "../components/faq-block";

export const metadata = {
  title: "YouTube Title Generator | Create Better Video Titles | HookSignals",
  description:
    "Generate stronger YouTube titles for Shorts, long-form videos and creator content with HookSignals.",
};

const titleExamples = [
  "I Fixed My First 3 Seconds and My Views Changed",
  "Why Your Shorts Stop at 300 Views",
  "The Hook Formula Small Creators Ignore",
  "I Tested 20 YouTube Titles. This One Won.",
  "Stop Posting Until You Fix This Title Mistake",
];

const titlePrinciples = [
  ["Clear Promise", "The viewer should instantly know the payoff."],
  ["Curiosity Gap", "The title should create a reason to click."],
  ["Audience Fit", "The title must match the viewer's real problem."],
];

export default function YouTubeTitleGeneratorPage() {
  return (
    <PremiumToolShell
      badge="YouTube creator tool"
      title="YouTube Title Generator"
      description="Create stronger YouTube titles built around clarity, curiosity and click intent. Use title ideas as a starting point, then test the video hook before publishing."
      primaryHref="/hook-analyzer"
      primaryLabel="Analyze Hook"
      secondaryHref="/tools"
      secondaryLabel="All Tools"
    >
      <section className="rounded-[24px] border border-white/10 bg-black/30 p-5 md:p-7">
        <label className="mb-3 block text-sm font-semibold text-white/62">
          Describe your video topic
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
            Analyze Hook
          </a>

          <a
            href="#examples"
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-center font-bold text-white transition hover:bg-white/10"
          >
            See Title Examples
          </a>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {titlePrinciples.map(([title, desc]) => (
          <div key={title} className="rounded-[22px] border border-white/10 bg-black/20 p-5">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-3 leading-7 text-white/50">{desc}</p>
          </div>
        ))}
      </section>

      <section id="examples" className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-emerald-300">
          Title examples
        </p>

        <h2 className="text-2xl font-black tracking-tight md:text-3xl">
          Strong titles make the click feel obvious.
        </h2>

        <div className="mt-6 grid gap-4">
          {titleExamples.map((title) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-black/25 p-5 text-white/72">
              “{title}”
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[24px] border border-emerald-300/20 bg-emerald-300/[0.06] p-6 md:p-8">
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">
          Pair every title with a stronger hook.
        </h2>

        <p className="mt-4 max-w-3xl leading-8 text-white/60">
          A title gets the click. A hook keeps the viewer. Use HookSignals to test both sides of the creator workflow before your video goes live.
        </p>

        <a
          href="/hook-analyzer"
          className="mt-7 inline-flex rounded-2xl bg-emerald-400 px-7 py-4 font-bold text-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
        >
          Open Hook Analyzer
        </a>
      </section>

      <FAQBlock
        items={[
          {
            question: "What makes a YouTube title clickable?",
            answer:
              "Strong YouTube titles create curiosity while staying clear about the topic. Good titles usually combine specificity, emotion or a strong outcome.",
          },
          {
            question: "Should YouTube titles be short?",
            answer:
              "Titles should be concise but still communicate value. Most strong titles are easy to understand quickly without feeling vague.",
          },
          {
            question: "Why do titles affect CTR?",
            answer:
              "The title is one of the first things viewers see in the feed. A stronger title increases the chance of clicks and improves first impressions.",
          },
        ]}
      />
    </PremiumToolShell>
  );
}
