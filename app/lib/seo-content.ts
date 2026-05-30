export const siteUrl = "https://hooksignals.com";

export const seoHubs = [
  {
    slug: "ai-hook-analyzer",
    title: "AI Hook Analyzer for YouTube Shorts and TikTok",
    description:
      "Learn how AI hook analysis helps creators improve the first three seconds, viewer curiosity and short-form retention.",
    category: "Creator SEO",
    intent: "Commercial investigation",
    keywords: ["AI hook analyzer", "YouTube hook analyzer", "TikTok hook tool"],
    summary:
      "AI hook analyzers review the opening line, emotional trigger, clarity and curiosity gap before a video is published.",
  },
  {
    slug: "youtube-shorts-seo",
    title: "YouTube Shorts SEO Workflow",
    description:
      "A practical workflow for improving YouTube Shorts titles, hooks, descriptions, chapters and retention packaging.",
    category: "YouTube SEO",
    intent: "Informational",
    keywords: ["YouTube Shorts SEO", "shorts title optimization", "YouTube hook strategy"],
    summary:
      "Shorts SEO combines keyword clarity, high-retention openings, thumbnails, titles and repeatable publishing signals.",
  },
  {
    slug: "tiktok-seo-hooks",
    title: "TikTok SEO Hooks and First-Three-Seconds Strategy",
    description:
      "Optimize TikTok hooks with keyword-first openings, on-screen text and voiceover clarity for discovery-first content.",
    category: "TikTok SEO",
    intent: "Informational",
    keywords: ["TikTok SEO", "TikTok hooks", "first 3 seconds TikTok"],
    summary:
      "TikTok discovery depends heavily on clear topic signals, fast context and early visual or spoken keyword relevance.",
  },
  {
    slug: "thumbnail-text-checker",
    title: "Thumbnail Text Checker for Creator Packaging",
    description:
      "Improve thumbnail readability, contrast, emotional clarity and mobile visibility before publishing a video.",
    category: "Packaging",
    intent: "Commercial investigation",
    keywords: ["thumbnail text checker", "thumbnail readability", "YouTube thumbnail text"],
    summary:
      "Thumbnail text should be readable on mobile, emotionally specific and aligned with the title promise.",
  },
  {
    slug: "shorts-script-generator",
    title: "AI Shorts Script Generator Workflow",
    description:
      "Structure short-form scripts around hook, context, payoff, proof and CTA without losing pacing.",
    category: "AI Scriptwriting",
    intent: "Commercial investigation",
    keywords: ["shorts script generator", "AI video script", "short form script tool"],
    summary:
      "Short-form scripts need fast setup, clear payoff and a retention arc that prevents early swipe-away behavior.",
  },
  {
    slug: "creator-retention-analysis",
    title: "Creator Retention Analysis Guide",
    description:
      "Understand retention risk, pacing, curiosity loops and audience drop-off before publishing creator content.",
    category: "Retention",
    intent: "Informational",
    keywords: ["creator retention", "video retention analysis", "audience retention AI"],
    summary:
      "Retention analysis identifies where viewers may lose context, interest or emotional reason to keep watching.",
  },
];

export const comparisonPages = [
  {
    slug: "hooksignals-vs-manual-hook-writing",
    title: "HookSignals vs Manual Hook Writing",
    description:
      "Compare AI-assisted creator workflow analysis with manual hook writing and disconnected creator tools.",
    competitor: "Manual workflow",
  },
  {
    slug: "hooksignals-vs-generic-ai-writing-tools",
    title: "HookSignals vs Generic AI Writing Tools",
    description:
      "See why creator-specific hook, title, thumbnail and retention workflows differ from generic AI writing tools.",
    competitor: "Generic AI writers",
  },
];

export const blogPosts = [
  {
    slug: "how-to-write-a-viral-hook",
    title: "How to Write a Viral Hook Without Sounding Generic",
    description:
      "A practical creator framework for writing stronger hooks using clarity, contrast, curiosity and payoff timing.",
    date: "2026-05-28",
    category: "Hook Strategy",
    readTime: "8 min read",
  },
  {
    slug: "youtube-shorts-seo-checklist",
    title: "YouTube Shorts SEO Checklist for 2026",
    description:
      "A short-form creator SEO checklist covering titles, openings, descriptions, captions and retention structure.",
    date: "2026-05-28",
    category: "YouTube SEO",
    readTime: "9 min read",
  },
  {
    slug: "tiktok-seo-first-three-seconds",
    title: "TikTok SEO Starts in the First Three Seconds",
    description:
      "Why on-screen text, voiceover keywords and immediate context matter for TikTok discovery and retention.",
    date: "2026-05-28",
    category: "TikTok SEO",
    readTime: "7 min read",
  },
];

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "HookSignals",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/icon.png`,
    },
    description:
      "HookSignals is an AI creator workflow platform for analyzing hooks, titles, thumbnails, Shorts scripts and retention before publishing.",
    sameAs: [siteUrl],
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "HookSignals",
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getSoftwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#software`,
    name: "HookSignals",
    url: siteUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI creator workflow platform for hook analysis, YouTube Shorts SEO, TikTok hooks, script generation and thumbnail text optimization.",
    publisher: { "@id": `${siteUrl}/#organization` },
    offers: [
      { "@type": "Offer", name: "Starter", priceCurrency: "USD", price: "10", url: `${siteUrl}/checkout/starter` },
      { "@type": "Offer", name: "Creator Pro", priceCurrency: "USD", price: "20", url: `${siteUrl}/checkout/pro` },
      { "@type": "Offer", name: "Elite", priceCurrency: "USD", price: "50", url: `${siteUrl}/checkout/elite` },
    ],
  };
}

export function getProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/#product`,
    name: "HookSignals",
    brand: { "@id": `${siteUrl}/#organization` },
    description:
      "AI creator workflow software for analyzing hooks, improving titles, checking thumbnails and building stronger short-form publishing packages.",
    category: "Creator software",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "10",
      highPrice: "50",
      offerCount: "3",
      url: `${siteUrl}/pricing`,
    },
  };
}
