import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Trip Cooks",
  description:
    "Stories and experiences from our 100+ community of Trippers exploring the world with Trip Cooks.",
  alternates: { canonical: "https://tripcooks.tours/community" },
  openGraph: {
    title: "Community | Trip Cooks",
    description:
      "Stories and experiences from our 100+ community of Trippers exploring the world with Trip Cooks.",
    url: "https://tripcooks.tours/community",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community | Trip Cooks",
    description:
      "Stories and experiences from our 100+ community of Trippers exploring the world with Trip Cooks.",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
