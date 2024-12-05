"use client";
import { Button, Card } from "@/components/ui";
import React from "react";
import airplane from "../img/whats-included/airplane.svg";
import house from "../img/whats-included/house.svg";
import money from "../img/payment-card/money.svg";
import Image from "next/image";
import PaymentTerms from "./payment-terms";
import { percentage, pounds } from "@/lib/utils";
import usePaymentCard from "@/hooks/payment/usePaymentCard";
import dayjs from "dayjs";
import { CircleCheck } from "lucide-react";

const PaymentCard = () => {
  const data = [
    {
      icon: airplane,
      title: "Flight included",
    },
    {
      icon: house,
      title: "Accomodation included",
    },
    {
      icon: money,
      title: "Installment payment available",
    },
  ];
  const { selectedTrip, handleAddToCart, handlePay, isPaying } =
    usePaymentCard();

  return (
    selectedTrip && (
      <Card className="p-[24px] w-full shadow-none border-neutral-grey-300 h-fit dark:bg-background dark:border-[#8C909B]">
        <div className="flex flex-col gap-2.5">
          <p className="font-medium flex gap-1 items-baseline">
            {selectedTrip.discount ? (
              <span className="line-through text-[24px] leading-[29.26px] text-neutral-grey-500 dark:text-[#BABABA]">
                {pounds.format(selectedTrip.fullAmount)}
              </span>
            ) : null}
            <span className="text-[32px] leading-[39.01px]">
              {selectedTrip.discount
                ? pounds.format(
                    selectedTrip.fullAmount -
                      percentage(selectedTrip.discount, selectedTrip.fullAmount)
                  )
                : pounds.format(selectedTrip.fullAmount)}
            </span>
          </p>
          {selectedTrip.discount ? (
            <p className="font-medium text-[16px] leading-[19.5px] dark:text-[#8C909B]">
              {selectedTrip.discount}% off
            </p>
          ) : null}

          <p className="items-center flex text-[16px] leading-[19.5px] gap-2.5 text-neutral-subtext dark:text-[#8C909B]">
            <span>
              {dayjs(selectedTrip.endDate).diff(selectedTrip.startDate, "d")}{" "}
              Days
            </span>
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              className="inline-flex"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="4" fill="#1D2433" className="dark:fill-[#8C909B]" />
            </svg>
            <span>{selectedTrip.slots || 10} people</span>
          </p>
        </div>

        <div className="border border-y-neutral-grey-300 border-x-0 gap-4 py-5 my-4 flex flex-col">
          {data.map((item) => (
            <div
              key={item.title + Math.random()}
              className="flex gap-1 items-center"
            >
              <Image src={item.icon} alt={item.title} width={28} height={28} className="dark:hidden"/>
              <CircleCheck className="hidden dark:block" width={28} height={28} />
              <p className="text-[#000000] leading-[19.5px] text-[16px] dark:text-foreground">
                {item.title}
              </p>
            </div>
          ))}
          {selectedTrip.soldOut ? (
            <Button className="w-full" variant="outline">Sold Out</Button>
          ) : (
            <>
              <Button
                className="w-full"
                loading={isPaying}
                onClick={handlePay}
                disabled={isPaying}
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#020E0B]"
                onClick={() => handleAddToCart()}
              >
                Add to Cart
              </Button>
            </>
          )}
        </div>

        <PaymentTerms />
      </Card>
    )
  );
};

export default PaymentCard;
