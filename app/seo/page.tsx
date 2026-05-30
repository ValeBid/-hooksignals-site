import Link from "next/link";
import { comparisonPages, seoHubs } from "../lib/seo-content";
import type { ComparisonPage } from "../lib/seo-content";

export const metadata = {
  title: "Creator SEO Hub | AI Hook Analysis, TikTok SEO & YouTube Shorts Optimization",
  description:
    "Explore creator SEO systems, hook analysis frameworks, YouTube Shorts SEO workflows and AI-assisted retention optimization.",
};

export default function SeoHubPage() {
  return (
    <main className="min-h-screen bg-[#020408] px-5 py-20 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
            Programmatic creator SEO infrastructure
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] md:text-7xl">
            Topic authority pages for creator growth and AI publishing.
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/58">
            Structured knowledge hubs for YouTube Shorts SEO, TikTok retention,
            AI hook analysis, thumbnail optimization and creator workflow systems.
          </p>
        </div>

        <section className="mt-16 grid gap-5 lg:grid-cols-2">
          {seoHubs.map((hub) => (
            <article
              key={hub.slug}
              className="rounded-[30px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-cyan-300">
                <span>{hub.category}</span>
                <span className="text-white/25">•</span>
                <span>{hub.intent}</span>
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight">
                {hub.title}
              </h2>

              <p className="mt-5 leading-7 text-white/55">
                {hub.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {hub.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-white/45">
                {hub.summary}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-300">
              Comparison pages
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">
              Competitive positioning pages for conversion SEO.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {comparisonPages.map((page: ComparisonPage) => (
              <Link
                key={page.slug}
                href={`/seo/${page.slug}`}
                className={`group rounded-[28px] border p-6 transition hover:bg-white/[0.06] ${
                  page.pageType === "best-of"
                    ? "border-cyan-300/20 bg-cyan-300/[0.035] hover:border-cyan-300/35"
                    : "border-white/10 bg-white/[0.04] hover:border-violet-300/25"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className={`text-xs font-black uppercase tracking-[0.14em] ${
                    page.pageType === "best-of" ? "text-cyan-300" : "text-violet-300"
                  }`}>
                    {page.pageType === "best-of" ? "Buyer's guide" : page.competitor}
                  </p>
                  {page.pageType === "best-of" && (
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.1em] text-cyan-200">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-black tracking-tight text-white">
                  {page.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/52">
                  {page.description}
                </p>
                <p className="mt-4 text-sm font-black text-cyan-300 transition group-hover:translate-x-0.5">
                  Read guide →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
