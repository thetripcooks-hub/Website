"use client";
import React from "react";
import useTripStore from "@/stores/trip-store";
import { Check, X } from "lucide-react";
import Link from "next/link";

const DEFAULT_NOT_INCLUDED = [
  { title: "Flight ticket" },
  { title: "Breakfast" },
  { title: "Airport pickup and transfer" },
];

const WhatsIncluded = () => {
  const { selectedTrip } = useTripStore();

  if (!selectedTrip) return null;

  type IncludedItem = { title: string };

  const included = (selectedTrip.whatsIncluded ?? []) as IncludedItem[];
  const notIncluded: IncludedItem[] =
    selectedTrip.whatsNotIncluded?.length
      ? (selectedTrip.whatsNotIncluded as IncludedItem[])
      : DEFAULT_NOT_INCLUDED;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-6 items-start">
        {/* Included */}
        <div className="flex-1 flex flex-col gap-[26px]">
          <p className="font-medium text-[20px] leading-[30px] text-[hsl(var(--text-primary))]">
            Included
          </p>
          <div className="flex flex-col gap-4">
            {included.map((item, index) => (
              <div key={index} className="flex gap-2 items-start">
                <Check className="w-6 h-6 shrink-0 text-secondary-irish-green mt-0.5" />
                <p className="text-[16px] leading-[24px] text-[hsl(var(--text-primary))]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Not Included */}
        <div className="sm:w-[319px] flex flex-col gap-[26px]">
          <p className="font-medium text-[20px] leading-[30px] text-[hsl(var(--text-primary))]">
            Not Included
          </p>
          <div className="flex flex-col gap-4">
            {notIncluded.map((item, index) => (
              <div key={index} className="flex gap-2 items-start">
                <X className="w-6 h-6 shrink-0 text-[#F04438] mt-0.5" />
                <p className="text-[16px] leading-[24px] text-[hsl(var(--text-primary))]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border w-full" />

      <Link
        href="/legal"
        className="text-[16px] font-medium text-secondary-irish-green underline"
      >
        Read more about our refund and booking policy
      </Link>
    </div>
  );
};

export default WhatsIncluded;
