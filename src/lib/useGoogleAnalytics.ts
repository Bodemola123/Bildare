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
const GA_PROXY_ENDPOINT = "https://bildare-backend.onrender.com/analytics"; // your backend proxy

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
  const userName = auth?.username ?? null;

  // Helper to send events via gtag (client-side)
  const sendGtag = (command: string, ...params: any[]) => {
    if (!window.gtag) {
      console.log("[GA] gtag not ready, retrying in 500ms...");
      setTimeout(() => sendGtag(command, ...params), 500);
      return;
    }
    window.gtag("set", "debug_mode", true);
    console.log("[GA] Sending:", command, params);
    window.gtag(command, ...params);
  };

  // Send event to server-side proxy
  const sendToProxy = async (events: Array<{ name: string; params?: Record<string, any> }>) => {
    try {
      await fetch(GA_PROXY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          user_name: userName,
          page_path: pathname,
          events,
        }),
      });
      console.log("[GA Proxy] Event sent:", events);
    } catch (err) {
      console.error("[GA Proxy] Failed to send:", err);
    }
  };

  // Track pageviews
  useEffect(() => {
    const event = [{ name: "page_view", params: { page_path: pathname } }];
    sendGtag("config", GA_MEASUREMENT_ID, { page_path: pathname, user_id: userId || undefined });
    sendToProxy(event);
  }, [pathname, userId]);

  // Custom events
  const trackEvent = (name: string, params?: Record<string, any>) => {
    const event = [
      {
        name,
        params: {
          ...params,
          user_id: userId || undefined,
          user_name: userName || undefined,
        },
      },
    ];

    sendGtag("event", name, event[0].params);
    sendToProxy(event);
  };

  // Sync user name to gtag if available
  useEffect(() => {
    if (userName) {
      sendGtag("set", { user_name: userName });
    }
  }, [userName]);

  return { trackEvent };
};
