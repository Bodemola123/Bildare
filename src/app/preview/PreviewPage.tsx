"use client";

import {
  Clock3,
  Eye,
  GalleryHorizontal,
  Smartphone,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useGoogleAnalytics } from "@/lib/useGoogleAnalytics";
import { RxCross1 } from "react-icons/rx";

interface PreviewPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    template_id: string;
    title: string;
    price: number;
    stack: string[];
    tags: string[];
    usecases: string[];
    media: {
      url: string;
      media_type: string;
      order_index: number;
    }[];
  };
}

const stackIcons: Record<string, string> = {
  React: "/reactjs.svg",
  Tailwind: "/tailwind.svg",
  JavaScript: "/javascript.svg",
  Figma: "/figmaa.svg",
};

const PreviewPageModal: React.FC<PreviewPageModalProps> = ({
  isOpen,
  onClose,
  template,
}) => {
  const { trackEvent } = useGoogleAnalytics();

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Sort media by order_index
  const sortedMedia = [...template.media].sort((a, b) => a.order_index - b.order_index);
  const coverMedia = sortedMedia.find((m) => m.media_type === "cover")?.url ?? "";
  const remainingMedia = sortedMedia.filter((m) => m.media_type !== "cover");

  // State to track currently displayed main image
  const [mainImage, setMainImage] = useState<string>(coverMedia);

  // Update mainImage if the modal is reopened or template changes
  useEffect(() => {
    setMainImage(coverMedia);
  }, [coverMedia, isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-none" />

      {/* Modal Content */}
      <div className="relative z-10 flex flex-col gap-10 w-[90%] h-[85%] md:h-[90%] md:max-h-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] bg-[#1C1D19] rounded-2xl overflow-y-auto scrollbar-hide">
        {/* Header */}
        <header className="flex px-[38px] pt-[38px] items-center justify-between w-full sticky top-0 bg-[#1C1D19] z-20">
          <h1 className="text-xl md:text-2xl font-bold text-white">{template.title}</h1>
          <button onClick={onClose}>
            <RxCross1 className="text-white text-lg cursor-pointer hover:text-[#B9F500]" />
          </button>
        </header>

        {/* Body */}
        <div className="flex flex-col px-[38px] pb-[38px] md:flex-row items-start justify-center gap-6">
          {/* Left Column: Media */}
          <div className="flex flex-col gap-4 items-center w-full">
            {/* Main Image */}
{/* Main Image */}
<div className="w-full h-[250px] sm:h-[396px] rounded-2xl overflow-hidden bg-[#292A25] flex items-center justify-center">
  {mainImage ? (
    <img
      src={mainImage}
      alt="Main"
      className="object-contain object-center w-full h-full"
    />
  ) : null}
</div>

{/* Thumbnails */}
<div className="flex gap-2 w-full justify-center">
  {sortedMedia.map((m, idx) => (
    <div
      key={idx}
      className="flex-1 h-[100px] sm:h-[138px] rounded-2xl overflow-hidden bg-[#292A25] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
      onClick={() => setMainImage(m.url)}
    >
      <img
        src={m.url}
        alt={`Media ${idx + 1}`}
        className="object-contain object-center w-full h-full"
      />
    </div>
  ))}
</div>

          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 w-full">
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href={`/checkout?template_id=${template.template_id}`}
                onClick={() => trackEvent("purchase_demo_click")}
                className="bg-[#B9F500] flex items-center justify-center text-black hover:bg-[#B9F50099] rounded-2xl px-[18px] py-[11px] font-semibold w-full sm:w-max"
              >
                Purchase {template.price === 0 ? "for Free" : `- $${template.price}`}
              </Link>
              <button
                className="flex items-center justify-center gap-2 px-[18px] py-[11px] rounded-2xl text-[#B9F500] hover:bg-[#B9F50033] font-bold w-full sm:w-max"
                onClick={() => trackEvent("preview_demo_click")}
              >
                <Eye size={18} /> Preview Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-2.5 bg-[#292A25] px-[9px] py-[20px] rounded-3xl text-sm font-medium">
              <div className="flex items-center gap-2">
                <Clock3 size={16} /> 23 Jul, 2025
              </div>
              <div className="flex items-center gap-2">
                <GalleryHorizontal size={16} /> {sortedMedia.length} pages
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} /> 20k views
              </div>
              <div className="flex items-center gap-2">
                <Smartphone size={16} /> Responsive
              </div>
            </div>

            {/* Tools / Stack */}
            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-[#292A25]">
              <h4 className="text-base font-semibold text-white">Tools Used</h4>
              <div className="flex gap-4 items-center">
                {template.stack.map((tech) => (
                  <img
                    key={tech}
                    src={stackIcons[tech] ?? "/default.svg"}
                    alt={tech}
                    width={31}
                    height={31}
                  />
                ))}
              </div>
            </div>

            {/* Categories / Tags */}
            <div className="p-4 flex flex-col gap-4 text-sm text-[#B0B0B0] rounded-2xl bg-[#292A25]">
              <h5 className="text-white font-semibold text-base">Categories</h5>
              <div className="flex gap-4 flex-wrap">
                {template.tags.map((tag, idx) => (
                  <p key={idx}>{tag}</p>
                ))}
              </div>
            </div>

            {/* Features / Usecases */}
            <div className="flex flex-col gap-2">
              <h4 className="text-2xl font-bold text-white">Features</h4>
              {template.usecases.map((feature, idx) => (
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
      </div>
    </div>
  );
};

export default PreviewPageModal;
