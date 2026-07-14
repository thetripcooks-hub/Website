"use client";
import React from "react";
import { formatAmount, percentage } from "@/lib/utils";
import useGeneralStore from "@/stores/generalStore";
import usePaymentCard from "@/hooks/payment/usePaymentCard";
import { cn } from "@/lib/utils";
import PaymentTermsDrawer from "./payment-terms-drawer";

const PaymentCard = () => {
  const { selectedCurrency } = useGeneralStore();
  const { selectedTrip, handleAddToCart, handlePay, isPaying } = usePaymentCard();

  if (!selectedTrip) return null;

  const discountedPrice = selectedTrip.discount
    ? selectedTrip.fullAmount - percentage(selectedTrip.discount, selectedTrip.fullAmount)
    : null;

  const displayPrice = discountedPrice ?? selectedTrip.fullAmount;

  return (
    <div className="rounded-[8px] border border-border bg-[hsl(var(--bg-primary))] p-6 flex flex-col gap-6 w-full">
      {/* Badges + Price */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          {selectedTrip.slots && (
            <span className="bg-[hsl(var(--text-primary))] text-[hsl(var(--bg-primary))] text-[12px] font-medium leading-[18px] px-2 py-2 rounded-[12px] whitespace-nowrap">
              {selectedTrip.slots} Spots left
            </span>
          )}
          {selectedTrip.discount && (
            <span className="bg-[hsl(var(--text-primary))] text-[hsl(var(--bg-primary))] text-[12px] font-medium leading-[18px] px-2 py-2 rounded-[12px] whitespace-nowrap">
              {selectedTrip.discount}% Off
            </span>
          )}
        </div>
        <div className="flex items-center gap-[11px] flex-wrap">
          <span className="text-[32px] leading-[48px] font-medium text-[hsl(var(--text-primary))]">
            {formatAmount(displayPrice, selectedCurrency, selectedTrip.currency)}
          </span>
          {selectedTrip.discount && (
            <span className="line-through text-[24px] leading-[36px] font-medium text-[hsl(var(--text-secondary))]">
              {formatAmount(selectedTrip.fullAmount, selectedCurrency, selectedTrip.currency)}
            </span>
          )}
          <span className="text-[16px] font-medium text-[hsl(var(--text-primary))]">
            per person
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        {selectedTrip.soldOut ? (
          <button
            disabled
            className="w-full py-4 rounded-full text-[16px] font-medium border border-border text-[hsl(var(--text-secondary))] cursor-not-allowed"
          >
            Sold Out
          </button>
        ) : (
          <>
            <button
              onClick={() => handlePay(selectedCurrency)}
              disabled={isPaying}
              className={cn(
                "w-full py-4 rounded-full text-[16px] font-medium text-neutral-text bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7]",
                isPaying && "opacity-70 cursor-not-allowed"
              )}
            >
              {isPaying ? "Loading..." : "Book Now"}
            </button>
            <button
              onClick={() => handleAddToCart()}
              className="w-full py-4 rounded-full text-[16px] font-medium border border-secondary-irish-green text-secondary-irish-green"
            >
              Add to cart
            </button>
          </>
        )}
      </div>

      <div className="border-t border-border" />

      {/* Down payment */}
      <div className="flex flex-col gap-1 items-center text-center">
        <p className="text-[18px] font-medium leading-[27px] text-[hsl(var(--text-primary))]">
          Reserve your spot with{" "}
          <span className="text-secondary-irish-green">
            {formatAmount(selectedTrip.downPayment, selectedCurrency, selectedTrip.currency)}
          </span>
        </p>
        <p className="text-[16px] leading-[24px] text-[hsl(var(--text-secondary))]">
          Flexible payment plans are available
        </p>
        <PaymentTermsDrawer />
      </div>
    </div>
  );
};

export default PaymentCard;
