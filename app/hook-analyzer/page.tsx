"use client";

import { useMemo, useState } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import RelatedTools from "../components/related-tools";
import CopyButton from "../components/copy-button";
import CreatorAnalysisCards from "../components/creator-analysis-cards";

type HookAnalysis = {
  score: number;
  clarity: number;
  curiosity: number;
  retention: number;
  grade: string;
  verdict: string;
  feedback: string[];
  improved: string[];
};

function scoreLabel(score: number) {
  if (score >= 85) return "Scroll-stopper";
  if (score >= 72) return "Strong angle";
  if (score >= 58) return "Promising draft";
  return "Needs sharper stakes";
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-white/58">{label}</span>
        <span className="font-semibold text-white/75">{value}/100</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function HookAnalyzerPage() {
  const [hook, setHook] = useState("");
  const [result, setResult] = useState<null | HookAnalysis>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"ai" | "fallback" | "">("");
  const characterCount = hook.trim().length;

  const riskLevel = useMemo(() => {
    if (!result) return "Waiting for input";
    if (result.retention >= 82) return "Low retention risk";
    if (result.retention >= 65) return "Medium retention risk";
    return "High retention risk";
  }, [result]);

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
    setMode("");

    try {
      const response = await fetch("/api/analyze-hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hook: trimmedHook }),
      });
      const data = await response.json();
      if (!response.ok || !data?.analysis) throw new Error(data?.error || "Hook analysis failed.");
      setResult(data.analysis);
      setMode(data.mode === "ai" ? "ai" : "fallback");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hook analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PremiumToolShell badge="Creator signal engine" title="Hook Analyzer" description="Score your first line for clarity, curiosity and retention pull before you publish. Built for Shorts, TikTok and short-form creator workflows." primaryHref="/hook-improver" primaryLabel="Improve Hook" secondaryHref="/tools" secondaryLabel="All Tools">
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
          <textarea value={hook} onChange={(e) => setHook(e.target.value)} placeholder="Example: I spent 30 days copying viral hooks. Here is the one pattern that changed everything." className="min-h-[210px] w-full resize-none rounded-[22px] border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none transition placeholder:text-white/24 focus:border-cyan-300/40" />
          <div className="mt-3 flex items-center justify-between text-xs text-white/35">
            <span>{characterCount}/500 characters</span>
            <span>AI + fallback scoring</span>
          </div>
          {error && <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
          <button onClick={handleAnalyze} disabled={loading} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Analyzing hook signal..." : "Analyze Hook"}
          </button>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {!loading && !result && (
            <div className="min-h-[460px] rounded-[24px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm text-cyan-300">Result preview</p>
              <h2 className="mt-4 max-w-md text-3xl font-black tracking-tight">Your hook score will appear here.</h2>
              <p className="mt-4 max-w-lg leading-7 text-white/50">HookSignals checks opening promise, curiosity gap and retention risk, then suggests stronger versions.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a href="/hook-improver" className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-white/70 transition hover:border-cyan-300/30 hover:text-white">Improve weak hooks →</a>
                <a href="/shorts-script-generator" className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-white/70 transition hover:border-cyan-300/30 hover:text-white">Generate scripts →</a>
              </div>
            </div>
          )}
          {loading && (
            <div className="min-h-[460px] rounded-[24px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm text-cyan-300">Analyzing signal...</p>
              <div className="mt-7 space-y-4"><div className="h-24 animate-pulse rounded-3xl bg-white/10" /><div className="h-3 w-full animate-pulse rounded-full bg-white/10" /><div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" /><div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" /></div>
            </div>
          )}
          {result && (
            <div className="grid gap-4">
              <div className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold text-cyan-300">Overall signal</p>{mode && <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/45">{mode === "ai" ? "AI analysis" : "Beta fallback"}</span>}</div>
                <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-end gap-3"><h2 className="text-7xl font-black tracking-tight text-cyan-300">{result.score}</h2><span className="mb-3 text-white/42">/100 · {result.grade}</span></div><p className="mt-3 text-2xl font-black tracking-tight">{scoreLabel(result.score)}</p></div><div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/55"><p className="text-white/35">Retention risk</p><p className="mt-1 font-bold text-white">{riskLevel}</p></div></div>
              </div>
              <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]"><div className="rounded-[24px] border border-white/10 bg-black/20 p-5"><p className="mb-4 text-sm font-semibold text-white/55">Signal breakdown</p><div className="space-y-5"><ScoreBar label="Clarity" value={result.clarity} /><ScoreBar label="Curiosity gap" value={result.curiosity} /><ScoreBar label="Retention pull" value={result.retention} /></div></div><div className="rounded-[24px] border border-white/10 bg-black/20 p-5"><p className="mb-4 text-sm font-semibold text-white/55">AI reasoning</p><p className="leading-7 text-white/68">{result.verdict}</p></div></div>
              {result.feedback?.length > 0 && <div className="rounded-[24px] border border-white/10 bg-black/20 p-5"><p className="mb-4 text-sm font-semibold text-white/55">What to fix next</p><div className="grid gap-3">{result.feedback.map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 leading-7 text-white/62"><span className="mr-2 font-bold text-violet-300">0{index + 1}</span>{item}</div>)}</div></div>}
            </div>
          )}
        </div>
      </div>

      <CreatorAnalysisCards />

      {result && <section className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-5 md:p-7"><div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-cyan-300">Improved hook ideas</p><h2 className="mt-2 text-3xl font-black tracking-tight">Sharper versions to test</h2></div><a href="/hook-improver" className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black">Open Hook Improver</a></div><div className="grid gap-4 md:grid-cols-3">{result.improved.map((item) => <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 leading-7 text-white/75"><p>“{item}”</p><CopyButton text={item} /></div>)}</div></section>}
      <RelatedTools />
    </PremiumToolShell>
  );
}
