import { Suspense } from "react";
import CheckoutPage from "./CheckoutPage";
import Image from "next/image";

export const metadata = {
  title: "Checkout",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div
          className={`flex flex-col items-center justify-center h-screen w-screen text-white transition-opacity duration-500`}
        >
          <div className="animate-bounce mb-4">
            <Image src="/BigBildare.svg" alt="Logo" width={120} height={40} />
          </div>
          <p className="text-lg font-semibold">Loading template details...</p>
        </div>
      }
    >
      <CheckoutPage />
    </Suspense>
  );
}
