import Help from '@/components/HelpCenter/Help';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: "Help Center",
};


const HelpPage = () => {
  return (
    <div className='flex flex-col gap-10 md:gap-20 w-full bg-transparent text-white md:flex-grow md:overflow-y-auto h-full px-6 md:px-20 py-10 scrollbar-hide'>

      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Help Center</h1>
        <Button variant="ghost" className="px-5 py-2 sm:px-6 sm:py-3 rounded-2xl text-[#B9F500] font-semibold">
          <Link href='/auth'>Login / Register</Link>
        </Button>
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
