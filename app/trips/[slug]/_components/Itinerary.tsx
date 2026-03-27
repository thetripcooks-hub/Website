"use client";
import SectionWrapper from "@/app/home/_components/section-wrapper";
import React from "react";
import img1 from "./img/itinerary/1.svg";
import img2 from "./img/itinerary/2.svg";
import Image from "next/image";
// import TripCard from "@/components/ui/trip-card";
import useTripStore from "@/stores/trip-store";

const itinerary: {
  day: number;
  activity: string;
  description?: string;
  coverImage: any;
}[] = [
  {
    day: 1,
    activity: "Depature from home country & arrival at madrid",
    description:
      "Departure from home country and arrival at Madrid. Check in at the hotel and rest for the day.",
    coverImage: img1,
  },
  {
    day: 2,
    activity: "Rest day/ Optional activities",
    coverImage: img2,
  },
  {
    day: 3,
    activity: "Visit to Chichen Itza, Valladolid and cenote",
    coverImage: img1,
  },
  {
    day: 4,
    activity: "Rest day/ Optional Activities",
    coverImage: img2,
  },
  {
    day: 5,
    activity: "Departures from Madrid",
    coverImage: img1,
  },
  {
    day: 6,
    activity: "Visit to sfer ik tulum museion",
    coverImage: img2,
  },
  {
    day: 7,
    activity: "Rest day/ Optional Activities",
    coverImage: img1,
  },
  {
    day: 8,
    activity: "Departure from Cancun",
    coverImage: img2,
  },
];

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Itinerary = () => {
  const { selectedTrip } = useTripStore();
  return selectedTrip ? (
    <div className="px-5 sm:py-10 py-12 sm:mb-16 text-neutral-text sm:px-[8%]">
      <SectionWrapper>
        <h3 className="text-[24px] leading-[29.26px] font-medium sm:text-[32px] sm:leading-[39.01px] mb-5 sm:mb-2.5 dark:text-foreground">
          Itinerary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-y-8 sm:gap-y-12">
          {selectedTrip.itinerary.map((item, index) => {
            return (
              <div key={index}>
                <div className="text-foreground hidden sm:flex sm:flex-col relative">
                  <Image
                    src={item.coverImage}
                    alt="img"
                    className="rounded-[18px] w-full sm:w-[291px]  object-cover lg:w-full h-[301px]"
                    width={291}
                    height={301}
                  />
                  <div className="flex flex-col gap-1 mt-2.5">
                    <h6 className="text-[14px] leading-[17.07px]">
                      DAY {item.day}
                    </h6>{" "}
                    <p className="text-[20px] leading-[24.38px] sm:text-[24px] sm:leading-[29.26px] dark:text-[#BFC0C2] text-left">
                      {item.activity}
                    </p>
                  </div>
                </div>

                <div className="text-foreground sm:hidden relative">
                  <Image
                    src={item.coverImage}
                    alt="img"
                    className="rounded-[18px] w-full sm:w-[291px]  object-cover lg:w-full h-[301px]"
                    width={291}
                    height={301}
                  />
                  <div className="flex flex-col gap-1 mt-2.5">
                    <h6 className="text-[14px] leading-[17.07px]">
                      DAY{item.day}
                    </h6>{" "}
                    <p className="text-[20px] leading-[24.38px] sm:text-[24px] sm:leading-[29.26px] dark:text-[#BFC0C2] text-left">
                      {item.activity}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </div>
  ) : null;
};

export default Itinerary;
