import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Group Trips | Trip Cooks",
  description:
    "Browse our upcoming group trips and destination packages. From beach getaways to cultural adventures — find your next trip with Trip Cooks.",
  alternates: { canonical: "https://tripcooks.tours/trips" },
  openGraph: {
    title: "Explore Group Trips | Trip Cooks",
    description:
      "Browse our upcoming group trips and destination packages. From beach getaways to cultural adventures — find your next trip with Trip Cooks.",
    url: "https://tripcooks.tours/trips",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Group Trips | Trip Cooks",
    description:
      "Browse our upcoming group trips and destination packages. From beach getaways to cultural adventures — find your next trip with Trip Cooks.",
  },
};

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
