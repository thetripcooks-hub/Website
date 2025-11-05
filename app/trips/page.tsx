"use client";
import { cn } from "@/lib/utils";
import TripSearch from "@/app/home/_components/trip-search";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
// import ReadyToStart from "@/app/home/_components/ready-to-start";
import Destination from "./_components/destination";
import { useEffect, useState } from "react";
import useTrips from "@/hooks/trips/useTrips";
import useTripStore from "@/stores/trip-store";

const Page = () => {
  const { trips } = useTrips();
  const { setOrderKey } = useTripStore();

  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    setOrderKey(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={cn("bg-white dark:bg-background w-full")}>
      <header>
        <h1 className="text-4xl sm:text-5xl text-center font-semibold my-5 sm:mt-20 text-neutral-text dark:text-foreground">
          Where to?..
        </h1>
        <TripSearch
          items={trips}
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
