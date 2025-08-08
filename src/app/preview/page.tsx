'use client'

import {
  ChevronRight,
  Clock3,
  Dot,
  Eye,
  GalleryHorizontal,
  House,
  Search,
  Smartphone,
  SquareChevronLeft
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'

const TemplateCard = () => (
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

const Preview = () => {
  return (
    <div className="flex flex-col gap-10 w-full min-h-screen text-white py-10 overflow-y-auto scrollbar-hide h-full md:px-[160px]">
      
      {/* Header */}
<header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">
  {/* Title */}
  <h1 className="text-2xl font-bold">Templates</h1>

  {/* Search Input */}
  <div className="flex items-center bg-[#292A25] px-4 py-3 rounded-2xl border border-[#292A251A] w-full max-w-[440px] max-h-[46px]">
    <Search className="text-[#858585]" size={20} />
    <Input
      placeholder="Search categories, templates, UIs, components..."
      className="ml-3 placeholder:text-[#757575] border-none bg-transparent focus:ring-0"
    />
  </div>

  {/* Login / Register Button */}
  <Button
    variant="ghost"
    className="px-6 py-3 rounded-2xl text-[#B9F500] font-semibold w-full sm:w-fit "
  >
    Login / Register
  </Button>
</header>


      {/* Breadcrumb & Go Back */}
      <div className="flex flex-wrap items-center gap-6">
        <Link
          href="/"
          className="bg-[#B9F50033] flex gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-semibold text-[#B9F500]"
        >
          <SquareChevronLeft size={18} />
          Go Back
        </Link>

        <div className="flex items-center gap-1.5 text-sm font-medium text-[#757575]">
          <Link href="/">
            <House size={18} className="hover:text-white" />
          </Link>
          <ChevronRight size={18} />
          <p className="hover:text-white">UI Templates</p>
          <ChevronRight size={18} className="text-white" />
          <p className="text-white">Blockchain</p>
        </div>
      </div>

      {/* Template Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl font-bold text-white">Template Name</h2>
          <p className="max-w-[600px] text-[#B0B0B0]">
            Dive into the future of technology with organized categories, visually stunning design, and interactive features.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap md:flex-row sm:flex-col sm:items-center sm:justify-center md:items-start md:justify-start">
          <Link href="/checkout" className="bg-[#B9F500] flex items-center justify-center text-black hover:bg-[#B9F50099] rounded-2xl px-6 py-3 font-semibold w-full sm:max-w-[339px] md:w-max cursor-pointer">
            Purchase $50
          </Link>
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-[#B9F500] hover:bg-[#B9F50033] font-bold w-full sm:max-w-[339px] md:w-max">
            <Eye size={18} />
            Preview Demo
          </button>
        </div>

<div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 bg-[#292A25] px-6 py-5 rounded-3xl text-sm font-medium w-full md:w-fit">
  <div className="flex items-center gap-2">
    <Clock3 size={16} />
    23 Jul, 2025
  </div>
  <div className="flex items-center gap-2">
    <GalleryHorizontal size={16} />
    8 pages
  </div>
  <div className="flex items-center gap-2">
    <Eye size={16} />
    20k views
  </div>
  <div className="flex items-center gap-2">
    <Smartphone size={16} />
    Responsive
  </div>
</div>

      </div>

      {/* Image Previews */}
<div className="flex justify-center w-full">
  <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 w-full">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className={`bg-[#292A25] rounded-2xl h-[392px] w-full`}
      />
    ))}
  </div>
</div>


      {/* Description and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        {/* About Template */}
        <div className="flex flex-col gap-8">
          <h3 className="text-3xl font-bold">About This Template</h3>
          <p className="text-[#B0B0B0] text-base">
            Meet AstroClash, a fully-featured Play-to-Earn NFT Marketplace Kit with exclusive Figma design files and 3D illustrations.
            <br /><br />
            It includes 400+ clean, minimal screens and layouts to build your own NFT marketplace quickly. Comes with a responsive landing page in React (available now), and HTML version coming soon.
          </p>

          <div className="flex flex-col gap-4">
            <h4 className="text-2xl font-bold">Features</h4>
            {[
              "400+ Exclusive Pre-Built Templates",
              "Feature 1",
              "Feature 2",
              "Feature 3",
              "Feature 4"
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#292A25] py-2 px-4 rounded-lg max-w-xs text-sm font-medium"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Categories */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-semibold">Tools Used</h4>
            <div className="flex gap-4 items-center">
              {["reactjs", "tailwind", "javascript", "figmaa"].map((tool) => (
                <Image
                  key={tool}
                  src={`/${tool}.svg`}
                  alt={tool}
                  width={31}
                  height={31}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm text-[#B0B0B0]">
            <div>
              <h5 className="text-white font-semibold mb-4">Categories</h5>
              {["Blockchain", "Web 3", "Cryptocurrency", "Memecoin"].map((cat) => (
                <p key={cat} className="mb-2">{cat}</p>
              ))}
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4">Pages</h5>
              {[
                "Home",
                "(4 filter pages)",
                "404",
                "About",
                "All works",
                "CMS works pages",
                "Contact"
              ].map((page) => (
                <p key={page} className="mb-2">{page}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className='bg-[#FEF9B514]'/>

      <div className='flex flex-col gap-[22px]'>
        <h1 className='text-[#FFFFFF] font-bold text-[32px] text-left'>More like this</h1>
        <div className="grid md:grid-cols-3 md:grid-rows-2 sm:grid-rows-1 gap-4">
          <TemplateCard/>
          <TemplateCard/>
          <TemplateCard/>
          <TemplateCard/>
          <TemplateCard/>
          <TemplateCard/>
        </div>
      </div>

    </div>
  )
}

export default Preview
