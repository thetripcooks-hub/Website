"use client";
import Link from "next/link";
import React from "react";

const PaymentTerms = () => {
  return (
    <div className="text-[16px] leading-[19.5px] font-normal gap-3 sm:flex flex-col text-[#000000] hidden">
      <h6 className="text-neutral-subtext">Payment terms</h6>

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
        <Link href="#" className="text-secondary-irish-green leading-[17.07px]">
          terms and conditions.
        </Link>{" "}
      </p>
    </div>
  );
};

export default PaymentTerms;
