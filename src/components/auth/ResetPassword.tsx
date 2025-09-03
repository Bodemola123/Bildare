"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ResetPasswordProps {
  setCurrentSlide: (slide: string) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ setCurrentSlide }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleResetPassword = async () => {
  if (!newPassword || !confirmPassword) {
    return toast("Please fill in both fields");
  }
  if (newPassword !== confirmPassword) {
    return toast("Passwords do not match");
  }

  const email = localStorage.getItem("forgotPasswordEmail"); // get saved email
  const token = localStorage.getItem("resetToken"); // save token when entering VerifyEmail

  if (!email || !token) return toast("Missing email or token");

  setLoading(true);
  try {
    const endpoint = 'https://bildare-backend.onrender.com/reset-password'
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, token: token, newPassword: newPassword }),
    });

    if (res.ok) {
      toast("Password reset successfully!");
      localStorage.removeItem("forgotPasswordEmail");
      localStorage.removeItem("resetToken");

      setCurrentSlide("auth"); // redirect to login
    } else {
      const data = await res.json();
      toast(data.message || "Failed to reset password");
    }
  } catch (err) {
    console.error(err);
    toast("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen px-4">
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

        <div className="flex flex-col px-6 gap-5 w-full pb-6">
        {/* New Password */}
        <div className="w-full mt-4">
          <Label className="block text-[#f4f4f4] mb-2 text-sm md:text-base">
            New Password
          </Label>
          <div className="relative h-[56px]">
            <Input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="placeholder:text-[#757575] text-white w-full h-full bg-[#1C1D19] text-sm md:text-base rounded-2xl pr-10"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="w-full mt-4">
          <Label className="block text-[#f4f4f4] mb-2 text-sm md:text-base">
            Confirm New Password
          </Label>
          <div className="relative h-[56px]">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="placeholder:text-[#757575] text-white w-full h-full bg-[#1C1D19] text-sm md:text-base rounded-2xl pr-10"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground focus:outline-none"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleResetPassword}
          className="bg-[#B9F500] w-full max-h-[48px] md:max-h-[51px] 
            px-4 md:px-[18px] py-[12px] md:py-[15px] 
            text-center rounded-2xl text-[#000000] font-bold 
            text-sm md:text-base cursor-pointer transition hover:opacity-90 mt-4 flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? <AiOutlineLoading3Quarters className="animate-spin text-black" /> : "Reset Password"}
        </button>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
