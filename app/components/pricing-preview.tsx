const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "For testing creator workflows and basic analysis.",
    features: [
      "Basic hook analysis",
      "Limited generations",
      "Workflow exploration",
    ],
    cta: "Start Free",
    premium: false,
  },
  {
    name: "Creator Pro",
    price: "$19",
    desc: "For creators optimizing retention and workflow quality.",
    features: [
      "Advanced retention insights",
      "Premium rewrites",
      "Saved workflows",
      "Priority creator tools",
    ],
    cta: "Coming Soon",
    premium: true,
  },
];

export default function PricingPreview() {
  return (
    <section className="mt-14">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            Premium creator workflows
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">
            Built to scale with serious creators.
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/55">
            HookSignals is evolving into a connected creator intelligence platform with advanced workflow tools, retention systems and saved analysis capabilities.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
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
                {plan.premium && (
                  <span className="pb-1 text-white/45">/month</span>
                )}
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

              <button
                className={`mt-8 w-full rounded-2xl px-5 py-4 font-bold transition ${
                  plan.premium
                    ? "bg-emerald-400 text-black hover:bg-emerald-300"
                    : "border border-white/10 bg-white/[0.04] text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
