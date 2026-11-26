import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Digital — Websites & Web Platforms | Lagos, Nigeria",
  description: "Websites, booking engines, and digital platforms for businesses. Fast delivery, zero monthly hosting, and direct WhatsApp integrations.",
  keywords: [
    "web development Lagos",
    "website designer Nigeria",
    "Nexus Digital",
    "Ogobor Blessing",
    "business website Nigeria",
    "festive website packages",
    "booking website"
  ],
  authors: [{ name: "Ogobor Blessing", url: "https://nexus-digital-dun.vercel.app" }],
  openGraph: {
    title: "Nexus Digital — Web Development & Platforms | Lagos, Nigeria",
    description: "From ₦80,000 Starter Sites to Custom Web Platforms.",
    url: "https://nexus-digital-dun.vercel.app",
    siteName: "Nexus Digital",
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
