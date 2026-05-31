import type { YouTubeVideoProvider } from "./types";
import type { YouTubeVideoData } from "../youtube";
import { extractVideoId } from "../youtube";

interface YTApiThumbnails {
  maxres?: { url: string };
  standard?: { url: string };
  high?: { url: string };
  medium?: { url: string };
  default?: { url: string };
}

interface YTApiItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: YTApiThumbnails;
  };
  statistics: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
  contentDetails: {
    duration: string; // ISO 8601 e.g. PT5M30S
  };
}

interface YTApiResponse {
  items?: YTApiItem[];
  error?: { message: string; code: number };
}

function parseDurationISO(iso: string): string | null {
  if (!iso?.startsWith("PT")) return null;
  const h = parseInt(iso.match(/(\d+)H/)?.[1] ?? "0");
  const m = parseInt(iso.match(/(\d+)M/)?.[1] ?? "0");
  const s = parseInt(iso.match(/(\d+)S/)?.[1] ?? "0");
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function bestThumbnail(thumbs: YTApiThumbnails, videoId: string): string {
  return (
    thumbs.maxres?.url ||
    thumbs.standard?.url ||
    thumbs.high?.url ||
    thumbs.medium?.url ||
    thumbs.default?.url ||
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  );
}

function toInt(v?: string): number | null {
  if (!v) return null;
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export class YouTubeDataApiProvider implements YouTubeVideoProvider {
  readonly name = "youtube-data-api";

  constructor(private readonly apiKey: string) {}

  async fetchVideo(url: string): Promise<YouTubeVideoData> {
    const videoId = extractVideoId(url);
    if (!videoId) throw new Error("invalid_video_id: Could not extract video ID from URL.");

    const endpoint =
      `https://www.googleapis.com/youtube/v3/videos` +
      `?part=snippet,statistics,contentDetails` +
      `&id=${encodeURIComponent(videoId)}` +
      `&key=${this.apiKey}`;

    let res: Response;
    try {
      res = await fetch(endpoint, {
        signal: AbortSignal.timeout(15_000),
        headers: { "Accept": "application/json" },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`youtube_api_network: ${msg}`);
    }

    if (!res.ok) {
      if (res.status === 403) throw new Error("youtube_api_forbidden: API key is invalid or quota exceeded.");
      if (res.status === 400) throw new Error("youtube_api_bad_request: Bad request to YouTube Data API.");
      throw new Error(`youtube_api_error: HTTP ${res.status}`);
    }

    const body = (await res.json()) as YTApiResponse;

    if (body.error) {
      throw new Error(`youtube_api_error: ${body.error.message} (code ${body.error.code})`);
    }

    if (!body.items?.length) {
      throw new Error("no_data: Video not found. It may be private, deleted, or unavailable.");
    }

    const item = body.items[0];
    const { snippet, statistics, contentDetails } = item;

    return {
      videoId,
      url,
      title: snippet.title?.trim().slice(0, 300) || "Untitled",
      description: snippet.description?.trim().slice(0, 2000) || "",
      thumbnailUrl: bestThumbnail(snippet.thumbnails, videoId),
      viewCount: toInt(statistics.viewCount),
      likes: toInt(statistics.likeCount),
      commentsCount: toInt(statistics.commentCount),
      channelName: snippet.channelTitle?.trim().slice(0, 150) || "",
      channelUrl: "",
      subscriberCount: null, // not returned by videos.list
      duration: parseDurationISO(contentDetails.duration),
      uploadDate: snippet.publishedAt || null,
      subtitlePreview: null, // Data API v3 does not expose transcript
      hasSubtitles: false,
    };
  }
}
