"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-Z9N49E2FSH";

export const useGoogleAnalytics = () => {
  const pathname = usePathname();

  // ✅ Wrap useAuth safely — never throws, always returns something
  const auth = (() => {
    try {
      return useAuth();
    } catch {
      return null; // No provider (e.g., not-found)
    }
  })();

  const userId = auth?.userId ?? null;

  // Track pageviews
  useEffect(() => {
    const sendPageview = () => {
      if (typeof window.gtag !== "undefined") {
        console.log("[GA] Sending pageview:", pathname, "userId:", userId);
        window.gtag("config", GA_MEASUREMENT_ID, {
          page_path: pathname,
          user_id: userId || undefined,
        });
        return true;
      } else {
        console.log("[GA] gtag not ready, retrying...");
        return false;
      }
    };

    if (!sendPageview()) {
      const interval = setInterval(() => {
        if (sendPageview()) clearInterval(interval);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [pathname, userId]); // ✅ re-run when userId changes

  // Custom events
  const trackEvent = (name: string, params?: Record<string, any>) => {
    if (typeof window.gtag === "undefined") {
      console.log("[GA] Tried to send event but gtag not ready:", name, params);
      return;
    }

    const fullParams = {
      ...params,
      user_id: userId || undefined,
    };

    console.log("[GA] Sending event:", name, fullParams);
    window.gtag("event", name, fullParams);
  };

  return { trackEvent };
};
