"use client";
import React from "react";
import GroupTrip from "../../public/img/public-trip.svg";
import PrivateTrip from "../../public/img/private-trip.svg";
import TravelPlanning from "../../public/img/travel-planning.svg";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";
import SectionWrapper from "./section-wrapper";
const rows = [GroupTrip, PrivateTrip, TravelPlanning, TravelPlanning];

const TheTripCooksExperience = () => {
  return (
    <section>
      <h3 className="text-[32px] leading-[39.01px] font-medium sm:text-5xl px-5 pt-5 sm:pt-10 sm:px-[8%]">
        <SectionWrapper>The TripCooks Experience</SectionWrapper>
      </h3>
      <div className="mt-5 sm:mt-10 flex flex-col gap-5">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 1500,
            }),
          ]}
        >
          <CarouselContent className="gap-12">
            {rows.map((item) => (
              <CarouselItem
                className="text-foreground cursor-pointer basis-3/4 sm:basis-1/3 -ml-12"
                key={item + Math.random()}
              >
                <Image
                  src={item}
                  alt="group-trip"
                  className="w-full object-cover rounded-[18px] sm:h-[279px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 2500,
            }),
          ]}
        >
          <CarouselContent className="gap-14 sm:gap-28">
            {rows.map((item) => (
              <CarouselItem
                className="text-foreground cursor-pointer basis-2/3  sm:basis-1/3 -ml-14 sm:-ml-28"
                key={item + Math.random()}
              >
                <Image
                  src={item}
                  alt="group-trip"
                  className="w-full object-cover rounded-[18px] sm:h-[279px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent className="gap-12">
            {rows.map((item) => (
              <CarouselItem
                className="text-foreground cursor-pointer basis-3/4 sm:basis-1/3 -ml-12"
                key={item + Math.random()}
              >
                <Image
                  src={item}
                  alt="group-trip"
                  className="w-full sm:w-full object-cover rounded-[18px] sm:h-[279px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TheTripCooksExperience;
