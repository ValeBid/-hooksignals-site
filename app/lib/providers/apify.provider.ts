import { runYouTubeScraper } from "../apify";
import { normalizeYouTubeData } from "../youtube";
import type { YouTubeVideoData } from "../youtube";
import type { YouTubeVideoProvider } from "./types";

/**
 * YouTube video provider backed by the Apify streamers/youtube-scraper actor.
 * Env vars: APIFY_TOKEN, APIFY_YOUTUBE_ACTOR_ID (default: streamers/youtube-scraper)
 */
export class ApifyYouTubeProvider implements YouTubeVideoProvider {
  readonly name = "apify";

  constructor(
    private readonly token: string,
    private readonly actorId: string = "streamers/youtube-scraper"
  ) {}

  async fetchVideo(url: string): Promise<YouTubeVideoData> {
    const items = await runYouTubeScraper(url, this.token, this.actorId);

    if (!items.length) {
      throw new Error(
        "no_data: No video data returned. The video may be private, deleted, age-restricted or unavailable in the scraper region."
      );
    }

    return normalizeYouTubeData(items[0], url);
  }
}
