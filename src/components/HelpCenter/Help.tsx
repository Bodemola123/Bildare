import Image from 'next/image';
import React from 'react';
import { Input } from '../ui/input';
import { Mail } from 'lucide-react';

const HelpCard = () => (
  <div className="flex flex-col bg-[#292a25] p-5 rounded-2xl gap-4 justify-start items-start w-full max-w-xs md:max-w-[246px]">
    <Image src="/question-circle.svg" alt='?' width={24} height={24} />
    <h1 className='text-base font-semibold'>Getting Started</h1>
    <p className='text-sm font-normal text-[#CCCCCC]'>
      Learn the basics of navigating and using Bildare to your best advantage
    </p>
  </div>
);

const Help = () => {
  return (
    <div className='flex flex-col gap-12 text-white w-full max-w-[781px]'>
      
      {/* Intro Section */}
      <div className='flex flex-col gap-4 items-start justify-start'>
        <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl'>Welcome to Bildare</h1>
        <p className='text-sm md:text-base text-[#CCCCCC]' style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}>
Welcome to Bildare – where UI templates actually work. We create new-age, composable design systems that go beyond pretty dashboards. Every template is developer-tested, framework-ready, and built for real applications, not just demos.
        </p>
      </div>

      {/* Illustration */}
      <div className='w-full overflow-x-auto'>
        <Image 
          src="/Help.svg" 
          alt='help' 
          width={781} 
          height={213} 
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Help Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {[...Array(6)].map((_, idx) => (
          <HelpCard key={idx} />
        ))}
      </div>

      {/* Gradient CTA Section */}
      <div className='bg-gradient-to-r from-lime-300 to-lime-800 flex flex-col md:flex-row justify-between items-center rounded-2xl gap-6 py-10 px-6'>
        <div className='flex flex-col gap-2 text-black text-center md:text-left md:items-start items-center'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>Start Building on the GO!</h1>
          <p className='text-base font-normal'>Need some help?</p>
          <button className='bg-[#1C1D19] rounded-2xl px-[18px] py-[11px] text-[#B9F500] font-semibold text-base mt-2 w-fit'>
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
        <div className="flex flex-col gap-1 max-w-[269px]">
          <p className='font-semibold text-base'>Join our newsletter</p>
          <p className='text-sm text-[#B0B0B0]'>Get all the latest Bildare news <br></br>delivered to your inbox.</p>
        </div>
        <div className='flex flex-col md:flex-row gap-4 items-start sm:items-center w-full sm:w-auto'>
          <div className="relative w-full sm:w-[344px]">
            <Input
              placeholder="@example.com"
              className="pl-12 h-14 w-full bg-[#292A25] placeholder:text-[#757575] text-white rounded-2xl"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#757575]" />
          </div>
          <button className='bg-[#B9F500] px-[18px] py-[11px] rounded-2xl text-black font-semibold text-base w-full sm:w-auto'>
            Subscribe
          </button>
        </div>
      </div>

    </div>
  );
}

export default Help;
