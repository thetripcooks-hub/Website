"use client";
import React from "react";
import PrivateTripHero from "./_components/private-trip-hero";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
// import ReadyToStart from "../home/_components/ready-to-start";
import Reviews from "../home/_components/reviews";
import ViewOfLocation from "../trips/[slug]/_components/view-of-location";
import useGeneralStore from "@/stores/generalStore";

const Page = () => {
  const { privateTrip } = useGeneralStore();
  return (
    <main>
      <PrivateTripHero />
      <ViewOfLocation
        className="font-medium text-[24px] leading-[29.26px] text-neutral-text sm:text-[32px] sm:leading-[39.01px]"
        title=" "
        items={privateTrip?.[0]?.viewsOurLastTripsCollection?.items ?? []}
      />
      <Reviews />
      {/* <ReadyToStart /> */}
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
