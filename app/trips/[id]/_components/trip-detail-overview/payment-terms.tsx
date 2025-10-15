"use client";
import { formatAmount } from "@/lib/utils";
import useGeneralStore from "@/stores/generalStore";
import useTripStore from "@/stores/trip-store";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
import React from "react";

const PaymentTerms = () => {
  const { selectedTrip } = useTripStore();
  const { selectedCurrency } = useGeneralStore();
  return (
    selectedTrip && (
      <div className="text-[16px] leading-[19.5px] font-normal gap-3 sm:flex flex-col text-[#000000] hidden dark:text-foreground">
        <h6 className="text-neutral-subtext dark:text-foreground">
          Payment terms
        </h6>

        <p>
          {" "}
          <span className="font-normal">
            {formatAmount(selectedTrip.downPayment, selectedCurrency)}
          </span>{" "}
          required to reserve a spot
        </p>

        <div>
          {selectedTrip.installments.map((installment, index) => (
            <p key={index}>
              <span className="font-normal">
                {formatAmount(Number(installment.amount), selectedCurrency)}
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
