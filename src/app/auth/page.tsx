"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [isSignUp, setIsSignUp] = useState(true);

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
        <div className={`flex justify-between items-center h-[51px] w-full px-[45px] ${(isSignUp ? "flex-row":"flex-row-reverse")}`}>
          <motion.button
            layout
            onClick={() => setIsSignUp(true)}
            className={`transition-colors duration-300 ${
              isSignUp ? "text-white text-2xl font-semibold" : "text-[#B9F500] text-base font-bold"
            }`}
          >
            {isSignUp ? "Sign Up" : "Register"}
          </motion.button>
          <motion.button
            layout
            onClick={() => setIsSignUp(false)}
            className={`transition-colors duration-300 ${
              !isSignUp ? "text-white text-2xl font-semibold" : "text-[#B9F500] text-base font-bold"
            }`}
          >
            Login
          </motion.button>
        </div>

        {/* Google Button */}
        <div className="flex justify-center items-center mx-auto">
          <button className="flex justify-center items-center bg-[#ffffff] border-[#D8DADC] border py-[18px] px-[45px] rounded-2xl cursor-pointer">
            <Image src="/google.svg" alt="Google" width={20} height={20} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 w-full px-[45px]">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative h-[64px] py-1.5 rounded-2xl">
              <Input
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
                placeholder="••••••••"
                className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]"
                type="password"
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
              >
                Forgot password?
              </motion.button>
            )}
          </AnimatePresence>

          {/* Checkbox only in Sign-Up mode */}
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
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to receive marketing emails from Bildare, and understand I can unsubscribe at any time.
                </Label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <div className="px-[25px] w-full mx-auto flex justify-center">
          <Link href='/' className="bg-[#B9F500] w-full max-h-[51px] px-[18px] py-[15px] text-center rounded-2xl text-[#000000] font-bold text-base cursor-pointer transition hover:opacity-90 mx-[20px]">
          {isSignUp ? "Sign Up" : "Log in"}
        </Link>
        </div>

      </div>
    </div>
  );
};

export default Page;
