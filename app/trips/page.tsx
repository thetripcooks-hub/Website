"use client";
import { cn } from "@/lib/utils";
import TripSearch from "@/app/home/_components/trip-search";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
// import ReadyToStart from "@/app/home/_components/ready-to-start";
import Destination from "./_components/destination";
import { useState } from "react";
import useTrips from "@/hooks/trips/useTrips";

const Page = () => {
  useTrips();
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("next.js");
  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];
  return (
    <main className={cn("bg-white w-full")}>
      <header>
        <h1 className="text-4xl sm:text-5xl text-center font-semibold my-5 sm:mt-20 text-neutral-text">
          Where to?..
        </h1>
        <TripSearch
          items={frameworks}
          onSearchValueChange={(value) => setValue(value)}
          onSelectedValueChange={(value) => setSelectedValue(value)}
          searchValue={value}
          selectedValue={selectedValue}
          isLoading={false}
        />
      </header>
      <Destination />
      {/* <ReadyToStart /> */}
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
