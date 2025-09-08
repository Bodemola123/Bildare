"use client";

import { useAuth } from "@/context/AuthContext";
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
  const { userId } = useAuth(); // ✅ grab userId

  // Track pageviews
  useEffect(() => {
    const sendPageview = () => {
      if (typeof window.gtag !== "undefined") {
        console.log("[GA] Sending pageview:", pathname, "userId:", userId);
        window.gtag("config", GA_MEASUREMENT_ID, {
          page_path: pathname,
          user_id: userId || undefined, // ✅ attach userId if available
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
  }, [pathname, userId]);

  // Function to track custom events (with userId always included)
  const trackEvent = (name: string, params?: Record<string, any>) => {
    if (typeof window.gtag === "undefined") {
      console.log("[GA] Tried to send event but gtag not ready:", name, params);
      return;
    }

    const fullParams = {
      ...params,
      user_id: userId || undefined, // ✅ always include userId
    };

    console.log("[GA] Sending event:", name, fullParams);
    window.gtag("event", name, fullParams);
  };

  return { trackEvent };
};
