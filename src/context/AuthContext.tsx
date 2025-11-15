"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useGoogleAnalytics } from "@/lib/useGoogleAnalytics"; // ✅ import GA hook

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

  const { trackEvent } = useGoogleAnalytics(); // ✅ GA tracker

  const hasFetchedRef = useRef(false);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSession = async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    setIsLoading(true);

    try {
      const res = await fetch("https://bildare-backen.onrender.com/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserId(data.id ?? null);
        setName(data.name ?? null);
        setRole(data.role ?? null);
        setEmail(data.email ?? null);

        // ✅ Automatically track login success
        if (data.id) {
          trackEvent("login_success", {
            user_id: data.id,
            role: data.role,
            email: data.email,
          });
        }

        // Redirect if user is on /auth
        if (
          typeof window !== "undefined" &&
          window.location.pathname === "/auth"
        ) {
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
      // ✅ Fire logout event before clearing user
      if (userId) {
        trackEvent("logout", {
          user_id: userId,
          role,
          email,
        });
      }

      await fetch("https://bildare-backen.onrender.com/logout", {
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
      value={{
        userId,
        name,
        role,
        email,
        otp,
        isLoading,
        fadeOut,
        fetchSession,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  // If no provider, return a "safe fallback"
  if (!context) {
    return {
      userId: null,
      name: null,
      role: null,
      email: null,
      otp: null,
      isLoading: false,
      fadeOut: false,
      fetchSession: async () => {},
      clearAuth: () => {},
    } satisfies AuthContextType;
  }

  return context;
};
