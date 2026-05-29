import Link from "next/link";
import CopyButton from "./copy-button";

type HookAnalysis = {
  hookScore: number;
  clarityScore: number;
  curiosityScore: number;
  retentionRisk: number;
  pattern: string;
  weakness: string;
  improvedHook: string;
  variants: string[];
  retentionNotes: string[];
  scoreRationale?: string[];
  audienceTrigger?: string;
  titlePairings?: string[];
  thumbnailAngles?: string[];
};

const workflowActions = [
  {
    step: "01",
    name: "Improve Hook",
    href: "/hook-improver",
    desc: "Turn the strongest rewrite into more punchy first-line variants.",
  },
  {
    step: "02",
    name: "Generate Title",
    href: "/youtube-title-generator",
    desc: "Match the hook promise with a title that increases click intent.",
  },
  {
    step: "03",
    name: "Check Thumbnail",
    href: "/thumbnail-text-checker",
    desc: "Make sure the visual promise is readable and consistent with the hook.",
  },
  {
    step: "04",
    name: "Write Script Opener",
    href: "/shorts-script-generator",
    desc: "Build the first 10 seconds around the hook, title and thumbnail angle.",
  },
];

function scoreLabel(score: number) {
  if (score >= 85) return "Scroll-stopper";
  if (score >= 72) return "Strong angle";
  if (score >= 58) return "Promising draft";
  if (score >= 42) return "Needs sharper stakes";
  return "Weak hook";
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-white/58">{label}</span>
        <span className="font-semibold text-white/75">{value}/100</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

function metric(result: HookAnalysis) {
  const scrollStop = Math.max(12, Math.min(94, Math.round(result.hookScore - 8 + result.curiosityScore / 10)));
  const viralPotential = Math.max(10, Math.min(96, Math.round((result.hookScore + result.curiosityScore + (100 - result.retentionRisk)) / 3)));
  return { scrollStop, viralPotential };
}

export default function HookAnalysisResult({ result, mode }: { result: HookAnalysis; mode: "ai" | "rules" | null }) {
  const m = metric(result);
  const rationale = result.scoreRationale?.length
    ? result.scoreRationale
    : [result.weakness, "The score is based on clarity, curiosity and first-second retention risk."];
  const titlePairings = result.titlePairings?.length
    ? result.titlePairings
    : ["The mistake behind this result", "What changed after the first test", "I tested this so you do not have to"];
  const thumbnailAngles = result.thumbnailAngles?.length
    ? result.thumbnailAngles
    : ["Before / after contrast", "One bold result word", "Mistake label over the key moment"];

  return (
    <div className="grid gap-5">
      <div className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/50">
            {mode === "ai" ? "AI analysis" : "Rules preview"}
          </div>
          <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/45">First 3 seconds</div>
        </div>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-end gap-3">
              <h2 className="text-7xl font-black tracking-tight text-cyan-300">{result.hookScore}</h2>
              <span className="mb-3 text-white/42">/100</span>
            </div>
            <p className="mt-3 text-2xl font-black tracking-tight">{scoreLabel(result.hookScore)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/55">
            <p className="text-white/35">Retention risk</p>
            <p className="mt-1 font-bold text-white">
              {result.retentionRisk <= 35 ? "Low" : result.retentionRisk <= 65 ? "Medium" : "High"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="mb-4 text-sm font-semibold text-white/55">Signal breakdown</p>
          <div className="space-y-5">
            <ScoreBar label="Clarity" value={result.clarityScore} />
            <ScoreBar label="Curiosity gap" value={result.curiosityScore} />
            <ScoreBar label="Retention strength" value={100 - result.retentionRisk} />
          </div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="mb-4 text-sm font-semibold text-white/55">Detected pattern</p>
          <p className="leading-7 text-white/78">{result.pattern}</p>
          <p className="mt-4 text-sm leading-7 text-white/50">{result.weakness}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
          <p className="text-sm font-semibold text-cyan-200">Scroll-stop probability</p>
          <p className="mt-3 text-5xl font-black text-cyan-300">{m.scrollStop}%</p>
          <p className="mt-3 text-sm leading-6 text-white/52">Directional first-second stopping power.</p>
        </div>
        <div className="rounded-[24px] border border-violet-300/20 bg-violet-300/[0.055] p-5">
          <p className="text-sm font-semibold text-violet-200">Viral potential</p>
          <p className="mt-3 text-5xl font-black text-violet-200">{m.viralPotential}%</p>
          <p className="mt-3 text-sm leading-6 text-white/52">Useful signal, not a reach promise.</p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-black/25 p-5">
          <p className="text-sm font-semibold text-white/55">Audience trigger</p>
          <p className="mt-3 leading-7 text-white/72">{result.audienceTrigger || "The viewer needs a clear payoff and a reason to keep watching."}</p>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
        <p className="mb-4 text-sm font-semibold text-white/55">Why this score?</p>
        <div className="grid gap-3 md:grid-cols-2">
          {rationale.map((item) => (
            <p key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-white/64">{item}</p>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
        <p className="mb-4 text-sm font-semibold text-white/55">Retention notes</p>
        <div className="grid gap-3">
          {result.retentionNotes.map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 leading-7 text-white/62">
              <span className="mr-2 font-bold text-violet-300">0{index + 1}</span>{item}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 md:p-7">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-300">Improved hook ideas</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Sharper versions to test</h2>
          </div>
          <Link href="/pricing" className="rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.08] px-5 py-3 text-sm font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]">
            Unlock premium analysis
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 leading-7 text-white/80">
            <p>“{result.improvedHook}”</p>
            <CopyButton text={result.improvedHook} />
          </div>
          {result.variants.map((item) => (
            <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 leading-7 text-white/75">
              <p>“{item}”</p>
              <CopyButton text={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5">
          <p className="text-sm font-semibold text-white/55">Title pairings preview</p>
          <div className="mt-4 space-y-3">
            {titlePairings.map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/66">{item}</p>)}
          </div>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5">
          <p className="text-sm font-semibold text-white/55">Thumbnail angles preview</p>
          <div className="mt-4 space-y-3">
            {thumbnailAngles.map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/66">{item}</p>)}
          </div>
        </div>
      </div>

      <div className="rounded-[30px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.08),rgba(124,58,237,.08))] p-5 md:p-7">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Next recommended workflow</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Do not stop at the hook. Package the whole idea.</h2>
        <p className="mt-3 max-w-2xl leading-7 text-white/55">A strong hook still needs a matching title, thumbnail and first 10 seconds. Continue through the chain before publishing.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {workflowActions.map((tool) => (
            <Link key={tool.href} href={tool.href} className="rounded-[22px] border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.055]">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Step {tool.step}</p>
              <h3 className="mt-2 text-xl font-black text-white">{tool.name}</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">{tool.desc}</p>
              <p className="mt-4 text-sm font-black text-cyan-200">Continue →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
