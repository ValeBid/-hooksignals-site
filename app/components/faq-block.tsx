type FAQ = {
  question: string;
  answer: string;
};

export default function FAQBlock({ items }: { items: FAQ[] }) {
  return (
    <section className="mt-14">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.035] p-7 md:p-10">
        <p className="mb-3 text-sm font-semibold text-emerald-300">
          Frequently asked questions
        </p>

        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.question} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
              <h2 className="text-xl font-semibold">{item.question}</h2>
              <p className="mt-3 leading-7 text-white/55">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}