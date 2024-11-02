import React from "react";
import PrivateTripHero from "./_components/private-trip-hero";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import ReadyToStart from "../home/_components/ready-to-start";
import Reviews from "../home/_components/reviews";
import ViewOfLocation from "../trips/[id]/_components/view-of-location";

const Page = () => {
  return (
    <main>
      <PrivateTripHero />
      <ViewOfLocation title="Views from our last trips" />
      <Reviews />
      <ReadyToStart />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
