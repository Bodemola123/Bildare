"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center gap-[30px] text-white overflow-hidden">
      {/* Background Images (hidden on small devices) */}
      <Image
        src="/plug.svg"
        alt="Plug"
        width={450}
        height={393.3}
        className="hidden md:block fixed bottom-0 left-0"
      />
      <Image
        src="/left.svg"
        alt="Left Decoration"
        width={121}
        height={185}
        className="hidden md:block fixed top-1/2 left-0 -translate-y-1/2"
      />
      <Image
        src="/right-top.svg"
        alt="Right Top Decoration"
        width={221}
        height={285}
        className="hidden md:block fixed top-0 right-0"
      />

      {/* 404 Text */}
      <div
        className="text-[120px] sm:text-[200px] md:text-[285px] font-semibold flex flex-row gap-[22.7px] items-center justify-center"
        style={{ lineHeight: "100%", letterSpacing: "-0.05em" }}
      >
        4
        <Image
          src="/BigBildare.svg"
          alt="Bildare"
          width={227.11}
          height={227.11}
          className="w-[90px] sm:w-[150px] md:w-[227.11px] h-auto"
        />
        4
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-[27px] items-center justify-center max-w-[90%] sm:max-w-[518.18px]">
        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-semibold"
          style={{ lineHeight: "100%", letterSpacing: "-0.05em" }}
        >
          Oops! Page Not Found
        </h1>
        <div
          className="flex flex-col justify-center items-center gap-2 text-center font-normal text-sm sm:text-base md:text-[18px] text-[#EBEBEB]"
          style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}
        >
          <p>We&apos;re sorry. The page you requested could not be found.</p>
          <p>Please go back to the home page</p>
        </div>
      </div>

      {/* Button */}

        <Link href='/'
          className="px-[18px] py-[11px] rounded-2xl flex flex-row gap-2.5 text-[#000000] text-sm sm:text-base font-semibold bg-[#B9F500]"
          style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}
        >
          Go Back Home
          <Image src="/arrow-right.svg" alt="back" width={18} height={18} />
      </Link>
    </div>
  );
}
