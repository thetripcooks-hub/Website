"use client";
import React from "react";
import TripSearch from "./trip-search";
import { cn } from "@/lib/utils";
import useTripStore from "@/stores/trip-store";
import { useQuery } from "@apollo/client";
import { queryGetHomeBg } from "@/queries/home-query";
import { HomeBgResponse } from "@/types/home";
// import Navbar from "@/components/ui/navbar";

const HomeHero = () => {
  const { trips } = useTripStore();
  const [value, setValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const { data } = useQuery<HomeBgResponse>(queryGetHomeBg);

  // const frameworks = [
  //   {
  //     value: "next.js",
  //     label: "Next.js",
  //   },
  //   {
  //     value: "sveltekit",
  //     label: "SvelteKit",
  //   },
  //   {
  //     value: "nuxt.js",
  //     label: "Nuxt.js",
  //   },
  //   {
  //     value: "remix",
  //     label: "Remix",
  //   },
  //   {
  //     value: "astro",
  //     label: "Astro",
  //   },
  // ];
  const homeBg =
    data?.homeHeroCollection?.items?.[0]?.heroBackground?.url ?? "";

  return (
    // <div className="bg-neutral-grey-100 h-[65vh] sm:h-[calc(100vh-95px)] bg-hero-mobile sm:bg-hero-desktop bg-no-repeat bg-cover "> new-home
    <div
      className="bg-neutral-grey-100 h-[65vh] sm:h-[calc(100vh-95px)] bg-no-repeat bg-cover"
      style={{
        backgroundImage: homeBg.length
          ? `url(${homeBg})`
          : `url("./img/new-home.avif")`,
      }}
    >
      {/* <BackgroundVideo
      src={bgVideo}
      className="bg-neutral-grey-100 h-[65vh] sm:h-[calc(100vh-95px)] 2xl:h-[55vh]"
    > */}
      <main className="pt-14 sm:pt-[75px]">
        <div className="px-5 flex flex-col items-center justify-center">
          <h3 className="text-center text-white text-4xl sm:text-5xl font-semibold sm:max-w-[383px] sm:px-5 max-w-[291px]">
            Group Trips, The Easy Way.
          </h3>
          <p
            className={cn(
              "mt-5 sm:mt-12 max-w-[288px] px-2.5 sm:max-w-[421px] text-center text-white text-xl sm:text-2xl font-normal"
              // arial.className
            )}
          >
            Join group trips or curate a trip of your own.
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
      {/* </BackgroundVideo> */}
    </div>
  );
};

export { HomeHero };
