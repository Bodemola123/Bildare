"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface Props {
  twitter: string;
  setTwitter: (v: string) => void;
  linkedin: string;
  setLinkedin: (v: string) => void;
  github: string;
  setGithub: (v: string) => void;
}

const Step3SocialLinks: React.FC<Props> = ({ twitter, setTwitter, linkedin, setLinkedin, github, setGithub }) => {
  return (
    <div className="w-full grid gap-6 px-16 mt-2">
      <div className="grid w-full gap-2">
        <Label htmlFor="twitter">Twitter</Label>
        <Input
          id="twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          placeholder="https://twitter.com/username"
          className="h-[56px] bg-[#1C1D19] text-white !rounded-[38px] placeholder:text-[#757575]"
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="https://linkedin.com/in/username"
          className="h-[56px] bg-[#1C1D19] text-white !rounded-[38px] placeholder:text-[#757575]"
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="https://github.com/username"
          className="h-[56px] bg-[#1C1D19] text-white !rounded-[38px] placeholder:text-[#757575]"
        />
      </div>
    </div>
  );
};

export default Step3SocialLinks;
