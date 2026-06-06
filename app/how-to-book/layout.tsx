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
  },
  twitter: {
    card: "summary_large_image",
    title: "How To Book | Trip Cooks",
    description:
      "Learn how to book a group trip or private travel experience with Trip Cooks in 5 simple steps.",
  },
};

export default function HowToBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
