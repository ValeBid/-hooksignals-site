import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hooksignals.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://hooksignals.com/hook-analyzer",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://hooksignals.com/youtube-hook-generator",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: "https://hooksignals.com/youtube-title-generator",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];
}