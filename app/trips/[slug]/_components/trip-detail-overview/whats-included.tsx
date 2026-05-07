"use client";
import React from "react";
import useTripStore from "@/stores/trip-store";
import { Check, X } from "lucide-react";
import Link from "next/link";

const WhatsIncluded = () => {
  const { selectedTrip } = useTripStore();

  if (!selectedTrip) return null;

  type IncludedItem = {
    icon?: string;
    title: string;
    isHighlighted?: string | boolean;
    isHightlighted?: boolean;
  };

  const items = selectedTrip.whatsIncluded as IncludedItem[];

  const isIncluded = (item: IncludedItem) =>
    item.isHighlighted === true ||
    item.isHighlighted === "true" ||
    item.isHightlighted === true;

  const included = items.filter(isIncluded);
  const notIncluded = items.filter((item) => !isIncluded(item));

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
        {notIncluded.length > 0 && (
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
        )}
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
