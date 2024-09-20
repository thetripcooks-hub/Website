import Navbar from "@/components/ui/navbar";
import { cn } from "@/lib/utils";
import React from "react";
import TripSearch from "../_components/trip-search";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import ReadyToStart from "../_components/ready-to-start";
import Destination from "./_components/destination";

const Page = () => {
  return (
    <main className={cn("bg-white w-full")}>
      <Navbar hasBg={false} />
      <header>
        <h1 className="text-4xl sm:text-5xl text-center font-semibold my-5 sm:mt-20 text-neutral-text">
          Where to?..
        </h1>
        <TripSearch />
      </header>
      <Destination />
      <ReadyToStart />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
