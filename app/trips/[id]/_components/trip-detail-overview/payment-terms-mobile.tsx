"use client";
import { pounds } from "@/lib/utils";
import useTripStore from "@/stores/trip-store";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
dayjs.extend(advancedFormat);

const PaymentTermsMobile = () => {
  const { selectedTrip } = useTripStore();
  return (
    selectedTrip && (
      <div className="text-[16px] leading-[19.5px] font-normal gap-3 flex flex-col text-[#000000] sm:hidden border border-b-solid border-b-neutral-grey-300 border-x-0 border-t-0 pb-5 mb-5 h-fit dark:text-foreground">
        <h6 className="text-foreground text-2xl leading-[29.26px] font-medium mb-3">
          Payment terms
        </h6>

        <div className="gap-3 flex flex-col">
          <p>
            {" "}
            <span className="font-normal">
              {pounds.format(selectedTrip?.downPayment)}
            </span>{" "}
            required to reserve a spot
          </p>

          <div>
            {selectedTrip.installments.map((installment, index) => (
              <p key={index}>
                <span className="font-normal">
                  {pounds.format(Number(installment.amount))}
                </span>{" "}
                due {dayjs(installment.date).format("Do MMMM, YYYY")}
              </p>
            ))}
          </div>
          <p>
            Refunds are subject to{" "}
            <Link
              href="/legal"
              className="text-secondary-irish-green leading-[17.07px]"
            >
              terms and conditions.
            </Link>{" "}
          </p>
        </div>
      </div>
    )
  );
};

export default PaymentTermsMobile;
