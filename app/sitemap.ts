import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://hooksignals.com", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://hooksignals.com/tools", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },

    { url: "https://hooksignals.com/hook-analyzer", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://hooksignals.com/hook-improver", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://hooksignals.com/youtube-hook-generator", lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: "https://hooksignals.com/tiktok-hook-generator", lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },

    { url: "https://hooksignals.com/youtube-title-generator", lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: "https://hooksignals.com/clickable-title-formulas", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://hooksignals.com/viral-title-examples", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://hooksignals.com/shorts-title-ideas", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },

    { url: "https://hooksignals.com/shorts-script-generator", lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: "https://hooksignals.com/shorts-hook-ideas", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },

    { url: "https://hooksignals.com/viral-hook-examples", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://hooksignals.com/youtube-hook-examples", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://hooksignals.com/hook-formulas", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://hooksignals.com/retention-hook-examples", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },

    { url: "https://hooksignals.com/viewer-retention-tips", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://hooksignals.com/youtube-thumbnail-tips", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://hooksignals.com/thumbnail-text-checker", lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
  ];
}