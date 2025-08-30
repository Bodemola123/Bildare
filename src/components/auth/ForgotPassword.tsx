"use client";

import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { TbLockExclamation } from "react-icons/tb";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ForgotPasswordProps {
  setCurrentSlide: (slide: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setCurrentSlide }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

const handleSendCode = async () => {
  if (!email) return toast("Please enter your email");
  setLoading(true);

  try {
    const endpoint = '/api/request-password-reset'
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });

    if (res.ok) {
      toast("Reset code sent successfully!");
      localStorage.setItem("forgotPasswordEmail", email); // save email for later
      setCurrentSlide("verifyEmail"); // move to OTP verification
    } else {
      const data = await res.json();
      toast(data.message || "Failed to send reset code");
    }
  } catch (err) {
    console.error(err);
    toast("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-[#292A25] rounded-[20px] md:rounded-[29px] p-6 md:p-10 w-full max-w-full md:max-w-[665px] h-auto md:max-h-[600px] relative flex justify-center items-center flex-col">

        {/* Back Button */}
        <button
          className="absolute top-4 left-4 md:top-6 md:left-6 text-xl md:text-2xl font-bold p-2 rounded-xl text-white"
          onClick={() => setCurrentSlide("auth")}
        >
          <IoArrowBackOutline />
        </button>  

        {/* Lock Icon */}
        <TbLockExclamation className="text-[5rem] md:text-[7rem] text-white" />

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-medium text-center mt-4 md:mt-5 text-[#f4f4f4]">
          Forgot Password
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-center mt-2 text-[#f4f4f4] px-3 md:px-0">
          Enter your email address below, and we&apos;ll send you a <br className="hidden md:block" />
          code to reset your password.
        </p>

        {/* Form Section */}
        <div className="flex flex-col w-full space-y-4 md:space-y-5 mt-5 md:mt-6 px-3 md:px-0">
          <div className="space-y-1 w-full max-w-full md:max-w-[402px] mx-auto">
            <Label htmlFor="email" className="text-fontlight font-normal text-sm md:text-base">
              Email address
            </Label>
            <div className="relative h-[56px] md:h-[64px] py-1.5 rounded-2xl">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19] text-sm md:text-base"
              />
              <Mail className="absolute left-3 top-4 md:top-5 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
            </div>
          </div>

          {/* Send Reset Code Button */}
          <button
            onClick={handleSendCode}
            className="bg-[#B9F500] w-full max-h-[48px] md:max-h-[51px] px-4 md:px-[18px] py-[12px] md:py-[15px] text-center rounded-2xl text-[#000000] font-bold text-sm md:text-base cursor-pointer transition hover:opacity-90 flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? <AiOutlineLoading3Quarters className="animate-spin text-black" /> : "Send reset code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
