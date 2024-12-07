"use client";
import React from "react";
import Image from "next/image";
import { DrawerDemo } from "./see-more-drawer";
import { useIsMobile } from "@/hooks";
import useTripStore from "@/stores/trip-store";
import { CircleCheck } from "lucide-react";

const WhatsIncluded = () => {
  const isMobile = useIsMobile();

  const { selectedTrip } = useTripStore();
  const whatsIncluded = selectedTrip
    ? isMobile
      ? selectedTrip.whatsIncluded.slice(0, 5)
      : selectedTrip.whatsIncluded
    : [];

  return (
    selectedTrip && (
      <div>
        <h3 className="text-[24px] leading-[29.26px] font-medium mb-5 text-neutral-text dark:text-foreground">
          What’s included
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {whatsIncluded.map((item) => (
            <div
              key={item.icon + Math.random()}
              className="flex gap-2.5 items-center "
            >
              <Image
                src={item.icon}
                alt="icon"
                width={28}
                height={28}
                className="w-[28px] h-[28px] object-contain dark:hidden"
              />
              <CircleCheck className="text-foreground hidden dark:block w-[28px] h-[28px]" />
              <p className="text-[16px] leading-[19.5px] dark:text-foreground">
                {item.title}
              </p>
            </div>
          ))}
        </div>
        <div className="flex sm:hidden mt-5">
          <DrawerDemo data={selectedTrip.whatsIncluded} />
        </div>
      </div>
    )
  );
};

export default WhatsIncluded;
