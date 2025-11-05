import { Alexandria } from "next/font/google";
import localFont from "next/font/local";

export const alexandria = Alexandria({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alexandria",
});

export const arial = localFont({
  src: "./fonts/Arial/ArialMT.ttf",
  display: "swap",
  variable: "--font-arial",
});

export const guthenBloots = localFont({
  src: "./fonts/GuthenBloots/Guthen-Bloots-Personal-Use.ttf",
  display: "swap",
  variable: "--font-guthen-bloots",
});
