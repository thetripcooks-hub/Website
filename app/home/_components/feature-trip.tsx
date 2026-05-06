"use client";
import { Button } from "@/components/ui";
import Image from "next/image";
import React from "react";
import FeatureTripImage from "~/img/sample-featured-trip.svg";
import { useRouter } from "next/navigation";
import useTripStore from "@/stores/trip-store";
import { generateTripLink, formatAmount } from "@/lib/utils";
import { Clock, Users, Calendar, Check } from "lucide-react";
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
  const { addToCart, setShowCart, showCart } = useCartStore();
  const featuredTripArray = trips.filter((x) => x.isFeaturedTrip);

  if (featuredTripArray.length === 0) return null;

  const trip = featuredTripArray[0];
  const imageUrl =
    trip.bannerImagesCollection.items[0]?.url ?? FeatureTripImage;

  return (
    <section className="px-5 py-10 sm:py-[62px] sm:px-[109px]">
      <SectionWrapper>
      <h2 className="font-ogg-trial text-[32px] sm:text-[48px] leading-tight mb-8 sm:mb-12">
        Featured trip
      </h2>

      {/* Desktop: side by side | Mobile: stacked */}
      <div className="flex flex-col sm:flex-row gap-6 items-stretch">
        {/* Left — image */}
        <div className="relative w-full sm:w-[586px] shrink-0 h-[300px] sm:h-[479px]">
          <Image
            src={imageUrl}
            alt={trip.location}
            fill
            priority
            className="object-cover rounded-[22px]"
          />
          {/* Bestseller badge */}
          <div className="absolute top-5 left-6 bg-white rounded-full px-4 py-1 text-sm font-medium text-neutral-text flex items-center gap-1">
            Bestseller <span>💸</span>
          </div>
          {/* Cart icon */}
          <button
            className="absolute top-[18px] right-[26px]"
            onClick={() => {
              addToCart({ ...trip, quantity: 1 });
              if (!showCart) {
                setShowCart(true);
              }
            }}
            aria-label="Add to cart"
          >
            <Image src={CartIconSvg} alt="add to cart" width={46} height={46} />
          </button>
        </div>

        {/* Right — details card */}
        <div className="flex-1 bg-[#fafafa] border border-[#eee] rounded-[14px] p-6 flex flex-col gap-8">
          {/* Name + price */}
          <div className="flex items-start justify-between">
            <h3 className="font-ogg-trial text-[28px] sm:text-[40px] leading-tight text-neutral-text">
              {trip.location}
            </h3>
            <div className="text-right shrink-0">
              <p className="text-[24px] sm:text-[32px] font-bold text-neutral-text leading-tight">
                {formatAmount(trip.fullAmount, selectedCurrency)}
              </p>
              <p className="text-sm text-neutral-subtext text-[#6C707A]">Per person</p>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-col gap-4">
            <hr className="border-[#eee] border-dashed" />
            <div className="flex flex-wrap gap-8 sm:gap-[45px] sm:max-w-[483px]">
              <div className="flex items-start gap-2">
                <Clock className="w-[14.775px] h-[13.5px] mt-0.5 shrink-0 text-secondary-irish-green" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-subtext">
                    Duration
                  </p>
                  <p className="text-[18px] font-medium text-neutral-text">
                    {trip.startDate && trip.endDate
                      ? `${Math.round((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / 86400000)} Days`
                      : "7 Days"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-[14.775px] h-[13.5px]  mt-0.5 shrink-0 text-secondary-irish-green" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-subtext">
                    Group Size
                  </p>
                  <p className="text-[18px] font-medium text-neutral-text">
                    12–18 people
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-[14.775px] h-[13.5px] text-secondary-irish-green mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.55px] text-neutral-subtext">
                    Dates
                  </p>
                  <p className="text-[18px] font-medium text-neutral-text">
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
            <hr className="border-[#eee] border-dashed" />
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {CHECKLIST.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="w-[18px] h-[18px] text-secondary-irish-green shrink-0" />
                <span className="text-sm font-medium text-neutral-text">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Button
            className="w-full sm:w-[185px]"
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
