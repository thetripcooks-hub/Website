"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { arial } from "@/app/font";
import SectionWrapper from "./section-wrapper";
import { useRouter } from "next/navigation";
// import ComingSoonBadge from "./coming-soon-badge";
import useGeneralStore from "@/stores/generalStore";
import Link from "next/link";

const OurServices = () => {
  const router = useRouter();
  const gotoRoute = (url: string) => router.push(url);

  const { services: data } = useGeneralStore();
  const groupTripImage = data?.[0]?.groupTrips?.url ?? "/img/public-trip.svg";
  const privateTripImage =
    data?.[0]?.privateTrips?.url ?? "/img/private-trip.svg";
  const travelPlanningImage =
    data?.[0]?.travelPlanning?.url ?? "/img/travel-planning.svg";

  return (
    <div className="bg-[#020E0B] px-5 py-10 sm:py-20 text-white sm:px-[8%]">
      <SectionWrapper>
        <h3 className="text-[32px] font-medium sm:text-5xl">Our Services</h3>
        <p className="mt-5 text-base sm:text-xl sm:max-w-[541px] dark:text-[#8C909B]">
          From organizing unforgettable group trips to crafting tailor-made
          adventures, our services cover every aspect of your journey. 
        </p>
        <div className="mt-5 sm:mt-10 flex sm:flex-row flex-col gap-5 lg:justify-between">
          {/* group trip */}
          <Link
            style={{ backgroundImage: `url(${groupTripImage})` }}
            className={cn(
              "text-white w-full sm:w-[394px] bg-cover bg-center bg-no-repeat h-[412px] flex justify-end flex-col p-5 rounded-[18px] cursor-pointer"
            )}
            href={"/trips"}
            // onClick={() => gotoRoute("/trips")}
          >
            <h5 className="font-medium text-2xl whitespace-nowrap">
              Group Trips
            </h5>
            <p className={cn(arial.className, "text-base mt-1")}>
              Get those travel plans out of the group chat and explore new
              territories
            </p>
          </Link>
          {/* private trip */}
          <Link
            style={{ backgroundImage: `url(${privateTripImage})` }}
            className="text-white w-full sm:w-[394px]  bg-cover bg-center bg-no-repeat h-[412px] flex justify-end flex-col p-5 rounded-[18px] cursor-pointer"
            href={"/private-trips"}
          >
            <h5 className="font-medium text-2xl whitespace-nowrap">
              Private Trips
            </h5>
            <p className={cn(arial.className, "text-base mt-1")}>
              Need to explore a new location on your own? We’re here for you!
            </p>
          </Link>
          {/* Travel planning */}
          <Link
            style={{ backgroundImage: `url(${travelPlanningImage})` }}
            className="text-white w-full sm:w-[394px] bg-cover bg-center bg-no-repeat h-[412px] flex justify-end flex-col p-5 rounded-[18px] relative cursor-pointer"
            href={"https://tripcooks.gumroad.com/"}
          >
            {/* <ComingSoonBadge /> */}
            <h5 className="font-medium text-2xl whitespace-nowrap">
              Travel Itinerary
            </h5>
            <p className={cn(arial.className, "text-base mt-1")}>
              Get structured travel itineraries from Trip Cooks for your
              personal use
            </p>
          </Link>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default OurServices;
