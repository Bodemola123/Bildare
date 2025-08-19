"use client";

import { BadgeQuestionMark, ChevronUp, Dot, LayoutGrid, List, Plus, Search } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { RiLayoutGridFill } from "react-icons/ri";

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

const FilterButton: React.FC<{ label: string }> = ({ label }) => (
  <button className="flex items-center border border-transparent gap-2 bg-[#292A25] px-[10px] py-[6px]  text-white rounded-2xl text-sm font-medium group hover:border-[#3976F6] hover:border hover:bg-[#3976F61A] hover:text-[#3976F6] transition-colors">
    {label}
    <Plus className="group-hover:rotate-45 transition-transform" size={13} />
  </button>
);

const TemplateCard = () => (
  <Link href="/preview" className="flex flex-col justify-between bg-[#292a25] p-6 rounded-2xl md:h-[562px] h-[387px] w-full">
    <div className="flex justify-between items-center">
      <span className="flex items-center gap-2 text-sm font-medium text-white">
        <Dot size={24} />
        Template Name
      </span>
      <div className="bg-[#1C1D19] text-sm font-medium px-3 py-1.5 rounded-full">
        Preview
      </div>
    </div>

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Image src="/reactjs.svg" alt="React" width={18} height={18} />
        <Image src="/tailwind.svg" alt="Tailwind" width={18} height={18} />
        <Image src="/javascript.svg" alt="JS" width={18} height={18} />
        <Image src="/figmaa.svg" alt="Figma" width={18} height={18} />
      </div>
      <p className="text-[#B9F500] font-semibold text-base">$50</p>
    </div>
  </Link>
);

const TemplateCard1 = () => (
  <Link href="/preview" className="flex flex-col justify-between bg-[#292a25] p-6 rounded-2xl h-[387px] w-full">
    <div className="flex justify-between items-center">
      <span className="flex items-center gap-2 text-sm font-medium text-white">
        <Dot size={24} />
        Template Name
      </span>
      <div className="bg-[#1C1D19] text-sm font-medium px-3 py-1.5 rounded-full">
        Preview
      </div>
    </div>

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Image src="/reactjs.svg" alt="React" width={18} height={18} />
        <Image src="/tailwind.svg" alt="Tailwind" width={18} height={18} />
        <Image src="/javascript.svg" alt="JS" width={18} height={18} />
        <Image src="/figmaa.svg" alt="Figma" width={18} height={18} />
      </div>
      <p className="text-[#B9F500] font-semibold text-base">$50</p>
    </div>
  </Link>
);

