import { RadioGroup } from "@/components/ui";
import React, { useState } from "react";
import PaymentTypeItem from "./payment-type-item";

const CheckoutPaymentType = () => {
  const [selectedValue, setSelectedValue] = useState("full");
  const items = [
    {
      title: "Pay in Full",
      description: "Pay the Full amount today and save your spot on this trip",
      value: "full",
      isInstallment: false,
    },
    {
      title: "Pay in instalments",
      description: "Pay £300 today and save your spot on this trip. ",
      value: "installment",
      isInstallment: true,
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <h3 className="leading-[21.94px] text-[18px] text-neutral-text">
        Payment type{" "}
      </h3>
      <RadioGroup defaultValue="full" className="gap-5">
        {items.map((item, index) => (
          <PaymentTypeItem
            key={index}
            title={item.title}
            handleClick={() => setSelectedValue(item.value)}
            description={item.description}
            value={item.value}
            isInstallment={item.isInstallment}
            isActive={selectedValue === item.value}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default CheckoutPaymentType;
