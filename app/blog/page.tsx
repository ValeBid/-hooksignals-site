import Link from "next/link";
import { blogPosts } from "../lib/seo-content";
import SimpleNav from "../components/simple-nav";
import SiteFooter from "../components/site-footer";

export const metadata = {
  title: "HookSignals Blog | Creator SEO, AI Hooks & YouTube Shorts Strategy",
  description:
    "Deep creator SEO guides, AI hook strategies, TikTok retention frameworks and YouTube Shorts optimization workflows.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#030507] text-white">
    <SimpleNav />
    <main className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
            Creator SEO knowledge base
          </p>
          <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] md:text-7xl">
            AI creator growth, retention and packaging strategy.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/58">
            Practical frameworks for YouTube Shorts SEO, TikTok hooks,
            thumbnail optimization, creator retention and AI-assisted content workflows.
          </p>
        </div>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[32px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between text-sm text-white/45">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight transition group-hover:text-cyan-300">
                {post.title}
              </h2>

              <p className="mt-5 leading-7 text-white/55">
                {post.description}
              </p>

              <div className="mt-8 flex items-center justify-between text-sm">
                <span className="text-white/35">{post.date}</span>
                <span className="font-bold text-cyan-300">Read article →</span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
    <SiteFooter />
    </div>
  );
}
