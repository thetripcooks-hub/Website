import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import React from "react";
import ReadyToStart from "../_components/ready-to-start";
import Reviews from "../_components/reviews";
import ContactHero from "./contact-hero";
import Navbar from "@/components/ui/navbar";

const Page = () => {
  return (
    <main>
      <Navbar hasBg={false} />
      <ContactHero />
      <Reviews />
      <ReadyToStart />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
