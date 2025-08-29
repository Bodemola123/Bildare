"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  name: string | null;
  role: string | null;
  email: string | null;
  otp: string | null;
  fetchSession: () => Promise<void>; // ✅ Add this
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtpState] = useState<string | null>(null);

  // ✅ Fetch session from server
  const fetchSession = async () => {
    try {
      const res = await fetch("https://bildare-backend.onrender.com/me", {
        method: "GET",
        credentials: "include", // important to send cookies
      });

      if (res.ok) {
        const data = await res.json();
        setName(data.name ?? null);
        setRole(data.role ?? null);
        setEmail(data.email ?? null);
        console.log("Session fetched:", data);
      } else {
        console.warn("Not authenticated");
        clearAuth();
      }
    } catch (err) {
      console.error("Failed to fetch session:", err);
      clearAuth();
    }
  };

const clearAuth = async () => {
  try {
    await fetch("https://bildare-backend.onrender.com/logout", {
      method: "POST",
      credentials: "include", // important to send cookies
    });
  } catch (err) {
    console.error("❌ Logout request failed:", err);
  } finally {
    // Clear local client state
    setName(null);
    setRole(null);
    setEmail(null);
    setOtpState(null);
    // redirect to login page
    window.location.href = "/auth";
  }
};


  return (
    <AuthContext.Provider
      value={{ name, role, email, otp, fetchSession, clearAuth }}
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
