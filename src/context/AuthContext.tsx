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
import { useRouter } from "next/navigation";

interface UserProfile {
  profile_id: number;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
}

interface AuthContextType {
  userId: number | null;
  username: string | null;
  role: string | null;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  profile: UserProfile | null;
  referralCode: string | null;
  referred_by: string | null;
  referredBy: string | null;
  referralCount: number;
  interests: string[];
  isLoading: boolean;
  fadeOut: boolean;
  fetchSession: () => Promise<void>;
  clearAuth: (redirect?: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [referralCode, setReferralCode] = useState<string | null>(null);
const [referred_by, setReferredBy] = useState<string | null>(null);
const [referredBy, setReferredByUser] = useState<string | null>(null);
const [referralCount, setReferralCount] = useState<number>(0);
  const [fadeOut, setFadeOut] = useState(false);
  const hasFetchedSession = useRef(false);


  const { trackEvent } = useGoogleAnalytics();
  const router = useRouter();

  const isFetchingRef = useRef(false);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

const fetchSession = async () => {
  // Prevent duplicate calls completely
  if (hasFetchedSession.current || isFetchingRef.current) return;

  hasFetchedSession.current = true;
  isFetchingRef.current = true;

  setIsLoading(true);
  try {
    const res = await fetch("https://bildare-backend.onrender.com/user/me", {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      console.log("User info:", data);

      setUserId(data.user_id ?? null);
      setInterests(data.interests ?? []);
      setUsername(data.username ?? null);
      setRole(data.role ?? null);
      setEmail(data.email ?? null);
      setAccessToken(data.accessToken ?? null);
      setRefreshToken(data.refreshToken ?? null);
      setProfile(data.profile ?? null);

      setReferralCode(data.referralCode ?? null);
      setReferredBy(data.referred_by ?? null);
      setReferredByUser(data.referredBy ?? null);
      setReferralCount(data.referralCount ?? 0);

      if (data.user_id) {
        trackEvent("login_success", {
          user_id: data.user_id,
          username: data.username,
          role: data.role,
          email: data.email,
        });
      }

      if (typeof window !== "undefined" && window.location.pathname === "/auth") {
        setFadeOut(true);
        redirectTimeoutRef.current = setTimeout(() => {
          router.replace("/");
        }, 300);
      }
    } else if (res.status === 401) {
      clearAuth(false);
    } else {
      clearAuth(false);
    }
  } catch (err) {
    console.error("❌ fetch error:", err);
    clearAuth(false);
  } finally {
    isFetchingRef.current = false;
    setIsLoading(false);
  }
};


  const clearAuth = async (redirect: boolean = true) => {
    hasFetchedSession.current = false;

    try {
      if (userId) {
        trackEvent("logout", { user_id: userId, username, role, email });
      }

      await fetch("https://bildare-backend.onrender.com/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("❌ Logout request failed:", err);
    } finally {
      setUserId(null);
      setUsername(null);
      setRole(null);
      setEmail(null);
      setAccessToken(null);
      setRefreshToken(null);
      setProfile(null);
      setInterests([]);
      isFetchingRef.current = false;

      if (redirect) {
        router.replace("/auth"); // SPA-style redirect
      }
    }
  };

  useEffect(() => {
    // Skip fetchSession on /auth page to prevent loops
    if (typeof window !== "undefined" && window.location.pathname !== "/auth") {
      fetchSession();
    }
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        username,
        role,
        email,
        interests,
        accessToken,
        refreshToken,
        profile,
        referralCode,
        referred_by,
        referredBy,
        referralCount,
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
  if (!context) {
    return {
      userId: null,
      username: null,
      role: null,
      email: null,
      accessToken: null,
      refreshToken: null,
      profile: null,
      interests: [],
      referralCode: null,
      referred_by: null,
      referredBy: null,
      referralCount: 0,
      isLoading: false,
      fadeOut: false,
      fetchSession: async () => {},
      clearAuth: () => {},
    } satisfies AuthContextType;
  }
  return context;
};
