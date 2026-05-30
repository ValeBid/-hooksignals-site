import type { ApifyYouTubeItem } from "./apify";

export type YouTubeVideoData = {
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
};

// Matches standard YouTube URLs including shorts and embeds
const YOUTUBE_RE =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&#].*)?$/;

export function extractVideoId(url: string): string | null {
  return url.trim().match(YOUTUBE_RE)?.[1] ?? null;
}

export function validateYouTubeUrl(url: string): boolean {
  return extractVideoId(url) !== null;
}

function toPositiveInt(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) && value >= 0 ? Math.round(value) : null;
  }
  if (typeof value === "string") {
    const n = parseInt(value.replace(/[^0-9]/g, ""), 10);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }
  return null;
}

function parseDuration(raw: unknown): string | null {
  if (raw == null) return null;

  if (typeof raw === "number") {
    const total = Math.round(Math.abs(raw));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  if (typeof raw === "string") {
    // ISO 8601: PT1H5M30S
    if (raw.startsWith("PT")) {
      const h = raw.match(/(\d+)H/)?.[1];
      const m = raw.match(/(\d+)M/)?.[1];
      const s = raw.match(/(\d+)S/)?.[1];
      const hh = parseInt(h ?? "0");
      const mm = parseInt(m ?? "0");
      const ss = parseInt(s ?? "0");
      if (hh > 0) return `${hh}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
      return `${mm}:${String(ss).padStart(2, "0")}`;
    }
    // Already formatted like "5:30" or "1:05:30"
    if (/^\d+:\d{2}(?::\d{2})?$/.test(raw.trim())) return raw.trim();
    return raw.slice(0, 20);
  }

  return null;
}

function buildSubtitlePreview(item: ApifyYouTubeItem): {
  preview: string | null;
  hasSubtitles: boolean;
} {
  if (Array.isArray(item.subtitles) && item.subtitles.length > 0) {
    const joined = item.subtitles
      .map((s) => (typeof s.text === "string" ? s.text.trim() : ""))
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    return { preview: joined.slice(0, 800) || null, hasSubtitles: true };
  }
  if (typeof item.captions === "string" && item.captions.trim().length > 0) {
    return { preview: item.captions.slice(0, 800), hasSubtitles: true };
  }
  return { preview: null, hasSubtitles: item.isSubtitlesAvailable === true };
}

export function normalizeYouTubeData(
  item: ApifyYouTubeItem,
  originalUrl: string
): YouTubeVideoData {
  const videoId = extractVideoId(originalUrl) ?? item.id ?? "";
  const { preview: subtitlePreview, hasSubtitles } = buildSubtitlePreview(item);

  return {
    videoId,
    url: typeof item.url === "string" ? item.url : originalUrl,
    title: ((item.title ?? "").trim().slice(0, 300)) || "Untitled video",
    description: ((item.description ?? item.text ?? "").trim().slice(0, 2000)),
    thumbnailUrl:
      typeof item.thumbnailUrl === "string" && item.thumbnailUrl.startsWith("http")
        ? item.thumbnailUrl
        : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    viewCount: toPositiveInt(item.viewCount),
    likes: toPositiveInt(item.likes ?? item.likeCount),
    commentsCount: toPositiveInt(item.commentsCount ?? item.commentCount),
    channelName: (item.channelName ?? "").trim().slice(0, 150),
    channelUrl: typeof item.channelUrl === "string" ? item.channelUrl : "",
    subscriberCount: toPositiveInt(item.subscriberCount ?? item.numberOfSubscribers),
    duration: parseDuration(item.duration),
    uploadDate: item.uploadDate ?? item.publishedAt ?? null,
    subtitlePreview,
    hasSubtitles,
  };
}
