"use client";
import Reviews from "@/app/home/_components/reviews";
import { SubcribeToNewsLetter, Footer, CustomLoader } from "@/components/ui";
import {
  cn,
  generateTripLink,
  generateTripSlug,
  locationToSlug,
  normalizeTripCurrency,
} from "@/lib/utils";
import React, { useEffect } from "react";
import ViewOfLocation from "./_components/view-of-location";
import Itinerary from "./_components/Itinerary";
import TripDetailOverview from "./_components/trip-detail-overview";
import { queryGetAllTrips, queryTripById } from "@/queries/trips-query";
import { AllTripsResponse, TripByIdResponse } from "@/types/trip";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import useTripStore from "@/stores/trip-store";

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { setSelectedTrip, selectedTrip } = useTripStore();

  const { data: allTripsData, loading: allTripsLoading } =
    useQuery<AllTripsResponse>(queryGetAllTrips);

  const tripBySlug = allTripsData?.tripCollection.items.find(
    (t) => generateTripSlug(t) === slug,
  );

  // Fallback: slug might be an old link without the year — try matching by
  // destination alone
  const tripByLegacySlug = !tripBySlug
    ? allTripsData?.tripCollection.items.find(
        (t) => locationToSlug(t.location) === slug,
      )
    : undefined;

  // Fallback: slug might be an even older Contentful ID — try fetching by ID
  const { data: tripByIdData, loading: tripByIdLoading } =
    useQuery<TripByIdResponse>(queryTripById(slug), {
      skip: allTripsLoading || !!tripBySlug || !!tripByLegacySlug,
    });

  // If found via a legacy link (no year, or old ID), redirect to the
  // canonical year'd slug URL
  useEffect(() => {
    const legacyTrip = tripByLegacySlug ?? tripByIdData?.trip;
    if (!allTripsLoading && !tripBySlug && legacyTrip) {
      router.replace(generateTripLink(legacyTrip));
    }
  }, [allTripsLoading, tripBySlug, tripByLegacySlug, tripByIdData, router]);

  useEffect(() => {
    const trip = tripBySlug ?? tripByLegacySlug ?? tripByIdData?.trip;
    if (trip) setSelectedTrip(normalizeTripCurrency(trip));
    return () => setSelectedTrip(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripBySlug, tripByLegacySlug, tripByIdData]);

  const loading = allTripsLoading || (!tripBySlug && tripByIdLoading);

  if (loading)
    return (
      <div className="w-screen flex justify-center items-center h-[calc(100vh-95px)]">
        <CustomLoader />
      </div>
    );

  if (!selectedTrip)
    return (
      <div className="w-screen flex justify-center items-center h-[calc(100vh-95px)]">
        Trip details not found.
      </div>
    );

  return (
    <main className={cn("bg-white dark:bg-background w-full")}>
      <TripDetailOverview />
      <Itinerary />
      <ViewOfLocation
        title={`Our view of ${selectedTrip.location.split(",")[0]}`}
        items={selectedTrip.viewsOfLocationCollection.items ?? []}
      />
      <Reviews />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
