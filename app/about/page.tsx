import React from "react";
import OurServices from "../home/_components/our-services";
import TheTripCooksExperience from "../home/_components/the-tripcooks-experience";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import ReadyToStart from "../home/_components/ready-to-start";
import AboutHero from "./_components/about-hero";
import Adventurers from "./_components/adventurers";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col pb-10 sm:pb-20">
      <AboutHero />
      <Adventurers />
      <OurServices />
      <div className="pt-5 pb-10 sm:pt-10 sm:pb-14">
        <TheTripCooksExperience />
      </div>
      <ReadyToStart />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
