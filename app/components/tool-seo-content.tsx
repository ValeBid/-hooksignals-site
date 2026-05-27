import FAQBlock from "./faq-block";
import FAQSchema from "./faq-schema";

const seoContent = {
  "hook-analyzer": {
    title: "Use the Hook Analyzer before publishing",
    intro:
      "A strong opening line helps viewers understand the value of the video quickly. Use this page to check whether your hook is clear, specific and strong enough to support retention before you publish.",
    howTo: [
      "Paste the first line or first few seconds of your video idea.",
      "Review the clarity, curiosity and retention signals.",
      "Rewrite weak hooks before recording or publishing.",
    ],
    bestFor: [
      "YouTube Shorts openings",
      "Long-form YouTube intros",
      "Creator scripts that need a stronger first line",
    ],
    useCases: [
      {
        title: "Pre-publish hook check",
        desc: "Run your opening sentence through the analyzer before posting to catch vague or slow starts.",
      },
      {
        title: "Compare hook versions",
        desc: "Test several versions of the same idea and keep the one with the clearest promise.",
      },
      {
        title: "Fix retention leaks",
        desc: "Use low scores as a signal that the first seconds need more tension or specificity.",
      },
    ],
    faq: [
      {
        question: "What does the Hook Analyzer check?",
        answer:
          "It checks clarity, curiosity and retention signals in your opening line so you can catch weak hooks before publishing.",
      },
      {
        question: "Can I use it for Shorts?",
        answer:
          "Yes. Shorts need fast hooks, so short-form creators can use it to test whether the first sentence gives viewers a reason to stay.",
      },
      {
        question: "Does a high score guarantee views?",
        answer:
          "No. It improves the opening signal, but topic, thumbnail, title and audience fit still matter.",
      },
      {
        question: "What should I do with a weak score?",
        answer:
          "Use the Hook Improver to rewrite the idea with a clearer promise, sharper tension and faster setup.",
      },
    ],
  },
  "hook-improver": {
    title: "Rewrite weak hooks into stronger openings",
    intro:
      "The Hook Improver turns rough ideas into clearer and more curiosity-driven opening lines. Use it when your video idea is good but the first sentence feels flat or too generic.",
    howTo: [
      "Paste a rough video topic, weak hook or unfinished opening line.",
      "Review the rewritten versions and choose the strongest angle.",
      "Send the best version to the Hook Analyzer before publishing.",
    ],
    bestFor: [
      "Weak video openings",
      "Creator ideas that need a sharper promise",
      "Shorts scripts that need faster tension",
    ],
    useCases: [
      {
        title: "Turn topics into hooks",
        desc: "Start with a plain topic and convert it into an opening line that gives viewers a reason to watch.",
      },
      {
        title: "Create multiple angles",
        desc: "Generate several hook directions before choosing the one that best matches the video.",
      },
      {
        title: "Repair vague ideas",
        desc: "Replace broad statements with clearer, more specific promises or problems.",
      },
    ],
    faq: [
      {
        question: "What does the Hook Improver do?",
        answer:
          "It rewrites rough ideas into multiple sharper hook variations focused on clarity, curiosity and retention.",
      },
      {
        question: "What should I paste into it?",
        answer:
          "Paste a video idea, rough hook or unfinished opening. It works best when your input describes the topic clearly.",
      },
      {
        question: "How is this different from the Hook Analyzer?",
        answer:
          "The Analyzer scores a hook. The Improver rewrites it. Use both together for a stronger workflow.",
      },
      {
        question: "Can I use the results directly?",
        answer:
          "Yes, but the best results usually come from choosing one version and adapting it to your voice.",
      },
    ],
  },
  "shorts-script-generator": {
    title: "Build a retention-focused Shorts script",
    intro:
      "Short-form scripts need to move quickly from hook to payoff. This page helps you structure a Short with a clear opening, tight beats and a direct call-to-action.",
    howTo: [
      "Enter the topic or idea for your Short.",
      "Use the generated hook and beats as a first draft.",
      "Trim every sentence that does not move the viewer forward.",
    ],
    bestFor: [
      "YouTube Shorts ideas",
      "TikTok and Reels outlines",
      "Fast creator script drafts",
    ],
    useCases: [
      {
        title: "Draft a Short quickly",
        desc: "Turn a topic into a simple hook, body and CTA structure before filming.",
      },
      {
        title: "Improve pacing",
        desc: "Use beat-by-beat structure to avoid slow intros and unfocused middle sections.",
      },
      {
        title: "Create repeatable formats",
        desc: "Build script templates you can reuse across similar content ideas.",
      },
    ],
    faq: [
      {
        question: "What does the Shorts Script Generator create?",
        answer:
          "It creates a short-form structure with a hook, body beats and a call-to-action.",
      },
      {
        question: "Can I use it for TikTok or Reels?",
        answer:
          "Yes. The structure is useful for most short-form platforms, not just YouTube Shorts.",
      },
      {
        question: "How long should the script be?",
        answer:
          "Keep it tight. Most Shorts work best when each sentence has a clear job and no slow setup.",
      },
      {
        question: "Should I analyze the hook after generating the script?",
        answer:
          "Yes. Send the opening line to the Hook Analyzer to check whether it is strong enough before recording.",
      },
    ],
  },
  "thumbnail-text-checker": {
    title: "Check thumbnail text before publishing",
    intro:
      "Thumbnail text needs to be short, readable and easy to understand at feed size. This page helps you catch text that is too long or too unclear before the video goes live.",
    howTo: [
      "Paste the words you plan to place on the thumbnail.",
      "Check the length and readability score.",
      "Rewrite the text until it is short enough to read quickly.",
    ],
    bestFor: [
      "YouTube thumbnail text",
      "CTR-focused title and thumbnail pairs",
      "Mobile feed readability checks",
    ],
    useCases: [
      {
        title: "Shorten crowded text",
        desc: "Find thumbnail copy that is too long before it becomes unreadable on mobile.",
      },
      {
        title: "Test title-thumbnail contrast",
        desc: "Make sure the thumbnail text adds a new angle instead of repeating the full title.",
      },
      {
        title: "Improve first impression",
        desc: "Use clearer text to help viewers understand the video faster in the feed.",
      },
    ],
    faq: [
      {
        question: "How long should thumbnail text be?",
        answer:
          "Aim for fewer than five words and ideally under about 30 characters so it stays readable on mobile.",
      },
      {
        question: "Should thumbnail text match the title?",
        answer:
          "It should support the title, but it does not need to repeat it. Often the best thumbnail text adds a second angle.",
      },
      {
        question: "Does this guarantee a higher CTR?",
        answer:
          "No. It helps with readability and clarity, but image choice, topic, title and audience demand also affect CTR.",
      },
      {
        question: "Can I use this before designing the thumbnail?",
        answer:
          "Yes. Testing the words first helps you design around a shorter and clearer message.",
      },
    ],
  },
  "youtube-hook-generator": {
    title: "Generate YouTube hooks with a stronger content workflow",
    intro:
      "The YouTube Hook Generator helps you shape the first line of a video before you write the full script. Use it with the analyzer and improver to move from idea to stronger opening faster.",
    howTo: [
      "Start with a clear topic or video angle.",
      "Choose a hook that creates a specific reason to keep watching.",
      "Analyze or rewrite the hook before finalizing the script.",
    ],
    bestFor: [
      "YouTube video intros",
      "Shorts opening lines",
      "Creator ideation sessions",
    ],
    useCases: [
      {
        title: "Start from a topic",
        desc: "Use a plain video idea and turn it into several opening directions.",
      },
      {
        title: "Avoid generic intros",
        desc: "Replace slow openings with specific hooks that get to the value faster.",
      },
      {
        title: "Build a full workflow",
        desc: "Generate the hook, analyze it, then use the Shorts Script Generator to build the rest of the video.",
      },
    ],
    faq: [
      {
        question: "What is a YouTube hook?",
        answer:
          "A YouTube hook is the opening line or first few seconds that gives viewers a reason to keep watching.",
      },
      {
        question: "Can I use generated hooks for Shorts?",
        answer:
          "Yes. Shorts often need even faster hooks because viewers decide quickly whether to swipe away.",
      },
      {
        question: "Should I test generated hooks?",
        answer:
          "Yes. Run your favorite option through the Hook Analyzer before recording or publishing.",
      },
      {
        question: "How many hook versions should I create?",
        answer:
          "Create several and compare them. Most strong hooks come from testing multiple angles, not accepting the first version.",
      },
    ],
  },
} as const;

export type ToolSeoKey = keyof typeof seoContent;

export default function ToolSEOContent({ tool }: { tool: ToolSeoKey }) {
  const content = seoContent[tool];

  return (
    <>
      <FAQSchema items={content.faq} />

      <section className="mx-auto max-w-6xl px-6 pb-14 text-white">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.035] p-7 md:p-10">
          <p className="mb-3 text-sm font-semibold text-emerald-300">
            Creator workflow guide
          </p>

          <h2 className="text-3xl font-semibold tracking-tight">
            {content.title}
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-white/55">
            {content.intro}
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <h3 className="text-lg font-semibold">How to use it</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-white/55">
                {content.howTo.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <h3 className="text-lg font-semibold">Best for</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-white/55">
                {content.bestFor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <h3 className="text-lg font-semibold">Practical use cases</h3>
              <div className="mt-4 space-y-4">
                {content.useCases.map((item) => (
                  <div key={item.title}>
                    <p className="font-medium text-white/85">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/50">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <FAQBlock items={content.faq} />
      </section>
    </>
  );
}
