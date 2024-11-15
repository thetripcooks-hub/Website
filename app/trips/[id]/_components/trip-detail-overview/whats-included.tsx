"use client";
import React from "react";
import Image from "next/image";
import flag from "../img/whats-included/flag.svg";
import driving from "../img/whats-included/driving.svg";
import airplane from "../img/whats-included/airplane.svg";
import heart from "../img/whats-included/heart.svg";
import house from "../img/whats-included/house.svg";
import { DrawerDemo } from "./see-more-drawer";
import book from "../img/whats-included/book.svg";
import { useIsMobile } from "@/hooks";
import useTripStore from "@/stores/trip-store";

const WhatsIncluded = () => {
  const data: {
    icon: any;
    title: string;
  }[] = [
    {
      icon: airplane,
      title: "Flight ticket",
    },
    {
      icon: heart,
      title: "Breakfast included",
    },
    {
      icon: driving,
      title: "Airport pickup and  transfer",
    },
    {
      icon: house,
      title: "Accomodation",
    },
    {
      icon: flag,
      title: "Tourist activities",
    },
    {
      icon: book,
      title: "Visa Support",
    },
  ];
  const isMobile = useIsMobile();
  const dataToShow = isMobile ? data.slice(0, -1) : data;
  const { selectedTrip } = useTripStore();
  return (
    selectedTrip && (
      <div>
        <h3 className="text-[24px] leading-[29.26px] font-medium mb-5 text-neutral-text">
          What’s included
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {selectedTrip.whatsIncluded.map((item) => (
            <div
              key={item.icon + Math.random()}
              className="flex gap-2.5 items-center"
            >
              <Image
                src={item.icon}
                alt="icon"
                width={28}
                height={28}
                className="w-[28px] h-[28px] object-contain"
              />
              <p className="text-[16px] leading-[19.5px]">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="flex sm:hidden mt-5">
          <DrawerDemo data={data} />
        </div>
      </div>
    )
  );
};

export default WhatsIncluded;
