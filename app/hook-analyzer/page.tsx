"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import RelatedTools from "../components/related-tools";
import CopyButton from "../components/copy-button";

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
};

type AnalyzerResponse = {
  analysis: HookAnalysis;
  mode?: "ai" | "rules";
  diagnostic?: string;
};

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
        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function splitReasoning(result: HookAnalysis) {
  const upside = [];
  const downside = [];

  if (result.clarityScore >= 70) upside.push("Viewers can understand the core promise quickly.");
  else downside.push("The opening does not explain the payoff clearly enough.");

  if (result.curiosityScore >= 70) upside.push("There is enough curiosity to make the next sentence matter.");
  else downside.push("The curiosity gap is not strong enough to stop a fast scroll.");

  if (result.retentionRisk <= 45) upside.push("Retention risk is controlled because the hook has a clear reason to continue.");
  else downside.push("The viewer may leave because the hook does not reveal a strong consequence fast enough.");

  return { upside, downside };
}

export default function HookAnalyzerPage() {
  const [hook, setHook] = useState("");
  const [result, setResult] = useState<null | HookAnalysis>(null);
  const [mode, setMode] = useState<"ai" | "rules" | null>(null);
  const [diagnostic, setDiagnostic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const characterCount = hook.trim().length;

  const riskLevel = useMemo(() => {
    if (!result) return "Waiting for input";
    if (result.retentionRisk <= 35) return "Low retention risk";
    if (result.retentionRisk <= 65) return "Medium retention risk";
    return "High retention risk";
  }, [result]);

  const reasoning = result ? splitReasoning(result) : null;

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

    try {
      const response = await fetch("/api/analyze-hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hook: trimmedHook }),
      });

      const data = (await response.json()) as AnalyzerResponse | { error?: string };

      if (!response.ok || !("analysis" in data) || !data.analysis) {
        throw new Error("error" in data ? data.error || "Hook analysis failed." : "Hook analysis failed.");
      }

      setResult(data.analysis);
      setMode(data.mode || "ai");
      setDiagnostic(data.diagnostic || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hook analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return <PremiumToolShell badge="Creator signal engine" title="Hook Analyzer" description="Score your first line for clarity, curiosity and retention pull before you publish. Built for Shorts, TikTok and short-form creator workflows." primaryHref="/hook-improver" primaryLabel="Improve Hook" secondaryHref="/tools" secondaryLabel="All Tools">
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]"><div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7"><div className="mb-5 grid gap-3 sm:grid-cols-3">{["Clarity", "Curiosity", "Retention"].map((item) => <div key={item} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] p-4"><p className="text-xs uppercase tracking-[0.16em] text-cyan-300">Signal</p><p className="mt-2 font-black text-white">{item}</p></div>)}</div><label className="mb-3 block text-sm font-semibold text-white/62">Paste your hook</label><textarea value={hook} onChange={(e) => setHook(e.target.value)} placeholder="Example: I uploaded 100 shorts in 30 days and only one changed everything." className="min-h-[210px] w-full resize-none rounded-[22px] border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none transition placeholder:text-white/24 focus:border-cyan-300/40" /><div className="mt-3 flex items-center justify-between text-xs text-white/35"><span>{characterCount}/500 characters</span><span>{mode === "rules" ? "Rules preview" : "AI scoring preview"}</span></div>{error && <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}<button onClick={handleAnalyze} disabled={loading} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Analyzing hook signal..." : "Analyze Hook"}</button>{mode === "rules" && <p className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-6 text-amber-100">Running in rules preview mode{diagnostic ? `: ${diagnostic}` : ""}. Add a working OpenAI environment key for full AI scoring.</p>}</div><div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">{!loading && !result && <div className="min-h-[460px] rounded-[24px] border border-white/10 bg-black/20 p-6"><p className="text-sm text-cyan-300">Result preview</p><h2 className="mt-4 max-w-md text-3xl font-black tracking-tight">Your hook score will appear here.</h2><p className="mt-4 max-w-lg leading-7 text-white/50">HookSignals checks opening promise, curiosity gap and retention risk, then suggests stronger versions.</p></div>}{loading && <div className="min-h-[460px] rounded-[24px] border border-white/10 bg-black/20 p-6"><p className="text-sm text-cyan-300">Analyzing signal...</p><div className="mt-7 space-y-4"><div className="h-24 animate-pulse rounded-3xl bg-white/10" /><div className="h-3 w-full animate-pulse rounded-full bg-white/10" /><div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" /></div></div>}{result && <div className="grid gap-4"><div className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 md:p-6"><div className="flex items-center justify-between gap-4"><div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/50">{mode === "ai" ? "AI analysis" : "Rules preview"}</div><div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/45">First 3 seconds</div></div><div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-end gap-3"><h2 className="text-7xl font-black tracking-tight text-cyan-300">{result.hookScore}</h2><span className="mb-3 text-white/42">/100</span></div><p className="mt-3 text-2xl font-black tracking-tight">{scoreLabel(result.hookScore)}</p></div><div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/55"><p className="text-white/35">Retention risk</p><p className="mt-1 font-bold text-white">{riskLevel}</p></div></div></div><div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]"><div className="rounded-[24px] border border-white/10 bg-black/20 p-5"><p className="mb-4 text-sm font-semibold text-white/55">Signal breakdown</p><div className="space-y-5"><ScoreBar label="Clarity" value={result.clarityScore} /><ScoreBar label="Curiosity gap" value={result.curiosityScore} /><ScoreBar label="Retention strength" value={100 - result.retentionRisk} /></div></div><div className="rounded-[24px] border border-white/10 bg-black/20 p-5"><p className="mb-4 text-sm font-semibold text-white/55">Detected pattern</p><p className="leading-7 text-white/78">{result.pattern}</p><p className="mt-4 text-sm leading-7 text-white/50">{result.weakness}</p></div></div>{reasoning && <div className="grid gap-4 md:grid-cols-2"><div className="rounded-[24px] border border-emerald-300/15 bg-emerald-300/[0.045] p-5"><p className="mb-3 text-sm font-semibold text-emerald-200">What works</p><div className="space-y-3">{reasoning.upside.map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-white/62">{item}</p>)}</div></div><div className="rounded-[24px] border border-red-300/15 bg-red-300/[0.045] p-5"><p className="mb-3 text-sm font-semibold text-red-100">Why viewers may leave</p><div className="space-y-3">{reasoning.downside.map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-white/62">{item}</p>)}</div></div></div>}<div className="rounded-[24px] border border-white/10 bg-black/20 p-5"><p className="mb-4 text-sm font-semibold text-white/55">Retention notes</p><div className="grid gap-3">{result.retentionNotes.map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 leading-7 text-white/62"><span className="mr-2 font-bold text-violet-300">0{index + 1}</span>{item}</div>)}</div></div><div className="rounded-[24px] border border-cyan-300/20 bg-black/30 p-5"><p className="text-sm font-semibold text-cyan-300">Paid workflow unlock</p><h3 className="mt-2 text-2xl font-black tracking-tight">Get deeper scoring, niche-specific rewrites and more hook variants.</h3><p className="mt-3 leading-7 text-white/52">Free gives the diagnosis. Paid plans should unlock audience angle, niche adaptation, more variants, title pairing and script handoff.</p><Link href="/pricing" className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 font-black text-black transition hover:bg-white/90">See plans</Link></div></div>}</div></div>
    {result && <section className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-5 md:p-7"><div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-cyan-300">Improved hook ideas</p><h2 className="mt-2 text-3xl font-black tracking-tight">Sharper versions to test</h2></div><Link href="/pricing" className="rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.08] px-5 py-3 text-sm font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]">Unlock premium analysis</Link></div><div className="grid gap-4 md:grid-cols-2"><div className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 leading-7 text-white/80"><p>“{result.improvedHook}”</p><CopyButton text={result.improvedHook} /></div>{result.variants.map((item) => <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 leading-7 text-white/75"><p>“{item}”</p><CopyButton text={item} /></div>)}</div></section>}
    <section className="mt-6 grid gap-4 md:grid-cols-3"><div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Free</p><h3 className="mt-3 text-xl font-black">Fast diagnosis</h3><p className="mt-2 text-sm leading-6 text-white/50">Score, weakness, one improved hook and three variants.</p></div><div className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Pro</p><h3 className="mt-3 text-xl font-black">Creator workflow</h3><p className="mt-2 text-sm leading-6 text-white/55">More variants, niche angles, title pairing, script handoff and saved history.</p></div><div className="rounded-[24px] border border-violet-300/20 bg-violet-300/[0.05] p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-200">Elite</p><h3 className="mt-3 text-xl font-black">Team system</h3><p className="mt-2 text-sm leading-6 text-white/55">Team dashboards, batch analysis, campaigns and priority support.</p></div></section>
    <RelatedTools />
  </PremiumToolShell>;
}
