import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, NotebookPen, UserRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoCall } from 'react-icons/io5'

const FeedbackPage = () => {
  return (
<div className="flex flex-col gap-20 w-full bg-transparent text-white md:flex-grow overflow-y-auto h-full px-5 sm:px-10 md:px-[100px] lg:px-[210px] py-[52px] scrollbar-hide relative">

  {/* Header */}
  <div className="flex justify-between items-center w-full">
    <Link href="/">
      <Image src="/BildareLogo.png" alt="Bildare" width={151} height={56} />
    </Link>
    <button className="bg-[#B9F500] md:px-[18px] md:py-[11px] px-2.5 py-1.5 text-[#000000] font-semibold text-base rounded-2xl flex items-center justify-center">
      Get Started
    </button>
  </div>

  {/* Main Section: Left Info + Right Form */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
    {/* Left */}
    <div className="flex flex-col gap-4">
      <div className="bg-[#B9F5000D] gap-2.5 rounded-2xl px-[10px] py-1.5 text-[#B9F500] text-xs font-medium w-fit flex flex-row items-center">
        <IoCall className="text-[18px]" />
        Report an Issue
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-semibold leading-[120%] tracking-[-0.08em]">
          Get in Touch With Us
        </h1>
        <p className="text-base font-normal leading-[145%] tracking-[-0.04em]">
          Here to Support You! Reach Out for Assistance, Feedback, or Questions
        </p>
      </div>
      <p className="text-xl sm:text-2xl font-medium leading-[120%] tracking-[-0.06em]">
        Let&apos;s Talk About:
      </p>
    </div>

    {/* Right - Form */}
    <div className="flex flex-col rounded-[20px] gap-8 bg-[#292A25] py-8 px-5">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl sm:text-2xl font-medium leading-[120%] tracking-[-0.06em]">
          Get a quote
        </h1>
        <p className="text-base font-normal leading-[145%] tracking-[-0.04em]">
          Fill up the form and our Team will get back to you within 24 hours.
        </p>
      </div>
      <form className="flex flex-col gap-5 w-full">
        {/* Name */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="name">Name</Label>
          <div className="relative h-[56px] sm:h-[64px]">
            <Input placeholder="John Doe" className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]" />
            <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Email */}
        <div className="grid w-full items-center gap-2">
          <Label>Email</Label>
          <div className="relative h-[56px] sm:h-[64px]">
            <Input placeholder="you@example.com" className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]" />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Subject */}
        <div className="grid w-full items-center gap-2">
          <Label>Subject</Label>
          <div className="relative h-[56px] sm:h-[64px]">
            <Input placeholder="Subject" className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]" />
            <NotebookPen className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Message */}
        <div className="grid w-full items-center gap-2">
          <Label>Message</Label>
          <Textarea placeholder="Tell us a little bit about yourself"
            className="resize-none w-full h-[202px] bg-[#1C1D19] border border-[#292A251A] px-4 py-3 rounded-2xl" />
        </div>
      </form>
      <button className="w-full bg-[#B9F500] py-4 rounded-2xl font-bold text-black">
        Send
      </button>
    </div>
  </div>

  {/* Gradient CTA Section */}
  <div
    className="flex flex-col md:flex-row justify-between items-center rounded-2xl gap-6 py-10 px-6"
    style={{
      backgroundImage: "linear-gradient(to right, #bef264, #4d7c0f)",
    }}
  >
    <div className="flex flex-col gap-2 text-black text-center md:text-left md:items-start items-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
        Start Building on the GO!
      </h1>
      <p className="text-base font-normal">Need some help?</p>
      <button className="bg-[#1C1D19] rounded-2xl px-6 py-3 text-[#B9F500] font-semibold text-base mt-2 w-fit">
        Get Started
      </button>
    </div>
    <Image
      src="/Capa.svg"
      alt="Cap"
      width={183}
      height={137}
      className="w-40 sm:w-48 md:w-52 h-auto"
    />
  </div>

  {/* Newsletter */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-base">Join our newsletter</p>
      <p className="text-sm text-[#B0B0B0]">
        Get all the latest Bildare news delivered to your inbox.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <div className="relative w-full sm:w-[344px]">
        <Input
          placeholder="@example.com"
          className="pl-12 h-14 w-full bg-[#292A25] placeholder:text-[#757575] text-white rounded-2xl"
        />
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#757575]" />
      </div>
      <button className="bg-[#B9F500] px-6 py-3 rounded-2xl text-black font-semibold text-base w-full sm:w-auto">
        Subscribe
      </button>
    </div>
  </div>

  {/* Footer */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-medium text-white w-full">
    <div className="flex items-center gap-2">
      <p>Built by</p>
      <Image src="/BildareLogo.png" alt="logo" width={59} height={18} />
    </div>
    <div className="flex flex-wrap gap-4">
      {["Help", "Email", "Twitter", "Discord", "Terms", "Privacy"].map((item, idx) => (
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

export default FeedbackPage