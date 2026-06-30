"use client";
import Faq from "./home/_components/faq";
import FeatureTrip from "./home/_components/feature-trip";
import OurServices from "./home/_components/our-services";
import Reviews from "./home/_components/reviews";
import { Footer, SubcribeToNewsLetter } from "../components/ui";
import TheTripCooksExperience from "./home/_components/the-tripcooks-experience";
import TravelChef from "./home/_components/travel-chef";
import UpcomingTrips from "./home/_components/upcoming-trip";
import WhyChooseUs from "./home/_components/why-choose-us";
import BlogCallout from "./home/_components/blog-callout";
import { HomeHero } from "./home/_components";
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
    <main className="flex min-h-screen flex-col">
      <HomeHero />
      <TravelChef />
      <FeatureTrip />
      <OurServices />
      <UpcomingTrips />
      <WhyChooseUs />
      <BlogCallout />
      <Faq />
      <TheTripCooksExperience />
      <Reviews />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
}
