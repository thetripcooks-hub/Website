import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Trips | Trip Cooks",
  description:
    "Plan a bespoke private group trip with Trip Cooks. We craft personalised travel experiences tailored entirely to your group.",
  alternates: { canonical: "https://tripcooks.tours/private-trips" },
  openGraph: {
    title: "Private Trips | Trip Cooks",
    description:
      "Plan a bespoke private group trip with Trip Cooks. We craft personalised travel experiences tailored entirely to your group.",
    url: "https://tripcooks.tours/private-trips",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Trips | Trip Cooks",
    description:
      "Plan a bespoke private group trip with Trip Cooks. We craft personalised travel experiences tailored entirely to your group.",
  },
};

export default function PrivateTripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
