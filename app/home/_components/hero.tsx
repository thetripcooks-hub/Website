"use client";
import React from "react";
import TripSearch from "./trip-search";
import { cn } from "@/lib/utils";
import useTripStore from "@/stores/trip-store";

const HomeHero = () => {
  const { trips } = useTripStore();
  const [value, setValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");

  return (
    <div className="bg-neutral-grey-100 -mt-[75px] sm:-mt-[95px] h-[calc(65vh+75px)] sm:h-screen bg-no-repeat bg-hero-mobile-png sm:bg-hero-desktop-png bg-cover">
      <main className="pt-[115px] sm:pt-[155px] flex flex-col items-center justify-between gap-10 sm:gap-[82px]">
        <div className="px-5 flex flex-col items-center justify-center text-white">
          <h3 className="text-center text-4xl sm:text-[90px]  leading-[66px] font-ogg-trial sm:leading-[108px] sm:max-w-[634px] sm:px-5 max-w-[291px] text-white dark:text-white">
            Group Trips, <br /> The Easy Way
          </h3>
          <p
            className={cn(
              "mt-2.5 sm:mt-[34px] max-w-[309px] sm:max-w-[357px] text-center text-xl sm:text-[22px] font-normal text-white dark:text-white",
            )}
          >
            Join our group trips or let us curate one for you.
          </p>
        </div>
        <TripSearch
          items={trips}
          onSearchValueChange={(value) => {
            setValue(value);
          }}
          onSelectedValueChange={(value) => setSelectedValue(value)}
          searchValue={value}
          selectedValue={selectedValue}
          isLoading={false}
        />
      </main>
    </div>
  );
};

export { HomeHero };
