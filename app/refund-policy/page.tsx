export const metadata = {
  title: "Refund Policy | HookSignals",
  description: "Refund policy for HookSignals subscriptions and creator tools.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#030507] px-5 py-20 text-white md:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/[0.03] p-8 md:p-12">
        <h1 className="text-4xl font-black tracking-tight">Refund Policy</h1>

        <div className="mt-8 space-y-8 text-white/65">
          <section>
            <h2 className="text-xl font-bold text-white">Subscription Refunds</h2>
            <p className="mt-3 leading-8">
              Customers may request a refund within 7 days of the initial subscription purchase if they experience technical or billing issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">Non-refundable Cases</h2>
            <p className="mt-3 leading-8">
              Refund requests related to expected audience growth, algorithm performance or publishing outcomes are not guaranteed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">Contact</h2>
            <p className="mt-3 leading-8">
              Refund requests can be submitted to support@hooksignals.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
