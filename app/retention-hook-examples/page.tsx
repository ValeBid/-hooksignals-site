import PremiumToolShell from "../components/premium-tool-shell";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/motion";
import RelatedTools from "../components/related-tools";

export const metadata = {
  title: "Retention Hook Examples | Viewer Retention Hooks | HookSignals",
  description:
    "Study retention-focused hook examples designed to keep viewers watching longer across YouTube Shorts, TikTok and Reels.",
  alternates: { canonical: "https://hooksignals.com/retention-hook-examples" },
};

type RetentionHook = {
  hook: string;
  technique: string;
  techniqueType: string;
  retentionMechanism: string;
  score: number;
};

const retentionHooks: RetentionHook[] = [
  // Open Loop
  {
    hook: "The last mistake is the one most creators never notice.",
    technique: "Open Loop",
    techniqueType: "loop",
    retentionMechanism: "Viewer needs to watch to find out which mistake — loop stays open until revealed.",
    score: 74,
  },
  {
    hook: "There are four reasons Shorts die at 300 views. The fourth one is the worst.",
    technique: "Open Loop + Hierarchy",
    techniqueType: "loop",
    retentionMechanism: "Establishes a list, then ranks within it — viewer stays for the strongest item.",
    score: 82,
  },
  // Pattern interrupt
  {
    hook: "Your viewers are leaving in the first 3 seconds and you probably think it is not happening to you.",
    technique: "Pattern Interrupt",
    techniqueType: "interrupt",
    retentionMechanism: "Directly addresses the viewer's assumption. Discomfort drives continuation.",
    score: 79,
  },
  {
    hook: "The thumbnail click is not the hard part. The next three seconds is.",
    technique: "Pattern Interrupt + Reframe",
    techniqueType: "interrupt",
    retentionMechanism: "Challenges what the creator thought was the goal. Viewer recalibrates and watches.",
    score: 77,
  },
  // Proof-first
  {
    hook: "I tested the same intro with two hooks. One held 72% retention at 30 seconds. One held 31%.",
    technique: "Proof-First",
    techniqueType: "proof",
    retentionMechanism: "Specific numbers create credibility. The unresolved 'which one' keeps viewer watching.",
    score: 85,
  },
  {
    hook: "This one sentence change improved my Shorts retention from 45% to 71% in two weeks.",
    technique: "Proof + Timeline",
    techniqueType: "proof",
    retentionMechanism: "Metric before and after (45 → 71%) + timeframe (two weeks) = complete credibility loop.",
    score: 87,
  },
  // Urgency
  {
    hook: "Most creators lose 60% of viewers before the point is clear.",
    technique: "Urgency + Problem",
    techniqueType: "urgency",
    retentionMechanism: "Specific stat creates alarm. Viewer checks whether they're in the 60%.",
    score: 76,
  },
  {
    hook: "Stop publishing Shorts without running this three-second check first.",
    technique: "Urgency + Direct",
    techniqueType: "urgency",
    retentionMechanism: "Imperative creates urgency. The undefined 'check' creates a loop that must be resolved.",
    score: 72,
  },
  // Curiosity
  {
    hook: "I found a pattern in the Shorts that hit over 500k views. They all do this in the first second.",
    technique: "Discovery + Cliffhanger",
    techniqueType: "curiosity",
    retentionMechanism: "Pattern discovery + scale (500k) + unresolved 'this' = maximum loop tension.",
    score: 83,
  },
  {
    hook: "Nobody asks what to do after the hook. That is the mistake.",
    technique: "Hidden Insight",
    techniqueType: "curiosity",
    retentionMechanism: "Points to a blind spot. Viewer now needs to know what happens after the hook.",
    score: 71,
  },
];

