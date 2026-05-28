import PricingPreview from "../components/pricing-preview";
import SiteFooter from "../components/site-footer";

export const metadata = {
  title: "Beta Access | HookSignals",
  description:
    "Start with free HookSignals creator tools while advanced premium workflows remain in early beta.",
  alternates: { canonical: "https://hooksignals.com/pricing" },
  openGraph: {
    title: "HookSignals Beta Access",
    description:
      "Use free creator tools now and follow early-access premium workflow development.",
    url: "https://hooksignals.com/pricing",
    siteName: "HookSignals",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#030507] text-white">
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 md:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">
            Beta access
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] md:text-7xl">
            Start free. Upgrade later when premium workflows are ready.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
            HookSignals is focused on useful public creator tools first: hook analysis, thumbnail checks, script workflows and better pre-publish decisions.
          </p>
        </div>

        <PricingPreview />
      </div>

      <SiteFooter />
    </main>
  );
}
