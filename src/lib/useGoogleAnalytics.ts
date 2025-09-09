"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = "G-Z9N49E2FSH";

export const useGoogleAnalytics = () => {
  const pathname = usePathname();

  const auth = (() => {
    try {
      return useAuth();
    } catch {
      return null;
    }
  })();

  const userId = auth?.userId ?? null;

  // Force gtag to debug mode and retry sending events
  const sendGtag = (command: string, ...params: any[]) => {
    if (!window.gtag) {
      console.log("[GA] gtag not ready, retrying in 500ms...");
      setTimeout(() => sendGtag(command, ...params), 500);
      return;
    }

    // Debug mode forces GA to register events for testing
    window.gtag("set", "debug_mode", true);

    console.log("[GA] Sending:", command, params);
    window.gtag(command, ...params);
  };

  // Track pageviews
  useEffect(() => {
    sendGtag("config", GA_MEASUREMENT_ID, {
      page_path: pathname,
      user_id: userId || undefined,
    });
  }, [pathname, userId]);

  // Custom events
  const trackEvent = (name: string, params?: Record<string, any>) => {
    const fullParams = {
      ...params,
      user_id: userId || undefined,
    };
    sendGtag("event", name, fullParams);
  };

  return { trackEvent };
};
