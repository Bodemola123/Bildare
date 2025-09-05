"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleAnalytics } from "@/lib/useGoogleAnalytics";



interface AuthPageProps {
  setCurrentSlide: (slide: string) => void;
}


const AuthPage: React.FC<AuthPageProps> = ({ setCurrentSlide }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  

 const { fetchSession, fadeOut } = useAuth();
 const { trackEvent } = useGoogleAnalytics();

  // ✅ Auto-check session on mount (fade-out handled in AuthProvider)
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const check = async () => {
      try {
        await fetchSession(); // single fetch, may redirect if logged in
      } catch (err) {
        toast.error("Unable to verify session. Please try again.");
      } finally {
        // wait for AuthProvider's fadeOut to complete before showing form
        timeout = setTimeout(() => setCheckingSession(false), 400);
      }
    };
    check();
    return () => clearTimeout(timeout); // prevent memory leaks
  }, [fetchSession]);

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isSignUp
        ? "https://bildare-backend.onrender.com/signup"
        : "https://bildare-backend.onrender.com/login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
      if (!isSignUp) {
        await fetchSession();
        setCurrentSlide("signinSuccess");
        toast.success(`Welcome back, ${data.name || "user"}!`);

        // Track login
        trackEvent("login", { method: "email" });
      } else {
        localStorage.setItem("signupEmail", email);
        localStorage.setItem("signupPassword", password);
        setCurrentSlide("emailVerify");
        toast.success(
          "Signup successful! We sent you an OTP. Please verify your email."
        );

        // Track signup
        trackEvent("signup", { method: "email" });
      }

      } else if (res.status === 400) {
        console.error("❌ Server returned 400:", data);
        toast.error(data.error || "Bad request. Try again.");
      } else {
        console.error(`❌ Server returned ${res.status}:`, data);
        toast.error(data.error || data.message || `Error ${res.status}`);
      }
    } catch (err) {
      console.error("❌ Fetch/network error:", err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loader while checking session
  if (checkingSession) {
    return (
      <div
        aria-busy="true"
        className={`flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white transition-opacity duration-400 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="animate-bounce mb-4">
          <Image src="/BigBildare.svg" alt="Logo" width={227} height={227} />
        </div>
        <p className="text-lg font-semibold">Loading experience...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="flex flex-col bg-[#292A25] pb-[42px] rounded-[34px] items-center gap-[19px] max-w-[517px] w-full overflow-hidden">
        {/* Top Image */}
        <div className="w-full h-[155px] relative">
          <Image
            src="/SigninLogo.svg"
            alt="Auth Image"
            fill
            className="object-cover"
          />
        </div>

        {/* Toggle */}
        <div
          className={`flex justify-between items-center h-[51px] w-full px-[45px] ${
            isSignUp ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <motion.button
            layout
              onClick={() => {
    setIsSignUp(true);
    trackEvent("auth_toggle", { view: "signup" });
  }}
            className={`transition-colors duration-300 ${
              isSignUp
                ? "text-white text-2xl font-semibold"
                : "text-[#B9F500] text-base font-bold"
            }`}
          >
            {isSignUp ? "Sign Up" : "Register"}
          </motion.button>
          <motion.button
            layout
            onClick={() => {setIsSignUp(false); trackEvent("auth_toggle", { view: "login" });}}
            className={`transition-colors duration-300 ${
              !isSignUp
                ? "text-white text-2xl font-semibold"
                : "text-[#B9F500] text-base font-bold"
            }`}
          >
            Login
          </motion.button>
        </div>

        {/* Google Button */}
        <div className="flex justify-center items-center mx-auto">
          <button
            className="flex justify-center items-center bg-[#ffffff] border-[#D8DADC] border py-[18px] px-[45px] rounded-2xl cursor-pointer"
            onClick={() => {
              trackEvent("login", { method: "google" }); // Track Google login click
              window.location.href =
                "https://bildare-backend.onrender.com/auth/google";
            }}
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
          </button>

        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 w-full px-[45px]">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative h-[64px] py-1.5 rounded-2xl">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]"
              />
              <Mail className="absolute left-3 top-5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative h-[64px] py-1.5 rounded-2xl">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]"
              />
              <LockKeyhole className="absolute left-3 top-5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <AnimatePresence>
            {!isSignUp && (
            <motion.button
              key="forgot"
              type="button"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-[#B9F500] self-end cursor-pointer hover:underline"
              onClick={() => {
                setCurrentSlide("forgot");
                trackEvent("forgot_password_click");
              }}
            >
              Forgot password?
            </motion.button>

            )}
          </AnimatePresence>

          <AnimatePresence>
            {isSignUp && (
              <motion.div
                key="checkbox"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-row justify-center items-center gap-2"
              >
                <Checkbox id="terms"   onCheckedChange={(checked) => {
    trackEvent("terms_checkbox", { checked });
  }} />
                <Label htmlFor="terms" className="text-sm">
                  I agree to receive marketing emails from Bildare, and
                  understand I can unsubscribe at any time.
                </Label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <div className="px-[25px] w-full mx-auto flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-[#B9F500] w-full max-h-[51px] px-[18px] py-[15px] text-center rounded-2xl text-[#000000] font-bold text-base cursor-pointer transition hover:opacity-90 mx-[20px] flex justify-center items-center gap-2"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-black" />
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Log in"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
