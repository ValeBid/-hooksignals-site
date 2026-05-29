const faqs = [
  {
    question: 'What is a good hook score?',
    answer: 'A strong hook usually lands above 70. Elite hooks combine a specific audience, clear tension, measurable payoff and a reason to keep watching.',
  },
  {
    question: 'How does HookSignals score hooks?',
    answer: 'HookSignals weighs clarity, curiosity gap, retention risk, platform pacing, niche context and audience trigger. The result is a directional publishing signal, not a guaranteed reach prediction.',
  },
  {
    question: 'Does niche affect hook performance?',
    answer: 'Yes. Adding a niche makes the weakness, title pairing and thumbnail angle more specific because hooks behave differently across creator growth, fitness, finance, AI and other markets.',
  },
  {
    question: 'Why do viewers leave in the first seconds?',
    answer: 'Viewers usually leave when the opening line is vague, slow, generic, or disconnected from the title and thumbnail promise.',
  },
  {
    question: 'How many credits does hook analysis use?',
    answer: 'A premium hook analysis uses 5 credits and saves the result to your workspace.',
  },
];

export default function HookAnalyzerSchema() {
  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'HookSignals Hook Analyzer',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://hooksignals.com/hook-analyzer',
    description: 'AI hook analyzer for creators. Score short-form video hooks for clarity, curiosity, retention risk, platform fit, niche context and audience trigger.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Hook score',
      'Retention risk analysis',
      'Audience trigger detection',
      'Title pairing suggestions',
      'Thumbnail angle suggestions',
      'Saved creator workspace',
    ],
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hooksignals.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://hooksignals.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Hook Analyzer', item: 'https://hooksignals.com/hook-analyzer' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
