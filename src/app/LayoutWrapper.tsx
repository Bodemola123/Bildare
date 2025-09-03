"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { fetchSession } = useAuth();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const initSession = async () => {
      await fetchSession();
      // trigger fade-out before showing the app
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500); // 500ms fade-out
    };
    initSession();
  }, [fetchSession]);

  if (loading) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Logo with bounce effect */}
        <div className="animate-bounce mb-4">
          <Image src="/BigBildare.svg" alt="Logo" width={120} height={40} />
        </div>
        <p className="text-lg font-semibold">Loading experience...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default LayoutWrapper;
