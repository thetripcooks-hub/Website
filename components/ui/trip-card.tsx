"use client";
import ComingSoonBadge from "@/app/home/_components/coming-soon-badge";
import { formatAmount, formatTripDate, percentage } from "@/lib/utils";
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
}: {
  handleClick: () => void;
  handleAddToCart: () => void;
  item: CartItem;
}) => {
  const { selectedCurrency } = useGeneralStore();

  const price = item.discount
    ? formatAmount(
        item.fullAmount - percentage(item.discount, item.fullAmount),
        selectedCurrency
      )
    : formatAmount(item.fullAmount, selectedCurrency);

  const originalPrice = item.discount
    ? formatAmount(item.fullAmount, selectedCurrency)
    : null;

  return (
    <div className="bg-background border border-neutral-grey-200 rounded-[12px] p-4 flex flex-col gap-10 relative cursor-pointer">
      {/* Image */}
      <div
        className="relative h-[301px] w-full rounded-[12px] overflow-hidden"
        onClick={handleClick}
      >
        {item.soldOut ? (
          <div className="absolute right-3 top-3 z-10">
            <ComingSoonBadge text="Sold Out" />
          </div>
        ) : (
          <button
            className="absolute right-3 top-3 z-10"
            onClick={(e) => {
              e.stopPropagation();
              if (!item.soldOut) handleAddToCart();
            }}
            aria-label="Add to cart"
          >
            <Image src={CartIconSvg} alt="add to cart" width={32} height={32} />
          </button>
        )}
        <Image
          src={item.bannerImagesCollection.items[0].url}
          alt={item.location}
          priority
          fill
          className="object-cover rounded-[12px]"
        />
        {/* Host badge */}
        <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 z-10">
          <span className="text-xs font-medium text-neutral-text">
            Trip Cooks
          </span>
        </div>
      </div>

      {/* Details */}
      <div onClick={handleClick} className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <h5 className="text-[24px] font-medium text-neutral-text leading-[36px] truncate">
            {item.location}
          </h5>
          <p className="text-base text-neutral-subtext">{formatTripDate(item)}</p>
        </div>
        <div className="text-right shrink-0">
          {originalPrice && (
            <p className="text-base text-neutral-subtext line-through">{originalPrice}</p>
          )}
          <p className="font-ogg-trial text-[28px] text-neutral-text leading-tight">
            {price}
          </p>
          <p className="text-sm text-neutral-subtext">Per person</p>
        </div>
      </div>

      {/* CTA */}
      <Button
        variant="green-outline"
        className="w-full"
        onClick={handleClick}
        disabled={item.soldOut}
      >
        {item.soldOut ? "Sold Out" : "View more"}
      </Button>
    </div>
  );
};

export default TripCard;
