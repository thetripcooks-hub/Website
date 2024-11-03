import type { Metadata } from "next";
import "./globals.css";
import type { Viewport } from "next";
import AppLayout from "@/components/app-layout";


export const metadata: Metadata = {
  title: "Trip Cooks",
  description: "Your personal travel chef",
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
  return <AppLayout>{children}</AppLayout>;
}
