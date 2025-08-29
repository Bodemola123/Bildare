"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CalendarIcon, Mail, MapPin, CreditCard, Lock, Building2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner"; // optional toast for errors

const CheckoutPage = () => {
  const [date, setDate] = useState<Date | undefined>();
  const { name, email, fetchSession, clearAuth } = useAuth();
  const [loading, setLoading] = useState(false);

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
    <div className="flex flex-col gap-10 w-full text-white p-6 md:p-10 lg:px-[180px] overflow-y-auto">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">
        <h1 className="text-2xl font-bold">CHECKOUT</h1>

        {/* Auth conditional */}
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
              <Avatar className="cursor-pointer !w-10 !h-10">
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
      </header>

      {/* Back link */}
      <div className="flex flex-wrap items-center gap-6">
        <Link
          href="/preview"
          className="bg-[#B9F50033] flex gap-2.5 px-[18px] py-[11px] rounded-2xl text-sm font-semibold text-[#B9F500]"
        >
          <Image src="/chevron-left.svg" alt="left-arrow" width={18} height={18} />
          Go Back
        </Link>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-4xl md:text-5xl">Templates Name</h1>
          <div className="bg-[#D9D9D9] h-64 md:h-[422px] rounded-2xl"></div>
          <p
            className="text-sm md:text-base"
            style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}
          >
            Dive into the future of technology with organized categories, visually
            stunning design, and interactive features, making your tech blogging
            experience both intuitive and elegant.
          </p>

          <div className="flex flex-col gap-4">
            <h4 className="text-2xl font-bold">Features</h4>
            {[
              "400+ Exclusive Pre-Built Templates",
              "Feature 1",
              "Feature 2",
              "Feature 3",
              "Feature 4",
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

        {/* Right Column */}
        <div className="bg-[#292A25] w-full gap-[31px] px-[21px] py-[31px] rounded-3xl h-fit">
          <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid grid-cols-2 w-fit mb-9 bg-transparent gap-2">
              <TabsTrigger
                value="card"
                className="py-[11px] px-[18px] rounded-[16px] data-[state=active]:text-[#B9F500] text-[#949494] font-semibold"
              >
                Pay with Card
              </TabsTrigger>
              <TabsTrigger
                value="usdc"
                className="py-[11px] px-[18px] rounded-[16px] data-[state=active]:text-[#B9F500] text-[#949494] font-semibold"
              >
                Pay with USDC
              </TabsTrigger>
            </TabsList>

            {/* Card Payment Form */}
            <TabsContent value="card">
              <form className="flex flex-col gap-6">
                {/* Address & Postal */}
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="address">Billing Address</Label>
                    <div className="relative h-[64px]">
                      <Input
                        placeholder="123 Your Street"
                        className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]"
                      />
                      <MapPin className="absolute left-3 top-5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="postal-code">Postal Code</Label>
                    <div className="relative h-[64px]">
                      <Input
                        placeholder="123456"
                        className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]"
                      />
                      <Building2 className="absolute left-3 top-5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative h-[64px]">
                    <Input
                      value={email ?? ""}
                      placeholder="you@example.com"
                      className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]"
                      readOnly
                    />
                    <Mail className="absolute left-3 top-5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                {/* Card Number */}
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative h-[64px]">
                    <Input
                      placeholder="1234 5678 9012 3456"
                      className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]"
                    />
                    <CreditCard className="absolute left-3 top-5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                {/* Expiry & CVV */}
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left font-normal text-white bg-[#1C1D19] hover:bg-[#1C1D19] px-3 h-[64px]"
                        >
                          {date ? format(date, "PPP") : <span className="text-[#757575]">Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#1C1D19] border-0 text-white" align="start">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative h-[64px]">
                      <Input
                        placeholder="123"
                        className="pl-10 h-full placeholder:text-[#757575] text-white w-full bg-[#1C1D19]"
                      />
                      <Lock className="absolute left-3 top-5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between">
                    <p>SubTotal</p>
                    <p>$50.00</p>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <p>Total</p>
                    <p className="text-[#B9F500]">$50.00</p>
                  </div>
                </div>

                <button className="w-full bg-[#B9F500] py-[15px] px-[18px] rounded-2xl font-bold text-black">
                  Pay $50.00
                </button>
              </form>
            </TabsContent>

            {/* USDC Payment */}
            <TabsContent value="usdc">
              <form className="flex flex-col gap-6">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="wallet">Wallet Address</Label>
                  <Input
                    placeholder="0x123...abc"
                    className="placeholder:text-[#757575] text-white w-full border-none bg-[#1C1D19] h-[64px]"
                  />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="network">Network</Label>
                  <Input
                    placeholder="Ethereum / Polygon"
                    className="placeholder:text-[#757575] text-white w-full border-none bg-[#1C1D19] h-[64px]"
                  />
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <p>Total</p>
                  <p className="text-[#B9F500]">$50.00</p>
                </div>
                <button className="w-full bg-[#B9F500] py-4 rounded-2xl font-bold text-black">
                  Pay $50.00
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Refund Policy */}
      <p className="text-base mt-6" style={{ lineHeight: "145%", letterSpacing: "-0.04em" }}>
        <span className="font-semibold text-[#B9F500]">Refund Policy:</span> As these are
        digital products, we do not offer refunds. Once a template is purchased, it cannot
        be returned. We recommend reviewing the product details and any available previews
        carefully before making a purchase.
      </p>
    </div>
  );
};

export default CheckoutPage;
