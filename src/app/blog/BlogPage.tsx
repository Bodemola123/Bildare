"use client";

import { Input } from '@/components/ui/input';
import { BookOpenText, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useGoogleAnalytics } from '@/lib/useGoogleAnalytics';

const NewsCard = ({ index }: { index: number }) => {
  const { trackEvent } = useGoogleAnalytics();
  return (
    <Link
      href="/news"
      onClick={() => trackEvent("news_card_click", { index, page: "blog" })}
      className="flex flex-col justify-between py-6 rounded-2xl h-[612px] max-w-[523px] w-full"
    >
      <div className="rounded-2xl bg-[#292A25] w-full h-full max-w-[523px] max-h-[417px]"></div>
      <div className="flex flex-col gap-[19px]">
        <p style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}>Fri 18 Aug, 2025</p>
        <div className="flex flex-col gap-2.5">
          <p className="text-base font-semibold" style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}>
            Introducing
          </p>
          <p
            className="line-clamp-2 text-[#B0B0B0]"
            style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}
          >
            Meet AstroClash, a fully-featured Play-to-Earn NFT Marketplace Kit...
          </p>
        </div>
      </div>
    </Link>
  );
};

const BlogPage = () => {
  const { trackEvent } = useGoogleAnalytics();

  const categories = ["All", "Release", "Case Studies", "Technologies"];
  const footerLinks = ["Help", "Email", "Twitter", "Discord", "Terms", "Privacy"];

  return (
    <div className="flex flex-col gap-20 w-full bg-transparent text-white md:flex-grow md:overflow-y-auto h-full px-5 lg:px-[210px] md:px-[100px] py-[52px] scrollbar-hide relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link href="/" onClick={() => trackEvent("nav_click", { link: "home_logo", page: "blog" })}>
          <Image src="/BildareLogo.png" alt="Bildare" width={151} height={56} />
        </Link>
        <button
          className="bg-[#B9F500] md:px-[18px] md:py-[11px] px-2.5 py-1.5 text-[#000000] font-semibold text-base rounded-2xl max-h-[53px] flex items-center justify-center"
          onClick={() => trackEvent("cta_click", { action: "get_started", page: "blog_header" })}
        >
          Get Started
        </button>
      </div>

      {/* Intro */}
      <div className="flex flex-col gap-6 items-center text-center justify-center">
        <div className="bg-[#B9F5000D] flex gap-2.5 px-2.5 py-1.5 rounded-2xl text-[#B9F500] text-xs items-center justify-center font-medium">
          <BookOpenText className="w-[13px] h-[12px]" />
          Bildare Blog
        </div>
        <div className="flex flex-col gap-2 max-w-[450px]">
          <h1
            className="text-3xl md:text-4xl font-semibold"
            style={{ lineHeight: "120%", letterSpacing: "-0.08em" }}
          >
            Releases, insights, and company announcements
          </h1>
          <p className="text-base font-normal" style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}>
            The Bildare blog features tactical insights for interactive product creators and animation
            professionals.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-[47px] mx-auto max-w-[1070px] md:px-[40px] px-4">
        <div className="flex gap-[14px] justify-start items-center self-start flex-wrap">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => trackEvent("blog_category_click", { category: cat })}
              className={`${
                cat === "All"
                  ? "bg-[#B9F50033] border border-[#B9F500] text-[#B9F500]"
                  : "bg-[#292A25] border border-transparent text-white hover:border-[#B9F500] hover:bg-[#B9F50033] hover:text-[#B9F500]"
              } px-[10px] py-1.5 rounded-2xl flex items-center justify-center text-sm font-medium`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News grid */}
        <div className="grid md:grid-cols-2 md:grid-rows-4 sm:grid-cols-1 gap-6 items-center justify-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <NewsCard key={i} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-lime-300 to-lime-800 flex flex-col md:flex-row justify-between items-center rounded-2xl gap-6 py-10 px-6 w-full max-w-[961px]">
          <div className="flex flex-col gap-2 text-black text-center md:text-left md:items-start items-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Start Building on the GO!</h1>
            <p className="text-base font-normal">Need some help?</p>
            <button
              onClick={() => trackEvent("cta_click", { action: "get_started", page: "blog_bottom" })}
              className="bg-[#1C1D19] rounded-2xl px-[18px] py-[11px] text-[#B9F500] font-semibold text-base mt-2 w-fit"
            >
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 w-full max-w-[961px]">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-base">Join our newsletter</p>
            <p className="text-sm text-[#B0B0B0]">
              Get all the latest Bildare news <br /> delivered to your inbox.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-[344px]">
              <Input
                placeholder="you@example.com"
                onFocus={() => trackEvent("newsletter_field_focus", { field: "email", page: "blog" })}
                className="pl-12 h-14 w-full bg-[#292A25] placeholder:text-[#757575] text-white rounded-2xl"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#757575]" />
            </div>
            <button
              onClick={() => trackEvent("newsletter_subscribe", { page: "blog" })}
              className="bg-[#B9F500] px-[18px] py-[11px] rounded-2xl text-black font-semibold text-base w-full sm:w-auto"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-start sm:items-center justify-between gap-6 text-xs font-medium text-white w-full">
        <div className="flex items-center gap-2">
          <p>Built by</p>
          <Image src="/BildareLogo.png" alt="logo" width={59} height={18} />
        </div>
        <div className="flex flex-wrap gap-4 justify-start md:justify-end items-center">
          {footerLinks.map((item, idx) => (
            <p
              key={idx}
              onClick={() => trackEvent("footer_link_click", { link: item, page: "blog" })}
              className="cursor-pointer hover:text-[#B9F500] hover:underline hover:underline-offset-4 transition-colors"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
