import PremiumToolShell from "../components/premium-tool-shell";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/motion";
import RelatedTools from "../components/related-tools";

export const metadata = {
  title: "Viral Hook Examples | YouTube & TikTok Hook Patterns | HookSignals",
  description:
    "Study scored hook examples across 6 pattern types — curiosity gap, problem-first, test/proof, warning, contrast and authority. All labeled Example Score.",
  alternates: { canonical: "https://hooksignals.com/viral-hook-examples" },
};

// ─── Example data — all scores labeled "Example Score" ────────────────────
type HookExample = {
  hook: string;
  pattern: string;
  patternType: string;
  score: number;
  why: string;
};

const hookExamples: HookExample[] = [
  {
    hook: "If your Shorts die after 300 views, this is the exact reason why.",
    pattern: "Problem + Curiosity",
    patternType: "curiosity",
    score: 79,
    why: "Names the specific failure point (300 views), opens a direct question, viewer already knows the pain.",
  },
  {
    hook: "I uploaded 100 Shorts and only 3 got over 50k views — this is what they had in common.",
    pattern: "Test + Proof",
    patternType: "proof",
    score: 88,
    why: "Scale (100 uploads), measurable result (50k views), specific ratio creates credibility.",
  },
  {
    hook: "Most creators write their hooks last. That is why they underperform.",
    pattern: "Warning + Contrast",
    patternType: "warning",
    score: 76,
    why: "Challenges a common behavior, implies the viewer might be making the same mistake.",
  },
  {
    hook: "The retention mistake I made for 6 months before one change fixed it.",
    pattern: "Personal Proof + Timeline",
    patternType: "proof",
    score: 81,
    why: "Timeframe (6 months) adds credibility. The unresolved 'one change' creates a curiosity loop.",
  },
  {
    hook: "Stop opening your Shorts with your channel name.",
    pattern: "Warning + Direct",
    patternType: "warning",
    score: 72,
    why: "Immediate, directive, specific behavior called out — viewer checks their own habit instantly.",
  },
  {
    hook: "I changed one line in my Shorts intro and first-30s retention improved by 26 points.",
    pattern: "Specific Test + Metric",
    patternType: "proof",
    score: 84,
    why: "One action, one metric, one outcome. No vagueness — viewer knows exactly what to expect.",
  },
  {
    hook: "Why do some creators plateau at 1k subscribers while posting the same content as those at 100k?",
    pattern: "Curiosity Gap + Question",
    patternType: "curiosity",
    score: 77,
    why: "Establishes a contrast (1k vs 100k), raises a question the viewer may already be asking.",
  },
  {
    hook: "Nobody in the creator space talks about this retention signal.",
    pattern: "Hidden Insight",
    patternType: "curiosity",
    score: 68,
    why: "Works on exclusivity. Lower score because 'nobody talks about' is overused without specificity.",
  },
  {
    hook: "I tested every hook pattern for 90 days. One type won by a massive margin.",
    pattern: "Test + Cliffhanger",
    patternType: "proof",
    score: 86,
    why: "Duration (90 days) creates credibility, 'one type' opens a loop, viewer wants to know which one.",
  },
  {
    hook: "Your viewer made their decision before your first sentence ended.",
    pattern: "Insight + Immediacy",
    patternType: "contrast",
    score: 74,
    why: "Reframes the creator's assumption. The viewer now wants to know what to change in their first sentence.",
  },
];

const patterns = [
  {
    type: "curiosity",
    name: "Curiosity Gap",
    desc: "Opens an unanswered question. Works when the payoff feels worth knowing.",
    example: "Why do creators with better content sometimes get fewer views?",
    color: "border-violet-300/20 bg-violet-300/[0.05]",
    label: "text-violet-200",
  },
  {
    type: "proof",
    name: "Test + Proof",
    desc: "Leads with a real experiment, result, or specific change. Credibility signal.",
    example: "I tested 50 hook formats and one type outperformed every other.",
    color: "border-cyan-300/20 bg-cyan-300/[0.05]",
    label: "text-cyan-200",
  },
  {
    type: "warning",
    name: "Warning Hook",
    desc: "Calls out a mistake the viewer might be making. High urgency, fast attention.",
    example: "Stop opening your videos with a greeting. Here is why.",
    color: "border-amber-300/20 bg-amber-300/[0.05]",
    label: "text-amber-200",
  },
  {
    type: "contrast",
    name: "Contrast",
    desc: "Sets up two opposing states. Creates tension the viewer wants resolved.",
    example: "Same content, same posting schedule — completely different results.",
    color: "border-sky-300/20 bg-sky-300/[0.05]",
    label: "text-sky-200",
  },
  {
    type: "pain",
    name: "Problem-First",
    desc: "Opens with the viewer's pain before context or setup. Immediate relevance.",
    example: "If your Shorts stop growing after the first week, this is the reason.",
    color: "border-rose-300/20 bg-rose-300/[0.05]",
    label: "text-rose-200",
  },
  {
    type: "insight",
    name: "Reframe",
    desc: "Challenges a belief the viewer holds. Creates instant cognitive engagement.",
    example: "A weak hook does not hurt the video. It cancels it before it starts.",
    color: "border-emerald-300/20 bg-emerald-300/[0.05]",
    label: "text-emerald-200",
  },
];

