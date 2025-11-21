"use client";

import React, { useState } from "react";
import { RiInfoCardLine } from "react-icons/ri";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UserRound } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import { useGoogleAnalytics } from "@/lib/useGoogleAnalytics";

interface BasicInfoProps {
  setCurrentSlide: (slide: string) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ setCurrentSlide }) => {
  // Required fields
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  // Optional fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [interests, setInterests] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const [loading, setLoading] = useState(false);

  // Validation states
  const [errors, setErrors] = useState<{
    username?: string;
    role?: string;
    avatarUrl?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  }>({});

  const { fetchSession } = useAuth();
  const { trackEvent } = useGoogleAnalytics();

  const isValidUrl = (url: string) => {
    try {
      if (!url) return false;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleContinue = async () => {
    const email = localStorage.getItem("signupEmail");
    const password = localStorage.getItem("signupPassword");

    const newErrors: typeof errors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!role.trim()) newErrors.role = "Role is required";
    if (avatarUrl && !isValidUrl(avatarUrl)) newErrors.avatarUrl = "Invalid URL";
    if (twitter && !isValidUrl(twitter)) newErrors.twitter = "Invalid URL";
    if (linkedin && !isValidUrl(linkedin)) newErrors.linkedin = "Invalid URL";
    if (github && !isValidUrl(github)) newErrors.github = "Invalid URL";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast("Please fix the highlighted errors");
      return;
    }

    if (!email || !password) {
      toast("Missing signup email or password");
      return;
    }

    setLoading(true);

    try {
      const endpoint = "https://bildare-backend.onrender.com/complete-profile";

      const cleanUsername = username.trim().toLowerCase();
      const cleanRole = role.trim();
const cleanFirstName = firstName.trim() || null;
const cleanLastName = lastName.trim() || null;
const cleanBio = bio.trim() || null;


      const cleanInterests = interests
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i);

const socialLinks: { twitter?: string; linkedin?: string; github?: string } = {};
if (twitter?.trim()) socialLinks.twitter = twitter.trim();
if (linkedin?.trim()) socialLinks.linkedin = linkedin.trim();
if (github?.trim()) socialLinks.github = github.trim();


      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          username: cleanUsername,
          role: cleanRole,
          first_name: cleanFirstName,
          last_name: cleanLastName,
          bio: cleanBio,
          avatar_url: avatarUrl,
          interests: cleanInterests,
          social_links: Object.keys(socialLinks).length ? socialLinks : null,
          referralCode: referralCode.trim() || null,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        localStorage.setItem("signupEmail", email);
        localStorage.setItem("signupPassword", password);

        await fetchSession();
        toast("Profile completed successfully!");
        setCurrentSlide("signupSuccess");
        trackEvent("profile_completed", { role: cleanRole });
      } else {
        toast(data.error || `Error ${res.status}: Failed to submit info`);
      }
    } catch (err) {
      console.error("❌ Complete profile error:", err);
      toast("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (error?: string) =>
    `h-[56px] bg-[#1C1D19] text-white rounded-2xl placeholder:text-[#757575] ${
      error ? "border-2 border-red-500" : ""
    }`;

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-[#292A25] rounded-[20px] md:rounded-[29px] p-6 md:p-10 w-full max-w-full md:max-w-[665px] h-auto md:max-h-[700px] flex flex-col items-center overflow-y-auto">
        <RiInfoCardLine className="text-[5rem] md:text-[7rem] text-white" />
        <h2 className="text-xl md:text-2xl font-medium text-center mt-4 md:mt-5 text-[#f4f4f4]">
          Complete Your Profile
        </h2>
        <p className="text-sm md:text-base text-center mt-2 text-[#f4f4f4] px-3 md:px-0">
          Kindly provide the required information to complete your profile
        </p>

        <form className="flex flex-col gap-5 w-full mt-6">
          {/* Username */}
          <div className="grid w-full gap-2">
            <Label htmlFor="username">Username *</Label>
            <div className="relative">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="JohnDoe"
                className={inputClass(errors.username)}
              />
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#757575]" />
            </div>
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* Role */}
          <div className="grid w-full gap-2">
            <Label htmlFor="role">Role *</Label>
            <Select
              value={role}
              onValueChange={(value) => {
                setRole(value);
                trackEvent("role_selected", { role: value });
              }}
            >
              <SelectTrigger className={inputClass(errors.role)}>
                <SelectValue placeholder="Select a Role" />
              </SelectTrigger>
              <SelectContent className="bg-[#292A25] text-white rounded-xl min-w-[var(--radix-select-trigger-width)]">
                <SelectGroup>
                  <SelectLabel className="text-[#B9F500]">Roles</SelectLabel>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Designer">Designer</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>

          {/* Optional fields */}
          <div className="grid w-full gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className={inputClass()}
            />
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className={inputClass()}
            />
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              className={inputClass()}
            />
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className={inputClass(errors.avatarUrl)}
            />
            {errors.avatarUrl && <p className="text-red-500 text-sm">{errors.avatarUrl}</p>}
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="interests">Interests (comma separated)</Label>
            <Input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Design, React, AI"
              className={inputClass()}
            />
          </div>

          {/* Social links */}
          {[
            { label: "Twitter", value: twitter, setter: setTwitter, error: errors.twitter },
            { label: "LinkedIn", value: linkedin, setter: setLinkedin, error: errors.linkedin },
            { label: "GitHub", value: github, setter: setGithub, error: errors.github },
          ].map((field) => (
            <div key={field.label} className="grid w-full gap-2">
              <Label htmlFor={field.label}>{field.label}</Label>
              <Input
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={`https://${field.label.toLowerCase()}.com/username`}
                className={inputClass(field.error)}
              />
              {field.error && <p className="text-red-500 text-sm">{field.error}</p>}
            </div>
          ))}

          <div className="grid w-full gap-2">
            <Label htmlFor="referralCode">Referral Code</Label>
            <Input
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="ABCD1234"
              className={inputClass()}
            />
          </div>
        </form>

        <Button
          onClick={handleContinue}
          className="bg-[#B9F500] w-full h-[48px] md:h-[51px] mt-6 text-center rounded-2xl text-[#000000] font-bold text-sm md:text-base flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? <AiOutlineLoading3Quarters className="animate-spin text-black" /> : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default BasicInfo;
