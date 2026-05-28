import { getOrganizationSchema, getSoftwareSchema } from "../lib/seo-content";

export default function StructuredData() {
  const organizationSchema = getOrganizationSchema();
  const softwareSchema = getSoftwareSchema();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is HookSignals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HookSignals is an AI-powered creator workflow platform for analyzing hooks, optimizing titles, generating scripts and improving creator retention before publishing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does HookSignals help with YouTube Shorts SEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HookSignals includes creator SEO workflows for YouTube Shorts, TikTok discovery, hook optimization and thumbnail readability.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is HookSignals for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HookSignals is designed for creators, agencies and brands publishing short-form content across YouTube Shorts, TikTok and creator-led media platforms.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
