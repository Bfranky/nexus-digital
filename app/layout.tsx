import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexora Digital — High-Converting Websites & Web Platforms | Lagos, Nigeria",
  description: "Handcrafted websites, booking engines, and digital platforms for Nigerian businesses. Built by Blessed Ogobor. Fast 5-day festive delivery, ₦0 monthly hosting on Vercel, and direct WhatsApp integrations.",
  keywords: [
    "web development Lagos",
    "website designer Nigeria",
    "Nexora Digital",
    "Blessed Ogobor",
    "business website Nigeria",
    "festive website packages",
    "event centre booking website",
    "restaurant WhatsApp ordering website"
  ],
  authors: [{ name: "Blessed Ogobor", url: "https://portfolio-zeta-three-34.vercel.app" }],
  openGraph: {
    title: "Nexora Digital — Web Development & Platforms | Lagos, Nigeria",
    description: "From ₦80,000 Festive Starters to Full Enterprise Platforms. Turn visitors into paying clients.",
    url: "https://portfolio-zeta-three-34.vercel.app",
    siteName: "Nexora Digital",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
