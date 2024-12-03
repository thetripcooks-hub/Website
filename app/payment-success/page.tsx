"use client";
import { Button } from "@/components/ui";
import useCartStore from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PaymentSuccessIcon from "../../components/icons/svg/payment-success.svg";
import Image from "next/image";
// import useGeneralStore from "@/stores/generalStore";

const Page = () => {
  const router = useRouter();
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mx-auto w-screen flex justify-center items-center flex-col mt-[50px] sm:mt-[100px]">
      <Image
        src={PaymentSuccessIcon}
        width={132}
        height={132}
        alt="payment success icon"
        className="w-[90px] h-[90px] sm:w-[132px] sm:h-[132px] mb-5"
      />
      <h3 className="font-semibold text-[24px] leading-[43.2px] sm:text-[40px] sm:leading-[72px] text-[#020E0B]">
        Your order is confirmed!
      </h3>
      <p className="leading-[28.8px] text-base max-w-[318px] sm:max-w-[381px] text-center text-neutral-grey-500 mb-5 sm:mb-10">
        We’ll be in touch with you for more updates towards your trip
      </p>
      <div className="flex gap-5">
        <Button
          size="default"
          onClick={() => router.push("/trips")}
          variant="outline"
        >
          Explore Trips
        </Button>
        <Button size="default" onClick={() => router.push("/home")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Page;
