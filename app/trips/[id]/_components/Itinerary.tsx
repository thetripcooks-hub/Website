"use client";
import SectionWrapper from "@/app/home/_components/section-wrapper";
import React from "react";
import img1 from "./img/itinerary/1.svg";
import img2 from "./img/itinerary/2.svg";
import Image from "next/image";

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

const Itinerary = () => {
  return (
    <div className="px-5 sm:py-10 py-12 sm:mb-16 text-neutral-text sm:px-[8%]">
      <SectionWrapper>
        <h3 className="text-[24px] leading-[29.26px] font-medium sm:text-[32px] sm:leading-[39.01px] mb-5 sm:mb-2.5">
          Itinerary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12">
          {itinerary.map((item) => {
            return (
              <div
                key={item.day}
                className="flex flex-col gap-2.5 font-normal w-fit font-alexandria"
              >
                <Image
                  src={item.coverImage}
                  alt="trip-intinerary-image"
                  // height={310}
                  // width={367}
                  className="w-full sm:w-[367px] h-[310px] rounded-[18px] object-contain"
                />
                <div className="flex flex-col gap-1 w-full sm:w-[367px]">
                  <h6 className="text-[14px] leading-[17.07px]">
                    DAY{item.day}
                  </h6>
                  <p className="text-[20px] leading-[24.38px] sm:text-[24px] sm:leading-[29.26px]">
                    {item.activity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Itinerary;
