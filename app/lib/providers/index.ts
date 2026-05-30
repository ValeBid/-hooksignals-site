import { ApifyYouTubeProvider } from "./apify.provider";
import type { YouTubeVideoProvider } from "./types";

export type { YouTubeVideoProvider } from "./types";

/**
 * Returns the active YouTube video provider based on environment configuration.
 *
 * Currently supported: Apify (default).
 *
 * To add a new provider:
 *   1. Create a class implementing YouTubeVideoProvider in ./your-provider.ts
 *   2. Add a case below (switch on YOUTUBE_PROVIDER env var)
 *   3. Set YOUTUBE_PROVIDER=<name> in your environment
 *
 * The route layer (app/api/youtube/analyze/route.ts) calls
 * provider.fetchVideo() and is fully decoupled from the concrete implementation.
 */
export function getYouTubeVideoProvider(): YouTubeVideoProvider {
  const apifyToken = process.env.APIFY_TOKEN;
  const actorId = process.env.APIFY_YOUTUBE_ACTOR_ID ?? "streamers/youtube-scraper";

  // Future: uncomment to support multiple providers via env var
  // const providerName = process.env.YOUTUBE_PROVIDER ?? "apify";
  // switch (providerName) {
  //   case "youtube-data-api": return new YouTubeDataApiProvider(process.env.YOUTUBE_API_KEY!);
  //   default: break;
  // }

  if (!apifyToken) {
    throw new Error(
      "provider_not_configured: No YouTube video provider is configured. " +
        "Set APIFY_TOKEN to use the Apify provider. " +
        "Future providers can be enabled via the YOUTUBE_PROVIDER environment variable."
    );
  }

  return new ApifyYouTubeProvider(apifyToken, actorId);
}
