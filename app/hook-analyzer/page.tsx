"use client";

import { useState } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import RelatedTools from "../components/related-tools";
import HookAnalysisResult from "../components/hook-analysis-result";

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

type AnalyzerResponse = {
  success?: boolean;
  analysis?: HookAnalysis;
  mode?: "ai" | "rules";
  diagnostic?: string;
  creditsSpent?: number;
  creditsRemaining?: number;
  shareId?: string | null;
  error?: string;
  detail?: string;
  generationError?: string | null;
};

const ERROR_MESSAGES: Record<string, string> = {
  unauthorized: "Sign in to run a saved hook analysis.",
  insufficient_credits: "You need more credits to run this analysis.",
  upgrade_required: "Upgrade your plan to continue analyzing hooks.",
  missing_hook: "Enter a hook with at least 8 characters.",
  credits_read_failed: "We could not load your credits. Refresh and try again.",
  credits_update_failed: "We could not update your credits. Refresh and try again.",
  analysis_failed: "Analysis failed. Try again in a moment.",
};

const contextTips = [
  { title: "Platform pacing", text: "Shorts, TikTok, Reels and long-form hooks are scored with different pacing expectations." },
  { title: "Niche context", text: "Add a niche to make the weakness, title and thumbnail suggestions more specific." },
  { title: "Audience trigger", text: "Add the viewer type so the analysis targets the right motivation." },
];

function getInsightNotice(mode: "ai" | "rules" | null, diagnostic: string | null, creditsRemaining: number | null) {
  if (mode === "rules" && diagnostic === "low_quality_input") {
    return "Quick check: this input is too vague to analyze deeply. Add a clear subject, result or tension for a stronger read.";
  }

  if (mode === "rules") {
    return "Quick check completed. Add a clearer promise or result to unlock a sharper analysis.";
  }

  if (mode === "ai") {
    return creditsRemaining === null
      ? "Analysis saved. Your hook was checked for clarity, curiosity and retention pull."
      : `Analysis saved. ${creditsRemaining} credits remaining.`;
  }

  return "1 analysis uses 5 credits. Your hook stays private and results are saved to your workspace.";
}

