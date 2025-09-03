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

interface BasicInfoProps {
  setCurrentSlide: (slide: string) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ setCurrentSlide }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

const { fetchSession } = useAuth(); // get from context

const handleContinue = async () => {
  if (!name || !role) return toast("Please fill in all fields");

  const email = localStorage.getItem("signupEmail");
  if (!email) return toast("Missing email");

  setLoading(true);
  try {
    const endpoint = "https://bildare-backend.onrender.com/complete-profile"; // proxy handles the rest

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ✅ important for server-side session
      body: JSON.stringify({ email, name, role }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      // ✅ Update AuthContext from server session
      await fetchSession();

      toast("Profile completed successfully!");
      setCurrentSlide("signupSuccess");

      // Cleanup temporary localStorage
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
      <div
        className="bg-[#292A25] rounded-[20px] md:rounded-[29px] 
        p-6 md:p-10 w-full max-w-full md:max-w-[665px] 
        h-auto md:max-h-[600px] 
        flex flex-col items-center"
      >
        <RiInfoCardLine className="text-[5rem] md:text-[7rem] text-white" />
        <h2 className="text-xl md:text-2xl font-medium text-center mt-4 md:mt-5 text-[#f4f4f4]">
          Basic Info
        </h2>
        <p className="text-sm md:text-base text-center mt-2 text-[#f4f4f4] px-3 md:px-0">
          Kindly provide us with the following info
        </p>

        <form className="flex flex-col gap-5 w-full mt-6">
          {/* Name */}
          <div className="grid w-full gap-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="pl-10 h-[56px] bg-[#1C1D19] text-white rounded-2xl placeholder:text-[#757575]"
              />
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#757575]" />
            </div>
          </div>

          {/* Role */}
<div className="grid w-full gap-2">
  <Label htmlFor="role">Role</Label>
  <Select value={role} onValueChange={setRole}>
    <SelectTrigger
      className="
        !h-[56px] py-0
        bg-[#1C1D19] text-white rounded-2xl px-4
        text-base placeholder:text-[#757575] w-full
      "
    >
      <SelectValue placeholder="Select a Role" />
    </SelectTrigger>

    <SelectContent
      className="bg-[#292A25] text-white rounded-xl
                 min-w-[var(--radix-select-trigger-width)]"
    >
      <SelectGroup>
        <SelectLabel className="text-[#B9F500]">Roles</SelectLabel>
        <SelectItem value="Developer">Developer</SelectItem>
        <SelectItem value="Designer">Designer</SelectItem>
        <SelectItem value="Product">Product</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</div>


        </form>

        {/* Continue button */}
        <Button
          onClick={handleContinue}
          className="bg-[#B9F500] w-full h-[48px] md:h-[51px] 
            mt-6 text-center rounded-2xl text-[#000000] font-bold 
            text-sm md:text-base flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-black" />
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
};

export default BasicInfo;
