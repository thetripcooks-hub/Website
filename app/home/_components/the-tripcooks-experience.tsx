"use client";
import React, { ReactNode } from "react";
import GroupTrip from "~/img/public-trip.svg";
import PrivateTrip from "~/img/private-trip.svg";
import TravelPlanning from "~/img/travel-planning.svg";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import AutoScroll from "embla-carousel-auto-scroll";

import Image from "next/image";
import SectionWrapper from "./section-wrapper";
const rows = [GroupTrip, PrivateTrip, TravelPlanning, TravelPlanning];

const CarouselWrapper = ({ children }: { children: ReactNode }) => (
  <Carousel
    className="w-full"
    opts={{
      loop: true,
    }}
    plugins={[
      AutoScroll({
        playOnInit: true,
        stopOnInteraction: false,
        stopOnFocusIn: false,
        stopOnMouseEnter: false,
        speed: 0.75,
      }),
    ]}
  >
    {children}
  </Carousel>
);

const TheTripCooksExperience = ({
  showLastRow = true,
}: {
  showLastRow?: boolean;
}) => {
  return (
    <section>
      <h3 className="text-[32px] leading-[39.01px] font-medium sm:text-5xl px-5 pt-5 sm:pt-10 sm:px-[8%]">
        <SectionWrapper>The TripCooks Experience</SectionWrapper>
      </h3>
      <div className="mt-5 sm:mt-10 flex flex-col gap-5">
        <CarouselWrapper>
          <CarouselContent className="-ml-12">
            {rows.map((item) => (
              <CarouselItem
                className="text-foreground cursor-pointer basis-3/4 sm:basis-1/3"
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
        </CarouselWrapper>
        <div className="-ml-28">
          <CarouselWrapper>
            <CarouselContent>
              {rows.map((item) => (
                <CarouselItem
                  className="text-foreground cursor-pointer basis-2/3 sm:basis-1/3"
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
          </CarouselWrapper>{" "}
        </div>
        {showLastRow ? (
          <CarouselWrapper>
            <CarouselContent className="-ml-12">
              {rows.map((item) => (
                <CarouselItem
                  className="text-foreground cursor-pointer basis-3/4 sm:basis-1/3"
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
          </CarouselWrapper>
        ) : null}
      </div>
    </section>
  );
};

export default TheTripCooksExperience;
