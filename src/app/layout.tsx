import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";
import GoogleAnalyticsTracker from "@/context/GoogleAnalyticsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Put your GA Measurement ID here
const GA_MEASUREMENT_ID = "G-Z9N49E2FSH";

export const metadata: Metadata = {
  title: {
    default: "Bildare – UI Kits, Templates & Design Systems",
    template: "%s | Bildare", // For dynamic titles per page
  },
  description:
    "Bildare is a platform offering UI kits, templates, and design systems for Web 2, Web 3, and AI-focused applications. Designed for both designers and developers, delivering coded components and Figma resources.",
  keywords: [
    "UI kits",
    "design systems",
    "templates",
    "Web 2",
    "Web 3",
    "AI applications",
    "Figma",
    "frontend components",
    "developers",
    "designers",
  ],
  authors: [{ name: "Bildare" }],
  creator: "Bildare",
  metadataBase: new URL("https://www.bildare.com"), // replace with your real domain
  openGraph: {
    type: "website",
    url: "https://www.bildare.com",
    title: "Bildare – UI Kits, Templates & Design Systems",
    description:
      "Discover Bildare: a platform for UI kits, templates, and design systems for Web 2, Web 3, and AI apps. Perfect for designers & developers.",
    siteName: "Bildare",
    images: [
      {
        url: "/og-image.png", // Place your OG image in /public
        width: 1200,
        height: 630,
        alt: "Bildare – UI Kits & Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bildare – UI Kits, Templates & Design Systems",
    description:
      "UI kits, templates & design systems for Web 2, Web 3, and AI apps. Built for designers & developers.",
    creator: "@Bildare", // Replace with your Twitter handle
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white bg-[#1c1d19] min-h-screen relative`}
      >
        {/* GA scripts */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
          `}
        </Script>

        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-[url('/Sample.svg')] bg-cover bg-no-repeat bg-center" />
        
        <div className="relative z-10">
          <AuthProvider>
              <GoogleAnalyticsTracker />
            {children}
          </AuthProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}