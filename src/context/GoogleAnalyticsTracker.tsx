"use client";
import { useGoogleAnalytics } from "@/lib/useGoogleAnalytics";

export default function GoogleAnalyticsTracker() {
  useGoogleAnalytics(); // automatically tracks route changes
  return null;
}
