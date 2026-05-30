import type { YouTubeVideoData } from "../youtube";

/**
 * Canonical interface for YouTube video data providers.
 *
 * Implement this interface to add a new provider (e.g. YouTube Data API).
 * The route layer calls provider.fetchVideo() and never knows which
 * concrete provider is running underneath.
 */
export interface YouTubeVideoProvider {
  /** Identifier used in logs and error messages. */
  readonly name: string;

  /**
   * Fetch public data for a single YouTube video.
   * @throws Error with a descriptive prefix (e.g. "apify_unauthorized",
   *         "no_data", "apify_timeout") so the route layer can map them
   *         to appropriate HTTP responses.
   */
  fetchVideo(url: string): Promise<YouTubeVideoData>;
}

// Future extension point — uncomment when channel analysis is implemented:
// export interface YouTubeChannelProvider {
//   readonly name: string;
//   fetchChannel(url: string): Promise<YouTubeChannelData>;
// }
