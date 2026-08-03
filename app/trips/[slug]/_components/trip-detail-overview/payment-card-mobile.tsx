"use client";
import usePaymentCard from "@/hooks/payment/usePaymentCard";
import { cn, formatAmount, percentage } from "@/lib/utils";
import useGeneralStore from "@/stores/generalStore";
import React from "react";

const PaymentCardMobile = () => {
  const { selectedTrip, handleAddToCart, handlePay, isPaying } = usePaymentCard();
  const { selectedCurrency } = useGeneralStore();

  if (!selectedTrip) return null;

  const discountedPrice = selectedTrip.discount
    ? selectedTrip.fullAmount - percentage(selectedTrip.discount, selectedTrip.fullAmount)
    : null;

  const displayPrice = discountedPrice ?? selectedTrip.fullAmount;

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-[hsl(var(--bg-primary))] border-t border-border px-4 py-6 z-10 flex flex-col gap-6">
      {/* Badges + Price */}
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 flex-wrap">
          {selectedTrip.slots && (
            <span className="bg-[hsl(var(--text-primary))] text-[hsl(var(--bg-primary))] text-[12px] font-medium leading-[18px] px-2 py-2 rounded-[12px] whitespace-nowrap">
              {selectedTrip.slots} Spots left
            </span>
          )}
          {selectedTrip.discount && (
            <span className="bg-[hsl(var(--text-primary))] text-[hsl(var(--bg-primary))] text-[12px] font-medium leading-[18px] px-2 py-2 rounded-[12px] whitespace-nowrap">
              {selectedTrip.discount}% off
            </span>
          )}
        </div>
        <div className="flex items-center gap-[11px]">
          <span className="text-[24px] leading-[36px] font-medium text-[hsl(var(--text-primary))]">
            {formatAmount(displayPrice, selectedCurrency, selectedTrip.currency)}
          </span>
          {selectedTrip.discount && (
            <span className="line-through text-[20px] leading-[30px] font-medium text-[hsl(var(--text-secondary))]">
              {formatAmount(selectedTrip.fullAmount, selectedCurrency, selectedTrip.currency)}
            </span>
          )}
          <span className="text-[16px] font-medium text-[hsl(var(--text-primary))]">
            per person
          </span>
        </div>
      </div>

      {/* Buttons */}
      {selectedTrip.soldOut ? (
        <button
          disabled
          className="w-full py-4 rounded-full text-[16px] font-medium border border-border text-[hsl(var(--text-secondary))] cursor-not-allowed"
        >
          Sold Out
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => handleAddToCart()}
            className="flex-1 py-4 rounded-full text-[16px] font-medium border border-secondary-irish-green text-secondary-irish-green hover:bg-secondary-irish-green hover:text-white transition-colors"
          >
            Add to cart
          </button>
          <button
            onClick={() => handlePay(selectedCurrency)}
            disabled={isPaying}
            className={cn(
              "flex-1 py-4 rounded-full text-[16px] font-medium text-neutral-text bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7] hover:from-[#FA84F3] hover:to-[#FA93F4] transition-colors",
              isPaying && "opacity-70 cursor-not-allowed"
            )}
          >
            {isPaying ? "Loading..." : "Book Now"}
          </button>
        </div>
      )}

    </div>
  );
};

export default PaymentCardMobile;
