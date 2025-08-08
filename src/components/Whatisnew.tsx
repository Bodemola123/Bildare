import Image from "next/image";
import React from "react";
import { GoX } from "react-icons/go";
import { IoSparkles } from "react-icons/io5";

type WhatisnewProps = {
  closeModal: () => void;
};

const Whatisnew: React.FC<WhatisnewProps> = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#1C1D1990] flex items-center justify-center p-4">
      <div className="w-full max-w-[709px] bg-[#292A25] rounded-2xl md:px-[76px] md:py-[28px] p-10 text-white flex flex-col items-center gap-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <p className="text-base font-semibold">Explore What's New</p>
          <button onClick={closeModal}>
            <Image src="/icon.svg" alt="Close" width={14} height={14} className="cursor-pointer" />
          </button>
        </div>

        {/* Image */}
        <div className="w-full flex justify-center">
          <Image
            src="/WhatisNew.svg"
            alt="What's New"
            width={530}
            height={334}
            className="w-full h-auto max-h-[250px] object-contain"
          />
        </div>

        {/* Description */}
        <p className="text-sm text-center leading-relaxed">
          Create an account to explore the latest updates, features, and exclusive content.
          Don&apos;t miss out—sign up now and be the first to see what&apos;s new.
        </p>

        {/* Button */}
        <button className="bg-[#B9F500] px-6 py-3 rounded-2xl flex items-center gap-2 hover:opacity-90 transition">
          <IoSparkles className="text-black text-lg" />
          <span className="text-black text-sm font-semibold">Sign up</span>
        </button>
      </div>
    </div>
  );
};

export default Whatisnew;
