"use client";
import { useState } from "react";
import AuthPage from "./AuthPage";
import ForgotPassword from "@/components/auth/ForgotPassword";
import VerifyEmail from "@/components/auth/VerifyEmail";
import ResetPassword from "@/components/auth/ResetPassword";
import EmailVerify from "@/components/auth/EmailVerify";
import BasicInfo from "@/components/auth/BasicInfo";
import SignupSuccess from "@/components/auth/SignupSuccess";
import SigninSuccess from "@/components/auth/SigninSuccess";

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState("auth");

  const renderSlide = () => {
    switch (currentSlide) {
      case "auth":
        return <AuthPage setCurrentSlide={setCurrentSlide} />;
      case "forgot":
        return <ForgotPassword setCurrentSlide={setCurrentSlide} />;
      case "verifyEmail":
        return <VerifyEmail setCurrentSlide={setCurrentSlide} />;
      case "resetPassword":
        return <ResetPassword setCurrentSlide={setCurrentSlide} />;
      case "emailVerify":
        return <EmailVerify setCurrentSlide={setCurrentSlide} />;
      case "basicInfo":
        return <BasicInfo setCurrentSlide={setCurrentSlide} />;
      case "signupSuccess":
        return <SignupSuccess />;
      case "signinSuccess":
        return <SigninSuccess />;
      default:
        return <AuthPage setCurrentSlide={setCurrentSlide} />;
    }
  };

  return <div>{renderSlide()}</div>;
}
