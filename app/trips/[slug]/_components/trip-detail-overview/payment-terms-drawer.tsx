"use client";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { formatAmount } from "@/lib/utils";
import useGeneralStore from "@/stores/generalStore";
import useTripStore from "@/stores/trip-store";
import dayjs from "@/lib/dayjs";
import Link from "next/link";

const PaymentTermsDrawer = () => {
  const { selectedTrip } = useTripStore();
  const { selectedCurrency } = useGeneralStore();

  if (!selectedTrip) return null;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-[16px] text-secondary-irish-green underline leading-[24px]">
          Learn More
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-fit">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-[24px] leading-[36px] font-medium text-[hsl(var(--text-primary))]">
              Payment Terms
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-6 pb-10 flex flex-col gap-4 text-[16px] leading-[24px]">
            <p className="text-[hsl(var(--text-primary))]">
              <span className="font-semibold text-secondary-irish-green">
                {formatAmount(selectedTrip.downPayment, selectedCurrency, selectedTrip.currency)}
              </span>{" "}
              required to reserve a spot
            </p>

            {selectedTrip.installments.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-[hsl(var(--text-secondary))] text-[14px]">
                  Remaining balance in instalments:
                </p>
                {selectedTrip.installments.map((installment, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border border-border rounded-[8px] px-4 py-3"
                  >
                    <span className="text-[hsl(var(--text-secondary))] text-[14px]">
                      {dayjs.utc(installment.date, "MM-DD-YYYY").format("Do MMMM, YYYY")}
                    </span>
                    <span className="font-semibold text-[hsl(var(--text-primary))]">
                      {formatAmount(Number(installment.amount), selectedCurrency, selectedTrip.currency)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[hsl(var(--text-secondary))] text-[14px]">
              Refunds are subject to{" "}
              <Link href="/legal" className="text-secondary-irish-green underline">
                terms and conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PaymentTermsDrawer;
