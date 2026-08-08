"use client";
import { cn } from "@/lib/utils";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import Destination from "./_components/destination";
import TripsHero from "./_components/trips-hero";
import Faq from "@/app/home/_components/faq";
import Reviews from "@/app/home/_components/reviews";
import useTrips from "@/hooks/trips/useTrips";
import useTripStore from "@/stores/trip-store";
import { useEffect } from "react";

const Page = () => {
  useTrips();
  const { setOrderKey, setFilterTags } = useTripStore();

  useEffect(() => {
    setOrderKey(null);
    setFilterTags([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={cn("bg-white dark:bg-background w-full")}>
      <TripsHero />
      <Destination />
      <Faq />
      <Reviews />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
