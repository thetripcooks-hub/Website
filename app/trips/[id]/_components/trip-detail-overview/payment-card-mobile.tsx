"use client";
import { Button, Card } from "@/components/ui";
import usePaymentCard from "@/hooks/payment/usePaymentCard";
import { cn, pounds } from "@/lib/utils";
import dayjs from "dayjs";
import React from "react";

const PaymentCardMobile = () => {
  const { selectedTrip, handleAddToCart, handlePay } = usePaymentCard();
  return (
    selectedTrip && (
      <Card
        className={cn(
          "fixed bottom-0 sm:hidden border-t-neutral-grey-300 shadow-none w-full p-2.5 z-10 rounded-none flex flex-col gap-3"
        )}
      >
        <div className="flex flex-col gap-3">
          <h6 className=" text-[24px] leading-[29.26px] text-foreground">
            {pounds.format(selectedTrip.fullAmount)}
          </h6>
          <p className="items-center flex text-[12px] leading-[14.63px] gap-1 text-neutral-subtext">
            <span>
              {dayjs(selectedTrip.endDate).diff(
                dayjs(selectedTrip.startDate),
                "day"
              )}{" "}
              Days
            </span>
            {selectedTrip.slots ? (
              <>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  className="inline-flex"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="4" fill="#1D2433" />
                </svg>
                <span>{selectedTrip.slots} people</span>
              </>
            ) : null}
          </p>
        </div>
        <div className="flex w-full gap-2">
          <Button className="w-full" onClick={handlePay}>
            Book Now
          </Button>
          <Button
            variant="outline"
            className="w-full border-[#020E0B]"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    )
  );
};

export default PaymentCardMobile;