function TrustStrip() {
  return (
    <section className="mb-5 rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,.10),rgba(124,58,237,.08),rgba(251,191,36,.06))] p-4 shadow-[0_24px_80px_rgba(0,0,0,.34)] backdrop-blur-xl md:p-5">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="group rounded-[22px] border border-emerald-300/15 bg-black/22 p-4 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.045]">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">▱</span>
            <div>
              <p className="text-sm font-black text-white">Private & secure</p>
              <p className="mt-1 text-xs leading-5 text-white/48">Your hook and results stay in your workspace.</p>
            </div>
          </div>
        </div>
        <div className="group rounded-[22px] border border-amber-300/15 bg-black/22 p-4 transition hover:border-amber-300/30 hover:bg-amber-300/[0.045]">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-200">⚡</span>
            <div>
              <p className="text-sm font-black text-white">5 credits per analysis</p>
              <p className="mt-1 text-xs leading-5 text-white/48">Clear usage, no hidden runs or noisy limits.</p>
            </div>
          </div>
        </div>
        <div className="group rounded-[22px] border border-violet-300/15 bg-black/22 p-4 transition hover:border-violet-300/30 hover:bg-violet-300/[0.045]">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/10 text-violet-200">◴</span>
            <div>
              <p className="text-sm font-black text-white">Results in seconds</p>
              <p className="mt-1 text-xs leading-5 text-white/48">Score, weakness and next-step ideas instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HookAnalyzerPage() {
  const [hook, setHook] = useState("");
  const [platform, setPlatform] = useState("YouTube Shorts");
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [result, setResult] = useState<null | HookAnalysis>(null);
  const [mode, setMode] = useState<"ai" | "rules" | null>(null);
  const [diagnostic, setDiagnostic] = useState<string | null>(null);
  const [creditsRemaining, setCreditsRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const characterCount = hook.trim().length;
  const insightNotice = getInsightNotice(mode, diagnostic, creditsRemaining);

  async function handleAnalyze() {
    const trimmedHook = hook.trim();

    if (trimmedHook.length < 8) {
      setError("Enter a hook with at least 8 characters.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setMode(null);
    setDiagnostic(null);
    setCreditsRemaining(null);

    try {
      const response = await fetch("/api/ai/analyze-hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hook: trimmedHook, platform, niche, audience }),
      });

      const data = (await response.json()) as AnalyzerResponse;

      if (!response.ok || !data.analysis) {
        const rawError = data.error || "analysis_failed";
        const baseMessage = ERROR_MESSAGES[rawError] || rawError;
        throw new Error(data.detail ? `${baseMessage}` : baseMessage);
      }

      setResult(data.analysis);
      setMode(data.mode || "ai");
      setDiagnostic(data.generationError ? "saved_with_warning" : data.diagnostic || null);
      setCreditsRemaining(typeof data.creditsRemaining === "number" ? data.creditsRemaining : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hook analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PremiumToolShell
      badge="Creator signal engine"
      title="Hook Analyzer"
      description="Get an instant read on your hook's clarity, curiosity and retention pull before you publish."
      primaryHref="/hook-improver"
      primaryLabel="Improve Hook"
      secondaryHref="/tools"
      secondaryLabel="All Tools"
    >
      <TrustStrip />

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            {["Clarity", "Curiosity", "Retention"].map((item) => (
              <div key={item} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">Signal</p>
                <p className="mt-2 font-black text-white">{item}</p>
              </div>
            ))}
          </div>

          <label className="mb-3 block text-sm font-semibold text-white/62">Paste your hook</label>
          <textarea
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            placeholder="Example: I uploaded 100 shorts in 30 days and only one changed everything."
            className="min-h-[180px] w-full resize-none rounded-[22px] border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none transition placeholder:text-white/24 focus:border-cyan-300/40"
          />

          <div className="mt-3 flex items-center justify-between text-xs text-white/35">
            <span>{characterCount}/500 characters</span>
            <span>{creditsRemaining === null ? "1 analysis = 5 credits" : `${creditsRemaining} credits left`}</span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/35">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"
              >
                <option>YouTube Shorts</option>
                <option>TikTok</option>
                <option>Instagram Reels</option>
                <option>YouTube Long-form</option>
              </select>
              <p className="mt-2 text-[11px] leading-5 text-white/32">Changes pacing, hook length and packaging advice.</p>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/35">Niche <span className="normal-case tracking-normal text-white/25">(optional)</span></label>
              <input
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Creator growth, fitness, AI..."
                className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3 text-sm text-white outline-none placeholder:text-white/24 focus:border-cyan-300/40"
              />
              <p className="mt-2 text-[11px] leading-5 text-white/32">Makes titles, weaknesses and thumbnail angles specific.</p>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/35">Audience <span className="normal-case tracking-normal text-white/25">(optional)</span></label>
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="New creators, founders..."
                className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3 text-sm text-white outline-none placeholder:text-white/24 focus:border-cyan-300/40"
              />
              <p className="mt-2 text-[11px] leading-5 text-white/32">Improves viewer trigger and retention diagnosis.</p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-3">
            {contextTips.map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-3">
                <p className="text-xs font-black text-white/60">{tip.title}</p>
                <p className="mt-1 text-[11px] leading-5 text-white/35">{tip.text}</p>
              </div>
            ))}
          </div>

          {error && <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-sm leading-6 text-red-200">{error}</p>}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Analyzing hook signal..." : "Analyze Hook"}
          </button>

          <div className="mt-5 rounded-[22px] border border-amber-300/20 bg-[linear-gradient(135deg,rgba(251,191,36,.11),rgba(34,211,238,.04))] p-4 text-sm leading-6 text-amber-50/85 shadow-[0_18px_46px_rgba(0,0,0,.18)]">
            <div className="flex gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-200/20 bg-amber-300/12 text-xs text-amber-100">✦</span>
              <div>
                <p className="font-black text-white">{mode === "ai" ? "Analysis saved" : mode === "rules" ? "Quick check" : "Private, credit-based analysis"}</p>
                <p className="mt-1 text-white/58">{insightNotice}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {!loading && !result && (
            <div className="min-h-[460px] rounded-[24px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm text-cyan-300">Result preview</p>
              <h2 className="mt-4 max-w-md text-3xl font-black tracking-tight">Your hook score will appear here.</h2>
              <p className="mt-4 max-w-lg leading-7 text-white/50">
                HookSignals checks the opening promise, curiosity gap, audience fit and retention risk before publishing.
              </p>
            </div>
          )}

          {loading && (
            <div className="min-h-[460px] rounded-[24px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm text-cyan-300">Analyzing signal...</p>
              <div className="mt-7 space-y-4">
                <div className="h-24 animate-pulse rounded-3xl bg-white/10" />
                <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
                <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
              </div>
            </div>
          )}

          {result && <HookAnalysisResult result={result} mode={mode} />}
        </div>
      </div>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Private</p>
          <h3 className="mt-3 text-xl font-black">Secure analysis</h3>
          <p className="mt-2 text-sm leading-6 text-white/50">Your hook and results stay attached to your workspace.</p>
        </div>
        <div className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Credit based</p>
          <h3 className="mt-3 text-xl font-black">5 credits per run</h3>
          <p className="mt-2 text-sm leading-6 text-white/55">Run focused checks without noisy dashboards or fake vanity metrics.</p>
        </div>
        <div className="rounded-[24px] border border-violet-300/20 bg-violet-300/[0.05] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-200">Fast</p>
          <h3 className="mt-3 text-xl font-black">Actionable in seconds</h3>
          <p className="mt-2 text-sm leading-6 text-white/55">Get a score, the weak point, and sharper hook options before publishing.</p>
        </div>
      </section>

      <RelatedTools />
    </PremiumToolShell>
  );
}
