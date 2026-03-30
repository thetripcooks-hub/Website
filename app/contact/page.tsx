import type { Metadata } from "next";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import React from "react";
import ReadyToStart from "@/app/home/_components/ready-to-start";
import Reviews from "@/app/home/_components/reviews";
import ContactHero from "./contact-hero";

export const metadata: Metadata = {
  title: "Contact Us | Trip Cooks",
  description:
    "Get in touch with Trip Cooks. We'd love to help you plan your next group adventure.",
  alternates: { canonical: "https://tripcooks.tours/contact" },
  openGraph: {
    title: "Contact Us | Trip Cooks",
    description:
      "Get in touch with Trip Cooks. We'd love to help you plan your next group adventure.",
    url: "https://tripcooks.tours/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Trip Cooks",
    description:
      "Get in touch with Trip Cooks. We'd love to help you plan your next group adventure.",
  },
};

const Page = () => {
  return (
    <main>
      <ContactHero />
      <Reviews />
      <ReadyToStart />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
