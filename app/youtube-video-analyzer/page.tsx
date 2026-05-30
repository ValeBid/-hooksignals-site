"use client";

import { useState } from "react";
import PremiumToolShell from "../components/premium-tool-shell";
import RelatedTools from "../components/related-tools";
import CopyButton from "../components/copy-button";
import { trackEvent } from "../lib/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────
type VideoAnalysis = {
  hookScore: number;
  clarityScore: number;
  curiosityScore: number;
  retentionRisk: number;
  pattern: string;
  weakness: string;
  improvedHook: string;
  variants: string[];
  retentionNotes: string[];
  scoreRationale: string[];
  audienceTrigger: string;
  titlePairings: string[];
  thumbnailAngles: string[];
};

type VideoResult = {
  videoId: string;
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  viewCount: number | null;
  likes: number | null;
  commentsCount: number | null;
  channelName: string;
  channelUrl: string;
  subscriberCount: number | null;
  duration: string | null;
  uploadDate: string | null;
  subtitlePreview: string | null;
  hasSubtitles: boolean;
  analysis: VideoAnalysis;
  mode: "ai" | "rules" | "cached";
  cached: boolean;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatCount(n: number | null): string {
  if (n === null) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function scoreLabel(score: number): string {
  if (score >= 85) return "Scroll-stopper";
  if (score >= 72) return "Strong angle";
  if (score >= 58) return "Promising";
  if (score >= 42) return "Needs work";
  return "Weak hook";
}

function scoreColor(score: number): string {
  if (score >= 72) return "text-cyan-300";
  if (score >= 50) return "text-yellow-300";
  return "text-red-400";
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="text-white/55">{label}</span>
        <span className="font-semibold text-white/75">{value}/100</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10">
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 transition-all duration-700"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

function StatChip({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-center">
      <p className="text-xs text-white/38">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value ?? "—"}</p>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function VideoMetaCard({ result }: { result: VideoResult }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/24 p-5 md:p-7">
      <p className="mb-5 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
        Video data
        {result.cached && (
          <span className="ml-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-[10px] text-cyan-200">
            Cached
          </span>
        )}
      </p>

      <div className="flex gap-5">
        {result.thumbnailUrl && (
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.thumbnailUrl}
              alt={result.title}
              className="h-[90px] w-[160px] rounded-2xl object-cover ring-1 ring-white/10 transition hover:ring-cyan-300/40"
              loading="lazy"
            />
          </a>
        )}
        <div className="min-w-0">
          <p className="text-xs text-white/38">{result.channelName || "Unknown channel"}</p>
          <h3 className="mt-1 line-clamp-2 text-base font-black leading-6 text-white">
            {result.title}
          </h3>
          {result.duration && (
            <p className="mt-1 text-xs text-white/38">{result.duration}</p>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <StatChip label="Views" value={formatCount(result.viewCount)} />
        <StatChip label="Likes" value={formatCount(result.likes)} />
        <StatChip label="Comments" value={formatCount(result.commentsCount)} />
        <StatChip label="Subscribers" value={formatCount(result.subscriberCount)} />
      </div>

      {result.uploadDate && (
        <p className="mt-4 text-xs text-white/32">
          Uploaded: {result.uploadDate}
        </p>
      )}

      {result.hasSubtitles && (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs text-cyan-200">
          <span className="text-cyan-300">✓</span> Transcript available
        </div>
      )}

      {result.subtitlePreview && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-white/35">
            Transcript preview
          </p>
          <p className="line-clamp-3 text-sm leading-6 text-white/55">
            {result.subtitlePreview}
          </p>
        </div>
      )}
    </div>
  );
}

function AnalysisCard({ result }: { result: VideoResult }) {
  const a = result.analysis;

  return (
    <div className="grid gap-5">
      {/* Hook score header */}
      <div className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-cyan-100">
            {result.mode === "ai" ? "AI analysis" : result.mode === "cached" ? "Cached analysis" : "Hook analysis"}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/38">
            <span>Video: {result.videoId}</span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-end gap-3">
              <h2 className={`text-7xl font-black tracking-tight ${scoreColor(a.hookScore)}`}>
                {a.hookScore}
              </h2>
              <span className="mb-3 text-white/40">/100</span>
            </div>
            <p className="mt-2 text-2xl font-black tracking-tight">{scoreLabel(a.hookScore)}</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/52">
              {a.hookScore >= 72
                ? "Strong hook potential. Packaging alignment will determine performance."
                : "Hook needs sharper stakes or a clearer payoff before publishing."}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
            <p className="text-white/35">Retention risk</p>
            <p className="mt-1 font-black text-white">
              {a.retentionRisk <= 35 ? "Low" : a.retentionRisk <= 65 ? "Medium" : "High"}
            </p>
          </div>
        </div>
      </div>

      {/* Score breakdown + pattern */}
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="mb-4 text-sm font-semibold text-white/52">Signal breakdown</p>
          <div className="space-y-4">
            <ScoreBar label="Clarity" value={a.clarityScore} />
            <ScoreBar label="Curiosity gap" value={a.curiosityScore} />
            <ScoreBar label="Retention strength" value={100 - a.retentionRisk} />
          </div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="mb-3 text-sm font-semibold text-white/52">Detected pattern</p>
          <p className="leading-7 text-white/78">{a.pattern}</p>
          <p className="mt-3 text-sm leading-7 text-white/48">{a.weakness}</p>
        </div>
      </div>

      {/* Audience trigger */}
      <div className="rounded-[24px] border border-violet-300/20 bg-violet-300/[0.055] p-5">
        <p className="text-sm font-semibold text-violet-200">Audience trigger</p>
        <p className="mt-3 leading-7 text-white/70">{a.audienceTrigger}</p>
      </div>

      {/* Improved hook */}
      <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 md:p-7">
        <p className="mb-4 text-sm font-semibold text-cyan-300">Improved hook / title</p>
        <div className="rounded-[22px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 leading-7 text-white/82">
          <p>&ldquo;{a.improvedHook}&rdquo;</p>
          <CopyButton text={a.improvedHook} />
        </div>
        {a.variants.length > 0 && (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {a.variants.map((v) => (
              <div
                key={v}
                className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4 leading-7 text-white/72"
              >
                <p>&ldquo;{v}&rdquo;</p>
                <CopyButton text={v} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Score rationale */}
      <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
        <p className="mb-4 text-sm font-semibold text-white/52">Why this score?</p>
        <div className="grid gap-3 md:grid-cols-2">
          {a.scoreRationale.map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/62"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-xs text-cyan-300">
                ✓
              </span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Retention notes */}
      <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
        <p className="mb-4 text-sm font-semibold text-white/52">Retention notes</p>
        <div className="grid gap-3">
          {a.retentionNotes.map((note, i) => (
            <div
              key={note}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 leading-7 text-white/62"
            >
              <span className="mr-2 font-black text-violet-300">0{i + 1}</span>
              {note}
            </div>
          ))}
        </div>
      </div>

      {/* Title pairings + thumbnail angles */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
          <p className="mb-3 text-sm font-semibold text-white/52">Title pairings</p>
          <div className="space-y-2">
            {a.titlePairings.map((item) => (
              <p
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/64"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5">
          <p className="mb-3 text-sm font-semibold text-white/52">Thumbnail angles</p>
          <div className="space-y-2">
            {a.thumbnailAngles.map((item) => (
              <p
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white/64"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Continue workflow CTA */}
      <div className="rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,.08),rgba(124,58,237,.08))] p-5 md:p-7">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">
          Continue the workflow
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-tight">
          Turn this diagnosis into a publish-ready package.
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["/hook-analyzer", "Analyze the hook text", "Score the opening line directly for platform-specific retention."],
            ["/hook-improver", "Rewrite the hook", "Turn the improved title into sharper first-line variants."],
            ["/youtube-title-generator", "Generate title options", "Build title ideas around the same hook promise."],
            ["/thumbnail-text-checker", "Check thumbnail text", "Verify thumbnail readability and alignment with the hook."],
          ].map(([href, label, desc]) => (
            <a
              key={href}
              href={href}
              className="rounded-[22px] border border-white/10 bg-black/24 p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.055]"
            >
              <p className="font-black text-white">{label}</p>
              <p className="mt-1.5 text-sm leading-6 text-white/45">{desc}</p>
              <p className="mt-3 text-sm font-black text-cyan-200">Open →</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function AnalyzingState({ step }: { step: "fetching" | "analyzing" }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/24 p-7">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
        </div>
        <div>
          <p className="font-black text-white">
            {step === "fetching" ? "Fetching video data via Apify…" : "Analyzing hook and packaging with AI…"}
          </p>
          <p className="mt-1 text-sm text-white/45">
            {step === "fetching"
              ? "Retrieving title, description, stats and transcript from YouTube."
              : "Scoring clarity, curiosity, retention risk and generating improvements."}
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-3">
        <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" />
        <div className="mt-5 h-24 animate-pulse rounded-2xl bg-white/10" />
      </div>

      <div className="mt-6 flex gap-2 text-xs text-white/32">
        <span className={step === "fetching" ? "text-cyan-300" : "text-white/32"}>
          1. Fetch data
        </span>
        <span>→</span>
        <span className={step === "analyzing" ? "text-cyan-300" : "text-white/32"}>
          2. AI analysis
        </span>
        <span>→</span>
        <span className="text-white/22">3. Results</span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const ERROR_MESSAGES: Record<string, string> = {
  missing_url: "Paste a YouTube URL to get started.",
  invalid_url: "Enter a valid YouTube video URL (youtube.com or youtu.be).",
  apify_token_missing:
    "APIFY_TOKEN is not configured on this server. Contact the site admin.",
  apify_unauthorized:
    "Apify authentication failed. The APIFY_TOKEN may be invalid or expired.",
  apify_actor_not_found:
    "Apify actor not found. Check APIFY_YOUTUBE_ACTOR_ID configuration.",
  no_data:
    "No data returned. The video may be private, deleted, or region-restricted.",
  scraper_timeout:
    "The video scraper timed out. The video may be long or temporarily unavailable.",
  scraper_failed: "Could not fetch video data. Try again in a moment.",
  rate_limited: "You have reached the request limit. Try again in an hour.",
};

const exampleUrls = [
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.youtube.com/shorts/abc123",
  "https://youtu.be/dQw4w9WgXcQ",
];

export default function YoutubeVideoAnalyzerPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<VideoResult | null>(null);
  const [loadStep, setLoadStep] = useState<"idle" | "fetching" | "analyzing">("idle");
  const [error, setError] = useState("");

  const isLoading = loadStep !== "idle";

  async function handleAnalyze() {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Paste a YouTube URL first.");
      return;
    }

    setError("");
    setResult(null);
    setLoadStep("fetching");
    trackEvent({ name: "video_analyze", props: { source: "youtube_video_analyzer_page" } });

    try {
      // Show "analyzing" step after a short delay so the UX feels progressive
      const analyzeTimer = setTimeout(() => setLoadStep("analyzing"), 8_000);

      const response = await fetch("/api/youtube/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      clearTimeout(analyzeTimer);

      const data = await response.json() as {
        error?: string;
        message?: string;
      } & Partial<VideoResult>;

      if (!response.ok || data.error) {
        const key = data.error ?? "scraper_failed";
        setError(data.message || ERROR_MESSAGES[key] || "Something went wrong. Try again.");
        return;
      }

      setResult(data as VideoResult);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoadStep("idle");
    }
  }

  return (
    <PremiumToolShell
      badge="Live video intelligence"
      title="YouTube Video Analyzer"
      description="Paste any YouTube URL to fetch real public data — views, likes, subscribers, transcript — then get an AI analysis of the hook, packaging strength and retention risk."
      primaryHref="/hook-analyzer"
      primaryLabel="Analyze Hook Text"
      secondaryHref="/tools"
      secondaryLabel="All Tools"
    >
      {/* Trust strip */}
      <div className="mb-6 grid gap-3 rounded-[28px] border border-white/10 bg-white/[0.025] p-5 md:grid-cols-3">
        {[
          ["Real data only", "Views, likes, subscribers and transcript fetched live from YouTube via Apify. No fake metrics."],
          ["AI hook scoring", "Title analyzed for clarity, curiosity, retention risk and packaging alignment."],
          ["No account required", "Paste any public YouTube URL. Results cached for 1 hour."],
        ].map(([title, desc]) => (
          <div key={title as string} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm font-black text-white">{title}</p>
            <p className="mt-1.5 text-xs leading-5 text-white/45">{desc}</p>
          </div>
        ))}
      </div>

      {/* URL input */}
      <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 shadow-[0_24px_80px_rgba(0,0,0,.35)] md:p-7">
        <label
          htmlFor="youtube-url-input"
          className="mb-3 block text-sm font-semibold text-white/60"
        >
          YouTube video URL
        </label>
        <div className="flex gap-2.5">
          <input
            id="youtube-url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) handleAnalyze();
            }}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 min-w-0 rounded-2xl border border-white/10 bg-[#050914] px-4 py-3 text-sm text-white outline-none placeholder:text-white/22 focus:border-cyan-300/40"
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isLoading}
            className="shrink-0 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-6 py-3 text-sm font-black text-black shadow-[0_18px_42px_rgba(34,211,238,.16)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Analyzing…" : "Analyze Video"}
          </button>
        </div>

        <p className="mt-3 text-xs text-white/30">
          Accepts youtube.com/watch, youtu.be, youtube.com/shorts, and embed URLs.
        </p>

        {/* Example links */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-white/30">Examples:</span>
          {exampleUrls.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setUrl(ex)}
              className="text-xs text-cyan-300/70 underline decoration-dotted underline-offset-2 transition hover:text-cyan-300"
            >
              {ex.replace("https://", "").split("/")[0]}/…
            </button>
          ))}
        </div>

        {error && (
          <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/[0.08] p-3 text-sm text-red-200">
            {error}
          </p>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="mt-5">
          <AnalyzingState step={loadStep === "fetching" ? "fetching" : "analyzing"} />
        </div>
      )}

      {/* Results */}
      {!isLoading && result && (
        <div className="mt-5 grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
          <VideoMetaCard result={result} />
          <AnalysisCard result={result} />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !result && !error && (
        <div className="mt-5 rounded-[28px] border border-white/10 bg-black/20 p-7">
          <p className="text-sm text-cyan-300">Result preview</p>
          <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight">
            Video data and hook analysis will appear here.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/48">
            Paste any public YouTube URL above. The analyzer fetches real data from YouTube
            via Apify, then scores the title hook for clarity, curiosity, retention risk and
            packaging alignment.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              ["Real metrics", "Views, likes, comments, subscribers — live from YouTube."],
              ["Transcript context", "When available, the opening transcript is used in the AI analysis."],
              ["Hook scoring", "Title analyzed using the same engine as the Hook Analyzer."],
            ].map(([title, desc]) => (
              <div
                key={title as string}
                className="rounded-2xl border border-white/10 bg-black/24 p-4"
              >
                <p className="text-sm font-black text-cyan-200">{title}</p>
                <p className="mt-2 text-xs leading-5 text-white/42">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <RelatedTools />
      </div>
    </PremiumToolShell>
  );
}
