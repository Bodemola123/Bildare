"use client";

import React, { useState } from "react";

import { Button } from "../ui/button";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import { useGoogleAnalytics } from "@/lib/useGoogleAnalytics";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2AboutYou from "./Step2AboutYou";
import Step3SocialLinks from "./Step3SocialLinks";
import Step4Preferences from "./Step4Preferences";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface BasicInfoProps {
  setCurrentSlide: (slide: string) => void;
}

type OnboardingData = {
  username: string;
  role: string;
  avatarUrl: string | null;

  firstName: string;
  lastName: string;
  bio: string;

  twitter: string;
  linkedin: string;
  github: string;

  interests: string;
  referralCode: string;
};

const initialData: OnboardingData = {
  username: "",
  role: "",
  avatarUrl: null,

  firstName: "",
  lastName: "",
  bio: "",

  twitter: "",
  linkedin: "",
  github: "",

  interests: "",
  referralCode: "",
};

const stepsTitles = [
  "Personal Info",
  "About You",
  "Social Links",
  "Preferences",
];

const BasicInfo: React.FC<BasicInfoProps> = ({ setCurrentSlide }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [loading, setLoading] = useState(false);

  const { fetchSession } = useAuth();
  const { trackEvent } = useGoogleAnalytics();

  const totalSteps = stepsTitles.length;

  const update = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const canNextFromStep1 = data.username.trim() !== "" && data.role.trim() !== "";

  const goNext = () => {
    if (step === 0 && !canNextFromStep1) {
      toast("Please fill Username and Role to continue");
      return;
    }
    setStep((s) => Math.min(totalSteps - 1, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async () => {
    // Final submission (Option A)
    const email = localStorage.getItem("signupEmail");
    const password = localStorage.getItem("signupPassword");

    if (!email) {
      toast("Missing signup email. Please sign up again.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = "/api/auth/complete-profile"; // customize if needed

      const cleanInterests = data.interests
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);

      const socialLinks: { twitter?: string; linkedin?: string; github?: string } = {};
      if (data.twitter.trim()) socialLinks.twitter = data.twitter.trim();
      if (data.linkedin.trim()) socialLinks.linkedin = data.linkedin.trim();
      if (data.github.trim()) socialLinks.github = data.github.trim();

      const body = {
        email,
        username: data.username.trim().toLowerCase(),
        role: data.role.trim(),
        first_name: data.firstName.trim() || null,
        last_name: data.lastName.trim() || null,
        bio: data.bio.trim() || null,
        avatar_url: data.avatarUrl || null,
        interests: cleanInterests,
        social_links: Object.keys(socialLinks).length ? socialLinks : null,
        referralCode: data.referralCode.trim() || null,
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const respJson = await res.json().catch(() => ({}));

      if (res.ok) {
        await fetchSession();
        toast("Profile completed successfully!");
        trackEvent("profile_completed", { role: data.role });
        // navigate to success screen or update UI
        setCurrentSlide("signupSuccess");
      } else {
        toast(respJson.error || `Error ${res.status}: Failed to submit info`);
      }
    } catch (err) {
      console.error("❌ Complete profile error:", err);
      toast("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-transparent">
      <div className="bg-[#292A25] rounded-[30px] md:rounded-[40px] pb-6 md:pb-10 w-full max-w-full md:max-w-[600px] h-auto md:max-h-[856px] flex flex-col items-center overflow-y-auto scrollbar-hide">
        {/* Header: logo / progress */}
                <div className="w-full h-[155px] relative">
                  <Image
                    src="/SigninLogo.svg"
                    alt="Auth Image"
                    fill
                    className="object-cover"
                  />
                </div>
        <div className="w-full flex items-center justify-around gap-3.5 p-2.5 mt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={goBack}
              disabled={step === 0}
            
            >
              <GoArrowLeft className="text-white text-2xl opacity-80 hover:opacity-100 cursor-pointer"/>
            </button>
          </div>
          <div className="flex items-center gap-2">
              {/* progress bar segments */}
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-[50px] md:w-[64px] rounded-[12px] ${
                    i <= step ? "bg-[#B9F500]" : "bg-[#3C3D39]"
                  }`}
                />
              ))}
            </div>
          <div className="w-[31px] h-[23px]"></div>
        </div>

        <h1 className="text-[40px] font-bold text-white mt-1">{stepsTitles[step]}</h1>
        <p className="text-base text-[#969696] text-center px-4 md:px-0">
          {step === 0 && "A few details to personalize your experience"}
          {step === 1 && "Tell us a bit about yourself"}
          {step === 2 && "Share your social links (optional)"}
          {step === 3 && "Preferences & referral (optional)"}
        </p>

        <div className="w-full mt-2">
          {step === 0 && (
            <Step1PersonalInfo
              username={data.username}
              setUsername={(v) => update("username", v)}
              role={data.role}
              setRole={(v) => update("role", v)}
              avatarUrl={data.avatarUrl}
              setAvatarUrl={(v) => update("avatarUrl", v)}
            />
          )}

          {step === 1 && (
            <Step2AboutYou
              firstName={data.firstName}
              setFirstName={(v) => update("firstName", v)}
              lastName={data.lastName}
              setLastName={(v) => update("lastName", v)}
              bio={data.bio}
              setBio={(v) => update("bio", v)}
            />
          )}

          {step === 2 && (
            <Step3SocialLinks
              twitter={data.twitter}
              setTwitter={(v) => update("twitter", v)}
              linkedin={data.linkedin}
              setLinkedin={(v) => update("linkedin", v)}
              github={data.github}
              setGithub={(v) => update("github", v)}
            />
          )}

          {step === 3 && (
            <Step4Preferences
              interests={data.interests}
              setInterests={(v) => update("interests", v)}
              referralCode={data.referralCode}
              setReferralCode={(v) => update("referralCode", v)}
            />
          )}
        </div>

        {/* Nav buttons */}
        <div className=" mt-6 flex gap-3">

          {step < totalSteps - 1 ? (
<button
  onClick={goNext}
  disabled={loading || (step === 0 && !canNextFromStep1)}
  className={`
    flex flex-row items-center justify-center 
    rounded-[38px] flex-1 gap-2.5 px-[52px] py-[14px]
    h-fit w-fit md:h-[59px] md:w-[470px] 
    cursor-pointer transition-all duration-200

    ${loading || (step === 0 && !canNextFromStep1)
      ? "bg-[#7A9A00] text-black cursor-not-allowed opacity-70" 
      : "bg-[#B9F500] hover:bg-[#A2D600] text-black"}
  `}
>
  Continue <GoArrowRight className="text-black text-lg" />
</button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#B9F500] flex flex-row items-center justify-center text-black rounded-[38px] flex-1 gap-2.5 px-[52px] py-[14px] h-fit w-fit md:h-[59px] md:w-[470px] cursor-pointer hover:bg-[#7A9A00]"
            >
              {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Continue"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
