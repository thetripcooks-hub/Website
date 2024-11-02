"use client";
import Link from "next/link";
import React from "react";

const PaymentTermsMobile = () => {
  return (
    <div className="text-[16px] leading-[19.5px] font-normal gap-3 flex flex-col text-[#000000] sm:hidden border border-b-solid border-b-neutral-grey-300 border-x-0 border-t-0 pb-5 mb-5">
      <h6 className="text-foreground text-2xl leading-[29.26px] font-medium mb-3">
        Payment terms
      </h6>

      <div className="gap-3 flex flex-col">
        <p>
          {" "}
          <span className="font-bold">£300</span> required to reserve a spot
        </p>

        <div>
          <p>
            <span className="font-bold">$900</span> due 10th July, 2024
          </p>
          <p>
            <span className="font-bold">$900</span> due 10th July, 2024
          </p>
          <p>
            <span className="font-bold">$900</span> due 10th July, 2024
          </p>
        </div>
        <p>
          Refunds are subject to{" "}
          <Link
            href="#"
            className="text-secondary-irish-green leading-[17.07px]"
          >
            terms and conditions.
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default PaymentTermsMobile;
