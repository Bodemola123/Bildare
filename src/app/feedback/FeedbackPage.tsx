"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, NotebookPen, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoCall } from 'react-icons/io5';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const FeedbackPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://bildare-backend.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success(data.message || "Message sent successfully!");
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        toast.error(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-20 w-full bg-transparent text-white md:flex-grow overflow-y-auto h-full px-5 sm:px-10 md:px-[100px] lg:px-[210px] py-[52px] scrollbar-hide relative">
      
      {/* Header */}
      <div className="flex justify-between items-center w-full px-[21px] py-[12px]">
        <Link href="/">
          <Image src="/BildareLogo.png" alt="Bildare" width={151} height={56} />
        </Link>
        <button className="bg-[#B9F500] md:px-[18px] md:py-[11px] px-2.5 py-1.5 text-[#000000] font-semibold text-base rounded-2xl flex items-center justify-center">
          Get Started
        </button>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Info */}
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

        {/* Right Form */}
        <div className="flex flex-col rounded-[20px] gap-8 bg-[#292A25] py-8 px-5">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl sm:text-2xl font-medium leading-[120%] tracking-[-0.06em]">
              Get a quote
            </h1>
            <p className="text-base font-normal leading-[145%] tracking-[-0.04em]">
              Fill up the form and our Team will get back to you within 24 hours.
            </p>
          </div>
          <form className="flex flex-col gap-5 w-full" onSubmit={e => e.preventDefault()}>
            {/* Name */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative h-[56px] md:h-[64px]">
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]"
                />
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Email */}
            <div className="grid w-full items-center gap-2">
              <Label>Email</Label>
              <div className="relative h-[56px] md:h-[64px]">
                <Input
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Subject */}
            <div className="grid w-full items-center gap-2">
              <Label>Subject</Label>
              <div className="relative h-[56px] md:h-[64px]">
                <Input
                  placeholder="Subject"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]"
                />
                <NotebookPen className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Message */}
            <div className="grid w-full items-center gap-2">
              <Label>Message</Label>
              <Textarea
                placeholder="Tell us a little bit about yourself"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="resize-none w-full h-[202px] bg-[#1C1D19] border border-[#292A251A] px-4 py-3 rounded-2xl"
              />
            </div>
          </form>

          <button
            onClick={handleSend}
            disabled={loading}
            className={`w-full bg-[#B9F500] py-4 rounded-2xl font-bold text-black flex justify-center items-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      {/* Rest of the page (CTA, Newsletter, Footer) remains unchanged */}
    </div>
  );
};

export default FeedbackPage;
