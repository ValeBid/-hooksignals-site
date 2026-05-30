import PricingPreview from "../components/pricing-preview";
import SiteFooter from "../components/site-footer";
import SimpleNav from "../components/simple-nav";

export const metadata = {
  title: "Pricing",
  description:
    "Choose a HookSignals plan for YouTube hooks, Shorts scripts, thumbnail checks and creator workflow optimization.",
  alternates: { canonical: "https://hooksignals.com/pricing" },
  openGraph: {
    title: "HookSignals Pricing",
    description:
      "Simple pricing for creator tools that improve hooks, scripts, thumbnails and pre-publish decisions.",
    url: "https://hooksignals.com/pricing",
    siteName: "HookSignals",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#030507] text-white">
    <SimpleNav />
    <main>
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 md:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">
            Pricing
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] md:text-7xl">
            Creator tools built for better publishing decisions.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
            Start with the free tools, then upgrade to a focused creator workflow when you want faster analysis, better saved outputs and a cleaner pre-publish system.
          </p>
        </div>

        <PricingPreview />
      </div>

    </main>
    <SiteFooter />
    </div>
  );
}
