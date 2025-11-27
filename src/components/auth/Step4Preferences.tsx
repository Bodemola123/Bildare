"use client";

import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { FaPlus } from "react-icons/fa";

interface Props {
  interests: string;
  setInterests: (v: string) => void;
  referralCode: string;
  setReferralCode: (v: string) => void;
}

const categories = [
  "Blockchain",
  "Web3",
  "Artificial Intelligence",
  "E commerce",
  "SAAS",
  "Dashboards",
  "Meme",
  "Bots",
  "Landing Page",
];

const FilterButton: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-[10px] py-[6px] text-sm font-medium rounded-2xl border
      transition-colors duration-200 cursor-pointer group
      ${active
        ? "bg-[#B9F50033] border-[#292A251A] text-[#B9F500]"
        : "bg-[#1C1D19] border-[#292A251A] text-white hover:border-[#292A251A] hover:bg-[#B9F50033] hover:text-[#B9F500]"
      }`}
  >
    {label}
    <FaPlus
      size={11}
      className={`
        transform
        transition-transform duration-200
        ${active ? "rotate-45 scale-110 animate-bounce" : "group-hover:rotate-45 group-hover:scale-110"}
      `}
    />
  </button>
);


const Step4Preferences: React.FC<Props> = ({
  interests,
  setInterests,
  referralCode,
  setReferralCode,
}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(() =>
    interests ? interests.split(", ").filter(Boolean) : []
  );

  // ⭐ Sync child -> parent safely
  useEffect(() => {
    const newValue = selectedInterests.join(", ");
    if (newValue !== interests) {
      setInterests(newValue);
    }
  }, [selectedInterests, interests, setInterests]);

  return (
    <div className="w-full grid gap-6 px-16 mt-2">
      <div className="grid w-full gap-2 mt-2">
        <Label>Interests</Label>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <FilterButton
              key={category}
              label={category}
              active={selectedInterests.includes(category)}
              onClick={() => {
                setSelectedInterests((prev) =>
                  prev.includes(category)
                    ? prev.filter((c) => c !== category)
                    : [...prev, category]
                );
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid w-full gap-2 mt-2">
        <Label htmlFor="referralCode">Referral Code</Label>
        <Input
          id="referralCode"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="ABCD1234"
          className="h-[56px] bg-[#1C1D19] text-white rounded-[38px] placeholder:text-[#757575]"
        />
      </div>
    </div>
  );
};

export default Step4Preferences;
