import PremiumToolShell from "../components/premium-tool-shell";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/motion";
import RelatedTools from "../components/related-tools";

export const metadata = {
  title: "Hook Psychology for YouTube Shorts and TikTok | HookSignals",
  description:
    "Learn why strong hooks work, how viewer psychology drives retention in the first seconds, and how to apply attention principles before publishing.",
  alternates: { canonical: "https://hooksignals.com/hook-psychology" },
};

const principles = [
  {
    title: "Curiosity Gap",
    icon: "◎",
    color: "border-violet-300/20 bg-violet-300/[0.06]",
    label: "text-violet-200",
    desc: "A strong hook opens a gap between what the viewer knows and what they want to know. The brain experiences this gap as mild discomfort — and completion as relief. The goal is not to trick, but to make the payoff feel genuinely worth the next 30 seconds.",
    signals: ["Unanswered question", "Missing information", "Implied consequence"],
  },
  {
    title: "Pattern Interrupt",
    icon: "⌁",
    color: "border-cyan-300/20 bg-cyan-300/[0.06]",
    label: "text-cyan-200",
    desc: "Viewers scroll in a semi-automated state. The hook has to disrupt that state before the viewer realizes they are still watching. Anything that breaks the visual, auditory or conceptual expectation forces re-engagement.",
    signals: ["Unexpected statement", "Visual disruption", "Counter-intuitive claim"],
  },
  {
    title: "Relevance Signal",
    icon: "◈",
    color: "border-sky-300/20 bg-sky-300/[0.06]",
    label: "text-sky-200",
    desc: "Viewers run a subconscious relevance check in the first seconds: is this for me? Hooks that name the audience, situation or problem explicitly pass this check faster. Vague hooks fail it silently.",
    signals: ["Named audience type", "Specific situation", "Recognizable pain point"],
  },
  {
    title: "Payoff Promise",
    icon: "◐",
    color: "border-amber-300/20 bg-amber-300/[0.06]",
    label: "text-amber-200",
    desc: "The viewer needs a reason to invest the next 15 to 90 seconds. The hook creates that reason. Without a payoff promise — a result, a revelation, a mistake to avoid — there is nothing to stay for.",
    signals: ["Stated outcome", "Implied result", "Problem resolution"],
  },
];

const weakPatterns = [
  { label: "Slow setup", example: "So today I wanted to talk about something...", problem: "Viewer has left before the topic appears." },
  { label: "Generic emotion", example: "This is absolutely insane.", problem: "No subject. Emotion without context loses fast." },
  { label: "Channel greeting", example: "Welcome back! If you're new here...", problem: "Viewer knows the video is about the creator, not them." },
  { label: "Vague promise", example: "This changed everything for me.", problem: "Changed what? For whom? Stakes are invisible." },
];

const dropoffData = [
  { second: "0s",  pct: 100 },
  { second: "3s",  pct: 82  },
  { second: "10s", pct: 61  },
  { second: "20s", pct: 48  },
  { second: "30s", pct: 38  },
  { second: "45s", pct: 31  },
  { second: "60s", pct: 27  },
];

export default function HookPsychologyPage() {
  return (
    <PremiumToolShell
      badge="Hook psychology"
      title="Why viewers leave in the first seconds."
      description="Hook performance is not about tricks — it is about matching the viewer's psychological state. Learn the four attention principles that determine whether a viewer stays or swipes."
      primaryHref="/hook-analyzer"
      primaryLabel="Analyze Your Hook"
      secondaryHref="/viral-hook-examples"
      secondaryLabel="Hook Examples"
    >

      {/* Attention timeline */}
      <FadeIn>
        <section className="rounded-[28px] border border-white/10 bg-white/[0.025] p-5 md:p-7">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-white/38">
            Illustrative viewer drop-off pattern — not real data
          </p>
          <h2 className="mb-6 text-2xl font-black tracking-tight">
            The decision window closes fast.
          </h2>
          <div className="grid grid-cols-7 gap-1">
            {dropoffData.map(({ second, pct }) => (
              <div key={second} className="flex flex-col items-center gap-2">
                <div className="flex w-full flex-col-reverse rounded-xl bg-white/[0.06]" style={{ height: 120 }}>
                  <div
                    className="w-full rounded-xl bg-gradient-to-t from-cyan-300/60 to-cyan-300/20"
                    style={{ height: `${pct}%` }}
                  />
                </div>
                <p className="text-[10px] font-black text-white/38">{pct}%</p>
                <p className="text-[10px] text-white/28">{second}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/32">
            Illustrative pattern only. Actual drop-off varies by platform, content type and audience.
          </p>
        </section>
      </FadeIn>

      {/* 4 principles */}
      <div className="mt-6">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/38">
          The four attention principles
        </p>
        <StaggerContainer className="grid gap-4 md:grid-cols-2">
          {principles.map((p) => (
            <StaggerItem key={p.title}>
              <div className={`rounded-[24px] border p-5 md:p-6 ${p.color}`}>
                <div className="mb-4 flex items-center gap-3">
                  <span className={`text-2xl ${p.label}`}>{p.icon}</span>
                  <p className={`text-sm font-black uppercase tracking-[0.14em] ${p.label}`}>
                    {p.title}
                  </p>
                </div>
                <p className="text-sm leading-7 text-white/65">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.signals.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-black/22 px-2.5 py-1 text-xs text-white/45"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Weak patterns */}
      <FadeIn>
        <section className="mt-6 rounded-[28px] border border-white/10 bg-black/22 p-5 md:p-7">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.14em] text-white/38">
            Common weak patterns
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {weakPatterns.map(({ label, example, problem }) => (
              <div key={label} className="rounded-[20px] border border-red-400/12 bg-red-400/[0.035] p-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-red-300/70">{label}</p>
                <p className="mt-2 text-sm font-black text-white/70">&ldquo;{example}&rdquo;</p>
                <p className="mt-2 text-xs leading-5 text-white/42">{problem}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Not clickbait note */}
      <FadeIn delay={0.08}>
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-cyan-300/18 bg-cyan-300/[0.05] p-5">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Strong hook</p>
            <p className="mt-3 leading-7 text-white/72">
              Creates a specific reason to watch. The viewer knows the subject and senses the payoff within the first sentence.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/24 p-5">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/35">Clickbait</p>
            <p className="mt-3 leading-7 text-white/55">
              Overpromises to get a click, then underdelivers. Damages trust and long-term retention. HookSignals is built to avoid this.
            </p>
          </div>
        </section>
      </FadeIn>

      <div className="mt-8">
        <RelatedTools primary="hook-analyzer" secondary="viral-hook-examples" context="Apply hook psychology to your own opening line and see which signals are missing." />
      </div>
    </PremiumToolShell>
  );
}
