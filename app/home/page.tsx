"use client";
import Faq from "./_components/faq";
import FeatureTrip from "./_components/feature-trip";
import OurServices from "./_components/our-services";
import ReadyToStart from "./_components/ready-to-start";
import Reviews from "./_components/reviews";
import { Footer, SubcribeToNewsLetter } from "../../components/ui";
import TheTripCooksExperience from "./_components/the-tripcooks-experience";
import TravelChef from "./_components/travel-chef";
import UpcomingTrips from "./_components/upcoming-trip";
import WhyChooseUs from "./_components/why-choose-us";
import { HomeHero } from "./_components";
import useTrips from "@/hooks/trips/useTrips";
import useGeneralStore from "@/stores/generalStore";
import { useEffect } from "react";

export default function Home() {
  useTrips();
  const { setShowNav } = useGeneralStore();

  useEffect(() => {
    setShowNav(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen flex-col pb-10 sm:pb-20">
      <HomeHero />
      <TravelChef />
      <FeatureTrip />
      <OurServices />
      <UpcomingTrips />
      <WhyChooseUs />
      <Faq />
      <TheTripCooksExperience />
      <Reviews />
      <ReadyToStart />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
}
