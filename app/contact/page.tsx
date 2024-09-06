import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import React from "react";
import ReadyToStart from "../_components/ready-to-start";
import Reviews from "../_components/reviews";

const Page = () => {
  return (
    <main>
      Contact page
      <Reviews />
      <ReadyToStart />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
