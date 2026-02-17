import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Trip Cooks",
  description:
    "Meet the team behind Trip Cooks. We organise unforgettable group trips and tailor-made travel experiences for adventurers.",
  alternates: { canonical: "https://tripcooks.tours/about" },
  openGraph: {
    title: "About Us | Trip Cooks",
    description:
      "Meet the team behind Trip Cooks. We organise unforgettable group trips and tailor-made travel experiences for adventurers.",
    url: "https://tripcooks.tours/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Trip Cooks",
    description:
      "Meet the team behind Trip Cooks. We organise unforgettable group trips and tailor-made travel experiences for adventurers.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
