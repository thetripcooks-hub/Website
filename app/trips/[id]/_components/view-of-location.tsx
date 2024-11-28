"use client";
import SectionWrapper from "@/app/home/_components/section-wrapper";
import React, { ReactNode } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
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
import useGeneralStore from "@/stores/generalStore";

const row1 = [view1, view1, view2, view3];
const row2 = [view4, view5, view6, view7];

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

const ViewOfLocation = ({ title }: { title?: string }) => {
  const { privateTrip } = useGeneralStore();


  const newRows = privateTrip?.[0]?.viewsOurLastTripsCollection?.items ?? [];

  const _row1 = newRows?.map((x) => x.url)?.slice(0, 4) ?? row1;
  const _row2 = newRows?.map((x) => x.url)?.slice(4, 8) ?? row2;

  return (
    <section>
      <h3 className="text-[32px] leading-[39.01px] font-medium sm:text-5xl px-5 pt-5 sm:pt-10 sm:px-[8%]">
        <SectionWrapper>{title || "Our view of Madrid"}</SectionWrapper>
      </h3>

      <div className="mt-5 sm:mt-10 flex flex-col gap-5">
        <CarouselWrapper>
          <CarouselContent className="-ml-12">
            {_row1.map((item) => (
              <CarouselItem
                className="text-foreground cursor-pointer basis-3/4 sm:basis-1/3"
                key={item + Math.random()}
              >
                <Image
                  src={item}
                  width={394}
                  height={279}
                  alt="shots from the  location"
                  className="sm:w-full object-cover rounded-[18px] h-[279px] w-[394px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </CarouselWrapper>

        {newRows.length > 4 && _row2.length ? (
          <div className="-ml-28">
            <CarouselWrapper>
              <CarouselContent>
                {_row2.map((item) => (
                  <CarouselItem
                    className="text-foreground cursor-pointer basis-3/4 sm:basis-1/3"
                    key={item + Math.random()}
                  >
                    <Image
                      src={item}
                      alt="group-trip"
                      width={394}
                      height={279}
                      className="sm:w-full object-cover rounded-[18px] h-[279px] w-[394px]"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </CarouselWrapper>{" "}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ViewOfLocation;
