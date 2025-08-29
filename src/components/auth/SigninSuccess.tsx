"use client";

import React, { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";

const SigninSuccess = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/"; // Redirect to homepage
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col bg-[#292A25]  items-center justify-center gap-5 md:gap-7 h-full p-4 md:p-6 w-full max-w-md md:max-w-lg rounded-2xl">
        
        {/* Success Icon */}
        <FiCheckCircle className="text-7xl md:text-9xl text-white" />

        {/* Title */}
        <h1 className="text-xl md:text-3xl text-fontlight font-bold text-center">
          Sign in Successful
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-fontlight text-center font-light px-2 md:px-0">
          Sign in authentication completed
        </p>
      </div>
    </div>
  )
}

export default SigninSuccess
