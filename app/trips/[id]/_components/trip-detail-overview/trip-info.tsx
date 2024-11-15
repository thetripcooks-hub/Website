"use client";
import { formatTripDate } from "@/lib/utils";
import useTripStore from "@/stores/trip-store";
import React from "react";

const TripInfo = () => {
  const { selectedTrip } = useTripStore();
  return (
    selectedTrip && (
      <div className="text-neutral-text flex flex-col gap-5">
        <h3 className="text-[24px] leading-[29.26px] sm:text-[32px] sm:leading-[39.01px] font-medium">
          {formatTripDate(selectedTrip)}
        </h3>
        <p className="text-[16px] leading-[27px] sm:leading-[29px] text-neutral-subtext">
          {selectedTrip.description}
        </p>
      </div>
    )
  );
};

export default TripInfo;
