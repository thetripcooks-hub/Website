"use client";
import SectionWrapper from "@/app/home/_components/section-wrapper";
import React, { ReactNode, useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import type { CarouselApi } from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

// views
import view1 from "../_components/img/location-views/1.svg";
import view2 from "../_components/img/location-views/2.svg";
import view3 from "../_components/img/location-views/3.svg";
import view4 from "../_components/img/location-views/4.svg";
import view5 from "../_components/img/location-views/5.svg";
import view6 from "../_components/img/location-views/6.svg";
import view7 from "../_components/img/location-views/7.svg";
import useTripStore from "@/stores/trip-store";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
// import useGeneralStore from "@/stores/generalStore";
// import useTripStore from "@/stores/trip-store";

const row1 = [view1, view1, view2, view3];
const row2 = [view4, view5, view6, view7];

const CarouselWrapper = ({ children }: { children: ReactNode }) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    // AutoScroll's playOnInit no-ops if it measures <=1 scroll snap point
    // at mount (unsettled layout during the async route transition into
    // this page). Kick it explicitly once the API is ready and settled.
    if (!api) return;
    api.plugins()?.autoScroll?.play();
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
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
};

const ViewOfLocation = ({
  title,
  items,
  className,
}: {
  title?: string;
  items: {
    url: string;
  }[];
  className?: ClassValue;
}) => {
  // const { selectedTrip } = useTripStore();
  // const { privateTrip } = useGeneralStore();

  // const newRows = privateTrip?.[0]?.viewsOurLastTripsCollection?.items ?? [];

  const _row1 = items?.map((x) => x.url)?.slice(0, 4) ?? row1;
  const _row2 = items?.map((x) => x.url)?.slice(4, 8) ?? row2;

  // console.log(selectedTrip?.viewsOfLocationCollection.items ?? []);

  return (
    <section>
      <h3 className="text-[32px] leading-[39.01px] font-medium sm:text-5xl px-5 pt-5 sm:pt-10 sm:px-[8%]">
        {/* <SectionWrapper className={cn("dark:text-foreground", className)}>
          {title || "Our view of Madrid"}
        </SectionWrapper> */}
      </h3>

      <div className="mt-5 sm:mt-10 flex flex-col gap-5">
        <CarouselWrapper>
          <CarouselContent>
            {_row1.map((item) => (
              <CarouselItem
                className="text-foreground cursor-pointer basis-3/4 sm:basis-1/3"
                key={item + Math.random()}
              >
                <div className="relative w-full rounded-[18px] h-[279px] overflow-hidden">
                  <Image
                    src={item}
                    fill
                    alt="shots from the location"
                    className="object-cover rounded-[18px]"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </CarouselWrapper>

        {items.length > 4 && _row2.length ? (
          <CarouselWrapper>
            <CarouselContent>
              {_row2.map((item) => (
                <CarouselItem
                  className="text-foreground cursor-pointer basis-3/4 sm:basis-1/3"
                  key={item + Math.random()}
                >
                  <div className="relative w-full rounded-[18px] h-[279px] overflow-hidden">
                    <Image
                      src={item}
                      fill
                      alt="group-trip"
                      className="object-cover rounded-[18px]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </CarouselWrapper>
        ) : null}
      </div>
    </section>
  );
};

export default ViewOfLocation;
