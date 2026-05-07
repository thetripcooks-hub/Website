"use client";
import { formatTripDate } from "@/lib/utils";
import useTripStore from "@/stores/trip-store";
import React from "react";

const TripInfo = () => {
  const { selectedTrip } = useTripStore();
  return (
    selectedTrip && (
      <div className="flex flex-col gap-4">
        <h3 className="text-[24px] sm:text-[32px] leading-[36px] sm:leading-[48px] font-bold text-[hsl(var(--text-primary))]">
          {formatTripDate(selectedTrip)}
        </h3>
        <p className="text-[16px] leading-[24px] text-[hsl(var(--text-secondary))]">
          {selectedTrip.description}
        </p>
      </div>
    )
  );
};

export default TripInfo;
