export const metadata = {
  title: "Hook Analyzer for YouTube, TikTok and Shorts | HookSignals",
  description:
    "Analyze your video hook and improve the first 3 seconds of your YouTube, TikTok or Shorts content.",
};

export default function HookAnalyzerPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white px-6 py-12">
      <section className="mx-auto max-w-4xl">
        <a href="/" className="text-sm text-white/50">
          ← Back to tools
        </a>

        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <p className="mb-4 text-sm font-medium text-emerald-300">
            Creator Signal Tool
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Hook Analyzer
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/60">
            Test the first 3 seconds of your video idea before publishing.
            HookSignals helps creators understand if their opening line is clear,
            specific, curiosity-driven and strong enough to keep viewers watching.
          </p>

          <div className="mt-8">
            <label className="mb-3 block text-sm text-white/60">
              Paste your hook
            </label>

            <textarea
              placeholder="Example: Stop making these 3 mistakes if you want your videos to grow..."
              className="min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/40 p-5 text-white outline-none placeholder:text-white/25"
            />

            <button className="mt-5 rounded-2xl bg-emerald-400 px-7 py-4 font-semibold text-black">
              Analyze Hook
            </button>
          </div>
        </div>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ["Clarity", "Is the hook easy to understand instantly?"],
            ["Curiosity", "Does it create a reason to keep watching?"],
            ["Retention", "Does it support the next 5–10 seconds?"],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-white/50">{desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-semibold">
            What makes a strong video hook?
          </h2>

          <p className="mt-5 leading-8 text-white/55">
            A strong hook quickly tells the viewer why they should keep watching.
            It usually combines a clear promise, a specific outcome, curiosity
            and emotional tension. Weak hooks are vague, slow or too generic.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-semibold">Example hook</h3>
            <p className="mt-4 text-white/55">
              Weak: “Here are some tips for content creators.”
            </p>
            <p className="mt-2 text-emerald-300">
              Strong: “If your Shorts die after 300 views, your first 3 seconds
              are probably making this mistake.”
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}