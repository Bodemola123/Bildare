"use client";

import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useGoogleAnalytics } from '@/lib/useGoogleAnalytics'

const NewsPage = () => {
  const { trackEvent } = useGoogleAnalytics();
  const [tracked, setTracked] = useState<number[]>([]); // store fired depths

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      const thresholds = [25, 50, 75, 100];
      thresholds.forEach((t) => {
        if (scrolled >= t && !tracked.includes(t)) {
          trackEvent("scroll_depth", { percent: t, page: "news_page" });
          setTracked((prev) => [...prev, t]);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tracked, trackEvent]);

  return (
    <div className='flex flex-col gap-20 w-full bg-transparent text-white md:flex-grow md:overflow-y-auto h-full px-5 lg:px-[210px] md:px-[100px] py-[52px] scrollbar-hide relative'>
        {/* Header */}
        <div className='flex justify-between items-center'>
            <Link 
              href="/"
              onClick={() => trackEvent("logo_click", { location: "news_header" })}
            >
              <Image src="/BildareLogo.png" alt='Bildare' width={151} height={56}/>
            </Link>
            <button
              onClick={() => trackEvent("get_started_click", { location: "news_header" })}
              className='bg-[#B9F500] md:px-[18px] md:py-[11px] px-2.5 py-1.5 text-[#000000] font-semibold text-base rounded-2xl flex items-center justify-center'
            >
              Get Started
            </button>
        </div>

        {/* Main Content */}
        <div className='flex flex-col gap-[56px] max-w-[916px] mx-auto'>
            <div className='flex flex-col gap-[29px]'>
                <div className='flex items-center gap-2 text-[#000000]'>
                    <div className='rounded-[30px] py-2 px-3 bg-[#75F7A3] text-sm font-medium text-center'>Announcement</div>
                    <div className='rounded-[30px] py-2 px-3 bg-[#FCDC26] text-sm font-medium text-center'>News</div>
                </div>
                <h1 className='md:text-[64px] font-medium text-[48px]' style={{ lineHeight: "100%", letterSpacing: "-0.05em" }}>Introducing Bildare</h1>
                <p className='text-[#A3A3A3] md:text-xl font-medium sm:text-base' style={{ lineHeight: "120%", letterSpacing: "-0.06em" }}>Meet AstroClash, a fully-featured Play-to-Earn NFT Marketplace Kit, including exclusive design files all editable in Figma plus a pack of custom, beautiful 3D illustrations.</p>
                <p className='md:text-base font-medium sm:text-sm' style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}>Wed 6 Aug, 2025</p>

            </div>
            <div className='mx-auto'>
              <Image src="/bildarenews.svg" alt='news' width={916} height={334}/>
            </div>
            
            <h1 className='md:text-3xl font-medium text-2xl' style={{ lineHeight: "120%", letterSpacing: "-0.06em" }}>Meet AstroClash, a fully-featured Play-to-Earn NFT Marketplace Kit, including exclusive design files all editable in Figma plus a pack of custom, beautiful 3D illustrations.</h1>
            <p className='text-[#B0B0B0] md:text-base font-normal leading-8 text-sm' style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}>Meet AstroClash, a fully-featured Play-to-Earn NFT Marketplace Kit, including exclusive design files all editable in Figma plus a pack of custom, beautiful 3D illustrations.

This package includes a responsive and fully customized landing page template with 400+ clean & minimal pre-made screens. We've added a lot of different content to maximize the number of layout options and configurations. Drag, drop, and mix different parts to quickly build your own NFT marketplace in a matter of minutes.

Buy it now and get the upcoming coded version in React (Now available), HTML version coming up next!

Let us know your thoughts or requests in the comments section below. Meet AstroClash, a fully-featured Play-to-Earn NFT Marketplace Kit, including exclusive design files all editable in Figma plus a pack of custom, beautiful 3D illustrations.

This package includes a responsive and fully customized landing page template with 400+ clean & minimal pre-made screens. We've added a lot of different content to maximize the number of layout options and configurations. Drag, drop, and mix different parts to quickly build your own NFT marketplace in a matter of minutes.

Buy it now and get the upcoming coded version in React (Now available), HTML version coming up next!

Let us know your thoughts or requests in the comments section below.</p>
            <div 
              className='flex justify-center items-center cursor-pointer'
              onClick={() => trackEvent("video_click", { video: "astroclash_news" })}
            >
              <div className="bg-[#292A25] rounded-2xl w-full max-w-[784px] h-[300px] md:h-[357px] flex items-center justify-center">
                <Image
                  src="/youtube.svg"
                  alt="play"
                  width={172}
                  height={120}
                />
              </div>
            </div>
            <p className='text-[#B0B0B0] text-sm md:text-base font-normal leading-8' style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}>Meet AstroClash, a fully-featured Play-to-Earn NFT Marketplace Kit, including exclusive design files all editable in Figma plus a pack of custom, beautiful 3D illustrations.

