"use client";
import React from "react";
import Empty from "@/components/icons/svg/empty-cart-icon.svg";
import Image from "next/image";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

const EmptyCart = ({
  isModal = false,
  text,
}: {
  isModal?: boolean;
  text?: string;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center text-center gap-5">
      <Image src={Empty} alt="empty-cart" width={134} height={134} />
      <div className="flex flex-col gap-5 mb-5 justify-center items-center sm:max-w-[287px] w-full">
        <p className="text-neutral-grey-500 text-base leading-[28.8px]">
          {text ?? "When you add items to your cart they will appear here"}
        </p>
        {/* {isModal ? null : ( */}
        <Button
          className="max-w-[166px] w-fit"
          size="lg"
          onClick={() => router.push("/trips")}
        >
          Explore Trips
        </Button>
        {/* )} */}
      </div>
    </div>
  );
};

export default EmptyCart;
