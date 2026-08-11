import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Viewport } from "next";
import AppLayout from "@/components/app-layout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/lib/dayjs";

export const metadata: Metadata = {
  metadataBase: new URL("https://tripcooks.tours"),
  title: "Trip Cooks | Group Trips & Travel Planning Services",
  description:
    "We're your personal travel planners — crafting unforgettable group adventures cooked just for you.",
  alternates: { canonical: "https://tripcooks.tours/" },
  openGraph: {
    siteName: "Trip Cooks",
    type: "website",
    locale: "en_US",
    url: "https://tripcooks.tours/",
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "Trip Cooks | Group Trips & Travel Planning Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tripcooks",
    images: ["/img/og-image.png"],
  },
  verification: {
    google: "t7cMRitp47Z7BEvSui_RcDUKS8otTBk7njDu7tNpE5c",
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
