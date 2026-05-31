import { track } from "@vercel/analytics";

// Typed event catalog — extend here as new events are added.
type AnalyticsEvent =
  | { name: "cta_click"; props: { label: string; destination: string; location: string } }
  | { name: "tool_launch"; props: { tool: string; source: string } }
  | { name: "email_submit"; props: { source: string } }
  | { name: "pricing_click"; props: { plan: string; action: string } }
  | { name: "hook_analyze"; props: { platform: string; has_niche: boolean } }
  | { name: "video_analyze"; props: { source?: string; mode?: string } }
  | { name: "upgrade_prompt"; props: { reason: string; tool: string } };

export function trackEvent(event: AnalyticsEvent) {
  try {
    track(event.name, event.props as Record<string, string | number | boolean>);
  } catch {
    // Never throw — analytics must not break the UI
  }
}
