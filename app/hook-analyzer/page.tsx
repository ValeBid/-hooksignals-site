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
  analysis: HookAnalysis;
  mode?: "ai" | "rules";
  diagnostic?: string;
};

export default function HookAnalyzerPage() {
  const [hook, setHook] = useState("");
  const [platform, setPlatform] = useState("YouTube Shorts");
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [result, setResult] = useState<null | HookAnalysis>(null);
  const [mode, setMode] = useState<"ai" | "rules" | null>(null);
  const [diagnostic, setDiagnostic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const characterCount = hook.trim().length;

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
        body: JSON.stringify({ hook: trimmedHook, platform, niche, audience }),
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

  return (
    <PremiumToolShell
      badge="Creator signal engine"
      title="Hook Analyzer"
      description="Score your first line for clarity, curiosity and retention pull before you publish. Built for Shorts, TikTok and short-form creator workflows."
      primaryHref="/hook-improver"
      primaryLabel="Improve Hook"
      secondaryHref="/tools"
      secondaryLabel="All Tools"
    >
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
            <span>{mode === "rules" ? "Rules preview" : "AI scoring preview"}</span>
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
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/35">Niche</label>
              <input
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Fitness, AI, finance..."
                className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3 text-sm text-white outline-none placeholder:text-white/24 focus:border-cyan-300/40"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/35">Audience</label>
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="New creators, busy founders..."
                className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3 text-sm text-white outline-none placeholder:text-white/24 focus:border-cyan-300/40"
              />
            </div>
          </div>

          {error && <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-4 font-black text-black shadow-[0_20px_44px_rgba(34,211,238,.22)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Analyzing hook signal..." : "Analyze Hook"}
          </button>

          {mode === "rules" && (
            <p className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-6 text-amber-100">
              Running in rules preview mode{diagnostic ? `: ${diagnostic}` : ""}. Add a working OpenAI environment key for full AI scoring.
            </p>
          )}
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-7">
          {!loading && !result && (
            <div className="min-h-[460px] rounded-[24px] border border-white/10 bg-black/20 p-6">
              <p className="text-sm text-cyan-300">Result preview</p>
              <h2 className="mt-4 max-w-md text-3xl font-black tracking-tight">Your hook score will appear here.</h2>
              <p className="mt-4 max-w-lg leading-7 text-white/50">
                HookSignals now checks the hook against platform, niche, audience trigger, retention risk and packaging fit.
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
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Free</p>
          <h3 className="mt-3 text-xl font-black">Fast diagnosis</h3>
          <p className="mt-2 text-sm leading-6 text-white/50">Score, weakness, one improved hook and three variants.</p>
        </div>
        <div className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Pro</p>
          <h3 className="mt-3 text-xl font-black">Creator workflow</h3>
          <p className="mt-2 text-sm leading-6 text-white/55">More variants, niche angles, title pairing, script handoff and saved history.</p>
        </div>
        <div className="rounded-[24px] border border-violet-300/20 bg-violet-300/[0.05] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-200">Elite</p>
          <h3 className="mt-3 text-xl font-black">Team system</h3>
          <p className="mt-2 text-sm leading-6 text-white/55">Team dashboards, batch analysis, campaigns and priority support.</p>
        </div>
      </section>

      <RelatedTools />
    </PremiumToolShell>
  );
}
