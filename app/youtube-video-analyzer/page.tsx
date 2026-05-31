"use client";

import { useState, useRef } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import RelatedTools from "../components/related-tools";
import ScoreMethodology from "../components/score-methodology";
import { trackEvent } from "../lib/analytics";
import type { AnalyzeResponse, VideoInfo, Scores, Analysis, Recommendations } from "../api/youtube/analyze/route";

// ─── Score ring ───────────────────────────────────────────────────────────────
function ScoreRing({ score, label, size = 80 }: { score: number; label: string; size?: number }) {
  const r = size * 0.38;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const color = score >= 70 ? "#22d3ee" : score >= 45 ? "#fbbf24" : "#f87171";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={size * 0.1} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={size * 0.1}
            strokeLinecap="round" strokeDasharray={`${filled} ${circ - filled}`}
            style={{ filter: `drop-shadow(0 0 4px ${color}66)` }} />
        </svg>
        <span className="absolute text-lg font-black text-white">{score}</span>
      </div>
      <span className="text-center text-[10px] font-black uppercase tracking-[0.12em] text-white/45 leading-tight">{label}</span>
    </div>
  );
}

// ─── Score bar ────────────────────────────────────────────────────────────────
function ScoreBar({ score, label, invert = false }: { score: number; label: string; invert?: boolean }) {
  const display = invert ? 100 - score : score;
  const color = display >= 70 ? "from-cyan-400 to-sky-500" : display >= 45 ? "from-amber-400 to-yellow-500" : "from-red-400 to-rose-500";
  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[0.1em] text-white/50">{label}</span>
        <span className="text-sm font-black text-white">{score}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
        <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function Stat({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white/38">{label}</p>
      <p className="mt-1 text-base font-black text-white">{value}</p>
    </div>
  );
}

function fmtNum(n: number | null): string | null {
  if (n == null) return null;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function fmtDate(s: string | null): string | null {
  if (!s) return null;
  try { return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
  catch { return null; }
}

// ─── Results panel ────────────────────────────────────────────────────────────
function ResultPanel({ result }: { result: AnalyzeResponse }) {
  const { video, scores, analysis, recommendations, disclaimer, source } = result;

  return (
    <div className="mt-6 grid gap-4">
      {/* Video metadata header */}
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-5 md:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {video.thumbnailUrl && (
            <div className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.thumbnailUrl}
                alt={`Thumbnail: ${video.title}`}
                className="w-full rounded-2xl sm:w-48 md:w-56"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
              {source === "youtube_api" ? "YouTube Data API" : source === "cached" ? "Cached result" : "Manual analysis"}
            </p>
            <h2 className="mt-2 text-xl font-black leading-tight text-white md:text-2xl line-clamp-3">{video.title}</h2>
            {video.channelTitle && <p className="mt-1.5 text-sm text-white/50">{video.channelTitle}</p>}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Stat label="Views" value={fmtNum(video.viewCount)} />
              <Stat label="Likes" value={fmtNum(video.likeCount)} />
              <Stat label="Comments" value={fmtNum(video.commentCount)} />
              <Stat label="Duration" value={video.duration} />
              <Stat label="Published" value={fmtDate(video.publishedAt)} />
            </div>
          </div>
        </div>
      </div>

      {/* Score rings */}
      <div className="rounded-[32px] border border-cyan-300/18 bg-[linear-gradient(135deg,rgba(34,211,238,.07),rgba(124,58,237,.05))] p-5 md:p-7">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300 mb-5">Packaging scores</p>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7 justify-items-center">
          <ScoreRing score={scores.packagingScore} label="Packaging" />
          <ScoreRing score={scores.hookStrength} label="Hook strength" />
          <ScoreRing score={scores.clarityScore} label="Clarity" />
          <ScoreRing score={scores.curiosityScore} label="Curiosity" />
          <ScoreRing score={scores.ctrPotential} label="CTR potential" />
          <ScoreRing score={scores.outlierPotential} label="Outlier potential" />
          <ScoreRing score={scores.retentionRisk} label="Retention risk" />
        </div>
        <div className="mt-6 grid gap-3">
          <ScoreBar score={scores.ctrPotential} label="Estimated CTR potential" />
          <ScoreBar score={scores.retentionRisk} label="Estimated retention risk" />
          <ScoreBar score={scores.outlierPotential} label="Estimated outlier potential" />
        </div>
        <p className="mt-4 rounded-2xl border border-white/[0.06] bg-black/20 px-4 py-3 text-xs leading-5 text-white/38">{disclaimer}</p>
      </div>

      {/* Analysis */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 bg-black/22 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300 mb-3">Summary</p>
          <p className="text-sm leading-7 text-white/72">{analysis.summary}</p>
        </div>
        <div className="rounded-[28px] border border-emerald-300/15 bg-emerald-300/[0.04] p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300 mb-3">What works</p>
          <ul className="grid gap-2">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-white/68">
                <span className="mt-0.5 shrink-0 h-4 w-4 rounded-full bg-emerald-300/15 text-emerald-300 flex items-center justify-center text-[9px] font-black">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[28px] border border-red-300/15 bg-red-300/[0.04] p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-red-300 mb-3">Risks</p>
          <ul className="grid gap-2">
            {analysis.risks.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-white/68">
                <span className="mt-0.5 shrink-0 h-4 w-4 rounded-full bg-red-300/15 text-red-300 flex items-center justify-center text-[9px] font-black">!</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-black/22 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-300 mb-3">Title diagnosis</p>
          <p className="text-sm leading-7 text-white/68">{analysis.titleDiagnosis}</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-black/22 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-300 mb-3">Retention diagnosis</p>
          <p className="text-sm leading-7 text-white/68">{analysis.retentionDiagnosis}</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-black/22 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-sky-300 mb-3">Positioning</p>
          <p className="text-sm leading-7 text-white/68">{analysis.positioningDiagnosis}</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-[32px] border border-cyan-300/18 bg-[linear-gradient(135deg,rgba(34,211,238,.06),rgba(124,58,237,.04))] p-5 md:p-7">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300 mb-5">Recommendations</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.1em] text-white/45">Better titles</p>
            <div className="grid gap-2">
              {recommendations.betterTitles.map((t, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-black/28 px-4 py-3 text-sm text-white/78">"{t}"</div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.1em] text-white/45">Opening hook ideas</p>
            <div className="grid gap-2">
              {recommendations.openingHookIdeas.map((h, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-black/28 px-4 py-3 text-sm text-white/78">"{h}"</div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.1em] text-white/45">Thumbnail text ideas</p>
            <div className="flex flex-wrap gap-2">
              {recommendations.thumbnailTextIdeas.map((t, i) => (
                <span key={i} className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1.5 text-xs font-black text-cyan-200">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.1em] text-white/45">Description angle</p>
            <p className="rounded-2xl border border-white/10 bg-black/28 px-4 py-3 text-sm text-white/78">{recommendations.descriptionAngle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Manual fallback form ─────────────────────────────────────────────────────
function ManualForm({ onResult }: { onResult: (r: AnalyzeResponse) => void }) {
  const [title, setTitle] = useState("");
  const [hook, setHook] = useState("");
  const [thumbnailText, setThumbnailText] = useState("");
  const [description, setDescription] = useState("");
  const [channelName, setChannelName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() && !hook.trim()) { setError("Enter at least a title or opening hook."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/youtube/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, hook, thumbnailText, description, channelName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Analysis failed.");
      onResult(data as AnalyzeResponse);
      trackEvent({ name: "video_analyze", props: { mode: "manual" } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <p className="text-sm font-black text-white">Manual analysis</p>
      <p className="text-xs leading-5 text-white/45">Enter your video details to get an AI packaging analysis without a YouTube URL.</p>
      <div className="grid gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-white/45">Video title *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Your planned video title"
            className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3.5 text-sm text-white placeholder:text-white/24 focus:border-cyan-300/40 outline-none" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-white/45">Opening hook (first line)</label>
          <input value={hook} onChange={e => setHook(e.target.value)} placeholder="The first line viewers will hear"
            className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3.5 text-sm text-white placeholder:text-white/24 focus:border-cyan-300/40 outline-none" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-white/45">Thumbnail text</label>
          <input value={thumbnailText} onChange={e => setThumbnailText(e.target.value)} placeholder="Text on your thumbnail (if any)"
            className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3.5 text-sm text-white placeholder:text-white/24 focus:border-cyan-300/40 outline-none" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.1em] text-white/45">Channel name</label>
          <input value={channelName} onChange={e => setChannelName(e.target.value)} placeholder="Your channel name"
            className="w-full rounded-2xl border border-white/10 bg-[#050914] px-4 py-3.5 text-sm text-white placeholder:text-white/24 focus:border-cyan-300/40 outline-none" />
        </div>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <button type="submit" disabled={loading}
        className="rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 py-3.5 text-sm font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.18)] transition hover:scale-[1.01] disabled:opacity-60">
        {loading ? "Analyzing…" : "Analyze packaging →"}
      </button>
    </form>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function YoutubeVideoAnalyzerPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; showManual?: boolean } | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [mode, setMode] = useState<"url" | "manual">("url");
  const resultRef = useRef<HTMLDivElement>(null);

  async function analyzeUrl(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) { setError({ message: "Paste a YouTube URL or video ID." }); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/youtube/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.error === "provider_not_configured") {
          setError({ message: "URL analysis is not configured. Use manual mode to analyze your title and hook.", showManual: true });
        } else {
          setError({ message: data?.message || "Analysis failed. Try again." });
        }
        return;
      }
      setResult(data as AnalyzeResponse);
      trackEvent({ name: "video_analyze", props: { mode: "url" } });
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch {
      setError({ message: "Something went wrong. Check your connection and try again." });
    } finally { setLoading(false); }
  }

  return (
    <PremiumToolShell
      badge="Video analyzer"
      title="Find out why any YouTube video worked — or didn't."
      description="Paste any public YouTube URL. Get real metadata from the YouTube Data API, AI packaging scores across 9 signals, and specific improvement ideas for title, hook and thumbnail."
      primaryHref="/hook-analyzer"
      primaryLabel="Analyze Hook Text"
    >
      {/* Main input card */}
      <div className="rounded-[34px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.07),rgba(124,58,237,.05))] p-6 shadow-[0_24px_80px_rgba(34,211,238,.08)] md:p-9">

        {/* Mode switcher */}
        <div className="mb-6 flex gap-2">
          <button onClick={() => { setMode("url"); setError(null); }}
            className={`rounded-2xl border px-5 py-2.5 text-sm font-black transition ${mode === "url" ? "border-cyan-300/30 bg-cyan-300/[0.1] text-cyan-200" : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white/70"}`}>
            YouTube URL
          </button>
          <button onClick={() => { setMode("manual"); setError(null); }}
            className={`rounded-2xl border px-5 py-2.5 text-sm font-black transition ${mode === "manual" ? "border-violet-300/30 bg-violet-300/[0.1] text-violet-200" : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white/70"}`}>
            Manual (title + hook)
          </button>
        </div>

        {mode === "url" ? (
          <form onSubmit={analyzeUrl} className="grid gap-3">
            <label className="text-xs font-black uppercase tracking-[0.12em] text-white/45">
              Paste a YouTube URL, Shorts URL, or youtu.be link
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={url} onChange={e => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or youtu.be/..."
                className="flex-1 rounded-2xl border border-white/10 bg-[#050914] px-4 py-3.5 text-sm text-white placeholder:text-white/24 focus:border-cyan-300/40 outline-none"
              />
              <button type="submit" disabled={loading}
                className="shrink-0 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-7 py-3.5 text-sm font-black text-black shadow-[0_16px_36px_rgba(34,211,238,.18)] transition hover:scale-[1.01] disabled:opacity-60">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                    Analyzing…
                  </span>
                ) : "Analyze Video →"}
              </button>
            </div>
            {error && (
              <div className="rounded-2xl border border-red-300/20 bg-red-300/[0.06] px-4 py-3">
                <p className="text-sm text-red-300">{error.message}</p>
                {error.showManual && (
                  <button type="button" onClick={() => { setMode("manual"); setError(null); }}
                    className="mt-2 text-sm font-black text-cyan-300 hover:text-cyan-200 transition">
                    Switch to manual analysis →
                  </button>
                )}
              </div>
            )}
          </form>
        ) : (
          <ManualForm onResult={(r) => {
            setResult(r);
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
          }} />
        )}

        {/* Trust note */}
        <div className="mt-5 rounded-[18px] border border-white/8 bg-white/[0.02] px-4 py-3">
          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            {[
              "Uses public YouTube metadata via YouTube Data API",
              "No YouTube login required",
              "Does not access YouTube Studio or private analytics",
              "Scores are directional guidance — not actual CTR or retention",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-white/38">
                <span className="text-[9px] text-emerald-400">✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div ref={resultRef}>
          <ResultPanel result={result} />
        </div>
      )}

      {/* What this tool does — shown when no result yet */}
      {!result && (
        <section className="mt-5 rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-7">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">What you get</p>
          <h2 className="mt-3 text-xl font-black text-white">Real metadata. AI packaging analysis.</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Packaging score", "Overall signal strength of your title, hook and framing."],
              ["CTR potential (estimated)", "Estimated click-through signal based on public packaging factors."],
              ["Retention risk (estimated)", "Estimated early drop-off risk from your title promise and structure."],
              ["Outlier potential", "How differentiated your video concept looks in its niche."],
              ["Title diagnosis", "Specific feedback on what is and isn't working in the title."],
              ["Better titles", "3 stronger alternative title ideas based on your content."],
              ["Thumbnail text ideas", "Short, high-contrast text ideas that match the title promise."],
              ["Opening hook ideas", "3 alternative first-line hooks to improve early retention."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-[20px] border border-white/[0.07] bg-black/20 p-4">
                <p className="text-sm font-black text-white">{t}</p>
                <p className="mt-1 text-xs leading-5 text-white/42">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-white/28">
            Scores are AI estimates based on public metadata and packaging signals, not measured analytics from YouTube Studio.
          </p>
        </section>
      )}

      <ScoreMethodology />

      <div className="mt-6">
        <RelatedTools primary="hook-analyzer" secondary="hook-improver" context="Score the hook you want to use for this video, then sharpen it." />
      </div>
    </PremiumToolShell>
  );
}
