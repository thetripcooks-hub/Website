"use client";
import { pounds } from "@/lib/utils";
import useTripStore from "@/stores/trip-store";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

const PaymentTerms = () => {
  const { selectedTrip } = useTripStore();
  return (
    selectedTrip && (
      <div className="text-[16px] leading-[19.5px] font-normal gap-3 sm:flex flex-col text-[#000000] hidden dark:text-foreground">
        <h6 className="text-neutral-subtext dark:text-foreground">
          Payment terms
        </h6>

        <p>
          {" "}
          <span className="font-normal">
            {pounds.format(selectedTrip.downPayment)}
          </span>{" "}
          required to reserve a spot
        </p>

        <div>
          {/* <p>
            <span className="font-bold">$900</span> due 10th July, 2024
          </p>
          <p>
            <span className="font-bold">$900</span> due 10th July, 2024
          </p>
          <p>
            <span className="font-bold">$900</span> due 10th July, 2024
          </p> */}
          {selectedTrip.installments.map((installment, index) => (
            <p key={index}>
              <span className="font-normal">
                {pounds.format(Number(installment.amount))}
              </span>{" "}
              due{" "}
              {dayjs(installment.date, "MM-DD-YYYY").format("Do MMMM, YYYY")}
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
    )
  );
};

export default PaymentTerms;