This package includes a responsive and fully customized landing page template with 400+ clean & minimal pre-made screens. We've added a lot of different content to maximize the number of layout options and configurations. Drag, drop, and mix different parts to quickly build your own NFT marketplace in a matter of minutes.

Buy it now and get the upcoming coded version in React (Now available), HTML version coming up next!

Let us know your thoughts or requests in the comments section below.Meet AstroClash, a fully-featured Play-to-Earn NFT Marketplace Kit, including exclusive design files all editable in Figma plus a pack of custom, beautiful 3D illustrations.</p>
            <div className='bg-gradient-to-r from-lime-300 to-lime-800 flex flex-col md:flex-row justify-between items-center rounded-2xl gap-6 py-10 px-6'>
              <div className='flex flex-col gap-2 text-black text-center md:text-left md:items-start items-center'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>Start Building on the GO!</h1>
                <p className='text-base font-normal'>Need some help?</p>
                <button
                  onClick={() => trackEvent("get_started_click", { location: "news_cta" })}
                  className='bg-[#1C1D19] rounded-2xl px-[18px] py-[11px] text-[#B9F500] font-semibold text-base mt-2 w-fit'
                >
                  Get Started
                </button>
              </div>
              <Image 
                src="/Capa.svg" 
                alt='Cap' 
                width={183} 
                height={137} 
                className="w-40 sm:w-48 md:w-52 h-auto"
              />
            </div>
        
            {/* Newsletter Section */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0'>
              <div className="flex flex-col gap-1">
                <p className='font-semibold text-base'>Join our newsletter</p>
                <p className='text-sm text-[#B0B0B0]'>Get all the latest Bildare news delivered to your inbox.</p>
              </div>
              <div className='flex flex-col md:flex-row gap-4 items-start sm:items-center w-full sm:w-auto'>
                <div className="relative w-full sm:w-[344px]">
                  <Input
                    placeholder="you@example.com"
                    className="pl-12 h-14 w-full bg-[#292A25] placeholder:text-[#757575] text-white rounded-2xl"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#757575]" />
                </div>
                <button
                  onClick={() => trackEvent("newsletter_subscribe", { source: "news_page" })}
                  className='bg-[#B9F500] px-[18px] py-[11px] rounded-2xl text-black font-semibold text-base w-full sm:w-auto'
                >
                  Subscribe
                </button>
              </div>
            </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs font-medium text-white max-w-[961px]">
          <div className="flex items-center gap-2">
            <p>Built by</p>
            <Image src="/BildareLogo.png" alt="logo" width={59} height={18} />
          </div>
          <div className="flex flex-wrap gap-4 justify-start sm:justify-end items-center">
            {['Help', 'Email', 'Twitter', 'Discord', 'Terms', 'Privacy'].map((item) => (
              <p 
                key={item}
                onClick={() => trackEvent("footer_link_click", { link: item })}
                className="cursor-pointer hover:text-[#B9F500] hover:underline hover:underline-offset-4 transition-colors"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
    </div>
  )
}

export default NewsPage
