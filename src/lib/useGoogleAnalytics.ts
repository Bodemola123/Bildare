"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-FZ2G3068XM";

export const useGoogleAnalytics = () => {
  const pathname = usePathname();

  // Track pageviews
  useEffect(() => {
    const sendPageview = () => {
      if (typeof window.gtag !== "undefined") {
        console.log("[GA] Sending pageview:", pathname);
        window.gtag("config", GA_MEASUREMENT_ID, {
          page_path: pathname,
        });
        return true;
      } else {
        console.log("[GA] gtag not ready, retrying...");
        return false;
      }
    };

    // Try immediately, then retry until GA is ready
    if (!sendPageview()) {
      const interval = setInterval(() => {
        if (sendPageview()) clearInterval(interval);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [pathname]);

  // Function to track custom events
  const trackEvent = (name: string, params?: Record<string, any>) => {
    if (typeof window.gtag === "undefined") {
      console.log("[GA] Tried to send event but gtag not ready:", name, params);
      return;
    }
    console.log("[GA] Sending event:", name, params);
    window.gtag("event", name, params);
  };

  return { trackEvent };
};
