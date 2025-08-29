"use client" 


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BadgeQuestionMark, ChevronUp, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoSparklesSharp } from 'react-icons/io5'
import { useAuth } from '@/context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CardProps {
  title: string
  subtitle?: string
  date: string
  icon?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ title, subtitle, date, icon }) => (
  
  <div className="flex flex-col justify-between bg-[#292a25] py-6 px-5 rounded-2xl h-[387px] md:h-[562px] w-full gap-6 text-white max-w-[659px]">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-base font-medium">
        <span className="font-semibold">{title}</span>
        {subtitle && <p>{subtitle}</p>}
        {icon}
      </div>
      <span className="text-base font-normal">{date}</span>
    </div>
    <div className="flex bg-[#1C1D19] w-full max-h-[270px] h-full rounded-2xl" />
    <div className="flex flex-col items-center text-center gap-2.5">
      <h1 className="text-base font-semibold">Introducing</h1>
      <p className="line-clamp-2 text-[#B0B0B0] font-normal text-base" style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}>
        Meet AstroClash, a fully-featured Play-to-Earn NFT Marketplace Kit, including exclusive design files all editable in Figma plus a pack of custom, beautiful 3D illustrations. This package includes a responsive and fully customized landing page template with 400+ clean & minimal pre-made screens. We've added a lot of different content to maximize the number of layout options and configurations. Drag, drop, and mix different parts to quickly build your own NFT marketplace in a matter of minutes. Buy it now and get the upcoming coded version in React (Now available), HTML version coming up next! Let us know your thoughts or requests in the comments section below.
      </p>
    </div>
  </div>
)

const NewAdditions = () => {
  const [isOpen, setIsOpen] = useState(false)
     const { name, clearAuth } = useAuth(); // ✅ get user data
  
    // derive initials
    const getInitials = (fullName: string | null) => {
      if (!fullName) return "";
      const parts = fullName.trim().split(" ");
      if (parts.length === 1) return parts[0][0].toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

  return (
    <div className="flex flex-col gap-20 w-full bg-transparent text-white md:flex-grow md:overflow-y-auto h-full px-5 md:px-20 py-10 scrollbar-hide relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Templates</h1>

        <div className="flex items-center bg-[#292A25] px-4 py-3 rounded-2xl border border-[#292A251A] w-full max-w-[440px]">
          <Search className="text-[#858585]" size={20} />
          <Input
            placeholder="Search categories, templates, UIs, components..."
            className="ml-3 placeholder:text-[#757575] border-none bg-transparent focus:ring-0"
          />
        </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer !w-10 !h-10">
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#292A25] text-white">
              <DropdownMenuItem
                onClick={clearAuth}
                className="hover:bg-[#33352F] cursor-pointer"
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col gap-6 items-center text-center">
        <div className="bg-[#B9F5000D] flex gap-2.5 px-2.5 py-1.5 rounded-2xl text-[#B9F500] text-xs items-center justify-center font-medium">
          What&apos;s New?
          <IoSparklesSharp />
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className="text-3xl md:text-4xl font-semibold">Stay Ahead</h1>
          <p className="text-base font-normal">
            Introducing New features and New products
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-6 items-center">
        <Card title="New Version" subtitle="V 1.0.6" date="Fri 18 Aug, 2025" />
        <Card
          title="New Templates Added"
          date="Fri 18 Aug, 2025"
          icon={<Image src="/stars.svg" alt="stars" width={40} height={40} />}
        />
        <Card
          title="New Templates Added"
          date="Fri 18 Aug, 2025"
          icon={<Image src="/stars.svg" alt="stars" width={40} height={40} />}
        />
        <Card
          title="New Templates Added"
          date="Fri 18 Aug, 2025"
          icon={<Image src="/stars.svg" alt="stars" width={40} height={40} />}
        />
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-medium">
        <div className="flex items-center gap-2">
          <p>Built by</p>
          <Image src="/BildareLogo.png" alt="logo" width={59} height={18} />
        </div>

        <div className="flex flex-wrap gap-4 sm:justify-start md:justify-end">
          {['Help', 'Email', 'Twitter', 'Discord', 'Terms', 'Privacy'].map(
            (link) => (
              <p
                key={link}
                className="cursor-pointer hover:text-[#b9f500] hover:underline-offset-4 hover:underline"
              >
                {link}
              </p>
            )
          )}
        </div>
      </div>

      {/* Floating Menu */}
           <div className="fixed bottom-16 right-10 z-50 flex flex-col items-end space-y-2">
        {isOpen && (
          <div className="p-4 rounded-2xl flex flex-col items-start justify-between bg-[#1C1D19] text-white w-64 shadow-xl">
            <button className="py-1 hover:text-[#B9F500]">Welcome to Bildare</button>
            <button className="py-1 hover:text-[#B9F500]">Try a Template</button>
            <Link href='/helpcenter' className="py-1 hover:text-[#B9F500]">Help Center</Link>
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
  )
}

export default NewAdditions
