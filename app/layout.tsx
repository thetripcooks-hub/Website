import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Viewport } from "next";
import AppLayout from "@/components/app-layout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import '@/lib/dayjs'; 

export const metadata: Metadata = {
  metadataBase: new URL("https://tripcooks.tours"),
  title: "Trip Cooks | Group Trips & Travel Planning Services",
  description:
    "We're your personal travel planners — crafting unforgettable group adventures cooked just for you.",
  openGraph: {
    siteName: "Trip Cooks",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tripcooks",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppLayout>
      {children}
      <Analytics />
      <SpeedInsights />
    </AppLayout>
  );
}
