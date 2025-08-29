'use client'

import Help from '@/components/HelpCenter/Help';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const metadata = {
  title: "Help Center",
};


const HelpPage = () => {

      const { name, fetchSession, clearAuth } = useAuth(); // ✅ get user data
        // fetch session on mount to ensure user stays logged in
        useEffect(() => {
          fetchSession().catch(() => {});
        }, [fetchSession]);
  
    // derive initials
    const getInitials = (fullName: string | null) => {
      if (!fullName) return "";
      const parts = fullName.trim().split(" ");
      if (parts.length === 1) return parts[0][0].toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };
  return (
    <div className='flex flex-col gap-10 md:gap-20 w-full bg-transparent text-white md:flex-grow md:overflow-y-auto h-full px-6 md:px-20 py-[52px] scrollbar-hide'>

      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Help Center</h1>
        {/* ✅ Auth conditional */}
        {!name ? (
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
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#292A25] text-white">
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

      {/* Main Content */}
      <div className='flex flex-col md:flex-row justify-start items-start gap-6 md:gap-8 lg:gap-[125px] w-full'>

        {/* Sidebar */}
        <div className='flex flex-col gap-10 w-full md:w-[250px]'>
          
          {/* Sections */}
          {[
            { title: 'Get Started', links: ['Welcome to Bildare', 'Best Practices', 'Quick Links'] },
            { title: 'Account', links: ['Welcome to Bildare', 'Best Practices', 'Quick Links'] },
          ].map((section, idx) => (
            <div key={idx} className='flex flex-col gap-2'>
              <p className='text-base font-semibold'>{section.title}</p>
              {section.links.map((link, lidx) => (
                <p key={lidx} className='text-[#B0B0B0] font-normal text-sm hover:text-[#B9F500] cursor-pointer transition-colors'>
                  {link}
                </p>
              ))}
            </div>
          ))}

        </div>

        {/* Help Component */}
        <div className='flex-1 w-full mt-10 md:mt-0'>
          <Help />
        </div>

      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs font-medium text-white">
        
        {/* Built by */}
        <div className="flex items-center gap-2">
          <p>Built by</p>
          <Image src="/BildareLogo.png" alt="logo" width={59} height={18} />
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 justify-start sm:justify-end items-center">
          {['Help', 'Email', 'Twitter', 'Discord', 'Terms', 'Privacy'].map((item, idx) => (
            <p 
              key={idx} 
              className="cursor-pointer hover:text-[#B9F500] hover:underline hover:underline-offset-4 transition-colors"
            >
              {item}
            </p>
          ))}
        </div>

      </div>

    </div>
  );
}

export default HelpPage;
