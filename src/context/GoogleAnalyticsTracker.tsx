"use client";
import { useGoogleAnalytics } from "@/lib/useGoogleAnalytics";

export default function GoogleAnalyticsTracker() {
    console.log("[GA] Tracker mounted"); // 👈 add this
  useGoogleAnalytics(); // automatically tracks route changes
  return null;
}