function ScorePill({ score }: { score: number }) {
  const color = score >= 80 ? "text-cyan-300 border-cyan-300/25 bg-cyan-300/[0.09]"
    : score >= 70 ? "text-sky-300 border-sky-300/25 bg-sky-300/[0.09]"
    : "text-white/50 border-white/15 bg-white/[0.04]";
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-black ${color}`}>
      {score}
    </span>
  );
}

export default function ViralHookExamplesPage() {
  return (
    <PremiumToolShell
      badge="Creator hook library"
      title="Viral Hook Examples"
      description="Study hook examples across 6 pattern types — curiosity gap, proof, warning, contrast, problem-first and reframe. Each hook is scored and broken down so you can apply the pattern to your own content."
      primaryHref="/hook-analyzer"
      primaryLabel="Analyze Your Hook"
      secondaryHref="/tools"
      secondaryLabel="All Tools"
    >
      {/* Pattern guide */}
      <FadeIn>
        <section className="rounded-[28px] border border-white/10 bg-white/[0.025] p-5 md:p-7">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
            6 hook pattern types
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {patterns.map((p) => (
              <div key={p.type} className={`rounded-[22px] border p-5 ${p.color}`}>
                <p className={`text-xs font-black uppercase tracking-[0.14em] ${p.label}`}>
                  {p.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/62">{p.desc}</p>
                <p className="mt-3 rounded-xl border border-white/10 bg-black/22 px-3 py-2 text-xs leading-5 text-white/45">
                  &ldquo;{p.example}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Hook examples grid */}
      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-white/38">
            Hook patterns — scored for framework reference
          </p>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/35">
            {hookExamples.length} examples
          </span>
        </div>

        <StaggerContainer className="grid gap-3 md:grid-cols-2">
          {hookExamples.map((ex) => (
            <StaggerItem key={ex.hook}>
              <div className="rounded-[24px] border border-white/10 bg-black/24 p-5 transition hover:border-white/18">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 text-xs text-white/45">
                    {ex.pattern}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-white/35">
                    Pattern score: <ScorePill score={ex.score} />
                  </div>
                </div>
                <p className="leading-7 text-white/80">&ldquo;{ex.hook}&rdquo;</p>
                <p className="mt-3 text-xs leading-5 text-white/42">{ex.why}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* What makes a weak hook */}
      <FadeIn>
        <section className="mt-8 rounded-[28px] border border-white/10 bg-black/22 p-5 md:p-7">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.14em] text-white/38">
            Weak hook patterns to avoid
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "\"This changed everything\"", problem: "No subject, no payoff, no tension." },
              { label: "\"You need to see this\"", problem: "Viewer has no idea what to expect." },
              { label: "\"Welcome back to the channel\"", problem: "Uses the opening to greet, not to hook." },
              { label: "\"Today I want to talk about...\"", problem: "Slow setup burns the first two seconds." },
              { label: "\"This is crazy\"", problem: "Generic emotion without a specific subject." },
              { label: "\"Trust me on this one\"", problem: "Promises credibility without earning it." },
            ].map(({ label, problem }) => (
              <div key={label} className="rounded-[20px] border border-red-400/12 bg-red-400/[0.035] p-4">
                <p className="text-sm font-black text-white/70">{label}</p>
                <p className="mt-1.5 text-xs leading-5 text-white/40">{problem}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Principles */}
      <FadeIn delay={0.1}>
        <section className="mt-6 rounded-[28px] border border-cyan-300/18 bg-cyan-300/[0.04] p-5 md:p-7">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
            Hook quality signals
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Specificity", "The viewer knows the subject, scale or context before the first sentence ends."],
              ["Tension", "Something is unresolved — a mistake, a contrast, a result not yet revealed."],
              ["Payoff clarity", "The viewer can picture the value they get from watching."],
            ].map(([title, desc]) => (
              <div key={title as string} className="rounded-[20px] border border-white/10 bg-black/24 p-4">
                <p className="font-black text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-white/52">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <div className="mt-8">
        <RelatedTools primary="hook-analyzer" secondary="hook-improver" context="Apply one of these patterns to your own hook and see how it scores." />
      </div>
    </PremiumToolShell>
  );
}
