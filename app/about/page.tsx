"use client";
import React, { useEffect } from "react";
import OurServices from "../home/_components/our-services";
import TheTripCooksExperience from "../home/_components/the-tripcooks-experience";
import Faq from "../home/_components/faq";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import AboutHero from "./_components/about-hero";
import Adventurers from "./_components/adventurers";
import { useQuery } from "@apollo/client";
import { AboutUsPageResponse } from "@/types/about";
import { queryAboutUsPage } from "@/queries/about-us-query";
import useGeneralStore from "@/stores/generalStore";

const Page = () => {
  const { setAbout, setLoadingAbout } = useGeneralStore();
  const { data, loading } = useQuery<AboutUsPageResponse>(queryAboutUsPage);

  useEffect(() => {
    if (data) {
      setAbout(data.aboutUsPageCollection.items);
    }
  }, [data, setAbout]);

  useEffect(() => {
    setLoadingAbout(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <main className="flex min-h-screen flex-col pb-10 sm:pb-20">
      <AboutHero />
      <Adventurers />
      <OurServices />
      <Faq />
      <div className="pt-5 pb-10 sm:pt-10 sm:pb-14">
        <TheTripCooksExperience />
      </div>
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
