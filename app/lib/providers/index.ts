import { ApifyYouTubeProvider } from "./apify.provider";
import { YouTubeDataApiProvider } from "./youtube-data-api.provider";
import type { YouTubeVideoProvider } from "./types";

export type { YouTubeVideoProvider } from "./types";

/**
 * Returns the active YouTube video provider based on environment configuration.
 *
 * Priority order:
 *   1. YOUTUBE_API_KEY (or GOOGLE_YOUTUBE_API_KEY / YOUTUBE_DATA_API_KEY) → YouTube Data API v3
 *   2. APIFY_TOKEN → Apify scraper (legacy/fallback)
 *   3. Neither → throws "provider_not_configured"
 */
export function getYouTubeVideoProvider(): YouTubeVideoProvider {
  // YouTube Data API v3 — preferred. Check all known env var names.
  const ytApiKey =
    process.env.YOUTUBE_API_KEY ||
    process.env.GOOGLE_YOUTUBE_API_KEY ||
    process.env.YOUTUBE_DATA_API_KEY;

  if (ytApiKey) {
    return new YouTubeDataApiProvider(ytApiKey);
  }

  // Apify scraper — legacy fallback if configured.
  const apifyToken = process.env.APIFY_TOKEN;
  if (apifyToken) {
    const actorId = process.env.APIFY_YOUTUBE_ACTOR_ID ?? "streamers/youtube-scraper";
    return new ApifyYouTubeProvider(apifyToken, actorId);
  }

  throw new Error(
    "provider_not_configured: No YouTube video provider is configured. " +
      "Set YOUTUBE_API_KEY (YouTube Data API v3) to enable URL-based analysis."
  );
}
