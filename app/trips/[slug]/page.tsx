"use client";
import { useInView } from "react-intersection-observer";
import Reviews from "@/app/home/_components/reviews";
import { SubcribeToNewsLetter, Footer, CustomLoader } from "@/components/ui";
import { cn, locationToSlug } from "@/lib/utils";
import React, { useEffect } from "react";
import ViewOfLocation from "./_components/view-of-location";
import Itinerary from "./_components/Itinerary";
import TripDetailOverview from "./_components/trip-detail-overview";
import PaymentCardMobile from "./_components/trip-detail-overview/payment-card-mobile";
import { queryGetAllTrips, queryTripById } from "@/queries/trips-query";
import { AllTripsResponse, TripByIdResponse } from "@/types/trip";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import useTripStore from "@/stores/trip-store";

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { ref, inView } = useInView();
  const { setSelectedTrip, selectedTrip } = useTripStore();

  const { data: allTripsData, loading: allTripsLoading } =
    useQuery<AllTripsResponse>(queryGetAllTrips);

  const tripBySlug = allTripsData?.tripCollection.items.find(
    (t) => locationToSlug(t.location) === slug,
  );

  // Fallback: slug might be an old Contentful ID — try fetching by ID
  const { data: tripByIdData, loading: tripByIdLoading } =
    useQuery<TripByIdResponse>(queryTripById(slug), {
      skip: allTripsLoading || !!tripBySlug,
    });

  // If found by ID (old link), redirect to the clean slug URL
  useEffect(() => {
    if (!allTripsLoading && !tripBySlug && tripByIdData?.trip) {
      router.replace(`/trips/${locationToSlug(tripByIdData.trip.location)}`);
    }
  }, [allTripsLoading, tripBySlug, tripByIdData, router]);

  useEffect(() => {
    const trip = tripBySlug ?? tripByIdData?.trip;
    if (trip) setSelectedTrip(trip);
    return () => setSelectedTrip(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripBySlug, tripByIdData]);

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
      <div ref={ref}>
        <TripDetailOverview />
        <Itinerary />
        {inView ? <PaymentCardMobile /> : null}
      </div>
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
