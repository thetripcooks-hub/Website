"use client";
import { cn } from "@/lib/utils";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import PastTripsHero from "./_components/past-trips-hero";
import PastDestination from "./_components/past-destination";
import Faq from "@/app/home/_components/faq";
import Reviews from "@/app/home/_components/reviews";
import useTrips from "@/hooks/trips/useTrips";

const Page = () => {
  useTrips();
  return (
    <main className={cn("bg-white dark:bg-background w-full")}>
      <PastTripsHero />
      <PastDestination />
      <Faq />
      <Reviews />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
