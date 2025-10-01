"use client";

import {
  Clock3,
  Eye,
  GalleryHorizontal,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useGoogleAnalytics } from "@/lib/useGoogleAnalytics";
import { TemplateCard } from "@/components/Body";
import { RxCross1 } from "react-icons/rx";

interface PreviewPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreviewPageModal: React.FC<PreviewPageModalProps> = ({ isOpen, onClose }) => {
  const { trackEvent } = useGoogleAnalytics();

  // 🔑 Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop (non-clickable now) */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-none" />

      {/* Modal Content */}
      <div className="relative z-10 flex flex-col gap-10 w-[90%] h-[85%] md:h-[90%] md:max-h-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] bg-[#1C1D19] rounded-2xl md:rounded-2xl overflow-y-auto scrollbar-hide">
        {/* Header */}
        <header className="flex px-[38px] pt-[38px] items-center justify-between w-full sticky top-0 bg-[#1C1D19] z-20">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Templates name
          </h1>
          <button onClick={onClose}>
            <RxCross1 className="text-white text-lg cursor-pointer hover:text-[#B9F500]" />
          </button>
        </header>

        {/* Body */}
        <div className="flex flex-col px-[38px] pb-[38px] md:flex-row items-start justify-center gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4 items-center w-full ">
            <div className="w-full h-[250px] sm:h-[396px] rounded-2xl bg-[#292A25]" />
            <div className="flex gap-2 w-full justify-center">
              <div className="flex-1 h-[100px] sm:h-[138px] rounded-2xl bg-[#292A25]" />
              <div className="flex-1 h-[100px] sm:h-[138px] rounded-2xl bg-[#292A25]" />
              <div className="flex-1 h-[100px] sm:h-[138px] rounded-2xl bg-[#292A25]" />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 w-full">
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href="/checkout"
                onClick={() => trackEvent("purchase_demo_click")}
                className="bg-[#B9F500] flex items-center justify-center text-black hover:bg-[#B9F50099] rounded-2xl px-[18px] py-[11px] font-semibold w-full sm:w-max"
              >
                Purchase $50
              </Link>
              <button
                className="flex items-center justify-center gap-2 px-[18px] py-[11px] rounded-2xl text-[#B9F500] hover:bg-[#B9F50033] font-bold w-full sm:w-max"
                onClick={() => trackEvent("preview_demo_click")}
              >
                <Eye size={18} />
                Preview Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-2.5 bg-[#292A25] px-[9px] py-[20px] rounded-3xl text-sm font-medium">
              <div className="flex items-center gap-2">
                <Clock3 size={16} /> 23 Jul, 2025
              </div>
              <div className="flex items-center gap-2">
                <GalleryHorizontal size={16} /> 8 pages
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} /> 20k views
              </div>
              <div className="flex items-center gap-2">
                <Smartphone size={16} /> Responsive
              </div>
            </div>

            {/* Tools */}
            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-[#292A25]">
              <h4 className="text-base font-semibold text-white">Tools Used</h4>
              <div className="flex gap-4 items-center">
                {["reactjs", "tailwind", "javascript", "figmaa"].map((tool) => (
                  <Image
                    key={tool}
                    src={`/${tool}.svg`}
                    alt={tool}
                    width={31}
                    height={31}
                  />
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="p-4 flex flex-col gap-4 text-sm text-[#B0B0B0] rounded-2xl bg-[#292A25]">
              <h5 className="text-white font-semibold text-base">Categories</h5>
              <div className="flex gap-4 flex-wrap">
                <p>Blockchain</p>
                <p>Web 3</p>
                <p>CryptoCurrency</p>
                <p>Memecoin</p>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2">
              <h4 className="text-2xl font-bold text-white">Features</h4>
              {[
                "400+ Exclusive Pre-Built Templates",
                "Feature 1",
                "Feature 2",
                "Feature 3",
                "Feature 4",
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-[#292A25] py-2 px-4 rounded-lg text-sm font-medium"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-[#FEF9B514] h-[1px] w-full" />

        {/* More like this */}
        <div className="flex flex-col gap-6 px-6 md:px-12 pb-10">
          <h1 className="text-white font-bold text-2xl">More like this</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />

          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPageModal;
