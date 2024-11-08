import { Button, Card } from "@/components/ui";
import React from "react";
import airplane from "../img/whats-included/airplane.svg";
import house from "../img/whats-included/house.svg";
import money from "../img/payment-card/money.svg";
import Image from "next/image";
import PaymentTerms from "./payment-terms";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PaymentCard = () => {
  const router = useRouter();
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
      title: "Instalment payment available",
    },
  ];
  return (
    <Card className="p-[24px] w-full shadow-none border-neutral-grey-300">
      <div className="flex flex-col gap-2.5">
        <p className="font-medium flex gap-1 items-baseline">
          <span className="line-through text-[24px] leading-[29.26px] text-neutral-grey-500">
            £4,000
          </span>
          <span className="text-[32px] leading-[39.01px]">£3,000</span>
        </p>
        <p className="font-medium text-[16px] leading-[19.5px]">10% off</p>

        <p className="items-center flex text-[16px] leading-[19.5px] gap-2.5 text-neutral-subtext">
          <span>12 Days</span>
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
          <span>10 people</span>
        </p>
      </div>

      <div className="border border-y-neutral-grey-300 border-x-0 gap-4 py-5 my-4 flex flex-col">
        {data.map((item) => (
          <div
            key={item.title + Math.random()}
            className="flex gap-1 items-center"
          >
            <Image src={item.icon} alt={item.title} width={28} height={28} />
            <p className="text-[#000000] leading-[19.5px] text-[16px]">
              {item.title}
            </p>
          </div>
        ))}
        <Button className="w-full" onClick={() => router.push("/cart")}>
          Book Now
        </Button>
        <Button
          variant="outline"
          className="w-full border-[#020E0B]"
          onClick={() => toast.success("Added to cart")}
        >
          Add to Cart
        </Button>
      </div>

      <PaymentTerms />
    </Card>
  );
};

export default PaymentCard;
