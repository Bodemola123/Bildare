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

  const [loading, setLoading] = useState(false);

  const { fetchSession } = useAuth();
  const { trackEvent } = useGoogleAnalytics();

  const handleContinue = async () => {
    // Validate required fields
    if (!username || !role) return toast("Please fill in all required fields");

    const email = localStorage.getItem("signupEmail");
    if (!email) return toast("Missing email");

    setLoading(true);
    try {
      const endpoint = "https://bildare-backend.onrender.com/complete-profile";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          username,
          role,
          first_name: firstName || null,
          last_name: lastName || null,
          bio: bio || null,
          avatar_url: avatarUrl || null,
          interests: interests ? interests.split(",").map((i) => i.trim()) : [],
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        await fetchSession();
        toast("Profile completed successfully!");
        setCurrentSlide("signupSuccess");

        trackEvent("profile_completed", { role });

        // Clean up
        localStorage.removeItem("signupEmail");
        localStorage.removeItem("signupPassword");
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
                className="pl-10 h-[56px] bg-[#1C1D19] text-white rounded-2xl placeholder:text-[#757575]"
              />
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#757575]" />
            </div>
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
              <SelectTrigger className="!h-[56px] py-0 bg-[#1C1D19] text-white rounded-2xl px-4 text-base placeholder:text-[#757575] w-full">
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
          </div>

          {/* Optional fields */}
          <div className="grid w-full gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="h-[56px] bg-[#1C1D19] text-white rounded-2xl placeholder:text-[#757575]"
            />
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className="h-[56px] bg-[#1C1D19] text-white rounded-2xl placeholder:text-[#757575]"
            />
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              className="h-[56px] bg-[#1C1D19] text-white rounded-2xl placeholder:text-[#757575]"
            />
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="h-[56px] bg-[#1C1D19] text-white rounded-2xl placeholder:text-[#757575]"
            />
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="interests">Interests (comma separated)</Label>
            <Input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Design, React, AI"
              className="h-[56px] bg-[#1C1D19] text-white rounded-2xl placeholder:text-[#757575]"
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
