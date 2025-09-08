"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useGoogleAnalytics } from "@/lib/useGoogleAnalytics";

interface AuthContextType {
  userId: string | null;
  name: string | null;
  role: string | null;
  email: string | null;
  otp: string | null;
  isLoading: boolean;
  fadeOut: boolean;
  fetchSession: () => Promise<void>;
  clearAuth: (redirect?: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtpState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const hasFetchedRef = useRef(false);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { trackEvent } = useGoogleAnalytics();

  const fetchSession = async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    setIsLoading(true);

    try {
      const res = await fetch("https://bildare-backend.onrender.com/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();

        setUserId(data.id ?? null);
        setName(data.name ?? null);
        setRole(data.role ?? null);
        setEmail(data.email ?? null);

        // ✅ Tell GA the user id
        if (typeof window !== "undefined" && window.gtag && data.id) {
          console.log("[GA] Setting user_id:", data.id);
          window.gtag("set", { user_id: data.id });
          trackEvent("user_logged_in", { user_id: data.id, role: data.role });
        }

        // Redirect if on /auth
        if (typeof window !== "undefined" && window.location.pathname === "/auth") {
          setFadeOut(true);
          redirectTimeoutRef.current = setTimeout(() => {
            window.location.href = "/";
          }, 300);
        }
      } else if (res.status === 401) {
        console.warn("❌ Not authenticated (401)");
        clearAuth(false);
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error(`❌ Session fetch failed (${res.status}):`, errorData);
        clearAuth(false);
      }
    } catch (err) {
      console.error("❌ Network/Fetch error:", err);
      clearAuth(false);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuth = async (redirect: boolean = true) => {
    try {
      await fetch("https://bildare-backend.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("❌ Logout request failed:", err);
    } finally {
      setUserId(null);
      setName(null);
      setRole(null);
      setEmail(null);
      setOtpState(null);
      hasFetchedRef.current = false;

      if (redirect) {
        window.location.href = "/auth";
      }
    }
  };

  useEffect(() => {
    fetchSession();
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ userId, name, role, email, otp, isLoading, fadeOut, fetchSession, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
