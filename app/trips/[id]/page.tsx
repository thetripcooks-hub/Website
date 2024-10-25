"use client";
import { useInView } from "react-intersection-observer";
import Reviews from "@/app/_components/reviews";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import Navbar from "@/components/ui/navbar";
import { cn } from "@/lib/utils";
import React from "react";
import ViewOfLocation from "./_components/view-of-location";
import Itinerary from "./_components/Itinerary";
import TripDetailOverview from "./_components/trip-detail-overview";
import PaymentCardMobile from "./_components/trip-detail-overview/payment-card-mobile";
import MobilePageHeader from "@/components/ui/mobile-page-header";

const Page = () => {
  const { ref, inView } = useInView();
  return (
    <main className={cn("bg-white w-full")}>
      <div ref={ref}>
        <div className="hidden sm:block">
          <Navbar hasBg={false} />
        </div>
        <MobilePageHeader title="Madrid, Spain" />
        <TripDetailOverview />
        <Itinerary />
        {inView ? <PaymentCardMobile /> : null}
      </div>
      <ViewOfLocation />
      <Reviews />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
