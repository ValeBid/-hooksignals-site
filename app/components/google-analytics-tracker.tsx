"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

export default function GoogleAnalyticsTracker({
  measurementId,
}: {
  measurementId: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the initial mount — gtag('config') in the inline script already
    // fires a page_view for the landing page. Only track subsequent navigations.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const search = searchParams.toString();
    const url = pathname + (search ? `?${search}` : "");

    window.gtag("event", "page_view", {
      send_to: measurementId,
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams, measurementId]);

  return null;
}
