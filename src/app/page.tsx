"use client"
import Body from "@/components/Body";
import Navbar from "@/components/Navbar";
import { BadgeQuestionMark, ChevronUp, CircleQuestionMarkIcon } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  return (
    <div className="md:flex sm:flex md:flex-row sm:flex-col h-screen w-full">
        <Navbar />
        <div className="w-full h-full relative">
          <Body />
        </div>
        
    </div>
  );
};

export default Page;
