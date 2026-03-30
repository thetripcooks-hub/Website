import React from "react";
import type { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { queryGetAllTrips } from "@/queries/trips-query";
import { AllTripsResponse } from "@/types/trip";
import { locationToSlug } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateStaticParams() {
  try {
    const { data } = await getClient().query<AllTripsResponse>({
      query: queryGetAllTrips,
    });
    return (data?.tripCollection?.items ?? []).map((trip) => ({
      slug: locationToSlug(trip.location),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { data } = await getClient().query<AllTripsResponse>({
      query: queryGetAllTrips,
    });
    const trip = data?.tripCollection.items.find(
      (t) => locationToSlug(t.location) === slug
    );
    if (!trip) return {};

    const location = trip.location;
    const image = trip.bannerImagesCollection?.items?.[0]?.url;
    const desc = trip.description
      ? trip.description.slice(0, 155)
      : `Join the Trip Cooks group trip to ${location}. Book your slot and secure your adventure today.`;
    const url = `https://tripcooks.tours/trips/${slug}`;

    return {
      title: `${location} Group Trip | Trip Cooks`,
      description: desc,
      alternates: { canonical: url },
      openGraph: {
        title: `${location} Group Trip | Trip Cooks`,
        description: desc,
        url,
        type: "website",
        images: [{ url: image ?? "https://tripcooks.tours/logo.png", width: 1200, height: 630, alt: `${location} group trip` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${location} Group Trip | Trip Cooks`,
        description: desc,
        images: [image ?? "https://tripcooks.tours/logo.png"],
      },
    };
  } catch {
    return {};
  }
}

export default async function TripDetailLayout({ children, params }: Props) {
  const { slug } = await params;
  let jsonLd = null;

  try {
    const { data } = await getClient().query<AllTripsResponse>({
      query: queryGetAllTrips,
    });
    const trip = data?.tripCollection.items.find(
      (t) => locationToSlug(t.location) === slug
    );

    if (trip) {
      const image = trip.bannerImagesCollection?.items?.[0]?.url;
      const url = `https://tripcooks.tours/trips/${slug}`;

      jsonLd = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: `${trip.location} Group Trip`,
        description:
          trip.description ||
          `Group trip to ${trip.location} organised by Trip Cooks.`,
        touristType: "Group travellers",
        url,
        ...(image ? { image } : {}),
        ...(trip.startDate
          ? { startDate: trip.startDate, endDate: trip.endDate }
          : {}),
        offers: {
          "@type": "Offer",
          price: trip.downPayment,
          priceCurrency: "GBP",
          description: "Deposit to secure your slot",
          url,
        },
        provider: {
          "@type": "Organization",
          name: "Trip Cooks",
          url: "https://tripcooks.tours",
        },
      };
    }
  } catch {
    // continue without JSON-LD
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
