import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "../../lib/seo-content";
import SimpleNav from "../../components/simple-nav";
import SiteFooter from "../../components/site-footer";
import EmailCapture from "../../components/email-capture";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | HookSignals Blog`,
    description: post.description,
    alternates: { canonical: `https://hooksignals.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://hooksignals.com/blog/${post.slug}`,
      siteName: "HookSignals",
      type: "article",
    },
  };
}

const postContent: Record<string, { sections: { heading: string; body: string }[] }> = {
  "how-to-write-a-viral-hook": {
    sections: [
      {
        heading: "Why most hooks fail before the first second",
        body: "A hook fails when it leaves the viewer with no clear reason to keep watching. Vague openings like \"This changed everything\" or \"You need to hear this\" create no specific tension. The viewer has no subject, no payoff and no reason to stay. Generic hooks are the fastest path to an early swipe.",
      },
      {
        heading: "The four pillars of a strong hook",
        body: "Strong hooks combine four signals: clarity, contrast, curiosity and payoff timing. Clarity means the viewer understands the subject in the first sentence. Contrast creates stakes — a mistake to avoid, a result that seems impossible, or a gap between what the viewer believes and what is actually true. Curiosity leaves one unanswered question specific enough to be worth resolving. Payoff timing means the answer arrives fast enough that the viewer trusts the content.",
      },
      {
        heading: "Specificity over vagueness every time",
        body: "\"I tested 37 hooks over 30 days and one doubled my retention\" beats \"I tried something new and it worked.\" The specific version tells the viewer what was tested, the scale of the experiment and the result. Every word earns its place. Replacing a vague phrase with a number, a timeframe or a named outcome is the fastest improvement most creators can make.",
      },
      {
        heading: "Match the hook to the title and thumbnail",
        body: "A hook that promises a mistake to avoid should pair with a title naming that mistake and a thumbnail showing the consequence. Mismatched packaging creates early exits even when the hook is strong. Alignment across all three surfaces tells the algorithm and the viewer the same story.",
      },
      {
        heading: "Test before publishing",
        body: "Run the hook through HookSignals before the video goes live. The analyzer checks clarity, curiosity gap, retention risk and platform pacing so you know whether the first line is publish-ready or needs one more rewrite.",
      },
    ],
  },
  "youtube-shorts-seo-checklist": {
    sections: [
      {
        heading: "Titles: keyword first, promise second",
        body: "The first two words of your Shorts title carry the most indexing weight. Place the core topic keyword before any emotional modifier. \"Retention mistakes creators make\" outperforms \"Creators are making these retention mistakes\" because the keyword lands earlier. Keep titles under 60 characters so nothing is truncated in search results.",
      },
      {
        heading: "Hook: deliver context in the first three seconds",
        body: "Shorts SEO is not just metadata. The algorithm reads session time, swipes and replays. A hook that gets viewers to watch past three seconds signals relevance. Use the first line to name the topic, hint at the payoff and create a reason to keep watching. Avoid slow setups, channel intros and generic openings.",
      },
      {
        heading: "Description: one paragraph, keyword-rich",
        body: "Write one paragraph in the description that summarizes the video using natural keyword variations. Include the primary topic, one secondary keyword and a clear outcome sentence. Do not paste timestamps or keyword lists — the algorithm prefers readable copy that matches viewer intent.",
      },
      {
        heading: "Captions: always on, always accurate",
        body: "Auto-captions carry keyword weight. Review and correct them for any topic-specific terms, names or numbers the auto-captioner misreads. Accurate captions improve both accessibility and indexing. For Shorts, captions also function as on-screen text reinforcement — viewers watching on mute depend on them.",
      },
      {
        heading: "Thumbnail: readable on mobile, specific promise",
        body: "Shorts thumbnails appear in search results and the Shorts feed pause state. Use minimal text — one or two words maximum — with enough contrast to read at 200px wide. The visual should repeat the title promise, not restate it with different words.",
      },
      {
        heading: "Retention structure: hook, context, payoff",
        body: "Structure every Short around three beats: hook (what this is about), context (why it matters to this viewer), payoff (the result, lesson or action). Scripts that front-load the payoff and loop back to reinforce it see higher replay rates, which is one of the strongest Shorts ranking signals available.",
      },
    ],
  },
  "tiktok-seo-first-three-seconds": {
    sections: [
      {
        heading: "TikTok indexes what it hears and reads in the first seconds",
        body: "TikTok's discovery layer reads the first spoken words and the on-screen text that appears in the opening seconds. If your topic keyword is not in the voiceover or as visible text before second three, the algorithm has less signal to distribute the video to the right audience. This is not metadata SEO — it is content SEO.",
      },
      {
        heading: "Voiceover keyword placement",
        body: "Say the topic in the first spoken sentence. \"Here is how to fix your TikTok hook\" gives the algorithm \"TikTok hook\" immediately. \"So I was thinking about content the other day\" gives it nothing. Write the script so the topic keyword is in the first seven words of the voiceover, then elaborate.",
      },
      {
        heading: "On-screen text as a discovery signal",
        body: "On-screen text in the first three seconds is read by TikTok's visual indexing layer. Use it to restate the topic keyword, not to add a separate thought. If the voiceover says \"TikTok hook strategy\" and the text reads \"watch this,\" you have wasted a discovery signal. Make both surfaces say the same thing.",
      },
      {
        heading: "The retention-discovery loop",
        body: "TikTok distributes content based on early watch time. A video that holds viewers past the three-second mark is pushed to a wider audience. This creates a loop: strong early keywords attract the right viewers, who stay longer, which pushes the video further. Weak openings break the loop at the first step.",
      },
      {
        heading: "First-second retention risk",
        body: "High first-second drop-off signals irrelevance to the algorithm. Slow zooms, logo stings, \"hey everyone welcome back\" openings and vague hooks all trigger early exits. Every frame before the topic keyword is mentioned is a frame where the viewer might swipe. Start with the subject.",
      },
      {
        heading: "Practical checklist before publishing",
        body: "Before posting a TikTok: confirm the topic keyword is in the first spoken sentence, the on-screen text in the opening seconds restates the topic, the first visual frame communicates subject rather than branding, and the hook creates a specific unanswered question. Run the hook through HookSignals to check for retention risk before upload.",
      },
    ],
  },
};

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const content = postContent[post.slug];

  return (
    <div className="min-h-screen bg-[#030507] text-white">
    <SimpleNav />
    <main className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-bold text-white/45 transition hover:text-white">
          ← Blog
        </Link>

        <div className="mt-8">
          <div className="flex items-center gap-4 text-sm text-white/45">
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] leading-tight md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/60">
            {post.description}
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {content?.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-black tracking-tight text-white">
                {section.heading}
              </h2>
              <p className="mt-4 leading-8 text-white/65">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16">
          <EmailCapture
            source={`blog_${post.slug}`}
            compact
          />
        </div>

        <div className="mt-8 rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.06] p-7">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">
            Test your hook before publishing
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight">
            Turn this framework into a scored hook analysis.
          </h2>
          <p className="mt-3 leading-7 text-white/58">
            HookSignals checks your hook for clarity, curiosity gap, retention risk and platform pacing before you publish.
          </p>
          <Link
            href="/hook-analyzer"
            className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 px-6 py-3 text-sm font-black text-black transition hover:scale-[1.01]"
          >
            Analyze your hook →
          </Link>
        </div>

        <div className="mt-10 border-t border-white/10 pt-10">
          <p className="text-sm font-bold text-white/38">More from the blog</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="rounded-[20px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/30"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                    {related.category}
                  </p>
                  <h3 className="mt-3 font-black leading-6 text-white">
                    {related.title}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
    <SiteFooter />
    </div>
  );
}
