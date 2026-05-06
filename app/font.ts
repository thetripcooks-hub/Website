import { Alexandria, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

export const alexandria = Alexandria({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alexandria",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
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

export const oggTrial = localFont({
  src: "./fonts/Ogg Font Family/Ogg-Bold.ttf",
  display: "swap",
  variable: "--font-ogg-trial",
});
