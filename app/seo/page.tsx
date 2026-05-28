import Link from "next/link";
import { comparisonPages, seoHubs } from "../lib/seo-content";

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

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {comparisonPages.map((page) => (
              <Link
                key={page.slug}
                href={`/seo/${page.slug}`}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 transition hover:border-violet-300/30 hover:bg-white/[0.08]"
              >
                <p className="text-sm uppercase tracking-[0.16em] text-violet-300">
                  {page.competitor}
                </p>
                <h3 className="mt-5 text-3xl font-black tracking-tight">
                  {page.title}
                </h3>
                <p className="mt-5 leading-7 text-white/55">
                  {page.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