const techniques = [
  { type: "loop", name: "Open Loop", color: "border-violet-300/20 bg-violet-300/[0.05]", label: "text-violet-200", desc: "Opens a question or sequence the viewer must watch to close." },
  { type: "interrupt", name: "Pattern Interrupt", color: "border-cyan-300/20 bg-cyan-300/[0.05]", label: "text-cyan-200", desc: "Breaks the scroll state by challenging an assumption." },
  { type: "proof", name: "Proof-First", color: "border-emerald-300/20 bg-emerald-300/[0.05]", label: "text-emerald-200", desc: "Leads with a result or test before context or explanation." },
  { type: "urgency", name: "Urgency", color: "border-amber-300/20 bg-amber-300/[0.05]", label: "text-amber-200", desc: "Creates a time-sensitive or consequence-driven reason to watch." },
  { type: "curiosity", name: "Discovery", color: "border-sky-300/20 bg-sky-300/[0.05]", label: "text-sky-200", desc: "Reveals a finding or pattern and withholds the full answer." },
];

function TechBadge({ type }: { type: string }) {
  const t = techniques.find((t) => t.type === type);
  if (!t) return null;
  return (
    <span className={`rounded-full border px-3 py-0.5 text-xs font-black ${t.color} ${t.label}`}>
      {t.name}
    </span>
  );
}

function ScoreBar({ value }: { value: number }) {
  const color = value >= 80 ? "bg-cyan-300" : value >= 70 ? "bg-sky-400" : "bg-white/30";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-16 overflow-hidden rounded-full bg-white/[0.07]">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-white/38">Example Score: {value}</span>
    </div>
  );
}

export default function RetentionHookExamplesPage() {
  return (
    <PremiumToolShell
      badge="Retention hook library"
      title="Retention Hook Examples"
      description="Hooks that improve watch-through rate use specific psychological techniques. These 10 examples show how open loops, proof, pattern interrupts and discovery work in practice."
      primaryHref="/hook-analyzer"
      primaryLabel="Analyze Your Hook"
      secondaryHref="/hook-psychology"
      secondaryLabel="Hook Psychology"
    >

      {/* Techniques legend */}
      <FadeIn>
        <div className="grid gap-3 rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:grid-cols-3 lg:grid-cols-5">
          {techniques.map((t) => (
            <div key={t.type} className={`rounded-[18px] border p-4 ${t.color}`}>
              <p className={`text-xs font-black uppercase tracking-[0.12em] ${t.label}`}>{t.name}</p>
              <p className="mt-1.5 text-xs leading-5 text-white/48">{t.desc}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Examples */}
      <div className="mt-6">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/35">
          10 scored examples — all Example Score, not real user data
        </p>
        <StaggerContainer className="grid gap-3 md:grid-cols-2">
          {retentionHooks.map((h) => (
            <StaggerItem key={h.hook}>
              <div className="rounded-[24px] border border-white/10 bg-black/24 p-5 transition hover:border-white/18">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <TechBadge type={h.techniqueType} />
                  <ScoreBar value={h.score} />
                </div>
                <p className="leading-7 text-white/80">&ldquo;{h.hook}&rdquo;</p>
                <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
                  <p className="text-xs leading-5 text-white/40">
                    <span className="font-black text-white/55">Retention mechanism: </span>
                    {h.retentionMechanism}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Retention principle callout */}
      <FadeIn>
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Keep the loop open", "Do not resolve the curiosity in the hook. The answer comes in the video."],
            ["Be specific", "Vague tension closes faster than specific tension. Numbers and timeframes help."],
            ["Lead with outcome", "The viewer should know the payoff exists before context or setup."],
          ].map(([title, desc]) => (
            <div
              key={title as string}
              className="rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.04] p-5"
            >
              <p className="font-black text-white">{title}</p>
              <p className="mt-2 text-sm leading-6 text-white/52">{desc}</p>
            </div>
          ))}
        </section>
      </FadeIn>

      <div className="mt-8">
        <RelatedTools />
      </div>
    </PremiumToolShell>
  );
}
