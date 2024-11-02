import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import React from "react";
import ReadyToStart from "@/app/home/_components/ready-to-start";
import Reviews from "@/app/home/_components/reviews";
import ContactHero from "./contact-hero";

const Page = () => {
  return (
    <main>
      <ContactHero />
      <Reviews />
      <ReadyToStart />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
