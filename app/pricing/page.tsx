import PricingPreview from "../components/pricing-preview";
import SiteFooter from "../components/site-footer";

export const metadata = {
  title: "Pricing | HookSignals",
  description:
    "Explore future premium creator workflows, saved analysis systems and advanced retention tools.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#030507] text-white">
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 md:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            Pricing preview
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] md:text-7xl">
            Premium creator workflows without the noise.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/55">
            HookSignals is evolving into a creator operating system focused on retention, workflow quality and publishing intelligence.
          </p>
        </div>

        <PricingPreview />
      </div>

      <SiteFooter />
    </main>
  );
}
