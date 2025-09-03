"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface VerifyEmailProps {
  setCurrentSlide: (slide: string) => void;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ setCurrentSlide }) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        setCanResend(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);


  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

const handleContinue = async () => {
  if (otp.length < 6) return toast("Please enter the 6-digit OTP");

  const email = localStorage.getItem("forgotPasswordEmail");
  if (!email) return toast("Email not found. Please go back and enter your email again.");

  setLoading(true);

  try {
    const endpoint = 'https://bildare-backend.onrender.com/verify-reset-token'
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, token: otp }), // send both email and OTP
    });

    if (res.ok) {
        localStorage.setItem("resetToken", otp);
      setCurrentSlide("resetPassword"); // move to reset password slide
    } else {
      const data = await res.json();
      toast(data.message || "Invalid OTP");
    }
  } catch (err) {
    console.error(err);
    toast("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};


const handleResend = async () => {
  const email = localStorage.getItem("forgotPasswordEmail");
  if (!email) return toast("Email not found. Please go back and enter your email again.");

  setResendLoading(true);
  try {
    const endpoint = 'https://bildare-backend.onrender.com/request-password-reset'
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });

    if (res.ok) {
      toast("OTP resent successfully!");
      setTimeLeft(900); // reset timer
      setCanResend(false);
    } else {
      const data = await res.json();
      toast(data.message || "Failed to resend OTP");
    }
  } catch (err) {
    console.error(err);
    toast("Something went wrong. Try again.");
  } finally {
    setResendLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-6 
        h-fit w-full max-w-md md:max-w-lg 
        rounded-[20px] md:rounded-[29px] 
        p-5 md:p-6 bg-[#292A25]">

        {/* Icon */}
        <MdOutlineMarkEmailUnread className="text-[4rem] md:text-[7rem] text-white" />

        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-white font-bold text-center">
          Verify Email
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-white text-center font-normal px-2 md:px-0">
          A verification code has been sent to your email <br className="hidden md:block" />
          <span className="font-bold">{localStorage.getItem("forgotPasswordEmail")}</span>
        </p>

        {/* OTP Input */}
{/* OTP Input */}
<div className="w-full flex justify-center">
  <InputOTP
    value={otp}
    onChange={(val: string) => setOtp(val)}
    maxLength={6}
    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
  >
    <InputOTPGroup className="flex gap-3 md:gap-4">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <InputOTPSlot
          key={i}
          index={i}
          className="w-10 h-12 md:w-12 md:h-14 text-lg md:text-xl font-semibold 
            text-white bg-[#1C1D19] border border-[#3A3B36] 
            rounded-xl flex items-center justify-center 
            focus:border-[#B9F500] focus:ring-2 focus:ring-[#B9F500] 
            transition-colors"
        />
      ))}
    </InputOTPGroup>
  </InputOTP>
</div>


        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="bg-[#B9F500] w-full max-h-[48px] md:max-h-[51px] 
            px-4 md:px-[18px] py-[12px] md:py-[15px] 
            text-center rounded-2xl text-[#000000] font-bold 
            text-sm md:text-base cursor-pointer transition hover:opacity-90 flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? <AiOutlineLoading3Quarters className="animate-spin text-black" /> : "Continue"}
        </button>

        {/* Timer / Resend */}
        <p className="text-sm md:text-base font-normal text-center px-2 md:px-0">
          {canResend ? (
            <>
              Not received yet?{" "}
              <span
                className="text-[#b9f500] font-semibold cursor-pointer flex items-center gap-2"
                onClick={handleResend}
              >
                {resendLoading && <AiOutlineLoading3Quarters className="animate-spin text-black" />}
                Resend Verification Code
              </span>
            </>
          ) : (
            <>Time left: {formatTime(timeLeft)}</>
          )}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
