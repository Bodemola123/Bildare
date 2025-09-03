"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  name: string | null;
  role: string | null;
  email: string | null;
  otp: string | null;
  isLoading: boolean;
  fetchSession: () => Promise<void>;
  clearAuth: (redirect?: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtpState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
const [hasFetched, setHasFetched] = useState(false);

const fetchSession = async () => {
  // Avoid repeated calls
  if (hasFetched) return;

  setIsLoading(true);

  try {
    const res = await fetch("https://bildare-backend.onrender.com/me", {
      method: "GET",
      credentials: "include", // ✅ sends cookies/session
    });

    if (res.ok) {
      const data = await res.json();
      setName(data.name ?? null);
      setRole(data.role ?? null);
      setEmail(data.email ?? null);
      console.log("✅ Session fetched:", data);

      // Auto-detect login
      if (typeof window !== "undefined" && window.location.pathname === "/auth") {
        window.location.href = "/"; // redirect to main page
      }
    } else if (res.status === 401) {
      console.warn("❌ Not authenticated (401)");
      clearAuth(false); // reset state, no redirect
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
    setHasFetched(true);
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
      setName(null);
      setRole(null);
      setEmail(null);
      setOtpState(null);
      setHasFetched(false); // reset, so next login refetches
      if (redirect) {
        window.location.href = "/auth";
      }
    }
  };

  // ✅ Run once when app mounts
  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ name, role, email, otp, isLoading, fetchSession, clearAuth }}
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
