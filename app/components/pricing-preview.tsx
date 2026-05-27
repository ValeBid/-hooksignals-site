import PaddleCheckoutButton from "./paddle-checkout-button";

const plans = [
  {
    name: "Starter",
    price: "$19",
    desc: "For creators testing AI workflow optimization and hook analysis.",
    features: [
      "Basic hook analysis",
      "Workflow exploration",
      "Short-form script generation",
      "Thumbnail text checks",
    ],
    cta: "Subscribe to Starter",
    premium: false,
    priceId: process.env.NEXT_PUBLIC_PADDLE_STARTER_PRICE_ID,
  },
  {
    name: "Creator Pro",
    price: "$49",
    desc: "For creators optimizing retention and professional publishing workflows.",
    features: [
      "Advanced retention insights",
      "Premium rewrites",
      "Saved workflows",
      "Priority creator tools",
    ],
    cta: "Upgrade to Pro",
    premium: true,
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID,
  },
  {
    name: "Elite",
    price: "$99",
    desc: "Full access to premium creator intelligence workflows and future releases.",
    features: [
      "Unlimited workflow access",
      "Advanced creator analytics",
      "Priority feature access",
      "Premium support layer",
    ],
    cta: "Get Elite Access",
    premium: true,
    priceId: process.env.NEXT_PUBLIC_PADDLE_ELITE_PRICE_ID,
  },
];

export default function PricingPreview() {
  return (
    <section className="mt-14" id="pricing">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            Premium creator workflows
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">
            Built to scale with serious creators.
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/55">
            HookSignals combines AI hook analysis, script workflows, title optimization and thumbnail clarity systems into one connected creator platform.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[30px] border p-7 ${
                plan.premium
                  ? "border-emerald-300/25 bg-emerald-300/[0.05]"
                  : "border-white/10 bg-black/25"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-black tracking-tight">{plan.name}</p>
                  <p className="mt-3 max-w-sm leading-7 text-white/50">
                    {plan.desc}
                  </p>
                </div>

                {plan.premium && (
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">
                    Premium
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-5xl font-black tracking-[-0.05em]">
                  {plan.price}
                </span>
                <span className="pb-1 text-white/45">/month</span>
              </div>

              <div className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-white/70"
                  >
                    <div className="h-2 w-2 rounded-full bg-emerald-300" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <PaddleCheckoutButton
                priceId={plan.priceId}
                variant={plan.premium ? "primary" : "secondary"}
              >
                {plan.cta}
              </PaddleCheckoutButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
