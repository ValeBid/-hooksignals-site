"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import PremiumToolShell from "../components/premium-tool-shell";
import RelatedTools from "../components/related-tools";
import ScoreMethodology from "../components/score-methodology";
import HookAnalysisResult from "../components/hook-analysis-result";
import { trackEvent } from "../lib/analytics";


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

const benchmarks = [
  { score: "92", label: "Elite", hook: "I tested 37 YouTube hooks and one doubled retention in 48 hours", note: "Specific test, measurable payoff, clear curiosity gap." },
  { score: "78", label: "Strong", hook: "I uploaded 100 shorts in 30 days and only one changed everything", note: "Strong scale and curiosity, payoff can be sharper." },
  { score: "12", label: "Weak", hook: "This changed everything", note: "Too vague without subject, audience or result." },
];

const faqs = [
  { q: "What is a good hook score?", a: "A strong hook usually lands above 70. Elite hooks tend to combine a specific audience, clear tension, measurable payoff and a reason to keep watching." },
  { q: "How does HookSignals score hooks?", a: "The analyzer weighs clarity, curiosity gap, retention risk, platform pacing, niche context and audience trigger. The result is a directional publishing signal, not a guaranteed reach prediction." },
  { q: "Does niche affect hook performance?", a: "Yes. A hook that works for creator growth may fail in fitness or finance. Adding a niche makes the weakness, title pairing and thumbnail angle more specific." },
  { q: "Why do viewers leave in the first seconds?", a: "Most early exits happen when the opening line is vague, slow, generic, or disconnected from the title and thumbnail promise." },
  { q: "How many credits does hook analysis use?", a: "A premium hook analysis uses 5 credits and saves the result to your workspace." },
];


function getInsightNotice(mode: "ai" | "rules" | null, diagnostic: string | null, creditsRemaining: number | null) {
  if (mode === "rules" && diagnostic === "low_quality_input") return "Quick check: this input is too vague to analyze deeply. Add a clear subject, result or tension for a stronger read.";
  if (mode === "rules") return "Quick check completed. Add a clearer promise or result to unlock a sharper analysis.";
  if (mode === "ai") return creditsRemaining === null ? "Analysis saved. Your hook was checked for clarity, curiosity and retention pull." : `Analysis saved. ${creditsRemaining} credits remaining.`;
  return "1 analysis uses 5 credits. Your hook stays private and results are saved to your workspace.";
}

