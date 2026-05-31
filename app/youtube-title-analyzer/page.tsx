"use client";

import { useState } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import RelatedTools from "../components/related-tools";
import CopyButton from "../components/copy-button";
import { StaggerContainer, StaggerItem } from "../components/motion";

// ─── Types ─────────────────────────────────────────────────────────────────
type TitleAnalysis = {
  titleScore: number;
  clarityScore: number;
  curiosityScore: number;
  ctrPotential: number;
  lengthScore: number;
  keywordPlacement: number;
  charCount: number;
  pattern: string;
  weakness: string;
  improvedTitle: string;
  alternatives: string[];
  rationale: string[];
};

type TitleResponse = {
  analysis: TitleAnalysis;
  mode: "ai" | "rules";
  charCount: number;
  error?: string;
  message?: string;
};

// ─── Score helpers ──────────────────────────────────────────────────────────
function titleLabel(score: number): string {
  if (score >= 85) return "Strong click signal";
  if (score >= 70) return "Solid title";
  if (score >= 50) return "Average — improvable";
  if (score >= 30) return "Weak title";
  return "Needs rewrite";
}

function lengthStatus(chars: number): { label: string; color: string } {
  if (chars < 25)  return { label: "Too short",     color: "text-red-400"     };
  if (chars <= 40) return { label: "Slightly short", color: "text-yellow-300"  };
  if (chars <= 70) return { label: "Optimal length", color: "text-emerald-300" };
  if (chars <= 85) return { label: "Slightly long",  color: "text-yellow-300"  };
  return { label: "Too long — may truncate", color: "text-red-400" };
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="text-white/52">{label}</span>
        <span className="font-semibold text-white/65">{value}/100</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400"
          style={{ width: `${value}%`, transition: "width 0.8s ease-out" }}
        />
      </div>
    </div>
  );
}

// ─── Character counter ──────────────────────────────────────────────────────
function CharBar({ chars }: { chars: number }) {
  const { label, color } = lengthStatus(chars);
  const optimalMax = 70;
  const pct = Math.min(100, (chars / optimalMax) * 100);
  const barColor = chars >= 40 && chars <= 70 ? "bg-emerald-400" : chars > 70 ? "bg-red-400" : "bg-yellow-400";

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <div className={`h-full rounded-full ${barColor} transition-all duration-200`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`shrink-0 text-xs font-black ${color}`}>{chars} chars · {label}</span>
    </div>
  );
}

