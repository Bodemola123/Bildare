"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ChartArea,
  Layers,
  LayoutGrid,
  LibraryBig,
  MessagesSquare,
  Settings,
  SquarePen,
  Users,
} from "lucide-react";
import { Separator } from "./ui/separator";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  href?: string; // for future routing support
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, href = "#" }) => (
  <Link href={href} className="flex items-center gap-2.5 p-4 hover:bg-[#ffffff0a] hover:text-[#B9F500] rounded-xl w-max">
    {icon}
    <p className="text-sm truncate">{label}</p>
  </Link>
);

const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-col justify-between md:mx-0 gap-8 sm:mx-auto bg-[#1F201C] px-6 py-8 md:h-screen sm:h-full w-full overflow-y-scroll scrollbar-hide scroll-smooth text-white md:max-w-[230px] sm:w-full  md:shrink-0">
      {/* Logo & What's New */}
      <div className="flex flex-col gap-9 items-center md:items-start">
        <Image src="/BildareLogo.png" alt="BILDARE logo" width={151} height={46} />
        <button className="flex items-center justify-center sm:justify-start gap-2.5 bg-[#B9F50033] rounded-[16px] p-4 cursor-pointer md:w-fit w-full">
          <Image src="/sparkles.svg" alt="sparkle" width={18} height={18} />
          <span className="font-semibold text-sm text-[#B9F500]">What's new?</span>
        </button>
      </div>
  <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:gap-2">
    <NavItem icon={<LayoutGrid size={18} />} label="UI Templates" />
    <NavItem icon={<Layers size={18} />} label="UI Components" />
    <NavItem icon={<SquarePen size={18} />} label="Animated Illustrations" />
    <NavItem icon={<ChartArea size={18} />} label="Pitchdecks" />
  </div>
  <Separator className="bg-[#FEF9B514]" />
    {/* Community & Resources */}
  <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:gap-2">
    <NavItem icon={<LibraryBig size={18} />} label="Resources" />
    <NavItem icon={<Users size={18} />} label="Community" />
  </div>

  <Separator className="bg-[#FEF9B514]" />

  {/* Settings */}
  <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:gap-2">
    <NavItem icon={<Settings size={18} />} label="Settings" />
    <NavItem icon={<MessagesSquare size={18} />} label="Feedback" />
  </div>


    </nav>
  );
};

export default Navbar;
