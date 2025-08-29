"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  RiLayoutGridFill,
} from "react-icons/ri";
import { IoLayers } from "react-icons/io5";
import { LuPenTool } from "react-icons/lu";
import { HiPresentationChartLine } from "react-icons/hi";
import { ImBooks } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";
import { Separator } from "./ui/separator";
import Whatisnew from "./Whatisnew";
import { useAuth } from "@/context/AuthContext";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  href?: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, href = "/#" }) => (
  <Link
    href={href}
    className="flex items-center gap-2.5 p-4 hover:bg-[#ffffff0a] hover:text-[#B9F500] rounded-xl w-[161px]"
  >
    {icon}
    <p className="text-sm truncate">{label}</p>
  </Link>
);

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, fetchSession } = useAuth(); // use name/email as auth indicator

  useEffect(() => {
    // Automatically fetch session on component mount
    fetchSession();
  }, [fetchSession]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isAuthenticated = !!name; // if name exists, user is logged in

  return (
    <>
      <nav className="flex flex-col justify-between md:mx-0 gap-8 sm:mx-auto bg-[#1F201C] px-6 py-8 md:h-screen sm:h-full w-full overflow-y-scroll scrollbar-hide scroll-smooth text-white md:max-w-[230px] sm:w-full md:shrink-0">
        {/* Logo & What's New */}
        <div className="flex flex-col gap-9 items-center md:items-start">
          <Image
            src="/BildareLogo.png"
            alt="BILDARE logo"
            width={151}
            height={46}
          />

          {isAuthenticated ? (
            // ✅ If logged in, show link
            <Link
              href="/newadditions"
              className="flex items-center justify-center sm:justify-start gap-2.5 bg-[#B9F50033] rounded-[16px] px-[15px] py-[11px] cursor-pointer md:w-fit w-full"
            >
              <Image src="/sparkles.svg" alt="sparkle" width={18} height={18} />
              <span className="font-semibold text-sm text-[#B9F500]">
                What's new?
              </span>
            </Link>
          ) : (
            // ❌ If not logged in, open modal instead
            <button
              onClick={openModal}
              className="flex items-center justify-center sm:justify-start gap-2.5 bg-[#B9F50033] rounded-[16px] p-4 cursor-pointer md:w-fit w-full"
            >
              <Image src="/sparkles.svg" alt="sparkle" width={18} height={18} />
              <span className="font-semibold text-sm text-[#B9F500]">
                What's new?
              </span>
            </button>
          )}
        </div>

        {/* Rest of Nav */}
        <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:gap-2">
          <NavItem icon={<RiLayoutGridFill size={18} />} label="UI Templates" />
          <NavItem icon={<IoLayers size={18} />} label="UI Components" />
          <NavItem icon={<LuPenTool size={18} />} label="Animated Illustrations" />
          <NavItem icon={<HiPresentationChartLine size={18} />} label="Pitchdecks" />
        </div>
        <Separator className="bg-[#FEF9B514]" />

        <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:gap-2">
          <NavItem icon={<ImBooks size={18} />} label="Resources" />
          <NavItem icon={<HiUserGroup size={18} />} label="Community" />
        </div>

        <Separator className="bg-[#FEF9B514]" />

        <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:gap-2">
          <NavItem icon={<IoMdSettings size={18} />} label="Settings" />
          <NavItem icon={<BiSolidMessageRounded size={18} />} label="Feedback" />
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && <Whatisnew closeModal={closeModal} />}
    </>
  );
};

export default Navbar;