function TrustStrip() {
  return <section className="mb-5 rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,.10),rgba(124,58,237,.08),rgba(251,191,36,.06))] p-4 shadow-[0_24px_80px_rgba(0,0,0,.34)] backdrop-blur-xl md:p-5"><div className="grid gap-3 md:grid-cols-3">{[["Private & secure", "Your hook and results stay in your workspace.", "▱"], ["5 credits per analysis", "Clear usage, no hidden runs or noisy limits.", "⚡"], ["Results in seconds", "Score, weakness and next-step ideas instantly.", "◴"]].map(([title, text, icon]) => <div key={title} className="rounded-[22px] border border-cyan-300/15 bg-black/22 p-4"><div className="flex items-center gap-3"><span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">{icon}</span><div><p className="text-sm font-black text-white">{title}</p><p className="mt-1 text-xs leading-5 text-white/48">{text}</p></div></div></div>)}</div></section>;
}

function LeftInsightRail({ hasResult }: { hasResult: boolean }) {
  return <aside className="grid gap-4"><div className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.055] p-5"><p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Publishing workflow</p><h3 className="mt-3 text-2xl font-black">Hook → title → thumbnail → script.</h3><p className="mt-3 text-sm leading-6 text-white/55">A strong first line only works when the title and thumbnail repeat the same promise.</p><div className="mt-5 grid gap-2">{["Analyze the first line", "Pair the title promise", "Match the thumbnail angle", "Open the script with proof"].map((item, i) => <p key={item} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/62"><span className="mr-2 text-cyan-300">0{i + 1}</span>{item}</p>)}</div></div><div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5"><p className="text-xs font-black uppercase tracking-[0.14em] text-white/38">Trust signal</p><h3 className="mt-3 text-xl font-black">Built for pre-publish decisions.</h3><p className="mt-3 text-sm leading-6 text-white/52">Use the score to decide whether a hook is ready, needs a sharper payoff, or should be rewritten before posting.</p></div>{hasResult && <div className="rounded-[28px] border border-violet-300/20 bg-violet-300/[0.055] p-5"><p className="text-xs font-black uppercase tracking-[0.14em] text-violet-200">Next step</p><h3 className="mt-3 text-xl font-black">Package the winning angle.</h3><p className="mt-3 text-sm leading-6 text-white/52">After the score, continue into title pairings and thumbnail angles so the entire idea sells the same promise.</p></div>}</aside>;
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
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefill = params.get("hook");
    if (prefill) setHook(prefill.slice(0, 500));
  }, []);

  const characterCount = hook.trim().length;
  const insightNotice = getInsightNotice(mode, diagnostic, creditsRemaining);

  async function handleAnalyze() {
    const trimmedHook = hook.trim();
    if (trimmedHook.length < 8) { setError("Enter a hook with at least 8 characters."); setResult(null); return; }
    setLoading(true); setError(""); setResult(null); setMode(null); setDiagnostic(null); setCreditsRemaining(null);
    trackEvent({ name: "hook_analyze", props: { platform, has_niche: Boolean(niche) } });
    try {
      const response = await fetch("/api/ai/analyze-hook", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ hook: trimmedHook, platform, niche, audience }) });
      const data = (await response.json()) as AnalyzerResponse;
      if (!response.ok || !data.analysis) {
        const rawError = data.error || "analysis_failed";
        const baseMessage = ERROR_MESSAGES[rawError] || rawError;
        if (rawError === "insufficient_credits" || rawError === "upgrade_required") {
          trackEvent({ name: "upgrade_prompt", props: { reason: rawError, tool: "hook-analyzer" } });
        }
        throw new Error(baseMessage);
      }
      setResult(data.analysis); setMode(data.mode || "ai"); setDiagnostic(data.generationError ? "saved_with_warning" : data.diagnostic || null); setCreditsRemaining(typeof data.creditsRemaining === "number" ? data.creditsRemaining : null);
    } catch (err) { setError(err instanceof Error ? err.message : "Hook analysis failed. Try again."); } finally { setLoading(false); }
  }

  return <PremiumToolShell badge="Hook analyzer" title="Score your hook before it costs you views." description="Paste your opening line. Find out before you publish whether it will hold attention — or lose viewers in the first three seconds." primaryHref="/pricing" primaryLabel="View Plans" secondaryHref="/tools" secondaryLabel="All Tools"><TrustStrip /><div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]"><div className="grid gap-5"><div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7"><div className="mb-5 grid gap-3 sm:grid-cols-3">{["Clarity", "Curiosity", "Retention"].map((item) => <div key={item} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] p-4"><p className="text-xs uppercase tracking-[0.16em] text-cyan-300">Signal</p><p className="mt-2 font-black text-white">{item}</p></div>)}</div><label htmlFor="hook-input" className="mb-3 block text-sm font-semibold text-white/62">Paste your hook</label><textarea id="hook-input" value={hook} onChange={(e) => setHook(e.target.value)} placeholder="Example: I uploaded 100 shorts in 30 days and only one changed everything." className="min-h-[180px] w-full resize-none rounded-[22px] border border-white/10 bg-[#050914] p-5 text-base leading-7 text-white outline-none transition placeholder:text-white/24 focus:border-cyan-300/40" /><div className="mt-3 flex items-center justify-between text-xs text-white/35"><span>{characterCount}/500 characters</span><span>{creditsRemaining === null ? (isLoaded && !isSignedIn ? "3 free analyses on sign up" : "1 analysis = 5 credits") : `${creditsRemaining} credits left`}</span></div><div className="mt-5 grid gap-3 md:grid-cols-3"><div><label htmlFor="platform-select" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/35">Platform</label><select id="platform-select" value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/40"><option>YouTube Shorts</option><option>TikTok</option><option>Instagram Reels</option><option>YouTube Long-form</option></select><p className="mt-2 text-[11px] leading-5 text-white/32">Changes pacing, hook length and packaging advice.</p></div><div><label htmlFor="niche-input" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/35">Niche <span className="normal-case tracking-normal text-white/25">(optional)</span></label><input id="niche-input" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Creator growth, fitness, AI..." className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3 text-sm text-white outline-none placeholder:text-white/24 focus:border-cyan-300/40" /><p className="mt-2 text-[11px] leading-5 text-white/32">Makes titles, weaknesses and thumbnail angles specific.</p></div><div><label htmlFor="audience-input" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/35">Audience <span className="normal-case tracking-normal text-white/25">(optional)</span></label><input id="audience-input" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="New creators, founders..." className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3 text-sm text-white outline-none placeholder:text-white/24 focus:border-cyan-300/40" /><p className="mt-2 text-[11px] leading-5 text-white/32">Improves viewer trigger and retention diagnosis.</p></div></div><div className="mt-4 grid gap-2 md:grid-cols-3">{contextTips.map((tip) => <div key={tip.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-3"><p className="text-xs font-black text-white/60">{tip.title}</p><p className="mt-1 text-[11px] leading-5 text-white/36">{tip.text}</p></div>)}</div>{error && (
  <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/[0.08] p-4">
    <p className="text-sm text-red-200">{error}</p>
    {(error.includes("credits") || error.includes("Upgrade") || error.includes("plan")) && (
      <a href="/pricing" className="mt-3 inline-flex rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-5 py-2.5 text-sm font-black text-black transition hover:scale-[1.01]">
        View plans →
      </a>
    )}
    {error.includes("Sign in") && (
      <a href="/sign-in" className="mt-3 inline-flex rounded-2xl bg-white px-5 py-2.5 text-sm font-black text-black transition hover:scale-[1.01]">
        Sign in →
      </a>
    )}
  </div>
)}{isLoaded && !isSignedIn ? (<div className="mt-5 rounded-[22px] border border-cyan-300/22 bg-cyan-300/[0.06] p-5"><p className="font-black text-white">Sign up free to analyze your hook</p><p className="mt-1 text-sm text-white/55">Free account · 3 analyses included · No card required</p><div className="mt-4 flex flex-col gap-2 sm:flex-row"><a href={`/sign-up?redirect_url=${encodeURIComponent('/hook-analyzer' + (hook.trim() ? `?hook=${encodeURIComponent(hook.trim())}` : ''))}`} className="flex-1 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 py-3.5 text-center text-sm font-black text-black transition hover:scale-[1.01]">Create free account →</a><a href={`/sign-in?redirect_url=${encodeURIComponent('/hook-analyzer' + (hook.trim() ? `?hook=${encodeURIComponent(hook.trim())}` : ''))}`} className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 text-center text-sm font-black text-white/70 transition hover:bg-white/[0.07]">Sign in</a></div></div>) : (<button type="button" onClick={handleAnalyze} disabled={loading || !isLoaded} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Analyzing hook signal..." : "Analyze Hook"}</button>)}<div className="mt-5 rounded-[22px] border border-amber-300/20 bg-[linear-gradient(135deg,rgba(251,191,36,.11),rgba(34,211,238,.04))] p-4 text-sm leading-6 text-amber-50/85 shadow-[0_18px_46px_rgba(0,0,0,.18)]"><div className="flex gap-3"><span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-200/20 bg-amber-300/12 text-xs text-amber-100">✦</span><div><p className="font-black text-white">{mode === "ai" ? "Analysis saved" : mode === "rules" ? "Quick check" : "Private, credit-based analysis"}</p><p className="mt-1 text-white/58">{insightNotice}</p></div></div></div></div><LeftInsightRail hasResult={Boolean(result)} /></div><div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">{!loading && !result && <div className="min-h-[460px] rounded-[24px] border border-white/10 bg-black/20 p-6"><p className="text-sm text-cyan-300">Result preview</p><h2 className="mt-4 max-w-md text-3xl font-black tracking-tight">Your hook score will appear here.</h2><p className="mt-4 max-w-lg leading-7 text-white/50">HookSignals checks the opening promise, curiosity gap, audience fit and retention risk before publishing.</p></div>}{loading && <div className="min-h-[460px] rounded-[24px] border border-white/10 bg-black/20 p-6"><p className="text-sm text-cyan-300">Analyzing signal...</p><div className="mt-7 space-y-4"><div className="h-24 animate-pulse rounded-3xl bg-white/10" /><div className="h-3 w-full animate-pulse rounded-full bg-white/10" /><div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" /></div></div>}{result && <HookAnalysisResult result={result} mode={mode} />}</div></div><section className="mt-6 rounded-[34px] border border-white/10 bg-black/24 p-6 md:p-8"><p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Hook score benchmarks</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">See what strong, average and weak hooks look like.</h2><div className="mt-6 grid gap-4 lg:grid-cols-3">{benchmarks.map((b) => <div key={b.hook} className="rounded-[26px] border border-white/10 bg-black/24 p-5"><div className="flex items-end gap-2"><p className="text-5xl font-black text-cyan-300">{b.score}</p><p className="mb-2 text-white/38">/100</p></div><p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white/42">{b.label}</p><p className="mt-4 text-sm leading-6 text-white/76">“{b.hook}”</p><p className="mt-4 text-sm leading-6 text-white/45">{b.note}</p></div>)}</div></section><section className="mt-6 rounded-[34px] border border-white/10 bg-black/24 p-6 md:p-8"><p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">FAQ</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Hook analyzer questions</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{faqs.map((item) => <div key={item.q} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5"><h3 className="text-lg font-black text-white">{item.q}</h3><p className="mt-3 text-sm leading-6 text-white/52">{item.a}</p></div>)}</div></section><ScoreMethodology /><RelatedTools primary="hook-improver" secondary="youtube-video-analyzer" context="You scored your hook. Now rewrite it or test it against a real video." /></PremiumToolShell>;
}
