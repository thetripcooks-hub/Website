"use client";
import ComingSoonBadge from "@/app/home/_components/coming-soon-badge";
import { cn, formatAmount, formatTripDate, percentage } from "@/lib/utils";
import useGeneralStore from "@/stores/generalStore";
import { CartItem } from "@/types/cart";
import Image from "next/image";
import CartIconSvg from "~/img/cart-icon.svg";
import React from "react";
import { Button } from "@/components/ui/button";

const TripCard = ({
  handleClick,
  handleAddToCart,
  item,
  isPast,
}: {
  handleClick: () => void;
  handleAddToCart?: () => void;
  item: CartItem;
  isPast?: boolean;
}) => {
  const { selectedCurrency } = useGeneralStore();

  const price = item.discount
    ? formatAmount(
        item.fullAmount - percentage(item.discount, item.fullAmount),
        selectedCurrency,
        item.currency
      )
    : formatAmount(item.fullAmount, selectedCurrency, item.currency);

  const originalPrice = item.discount
    ? formatAmount(item.fullAmount, selectedCurrency, item.currency)
    : null;

  return (
    <div className="bg-background dark:bg-[#121716] border border-neutral-grey-200 dark:border-[#585E6A] rounded-[12px] p-4 flex flex-col gap-6 relative cursor-pointer">
      {/* Image */}
      <div
        className="relative h-[301px] w-full rounded-[12px] overflow-hidden"
        onClick={handleClick}
      >
        {!isPast && (
          item.soldOut ? (
            <div className="absolute right-3 top-3 z-10">
              <ComingSoonBadge text="Sold Out" />
            </div>
          ) : (
            <button
              className="absolute right-3 top-3 z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart?.();
              }}
              aria-label="Add to cart"
            >
              <Image src={CartIconSvg} alt="add to cart" width={32} height={32} />
            </button>
          )
        )}
        <Image
          src={item.bannerImagesCollection.items[0].url}
          alt={item.location}
          priority
          fill
          className="object-cover rounded-[12px]"
        />
        {/* Host / status badge */}
        <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 z-10 flex items-center border border-[#eee]">
          <span className="text-xs font-medium text-neutral-text">
            {isPast ? "Sold out" : "Trip Cooks"}
          </span>
        </div>
      </div>

      {/* Details */}
      <div
        onClick={handleClick}
        className={cn(
          "flex flex-col items-start justify-between font-plus-jakarta-sans",
          isPast ? "gap-8" : "gap-4"
        )}
      >
        <div className="flex flex-col gap-1 min-w-0">
          <h5 className="text-[18px] sm:text-[24px] font-medium text-neutral-text dark:text-white leading-[24px] sm:leading-[36px] truncate">
            {item.location}
          </h5>
          <p className="text-[13px] sm:text-base text-neutral-subtext dark:text-[#BFC0C2]">{formatTripDate(item)}</p>
        </div>
        {!isPast && (
          <div className="shrink-0">
            <div className="flex items-baseline gap-2">
              <p className="font-ogg-trial text-[20px] sm:text-[28px] text-neutral-text leading-tight dark:text-white">
                {price}
              </p>
              {originalPrice && (
                <p className="text-[13px] sm:text-base text-neutral-subtext line-through dark:text-[#BFC0C2]">{originalPrice}</p>
              )}
            </div>
            <p className="text-xs sm:text-sm text-neutral-subtext dark:text-[#BFC0C2]">Per person</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <Button
        variant="green-outline"
        className="w-full"
        onClick={handleClick}
        disabled={!isPast && item.soldOut}
      >
        {!isPast && item.soldOut ? "Sold Out" : "View more"}
      </Button>
    </div>
  );
};

export default TripCard;
