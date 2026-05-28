const creatorProCheckout = process.env.NEXT_PUBLIC_PADDLE_CREATOR_PRO_CHECKOUT_URL || "/pricing";
const studioCheckout = process.env.NEXT_PUBLIC_PADDLE_STUDIO_CHECKOUT_URL || "/pricing";

const plans = [
  {
    name: "Free Tools",
    price: "$0",
    desc: "Use the public creator tools for hooks, scripts and thumbnail optimization.",
    features: ["Hook analysis", "Hook rewriting", "Shorts script drafts", "Thumbnail text checks"],
    cta: "Start Free",
    href: "/tools",
    premium: false,
  },
  {
    name: "Creator Pro",
    price: "$19",
    desc: "Advanced creator workflows for faster publishing decisions and stronger retention systems.",
    features: ["Saved workflows", "Advanced retention insights", "Project memory", "Priority creator tools"],
    cta: "Upgrade to Pro",
    href: creatorProCheckout,
    premium: true,
  },
  {
    name: "Studio",
    price: "$49",
    desc: "Team-level creator workflows for agencies, editors and publishing operations.",
    features: ["Team workflows", "Creator dashboards", "Publishing systems", "Priority support"],
    cta: "Start Studio",
    href: studioCheckout,
    premium: true,
  },
];

export default function PricingPreview() {
  return (
    <section className="mt-14" id="pricing">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Creator pricing</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">Simple plans for modern creator workflows.</h2>
          <p className="mt-5 text-lg leading-8 text-white/55">HookSignals helps creators improve hooks, scripts, thumbnails and publishing decisions before videos go live.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-[30px] border p-7 ${plan.premium ? "border-cyan-300/25 bg-cyan-300/[0.05]" : "border-white/10 bg-black/25"}`}>
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-2xl font-black tracking-tight">{plan.name}</p><p className="mt-3 max-w-sm leading-7 text-white/50">{plan.desc}</p></div>
                {plan.premium && <div className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Pro</div>}
              </div>
              <div className="mt-8 flex items-end gap-2"><span className="text-5xl font-black tracking-[-0.05em]">{plan.price}</span><span className="pb-1 text-white/45">/month</span></div>
              <div className="mt-8 space-y-3">{plan.features.map((feature) => <div key={feature} className="flex items-center gap-3 text-white/70"><div className="h-2 w-2 rounded-full bg-cyan-300" /><span>{feature}</span></div>)}</div>
              <a href={plan.href} className={`mt-8 inline-flex w-full justify-center rounded-2xl px-6 py-3 font-black transition ${plan.premium ? "bg-white text-black hover:bg-white/90" : "border border-white/10 bg-white/[0.04] text-white hover:bg-white/10"}`}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
