"use client";
import React from "react";
// import x from "~//img/public-trip.svg";
import { cn } from "@/lib/utils";
import { arial } from "@/app/font";
import SectionWrapper from "./section-wrapper";
import { useRouter } from "next/navigation";
import ComingSoonBadge from "./coming-soon-badge";

const services = [
  {
    name: "Group trips",
    description:
      "Get those travel plans out of the group chat and explore new territories",
    image: "/img/public-trip.svg",
    url: "/trips",
    available: true,
  },
  {
    name: "Private trips",
    description:
      "Need to explore a new location on your own? We’re here for you!",
    image: "/img/private-trip.svg",
    url: "/private-trips",
    available: true,
  },
  {
    name: "Travel planning",
    description: "Curate your experience and explore at your own terms",
    image: "/img/travel-planning.svg",
    url: "/travel-planning",
    available: false,
  },
];

const OurServices = () => {
  const router = useRouter();
  const gotoRoute = (url: string) => router.push(url);
  return (
    <div className="bg-[#020E0B] px-5 py-10 sm:py-20 text-white sm:px-[8%]">
      <SectionWrapper>
        <h3 className="text-[32px] font-medium sm:text-5xl">Our Services</h3>
        <p className="mt-5 text-base sm:text-xl sm:max-w-[541px]">
          From organizing unforgettable group trips to crafting tailor-made
          adventures, our services cover every aspect of your journey. 
        </p>
        <div className="mt-5 sm:mt-10 flex sm:flex-row flex-col gap-5 lg:justify-between">
          {/* group trip */}
          <div
            className="text-white w-full sm:w-[394px] bg-[url('/img/public-trip.svg')] bg-cover bg-center bg-no-repeat h-[412px] flex justify-end flex-col p-5 rounded-[18px] cursor-pointer"
            onClick={() => gotoRoute("/trips")}
          >
            <h5 className="font-medium text-2xl">Group trips</h5>
            <p className={cn(arial.className, "text-base")}>
              Get those travel plans out of the group chat and explore new
              territories
            </p>
          </div>
          {/* private trip */}
          <div
            className="text-white w-full sm:w-[394px] bg-[url('/img/private-trip.svg')] bg-cover bg-center bg-no-repeat h-[412px] flex justify-end flex-col p-5 rounded-[18px] cursor-pointer"
            onClick={() => gotoRoute("/private-trips")}
          >
            <h5 className="font-medium text-2xl">Private trips</h5>
            <p className={cn(arial.className, "text-base")}>
              Need to explore a new location on your own? We’re here for you!
            </p>
          </div>
          {/* Travel planning */}
          <div className="text-white w-full sm:w-[394px] bg-[url('/img/travel-planning.svg')] bg-cover bg-center bg-no-repeat h-[412px] flex justify-end flex-col p-5 rounded-[18px] relative">
            <ComingSoonBadge />
            <h5 className="font-medium text-2xl">Travel planning</h5>
            <p className={cn(arial.className, "text-base")}>
              Curate your experience and explore at your own terms
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default OurServices;
