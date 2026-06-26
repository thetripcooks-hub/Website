"use client";
import React from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import useGeneralStore from "@/stores/generalStore";
import { formatTripDate, formatAmount } from "@/lib/utils";
import { CartItem } from "@/types/cart";
import { TripType } from "@/types/trip";

const CartCard = ({ trip }: { trip: CartItem }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCartStore();
  const { selectedCurrency } = useGeneralStore();

  const imageUrl = trip.bannerImagesCollection.items[0]?.url;
  const dateRange = formatTripDate(trip as unknown as TripType);

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:flex gap-[26px] items-start bg-white dark:bg-background border border-[#eee] dark:border-border rounded-[8px] p-[24px] w-full">
        {imageUrl && (
          <div className="relative shrink-0 rounded-[6.634px] overflow-hidden"
            style={{ width: "140.511px", height: "139px" }}
          >
            <Image src={imageUrl} alt={trip.location} fill className="object-cover" />
          </div>
        )}
        <div className="flex flex-1 items-start justify-between min-w-0">
          <div className="flex flex-col gap-9 flex-1 min-w-0">
            <div className="flex flex-col gap-[7px] font-medium">
              <p className="text-[18px] leading-[27px] text-[var(--text-primary,#212121)] dark:text-foreground">
                {trip.location}
              </p>
              <p className="text-[16px] leading-[24px] text-[#6c707a] dark:text-[#8C909B]">
                {dateRange}
              </p>
              <p className="text-[16px] leading-[24px] text-[#6c707a] dark:text-[#8C909B]">
                Reserve your spot with {formatAmount(trip.downPayment, selectedCurrency)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => removeFromCart(trip)}
                className="border border-[#09af0d] text-[#09af0d] font-medium text-[16px] leading-[24px] rounded-full px-4 py-[10px] whitespace-nowrap hover:bg-[#09af0d]/5 transition-colors"
              >
                Remove from cart
              </button>
              <div className="flex items-center gap-[10px] bg-[var(--bg-secondary,#fafafa)] dark:bg-[#1a1a1a] rounded-full px-4 py-[10px]">
                <span className="font-medium text-[16px] leading-[24px] text-[var(--text-primary,#212121)] dark:text-foreground">
                  Spots
                </span>
                <div className="flex items-center gap-[15px]">
                  <button
                    onClick={() => decrementQuantity(trip)}
                    className="size-6 flex items-center justify-center text-[var(--text-primary,#212121)] dark:text-foreground rounded-full"
                    aria-label="Decrease spots"
                  >
                    <Minus size={15} strokeWidth={2} />
                  </button>
                  <span className="font-medium text-[18px] leading-[27px] text-[var(--text-primary,#212121)] dark:text-foreground min-w-[1ch] text-center">
                    {trip.quantity}
                  </span>
                  <button
                    onClick={() => incrementQuantity(trip)}
                    className="size-6 flex items-center justify-center text-[var(--text-primary,#212121)] dark:text-foreground rounded-full bg-[var(--bg-secondary,#fafafa)] dark:bg-[#2a2a2a]"
                    aria-label="Increase spots"
                  >
                    <Plus size={15} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center shrink-0 ml-4">
            <p className="font-medium text-[32px] leading-[48px] text-[var(--text-primary,#212121)] dark:text-foreground whitespace-nowrap">
              {formatAmount(trip.downPayment * trip.quantity, selectedCurrency)}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex flex-col gap-4 bg-white dark:bg-background border border-[#eee] dark:border-border rounded-[8px] p-4 w-full">
        {imageUrl && (
          <div className="relative w-full h-[199px] rounded-[6.634px] overflow-hidden shrink-0">
            <Image src={imageUrl} alt={trip.location} fill className="object-cover" />
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-[7px] font-medium">
              <p className="text-[18px] leading-[27px] text-[var(--text-primary,#212121)] dark:text-foreground">
                {trip.location}
              </p>
              <p className="text-[14px] leading-[21px] text-[#6c707a] dark:text-[#8C909B]">
                {dateRange}
              </p>
              <p className="text-[14px] leading-[21px] text-[#6c707a] dark:text-[#8C909B]">
                Reserve your spot with {formatAmount(trip.downPayment, selectedCurrency)}
              </p>
            </div>
            <p className="font-medium text-[32px] leading-[48px] text-[var(--text-primary,#212121)] dark:text-foreground">
              {formatAmount(trip.downPayment * trip.quantity, selectedCurrency)}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-[18px] bg-[var(--bg-secondary,#fafafa)] dark:bg-[#1a1a1a] rounded-full px-4 py-[10px] w-full justify-center">
              <span className="font-medium text-[16px] leading-[24px] text-[var(--text-primary,#212121)] dark:text-foreground">
                Spots
              </span>
              <div className="flex items-center gap-[15px]">
                <button
                  onClick={() => decrementQuantity(trip)}
                  className="size-7 flex items-center justify-center rounded-full border border-[#eee] dark:border-border"
                  aria-label="Decrease spots"
                >
                  <Minus size={15} strokeWidth={2} />
                </button>
                <span className="font-medium text-[18px] leading-[27px] text-[var(--text-primary,#212121)] dark:text-foreground min-w-[1ch] text-center">
                  {trip.quantity}
                </span>
                <button
                  onClick={() => incrementQuantity(trip)}
                  className="size-7 flex items-center justify-center rounded-full bg-[var(--bg-secondary,#fafafa)] dark:bg-[#2a2a2a] border border-[#eee] dark:border-border"
                  aria-label="Increase spots"
                >
                  <Plus size={15} strokeWidth={2} />
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(trip)}
              className="border border-[#09af0d] text-[#09af0d] font-medium text-[16px] leading-[24px] rounded-full px-4 py-[10px] w-full text-center"
            >
              Remove from cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
