"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface Props {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  bio: string;
  setBio: (v: string) => void;
}

const Step2AboutYou: React.FC<Props> = ({ firstName, setFirstName, lastName, setLastName, bio, setBio }) => {
  return (
    <div className="w-full grid gap-6 px-16 mt-2">
      <div className="grid w-full gap-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="John"
          className="h-[56px] bg-[#1C1D19] text-white placeholder:text-[#757575] !rounded-[38px]"
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Doe"
          className="h-[56px] bg-[#1C1D19] text-white !rounded-[38px] placeholder:text-[#757575]"
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Input
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself"
          className="h-[56px] bg-[#1C1D19] text-white !rounded-[38px] placeholder:text-[#757575]"
        />
      </div>
    </div>
  );
};

export default Step2AboutYou;
