export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for HookSignals creator workflow tools.",
  alternates: {
    canonical: "https://hooksignals.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#030507] px-5 py-20 text-white md:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/[0.03] p-8 md:p-12">
        <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>

        <div className="mt-8 space-y-8 text-white/65">
          <section>
            <h2 className="text-xl font-bold text-white">Information Collection</h2>
            <p className="mt-3 leading-8">
              HookSignals may collect account details, billing information, usage analytics and communication data to improve platform functionality and customer support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">Usage Data</h2>
            <p className="mt-3 leading-8">
              We may use analytics technologies to understand how visitors interact with our tools, pages and creator workflows.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">Payments</h2>
            <p className="mt-3 leading-8">
              Payments are securely processed through third-party payment providers including Paddle. HookSignals does not directly store raw payment card information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">Contact</h2>
            <p className="mt-3 leading-8">
              For privacy questions contact support@hooksignals.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
