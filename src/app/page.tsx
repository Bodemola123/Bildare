"use client"
import Body from "@/components/Body";
import Navbar from "@/components/Navbar";
import { BadgeQuestionMark, ChevronUp, CircleQuestionMarkIcon } from "lucide-react";
import React, { useState } from "react";

const Page = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:flex sm:flex md:flex-row sm:flex-col h-screen w-full">
        <Navbar />
        <div className="w-full h-full relative">
          <Body />
           <div className="fixed bottom-16 right-10 z-50 flex flex-col items-end space-y-2">
        {isOpen && (
          <div className="p-4 rounded-2xl flex flex-col items-start justify-between bg-[#1C1D19] text-white w-64 shadow-xl">
            <button className="py-1 hover:text-[#B9F500]">Welcome to Bildare</button>
            <button className="py-1 hover:text-[#B9F500]">Try a Template</button>
            <button className="py-1 hover:text-[#B9F500]">Help Center</button>
            <button className="py-1 hover:text-[#B9F500]">Our Blog</button>
            <hr className="w-full my-2 border-[#333]" />
            <button className="py-1 hover:text-[#B9F500]">Legal Summary</button>
            <button className="py-1 hover:text-[#B9F500]">Submit Feedback</button>
            <hr className="w-full my-2 border-[#333]" />
            <button className="py-1 hover:text-[#B9F500]">Community</button>
            <button className="py-1 hover:text-[#B9F500]">Report an Issue</button>
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex justify-center items-center bg-[#1C1D19] text-[#B9F500] gap-2.5 px-4 py-2 rounded-2xl shadow-lg"
        >
          <p>Get Started</p>
          <ChevronUp size={14} />
          <BadgeQuestionMark size={14} />
        </button>
      </div>
        </div>
        
    </div>
  );
};

export default Page;
