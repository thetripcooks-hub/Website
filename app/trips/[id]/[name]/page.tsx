"use client";
import { useInView } from "react-intersection-observer";
import Reviews from "@/app/home/_components/reviews";
import { SubcribeToNewsLetter, Footer, CustomLoader } from "@/components/ui";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import ViewOfLocation from "../_components/view-of-location";
import Itinerary from "../_components/Itinerary";
import TripDetailOverview from "../_components/trip-detail-overview";
import PaymentCardMobile from "../_components/trip-detail-overview/payment-card-mobile";
import MobilePageHeader from "@/components/ui/mobile-page-header";
// import { useHideNavOnMobile } from "@/hooks";
import { queryTripById } from "@/queries/trips-query";
import { TripByIdResponse } from "@/types/trip";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import useTripStore from "@/stores/trip-store";

const Page = () => {
  const { id } = useParams();
  const { ref, inView } = useInView();
  const { setSelectedTrip, selectedTrip } = useTripStore();
  // useHideNavOnMobile();
  const { data: tripData, loading } = useQuery<TripByIdResponse>(
    queryTripById(id as string)
  );

  useEffect(() => {
    tripData && setSelectedTrip(tripData?.trip);
    return () => {
      setSelectedTrip(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripData]);

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
        <MobilePageHeader title={selectedTrip?.location || ""} />
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
