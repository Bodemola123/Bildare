import { Input } from '@/components/ui/input';
import { BookOpenText, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NewsCard = () => (
  <Link href="/news" className="flex flex-col justify-between py-6 rounded-2xl h-[612px] max-w-[446px] w-full">
    <div className='rounded-2xl bg-[#292A25] w-full h-full max-w-[446px] max-h-[417px]'></div>
    <div className='flex flex-col gap-[19px]'>
      <p className=''>Fri 18 Aug, 2025</p>
      <div className='flex flex-col gap-2.5'>
        <p className='text-base font-semibold'>Introducing</p>
        <p className='line-clamp-2 text-[#B0B0B0]'>Meet AstroClash, a fully-featured Play-to-Earn NFT Marketplace Kit, including exclusive design files all editable in Figma plus a pack of custom, beautiful 3D illustrations. This package includes a responsive and fully customized landing page template with 400+ clean & minimal pre-made screens. We've added a lot of different content to maximize the number of layout options and configurations. Drag, drop, and mix different parts to quickly build your own NFT marketplace in a matter of minutes. Buy it now and get the upcoming coded version in React (Now available), HTML version coming up next! Let us know your thoughts or requests in the comments section below.</p>
      </div>
    </div>
  </Link>
);

const BlogPage = () => {
  return (
    <div className='flex flex-col gap-20 w-full bg-transparent  text-white md:flex-grow md:overflow-y-auto h-full px-5 lg:px-[210px] md:px-[100px] py-10 scrollbar-hide relative'>
        <div className='flex justify-between items-center'>
            <Link href="/">
            <Image src="/BildareLogo.png" alt='Bildare' width={151} height={56}/>
            </Link>
            <button className='bg-[#B9F500] md:px-[18px] md:py-[15px] px-2.5 py-1.5 text-[#000000] font-semibold text-base rounded-2xl max-h-[53px] flex items-center justify-center'>Get Started</button>
        </div>
        <div className="flex flex-col gap-6 items-center text-center justify-center">
                <div className="bg-[#B9F5000D] flex gap-2.5 px-2.5 py-1.5 rounded-2xl text-[#B9F500] text-xs items-center justify-center font-medium">
                <BookOpenText className='w-[13px] h-[12px]'/>
                  Bildare Blog
                </div>
                <div className='flex flex-col gap-2 max-w-[450px]'>
                  <h1 className="text-3xl md:text-4xl font-semibold">Releases, insights, and company announcements</h1>
                  <p className="text-base font-normal">
                    The Bildare blog features tactical insights for interactive product creators and animation professionals.
                  </p>
                </div>
        </div>
        <div className='flex flex-col gap-[47px] mx-auto max-w-[1016px] md:px-[40px] px-4'>
            <div className="flex gap-[14px] justify-start items-center self-start flex-wrap">
                <button className="bg-[#B9F50033] border border-[#B9F500] px-[10px] py-1.5 rounded-2xl flex items-center justify-center text-sm font-medium text-[#B9F500]">
                    All
                </button>
                <button className='bg-[#292A25] border border-transparent px-[10px] py-1.5 rounded-2xl flex items-center justify-center text-sm font-medium hover:border-[#B9F500] hover:bg-[#B9F50033] hover:text-[#B9F500]'>
                    Release
                </button>
                <button className='bg-[#292A25] border border-transparent px-[10px] py-1.5 rounded-2xl flex items-center justify-center text-sm font-medium hover:border-[#B9F500] hover:bg-[#B9F50033] hover:text-[#B9F500]'>
                    Case Studies
                </button>
                <button className='bg-[#292A25] border border-transparent px-[10px] py-1.5 rounded-2xl flex items-center justify-center text-sm font-medium hover:border-[#B9F500] hover:bg-[#B9F50033] hover:text-[#B9F500]'>
                    Technologies
                </button>
            </div>
            <div className='grid md:grid-cols-2 md:grid-rows-4 sm:grid-cols-1 gap-6 items-center justify-center'>
              <NewsCard/>
              <NewsCard/>
              <NewsCard/>
              <NewsCard/>
              <NewsCard/>
              <NewsCard/>
              <NewsCard/>
              <NewsCard/>
            </div>
          <div className='bg-gradient-to-r from-lime-300 to-lime-800 flex flex-col md:flex-row justify-between items-center rounded-2xl gap-6 py-10 px-6 w-full max-w-[961px]'>
        <div className='flex flex-col gap-2 text-black text-center md:text-left md:items-start items-center'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>Start Building on the GO!</h1>
          <p className='text-base font-normal'>Need some help?</p>
          <button className='bg-[#1C1D19] rounded-2xl px-6 py-3 text-[#B9F500] font-semibold text-base mt-2 w-fit'>
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
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 w-full max-w-[961px]'>
        <div className="flex flex-col gap-1">
          <p className='font-semibold text-base'>Join our newsletter</p>
          <p className='text-sm text-[#B0B0B0]'>Get all the latest Bildare news delivered to your inbox.</p>
        </div>
        <div className='flex flex-col md:flex-row gap-4 items-start sm:items-center w-full sm:w-auto'>
          <div className="relative w-full sm:w-[300px]">
            <Input
              placeholder="you@example.com"
              className="pl-10 h-14 w-full bg-[#292A25] placeholder:text-[#757575] text-white rounded-2xl"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#757575]" />
          </div>
          <button className='bg-[#B9F500] px-6 py-3 rounded-2xl text-black font-semibold text-base w-full sm:w-auto'>
            Subscribe
          </button>
        </div>
      </div>
        </div>
          <div className="flex flex-col md:flex-row items-start sm:items-center justify-between gap-6 text-xs font-medium text-white w-full">
                
                {/* Built by */}
                <div className="flex items-center gap-2">
                  <p>Built by</p>
                  <Image src="/BildareLogo.png" alt="logo" width={59} height={18} />
                </div>
        
                {/* Links */}
                <div className="flex flex-wrap gap-4 justify-start md:justify-end items-center">
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
  )
}

export default BlogPage