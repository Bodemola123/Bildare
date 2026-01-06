"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { toast } from "sonner";

const Security = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  // Password criteria check
  const passwordCriteria = {
    length: newPassword.length >= 8,
    number: /[0-9]/.test(newPassword),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    upperLower: /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword),
  };

  const isPasswordStrong = Object.values(passwordCriteria).every(Boolean);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (!isPasswordStrong) {
      toast.error("Password does not meet all criteria.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "/api/user/change-password",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update password.");
      } else {
        toast.success("Password updated successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 px-4">

      <h1 className="text-white font-semibold text-sm">Security</h1>

      {/* OLD PASSWORD */}
      <div className="w-full space-y-2">
        <Label className="text-base font-normal text-white">Old Password</Label>
        <div className="relative">
          <Input
            type={showOld ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="!h-[62px] w-full px-6 py-2 !bg-[#292A25] text-white placeholder:text-[#969696] border border-transparent !rounded-[16px]"
            placeholder="Enter old password"
          />
          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#969696]"
          >
            {showOld ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
          </button>
        </div>
      </div>

      {/* NEW PASSWORD */}
      <div className="w-full space-y-2">
        <Label className="text-base font-normal text-white">New Password</Label>
        <div className="relative">
          <Input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="!h-[62px] w-full px-6 py-2 !bg-[#292A25] text-white placeholder:text-[#969696] border border-transparent !rounded-[16px]"
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#969696]"
          >
            {showNew ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
          </button>
        </div>

        {/* Password Criteria Checklist */}
        <div className="mt-2 flex flex-col gap-1 text-xs">
          <p className={`${passwordCriteria.length ? "text-green-400" : "text-red-500"}`}>
            • At least 8 characters
          </p>
          <p className={`${passwordCriteria.number ? "text-green-400" : "text-red-500"}`}>
            • Includes a number
          </p>
          <p className={`${passwordCriteria.symbol ? "text-green-400" : "text-red-500"}`}>
            • Includes a symbol (!@#$…)
          </p>
          <p className={`${passwordCriteria.upperLower ? "text-green-400" : "text-red-500"}`}>
            • Uppercase & lowercase letters
          </p>
        </div>
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="w-full space-y-2">
        <Label className="text-base font-normal text-white">Confirm Password</Label>
        <div className="relative">
          <Input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="!h-[62px] w-full px-6 py-2 !bg-[#292A25] text-white placeholder:text-[#969696] border border-transparent !rounded-[16px]"
            placeholder="Confirm new password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#969696]"
          >
            {showConfirm ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
          </button>
        </div>

        {confirmPassword && (
          <p
            className={`text-xs mt-1 ${
              confirmPassword === newPassword ? "text-green-400" : "text-red-500"
            }`}
          >
            {confirmPassword === newPassword ? "Passwords match" : "Passwords do not match"}
          </p>
        )}
      </div>

      {/* BUTTON */}
      <div className="flex w-full justify-end mt-4">
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className={`px-6 py-3 rounded-xl bg-[#B9F500] text-black font-semibold cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </div>
  );
};

export default Security;
