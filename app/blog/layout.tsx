import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Trip Cooks",
  description:
    "The latest travel updates, company news, and community stories from Trip Cooks.",
  alternates: { canonical: "https://tripcooks.tours/blog" },
  openGraph: {
    title: "Blog | Trip Cooks",
    description:
      "The latest travel updates, company news, and community stories from Trip Cooks.",
    url: "https://tripcooks.tours/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Trip Cooks",
    description:
      "The latest travel updates, company news, and community stories from Trip Cooks.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
