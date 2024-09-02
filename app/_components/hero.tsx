"use client";
import React from "react";
import Navbar from "../../components/ui/navbar";
import TripSearch from "../_components/trip-search";
import { arial } from "../font";
import { cn } from "@/lib/utils";

const HomeHero = () => {
  return (
    <div className="bg-neutral-grey-100 h-[60vh] sm:min-h-screen bg-hero-mobile sm:bg-hero-desktop bg-no-repeat bg-cover">
      <Navbar />
      <main className="px-5 flex flex-col items-center justify-center mt-5 sm:mt-[65px]">
        <h3 className="text-center text-white text-4xl sm:text-5xl font-semibold sm:max-w-[383px] sm:px-5 max-w-[291px]">
          Group trips, The easy way
        </h3>
        <p
          className={cn(
            "mt-5 sm:mt-12 max-w-[288px] px-2.5 sm:max-w-[421px] text-center text-white text-xl sm:text-2xl font-normal",
            arial.className
          )}
        >
          Join group trips or curate a trip of your own.
        </p>
      </main>
      <TripSearch />
    </div>
  );
};

export { HomeHero };
