import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trip Cooks | Group Trips & Travel Planning Services",
  description:
    "We're your personal travel planners — crafting unforgettable group adventures cooked just for you.",
  alternates: { canonical: "https://tripcooks.tours/" },
  openGraph: {
    title: "Trip Cooks | Group Trips & Travel Planning Services",
    description:
      "We're your personal travel planners — crafting unforgettable group adventures cooked just for you.",
    url: "https://tripcooks.tours/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trip Cooks | Group Trips & Travel Planning Services",
    description:
      "We're your personal travel planners — crafting unforgettable group adventures cooked just for you.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Trip Cooks",
  url: "https://tripcooks.tours",
  logo: "https://tripcooks.tours/logo.svg",
  sameAs: [
    "https://www.instagram.com/tripcooks/",
    "https://www.tiktok.com/@tripcooks",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Trip Cooks",
  url: "https://tripcooks.tours",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://tripcooks.tours/trips?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {children}
    </>
  );
}
