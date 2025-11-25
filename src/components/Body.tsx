"use client";

import { BadgeQuestionMark, ChevronUp, Dot, LayoutGrid, List, Plus, Search } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { RiLayoutGridFill } from "react-icons/ri";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"; // ✅ shadcn/ui avatar
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // ✅ dropdown
import { useAuth } from "@/context/AuthContext";
import Whatisnew from "./Whatisnew";
import { useGoogleAnalytics } from "@/lib/useGoogleAnalytics";
import PreviewPageModal from "@/app/preview/PreviewPage";



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

export const TemplateCard = () => {
  const { trackEvent } = useGoogleAnalytics();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    trackEvent("template_card_click", { template: "Template Name" });
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="flex flex-col justify-between bg-[#292a25] p-4 sm:p-6 rounded-2xl w-full h-auto sm:h-[562px] cursor-pointer transition-transform hover:scale-[1.02]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white">
            <Dot size={20} className="sm:size-6" />
            Template Name
          </span>
          <div className="bg-[#1C1D19] text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1.5 rounded-full">
            Preview
          </div>
        </div>

        {/* Preview Image */}
        <div className="w-full h-[220px] sm:h-[433px] bg-[#C9C9C9] rounded-[16px] flex items-center justify-center overflow-hidden">
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image src="/reactjs.svg" alt="React" width={16} height={16} />
            <Image src="/tailwind.svg" alt="Tailwind" width={16} height={16} />
            <Image src="/javascript.svg" alt="JS" width={16} height={16} />
            <Image src="/figmaa.svg" alt="Figma" width={16} height={16} />
          </div>
          <p className="text-[#B9F500] font-semibold text-sm sm:text-base">$50</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <PreviewPageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

const Body: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const { username, email, clearAuth, fetchSession } = useAuth();
    
      useEffect(() => {
        // Automatically fetch session on component mount
        fetchSession();
      }, [fetchSession]);
    
      const openModal = () => setIsModalOpen(true);
      const closeModal = () => setIsModalOpen(false);
    
      const isAuthenticated = !!username; // if name exists, user is logged in

    
  
  const [loading, setLoading] = useState(false);

  // derive initials
  const getInitials = (fullName: string | null) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

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
    <>
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

        {/* ✅ Auth conditional */}
        {!isAuthenticated ? (
          <Button
            variant="ghost"
            className="px-6 py-3 rounded-2xl text-[#B9F500] font-semibold"
          >
            <Link href="/auth">Login / Register</Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>{getInitials(username)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-[#292A25] text-white max-w-[90vw] overflow-hidden"
                >
                  <DropdownMenuItem
                    onClick={() => clearAuth()}
                    className="hover:bg-[#33352F] cursor-pointer"
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
          </DropdownMenu>
        )}
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
                className="bg-[#292A25] px-[10px] py-1.5 flex items-center gap-2 rounded-2xl hover:bg-[#33352F] transition w-max"
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

<div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
  {/* What's New Card */}
  <div
    className="flex flex-col md:flex-row items-center justify-between gap-[17px] bg-[#F8FEE6] bg-no-repeat bg-right w-full rounded-2xl p-6  h-auto md:h-[207px]"
    style={{ backgroundImage: "url('/Vector1.svg')" }}
  >
    {/* Text + Button */}
    <div className="flex flex-col gap-4 text-center sm:text-left">
      <div className="flex flex-col gap-[5px]">
        <h1
          className="text-[#719500] text-2xl sm:text-3xl md:text-[40px] font-semibold"
          style={{ lineHeight: "120%", letterSpacing: "-0.08em" }}
        >
          What&apos;s New on Bildare?
        </h1>
        <p
          className="text-sm sm:text-base font-normal text-[#000000]"
          style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}
        >
          Stay ahead of your timeline, Just Build it!
        </p>
      </div>

      {isAuthenticated ? (
      <Link
        href="/newadditions"
        className="flex flex-row bg-[#B9F500] px-[18px] py-[11px] gap-2.5 rounded-2xl justify-center sm:justify-start items-center text-[#000000] text-sm font-semibold w-fit self-center sm:self-start"
        style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}
      >
        <Image src="/bstars.svg" alt="stars" width={18} height={18} />
        See What&apos;s New
      </Link>
      ) : (
      <button
        onClick={openModal}
        className="flex flex-row bg-[#B9F500] px-[18px] py-[11px] gap-2.5 rounded-2xl justify-center sm:justify-start items-center text-[#000000] text-sm font-semibold w-fit self-center sm:self-start cursor-pointer"
        style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}
      >
        <Image src="/bstars.svg" alt="stars" width={18} height={18} />
        See What&apos;s New
      </button>
      )}
    </div>

    {/* Image */}
    <Image
      src="/Capa.svg"
      alt="Cap"
      width={183}
      height={137}
      className="w-[120px] sm:w-[150px] md:w-[183px] h-auto mt-4 sm:mt-0"
    />
  </div>

  {/* Banner2 */}
  <Image
    src="/Banner2.svg"
    alt="banner"
    width={325}
    height={207}
    className="w-full md:w-1/3 h-auto md:h-[207px]  rounded-2xl"
  />
</div>


      {/* Featured Templates */}
      <div className="flex flex-col gap-6 mt-1">
        <h2 className="text-lg font-semibold text-white">Featured Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-rows-1 gap-4">
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
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
                 <div className="fixed bottom-16 right-10 0 flex flex-col items-end space-y-2">
        {isOpen && (
          <div className="p-4 rounded-2xl flex flex-col items-start justify-between bg-[#1C1D19] text-white w-64 shadow-xl">
            <button className="py-1 hover:text-[#B9F500]">Welcome to Bildare</button>
            <button className="py-1 hover:text-[#B9F500]">Try a Template</button>
            <Link href="/helpcenter" className="py-1 hover:text-[#B9F500]">Help Center</Link>
            <Link  href="/blog" className="py-1 hover:text-[#B9F500]">Our Blog</Link>
            <hr className="w-full my-2 border-[#333]" />
            <button className="py-1 hover:text-[#B9F500]">Legal Summary</button>
            <Link href='/feedback' className="py-1 hover:text-[#B9F500]">Submit Feedback</Link>
            <hr className="w-full my-2 border-[#333]" />
            <button className="py-1 hover:text-[#B9F500]">Community</button>
            <Link href='/feedback' className="py-1 hover:text-[#B9F500]">Report an Issue</Link>
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

          {/* Modal */}
      {isModalOpen && <Whatisnew closeModal={closeModal} />}
    </>
  );
};

export default Body;
