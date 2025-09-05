// lib/useGoogleAnalytics.ts
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Replace with your GA Measurement ID
const GA_MEASUREMENT_ID = "G-FZ2G3068XM";

export const useGoogleAnalytics = () => {
  const pathname = usePathname();

  // Track pageviews
  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  // Function to track custom events
  const trackEvent = (name: string, params?: Record<string, any>) => {
    if (!window.gtag) return;
    window.gtag("event", name, params);
  };

  return { trackEvent };
};
