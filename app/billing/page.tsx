export const metadata = {
  title: "Billing",
  description: "Manage your HookSignals billing and subscriptions.",
};

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-[#030507] px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/[0.03] p-8 md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Billing</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">Manage subscriptions and creator access.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
          Billing portal, subscription management and invoice access are being connected to the live Paddle customer portal.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="text-sm uppercase tracking-[0.14em] text-white/40">Starter</p>
            <p className="mt-4 text-4xl font-black">50</p>
            <p className="mt-2 text-white/50">Creator credits</p>
          </div>

          <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
            <p className="text-sm uppercase tracking-[0.14em] text-cyan-300">Creator Pro</p>
            <p className="mt-4 text-4xl font-black">500</p>
            <p className="mt-2 text-white/50">Monthly workflow credits</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="text-sm uppercase tracking-[0.14em] text-white/40">Elite</p>
            <p className="mt-4 text-4xl font-black">2000</p>
            <p className="mt-2 text-white/50">High-volume creator credits</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-2xl font-black">Need help?</h2>
          <p className="mt-4 text-white/60">For subscription upgrades, billing issues or invoice requests contact support.</p>
          <a href="mailto:support@hooksignals.com" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 font-black text-black">
            Contact support
          </a>
        </div>
      </div>
    </main>
  );
}