// ─── Empty state ────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/22 p-7">
      <p className="text-sm text-cyan-300">Analysis will appear here</p>
      <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight">
        Score your title before publishing.
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-white/48">
        HookSignals checks your YouTube title for CTR potential, clarity,
        curiosity gap, character length and keyword placement. Get improvement
        suggestions before your video goes live.
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {[
          ["CTR potential",     "Does this title generate clicks vs others on the same topic?"],
          ["Length check",      "40–70 chars is optimal for YouTube search without truncation."],
          ["Keyword placement", "The primary keyword should appear in the first 30 characters."],
        ].map(([title, desc]) => (
          <div key={title as string} className="rounded-2xl border border-white/10 bg-black/24 p-4">
            <p className="text-sm font-black text-cyan-200">{title}</p>
            <p className="mt-2 text-xs leading-5 text-white/42">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Result panel ───────────────────────────────────────────────────────────
function ResultPanel({ result, mode }: { result: TitleAnalysis; mode: "ai" | "rules" }) {
  return (
    <div className="grid gap-5">
      {/* Header: score + breakdown */}
      <div className="rounded-[28px] border border-cyan-300/18 bg-[linear-gradient(135deg,rgba(6,182,212,.07),rgba(124,58,237,.05))] p-5 md:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-cyan-300/22 bg-cyan-300/[0.09] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-cyan-100">
              {mode === "ai" ? "AI analysis" : "Title analysis"}
            </span>
            {mode === "rules" && (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/38">
                Heuristic scoring
              </span>
            )}
          </div>
          <span className="text-xs text-white/35">{result.charCount} characters</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
          {/* Score */}
          <div className="flex flex-col items-center gap-2">
            <div className={`text-7xl font-black leading-none tracking-tight ${result.titleScore >= 70 ? "text-cyan-300" : result.titleScore >= 50 ? "text-yellow-300" : "text-red-400"}`}>
              {result.titleScore}
            </div>
            <span className="text-white/38">/100</span>
            <p className="text-base font-black text-white">{titleLabel(result.titleScore)}</p>
          </div>

          {/* Bars */}
          <div className="space-y-4">
            <ScoreBar label="Clarity" value={result.clarityScore} />
            <ScoreBar label="Curiosity gap" value={result.curiosityScore} />
            <ScoreBar label="CTR potential" value={result.ctrPotential} />
            <ScoreBar label="Length score" value={result.lengthScore} />
            <ScoreBar label="Keyword placement" value={result.keywordPlacement} />
          </div>
        </div>
      </div>

      {/* Pattern + weakness */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-black/24 p-5">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-white/35">Pattern</p>
          <p className="font-black text-white">{result.pattern}</p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-black/24 p-5">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-white/35">Main weakness</p>
          <p className="text-sm leading-6 text-white/65">{result.weakness}</p>
        </div>
      </div>

      {/* Improved title */}
      <div className="rounded-[28px] border border-white/10 bg-black/22 p-5 md:p-7">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Improved title</p>
        <div className="rounded-[22px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
          <p className="leading-7 text-white/85">&ldquo;{result.improvedTitle}&rdquo;</p>
          <CopyButton text={result.improvedTitle} />
        </div>

        {result.alternatives.length > 0 && (
          <>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-white/35">
              Alternative angles
            </p>
            <StaggerContainer className="mt-3 grid gap-3">
              {result.alternatives.map((alt) => (
                <StaggerItem key={alt}>
                  <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4 leading-7 text-white/72">
                    <p>&ldquo;{alt}&rdquo;</p>
                    <CopyButton text={alt} />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </>
        )}
      </div>

      {/* Rationale */}
      <div className="rounded-[24px] border border-white/10 bg-black/22 p-5">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/35">
          Why this score?
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {result.rationale.map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/60"
            >
              <span className="mt-0.5 shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300/22 bg-emerald-300/[0.09] text-xs text-emerald-300">✓</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Length guide */}
      <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-white/35">
          YouTube title length guide
        </p>
        <div className="grid gap-2 sm:grid-cols-4 text-xs">
          {[
            ["< 25 chars", "Too short — misses keyword opportunity"],
            ["25–40 chars", "Short — works for branded searches"],
            ["40–70 chars", "Optimal — full display in search results"],
            ["> 70 chars", "May truncate in search — viewer misses the end"],
          ].map(([range, note]) => (
            <div
              key={range as string}
              className={`rounded-xl border p-3 ${range === "40–70 chars" ? "border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-200" : "border-white/10 bg-black/22 text-white/45"}`}
            >
              <p className="font-black">{range}</p>
              <p className="mt-1 leading-4 opacity-80">{note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Continue workflow */}
      <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-5 md:p-7">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Continue the workflow</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["/hook-analyzer",          "Analyze the hook",      "Score the opening line — the first sentence of the video."],
            ["/thumbnail-text-checker", "Check thumbnail text",  "Make sure the visual promise matches the title."],
            ["/youtube-video-analyzer", "Analyze a YouTube URL", "Fetch real video data and score the full package."],
            ["/hook-improver",          "Improve the hook",      "Turn the title concept into strong opening-line variations."],
          ].map(([href, label, desc]) => (
            <a
              key={href as string}
              href={href as string}
              className="rounded-[22px] border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/28 hover:bg-cyan-300/[0.05]"
            >
              <p className="font-black text-white">{label}</p>
              <p className="mt-1.5 text-xs leading-5 text-white/45">{desc}</p>
              <p className="mt-3 text-xs font-black text-cyan-200">Open →</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
const ERROR_MESSAGES: Record<string, string> = {
  missing_title: "Enter a YouTube title with at least 5 characters.",
  rate_limited:  "Rate limit reached. Try again in an hour.",
};

export default function YouTubeTitleAnalyzerPage() {
  const [title, setTitle]   = useState("");
  const [niche, setNiche]   = useState("");
  const [result, setResult] = useState<TitleAnalysis | null>(null);
  const [mode, setMode]     = useState<"ai" | "rules">("rules");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const charCount = title.length;

  async function handleAnalyze() {
    if (title.trim().length < 5) {
      setError("Enter a title with at least 5 characters.");
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/youtube/title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), niche: niche.trim() || undefined }),
      });
      const data = await res.json() as TitleResponse;

      if (!res.ok || data.error) {
        const key = data.error ?? "analysis_failed";
        setError(data.message || ERROR_MESSAGES[key] || "Analysis failed. Try again.");
        return;
      }

      setResult(data.analysis);
      setMode(data.mode);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PremiumToolShell
      badge="Title intelligence"
      title="YouTube Title Analyzer"
      description="Score your title for CTR potential, clarity, curiosity gap, keyword placement and optimal length. Get AI-powered improvements before your video goes live."
      primaryHref="/hook-analyzer"
      primaryLabel="Analyze Hook"
      secondaryHref="/tools"
      secondaryLabel="All Tools"
    >
      <div className="grid gap-5 xl:grid-cols-[0.88fr_1.12fr]">
        {/* Input panel */}
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
          <div className="mb-5 rounded-[22px] border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Title scorer</p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Unlike the Hook Analyzer (which scores your opening line), this tool
              focuses on the title shown in YouTube search — CTR potential, keyword
              placement and length.
            </p>
          </div>

          <label htmlFor="title-input" className="mb-2 block text-sm font-semibold text-white/60">
            YouTube title
          </label>
          <input
            id="title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !loading) handleAnalyze(); }}
            placeholder="e.g. I tested 50 hooks and only one type doubled my retention"
            className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3.5 text-base text-white outline-none placeholder:text-white/22 focus:border-cyan-300/40"
            disabled={loading}
            maxLength={200}
            autoComplete="off"
          />

          <div className="mt-2">
            <CharBar chars={charCount} />
          </div>

          <label htmlFor="niche-input" className="mt-5 mb-2 block text-sm font-semibold text-white/45">
            Niche <span className="text-white/25 font-normal">(optional — improves suggestions)</span>
          </label>
          <input
            id="niche-input"
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. fitness, SaaS, personal finance..."
            className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3 text-sm text-white outline-none placeholder:text-white/22 focus:border-cyan-300/40"
            disabled={loading}
            maxLength={80}
          />

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading || title.trim().length < 5}
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.20)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-55"
          >
            {loading ? "Analyzing title…" : "Analyze Title"}
          </button>

          {error && (
            <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/[0.08] p-3 text-sm text-red-200">
              {error}
            </p>
          )}

          <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.025] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/35">
              Title vs hook — the difference
            </p>
            <p className="mt-2 text-xs leading-5 text-white/45">
              The <strong className="text-white/60">hook</strong> is the first spoken or written line of the video.
              The <strong className="text-white/60">title</strong> drives the click before anyone watches.
              This tool scores the title. Use the Hook Analyzer for the opening line.
            </p>
          </div>
        </div>

        {/* Output panel */}
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {loading && (
            <div>
              <p className="text-sm text-cyan-300">Scoring title…</p>
              <div className="mt-6 space-y-3">
                <div className="h-24 animate-pulse rounded-2xl bg-white/[0.06]" />
                <div className="h-4 w-full animate-pulse rounded-full bg-white/[0.06]" />
                <div className="h-4 w-4/5 animate-pulse rounded-full bg-white/[0.06]" />
                <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/[0.06]" />
              </div>
            </div>
          )}
          {!loading && result && <ResultPanel result={result} mode={mode} />}
          {!loading && !result && <EmptyState />}
        </div>
      </div>

      <div className="mt-8">
        <RelatedTools primary="hook-analyzer" secondary="hook-improver" context="A strong title needs a matching hook. Score your opening line before publishing." />
      </div>
    </PremiumToolShell>
  );
}
