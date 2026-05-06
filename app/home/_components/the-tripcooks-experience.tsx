"use client";
import React, { ReactNode, useEffect, useState } from "react";
import GroupTrip from "~/img/public-trip.svg";
import PrivateTrip from "~/img/private-trip.svg";
import TravelPlanning from "~/img/travel-planning.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CustomLoader,
} from "@/components/ui";
import AutoScroll from "embla-carousel-auto-scroll";

import Image from "next/image";
import SectionWrapper from "./section-wrapper";
import useGeneralStore from "@/stores/generalStore";
import { TripExperienceType } from "@/types/trip-experience";
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
  const { tripcooksExperience, loadingTripcooksExperience } = useGeneralStore();

  const [rows, setRows] = useState<
    TripExperienceType["imagesCollection"]["items"]
  >([]);

  useEffect(() => {
    if (tripcooksExperience.length > 0) {
      setRows(tripcooksExperience?.[0]?.imagesCollection?.items ?? []);
    }
  }, [tripcooksExperience]);

  // if (loadingTripcooksExperience) {
  //   return (
  //     <div className="w-full h-[558px] flex justify-center items-center">
  //       <CustomLoader />
  //     </div>
  //   );
  // }

  return rows.length > 0 ? (
    <section>
      <h2 className="font-ogg-trial text-[32px] sm:text-[44px] px-5 pt-8 sm:pt-10 sm:px-[8%] leading-tight text-neutral-text dark:text-foreground">
        The TripCooks experience
      </h2>
      <div className="mt-5 sm:mt-10 flex flex-col gap-5">
        <CarouselWrapper>
          <CarouselContent className="-ml-12">
            {rows.slice(0, 4).map((item) => (
              <CarouselItem
                className="text-foreground cursor-pointer basis-3/4 sm:basis-1/3"
                key={item.sys.id}
              >
                <Image
                  src={item.url}
                  width={394}
                  height={279}
                  alt="group-trip"
                  className="w-full object-cover rounded-[18px] h-[279px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </CarouselWrapper>
        {rows.length > 4 && (
          <div className="-ml-28">
            <CarouselWrapper>
              <CarouselContent>
                {rows.slice(4, 8).map((item) => (
                  <CarouselItem
                    className="text-foreground cursor-pointer basis-2/3 sm:basis-1/3"
                    key={item.sys.id}
                  >
                    <Image
                      src={item.url}
                      alt="group-trip"
                      width={394}
                      height={279}
                      className="w-full object-cover rounded-[18px] h-[279px]"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </CarouselWrapper>{" "}
          </div>
        )}
        {showLastRow && rows.length > 8 ? (
          <CarouselWrapper>
            <CarouselContent className="-ml-12">
              {rows.slice(8, 12).map((item) => (
                <CarouselItem
                  className="text-foreground cursor-pointer basis-3/4 sm:basis-1/3"
                  key={item.sys.id}
                >
                  <Image
                    src={item.url}
                    width={394}
                    height={279}
                    alt="group-trip"
                    className="w-full sm:w-full object-cover rounded-[18px] h-[279px]"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </CarouselWrapper>
        ) : null}
      </div>
    </section>
  ) : null;
};

export default TheTripCooksExperience;
