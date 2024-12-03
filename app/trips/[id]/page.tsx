"use client";
import { useInView } from "react-intersection-observer";
import Reviews from "@/app/home/_components/reviews";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import ViewOfLocation from "./_components/view-of-location";
import Itinerary from "./_components/Itinerary";
import TripDetailOverview from "./_components/trip-detail-overview";
import PaymentCardMobile from "./_components/trip-detail-overview/payment-card-mobile";
import MobilePageHeader from "@/components/ui/mobile-page-header";
import { useHideNavOnMobile } from "@/hooks";
import { queryTripById } from "@/queries/trips-query";
import { TripByIdResponse } from "@/types/trip";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import useTripStore from "@/stores/trip-store";

const Page = () => {
  const { id } = useParams();
  const { setSelectedTrip, selectedTrip } = useTripStore();
  useHideNavOnMobile();
  const { ref, inView } = useInView();
  const { data: tripData } = useQuery<TripByIdResponse>(
    queryTripById(id as string)
  );

  useEffect(() => {
    tripData && setSelectedTrip(tripData?.trip);
    return () => {
      setSelectedTrip(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripData]);


  return (
    selectedTrip && (
      <main className={cn("bg-white w-full")}>
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
    )
  );
};

export default Page;
