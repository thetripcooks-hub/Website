import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How To Book | Trip Cooks",
  description:
    "Learn how to book a group trip or private travel experience with Trip Cooks in 5 simple steps.",
  alternates: { canonical: "https://tripcooks.tours/how-to-book" },
  openGraph: {
    title: "How To Book | Trip Cooks",
    description:
      "Learn how to book a group trip or private travel experience with Trip Cooks in 5 simple steps.",
    url: "https://tripcooks.tours/how-to-book",
    type: "website",
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "How To Book | Trip Cooks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How To Book | Trip Cooks",
    description:
      "Learn how to book a group trip or private travel experience with Trip Cooks in 5 simple steps.",
    images: ["/img/og-image.png"],
  },
};

export default function HowToBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
