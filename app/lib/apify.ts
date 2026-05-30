const APIFY_BASE = "https://api.apify.com/v2";

export type ApifyYouTubeItem = {
  id?: string;
  url?: string;
  title?: string;
  description?: string;
  text?: string;
  thumbnailUrl?: string;
  duration?: string | number;
  uploadDate?: string;
  publishedAt?: string;
  viewCount?: number | string;
  likes?: number | string;
  likeCount?: number | string;
  commentsCount?: number | string;
  commentCount?: number | string;
  channelName?: string;
  channelUrl?: string;
  channelId?: string;
  subscriberCount?: number | string;
  numberOfSubscribers?: number | string;
  subtitles?: Array<{ text: string; offset?: number; length?: number }>;
  captions?: string;
  isSubtitlesAvailable?: boolean;
};

export async function runYouTubeScraper(
  videoUrl: string,
  token: string,
  actorId: string
): Promise<ApifyYouTubeItem[]> {
  const endpoint = `${APIFY_BASE}/acts/${encodeURIComponent(actorId)}/run-sync-get-dataset-items?token=${token}&timeout=55&memory=256`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startUrls: [{ url: videoUrl }],
        maxResults: 1,
        includeSubtitles: true,
      }),
      signal: AbortSignal.timeout(60_000),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("TimeoutError") || msg.includes("The operation was aborted")) {
      throw new Error("apify_timeout");
    }
    throw new Error(`apify_network: ${msg.slice(0, 120)}`);
  }

  if (response.status === 401 || response.status === 403) throw new Error("apify_unauthorized");
  if (response.status === 404) throw new Error("apify_actor_not_found");
  if (response.status === 408) throw new Error("apify_timeout");

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`apify_${response.status}: ${text.slice(0, 120)}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) return [];
  return data as ApifyYouTubeItem[];
}
