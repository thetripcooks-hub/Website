"use client";
import { Button } from "@/components/ui";
import Image from "next/image";
import React from "react";
import FeatureTripImage from "~/img/sample-featured-trip.svg";
import { useRouter } from "next/navigation";
import useTripStore from "@/stores/trip-store";
import { generateTripLink, formatAmount } from "@/lib/utils";
import CartIconSvg from "~/img/cart-icon.svg";
import useGeneralStore from "@/stores/generalStore";
import useCartStore from "@/stores/cartStore";
import SectionWrapper from "./section-wrapper";

const CHECKLIST = [
  "Flights included",
  "Daily breakfast",
  "24/7 Trip coordinator",
  "Hotel accommodation",
  "City tours & activities",
  "Airport transfers",
];

const FeatureTrip = () => {
  const router = useRouter();
  const { trips } = useTripStore();
  const { selectedCurrency } = useGeneralStore();
  const { addToCart, setLastAddedItem } = useCartStore();
  const featuredTripArray = trips.filter((x) => x.isFeaturedTrip);

  if (featuredTripArray.length === 0) return null;

  const trip = featuredTripArray[0];
  const imageUrl =
    trip.bannerImagesCollection.items[0]?.url ?? FeatureTripImage;

  return (
    <section className="px-5 py-10 sm:py-[62px] sm:px-[109px]">
      <SectionWrapper>
        <h2 className="font-ogg-trial text-[26px] sm:text-[48px] leading-tight mb-8 sm:mb-12">
          Featured Trip
        </h2>

        {/* Desktop: side by side | Mobile: stacked */}
        <div className="flex flex-col sm:flex-row gap-6 items-stretch">
          {/* Left — image */}
          <div className="relative w-full sm:w-[586px] shrink-0 h-[300px] sm:h-[479px] border-[#eee] border rounded-[14px] overflow-hidden dark:border-none">
            <Image
              src={imageUrl}
              alt={trip.location}
              fill
              priority
              className="object-cover rounded-[22px]"
            />
            {/* Bestseller badge */}
            <div className="absolute top-5 left-6 bg-white dark:bg-[#121716] rounded-full px-4 py-1 text-sm font-medium text-neutral-text dark:text-primary flex items-center gap-1 border-2 border-[#d0d0d0] dark:border-[#585E6A]">
              Bestseller <span className="text-[20.68px]">💸</span>
            </div>
            {/* Cart icon */}
            <button
              className="absolute top-[18px] right-[26px]"
              onClick={() => {
                const item = { ...trip, quantity: 1 };
                addToCart(item);
                setLastAddedItem(item);
              }}
              aria-label="Add to cart"
            >
              <Image
                src={CartIconSvg}
                alt="add to cart"
                width={46}
                height={46}
              />
            </button>
          </div>

          {/* Right — details card */}
          <div className="flex-1 bg-[#fafafa] dark:bg-[#1E2826] border border-[#eee] dark:border-[#585E6A] rounded-[14px] p-6 flex flex-col gap-8">
            {/* Name + price */}
            <div className="flex flex-col gap-2 sm:flex-row items-start sm:justify-between">
              <h3 className="font-ogg-trial text-[22px] sm:text-[40px] leading-tight text-neutral-text dark:text-white">
                {trip.location}
              </h3>
              <div className="flex flex-row items-end justify-between sm:flex-col sm:items-end sm:text-right sm:shrink-0 w-full sm:w-auto">
                <div>
                  <p className="text-[24px] sm:text-[32px] font-bold text-neutral-text leading-tight dark:text-white">
                    {formatAmount(trip.fullAmount, selectedCurrency)}
                  </p>
                  <p className="text-sm text-neutral-subtext text-[#6C707A] dark:text-[#A0A0A0]">
                    Per person
                  </p>
                </div>
                {/* Group Size — mobile only here; desktop keeps it in meta row */}
                <div className="flex items-end gap-1 sm:hidden">
                  <Image
                    src="/img/featured-trip/people.svg"
                    width={18}
                    height={18}
                    alt="Group Size"
                  />
                  <div className="text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-subtext dark:text-[#BFC0C2]">
                      Group Size
                    </p>
                    <p className="text-[11px] font-medium text-neutral-text dark:text-white">
                      {trip.groupSize ?? "12–18 people"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-col gap-4 sm:gap-[30px]">
              <div
                className="h-px w-full dark:hidden"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #c8c8c8 0, #c8c8c8 6px, transparent 6px, transparent 14px)",
                }}
              />
              <div
                className="h-px w-full hidden dark:block"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #585E6A 0, #585E6A 6px, transparent 6px, transparent 14px)",
                }}
              />
              <div className="flex flex-wrap gap-8 sm:gap-[45px] sm:max-w-[483px] justify-between">
                <div className="flex items-start gap-2">
                  <Image
                    src="/img/featured-trip/clock.svg"
                    width={18}
                    height={18}
                    alt="Duration"
                  />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-subtext dark:text-[#BFC0C2]">
                      Duration
                    </p>
                    <p className="text-[11px] sm:text-[18px] font-medium text-neutral-text dark:text-white">
                      {trip.startDate && trip.endDate
                        ? `${Math.round((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / 86400000)} Days`
                        : "7 Days"}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-start gap-2">
                  <Image
                    src="/img/featured-trip/people.svg"
                    width={18}
                    height={18}
                    alt="Group Size"
                  />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-subtext dark:text-[#BFC0C2]">
                      Group Size
                    </p>
                    <p className="text-[11px] sm:text-[18px] font-medium text-neutral-text dark:text-white">
                      {trip.groupSize ?? "12–18 people"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Image
                    src="/img/featured-trip/calendar.svg"
                    width={18}
                    height={18}
                    alt="Dates"
                  />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-subtext dark:text-[#BFC0C2]">
                      Dates
                    </p>
                    <p className="text-[11px] sm:text-[18px] font-medium text-neutral-text dark:text-white">
                      {trip.startDate
                        ? new Date(trip.startDate).toLocaleDateString("en-GB", {
                            month: "short",
                            day: "numeric",
                          }) +
                          " – " +
                          new Date(trip.endDate).toLocaleDateString("en-GB", {
                            month: "short",
                            day: "numeric",
                          })
                        : "TBA"}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="h-px w-full dark:hidden"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #c8c8c8 0, #c8c8c8 6px, transparent 6px, transparent 14px)",
                }}
              />
              <div
                className="h-px w-full hidden dark:block"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #585E6A 0, #585E6A 6px, transparent 6px, transparent 14px)",
                }}
              />
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-4">
              {CHECKLIST.map((item, index) => (
                <div key={item} className={`flex items-center gap-2${index >= 3 ? " hidden sm:flex" : ""}`}>
                  <Image
                    src="/img/check.svg"
                    width={18}
                    height={18}
                    alt="Check"
                  />
                  <span className="text-sm font-medium text-neutral-text dark:text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Button
              className="w-full sm:w-[185px] sm:mt-2.5 mx-auto"
              onClick={() => router.push(generateTripLink(trip))}
            >
              View more
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default FeatureTrip;