const Body: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

  const dropdowns = [
    {
      label: "Tools Used",
      icon: <RiLayoutGridFill size={16} />,
      items: [
        { icon: <RiLayoutGridFill size={18} />, label: "All Tools" },
        { icon: <Image src="/reactjs.svg" alt="React" width={18} height={18} />, label: "React" },
        { icon: <Image src="/figmaa.svg" alt="Figma" width={18} height={18} />, label: "Figma" },
        { icon: <Image src="/javascript.svg" alt="JavaScript" width={18} height={18} />, label: "JavaScript" },
        { icon: <Image src="/tailwind.svg" alt="Tailwind" width={18} height={18} />, label: "Tailwind" },
      ],
    },
    {
      label: "List",
      icon: <List size={16} />,
      items: [
        { icon: <RiLayoutGridFill size={18} />, label: "All Tools" },
        { label: "Release Date" },
        { label: "Popular" },
        { label: "Highest Fee" },
        { label: "Lowest Fee" },
      ],
    },
  ];

  // Close when clicking outside or pressing Esc
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div  className="relative flex flex-col gap-[42px] w-full bg-transparent text-white md:flex-grow md:overflow-y-auto h-full px-10 py-10 scrollbar-hide">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Templates</h1>

        <div className="flex items-center bg-[#292A25] px-4 py-3 rounded-2xl border border-[#292A251A] w-full max-w-[440px] max-h-[46px]">
          <Search className="text-[#858585]" size={20} />
          <Input
            placeholder="Search categories, templates, UIs, components..."
            className="ml-3 placeholder:text-[#757575] border-none bg-transparent focus:ring-0"
          />
        </div>

        <Button variant="ghost" className="px-6 py-3 rounded-2xl text-[#B9F500] font-semibold">
          <Link href='/auth'>Login / Register</Link>
        </Button>
      </div>

      {/* Filters & View Toggles */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 max-w-3xl">
          {categories.map((category) => (
            <FilterButton key={category} label={category} />
          ))}
        </div>

        {/* Dropdown Buttons */}
        <div className="flex gap-2 items-start flex-wrap">
          {dropdowns.map((dropdown, idx) => (
            <div key={idx} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                className="bg-[#292A25] px-4 py-2 flex items-center gap-2 rounded-2xl hover:bg-[#33352F] transition w-max"
              >
                <span className="text-sm">{dropdown.label}</span>
                <div className="bg-[#1C1D19] p-1 rounded-full">{dropdown.icon}</div>
              </button>

              {openDropdown === idx && (
                <div ref={containerRef} className="absolute top-full -right-28 md:right-2  mt-2 bg-[#292A25] rounded-2xl p-4 gap-2.5 flex flex-wrap w-[250px] md:w-[323px] max-h-[180px] overflow-y-auto z-50">
                  {dropdown.items.map((item, index) => (
                    <button
                      key={index}
                      className="flex items-center justify-center rounded-2xl px-2 py-2 gap-2.5 border border-transparent hover:border-[#B9F500] hover:text-[#B9F500] transition text-sm whitespace-nowrap"
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Templates */}
      <div className="flex flex-col gap-6 mt-1">
        <h2 className="text-lg font-semibold text-white">Featured Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-rows-1 gap-4">
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
        </div>
        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-4">
          <TemplateCard1 />
          <TemplateCard1 />
          <TemplateCard1 />
          <TemplateCard1 />
          <TemplateCard1 />
          <TemplateCard1 />
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-col md:flex-row items-start md:items-center justify-between md:gap-4 gap-5 text-xs font-medium text-white">
        <div className="flex items-center gap-2">
          <p>Built by</p>
          <Image src="/BildareLogo.png" alt="logo" width={59} height={18} />
        </div>

        <div className="flex flex-wrap gap-4 sm:justify-start md:justify-end items-center mb-4 md:mb-0">
          <p className="cursor-pointer hover:text-[#b9f500] hover:underline-offset-4 hover:underline ">Help</p>
          <p className="cursor-pointer hover:text-[#b9f500] hover:underline-offset-4 hover:underline ">Email</p>
          <p className="cursor-pointer hover:text-[#b9f500] hover:underline-offset-4 hover:underline ">Twitter</p>
          <p className="cursor-pointer hover:text-[#b9f500] hover:underline-offset-4 hover:underline ">Discord</p>
          <p className="cursor-pointer hover:text-[#b9f500] hover:underline-offset-4 hover:underline ">Terms</p>
          <p className="cursor-pointer hover:text-[#b9f500] hover:underline-offset-4 hover:underline ">Privacy</p>
        </div>
      </div>
                 <div className="fixed bottom-16 right-10 z-50 flex flex-col items-end space-y-2">
        {isOpen && (
          <div className="p-4 rounded-2xl flex flex-col items-start justify-between bg-[#1C1D19] text-white w-64 shadow-xl">
            <button className="py-1 hover:text-[#B9F500]">Welcome to Bildare</button>
            <button className="py-1 hover:text-[#B9F500]">Try a Template</button>
            <Link href="/helpcenter" className="py-1 hover:text-[#B9F500]">Help Center</Link>
            <Link  href="/blog" className="py-1 hover:text-[#B9F500]">Our Blog</Link>
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
  );
};

export default Body;
