"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OldEmpty from "@/components/icons/svg/empty-cart-icon.svg";

const EmptyCart = ({
  isModal = false,
  text,
}: {
  isModal?: boolean;
  text?: string;
} = {}) => {
  const router = useRouter();

  if (isModal) {
    return (
      <div className="flex flex-col justify-center items-center text-center gap-5 p-5">
        <Image src={OldEmpty} alt="empty-cart" width={80} height={80} />
        <p className="text-sm text-neutral-500 dark:text-foreground">
          {text ?? "When you add items to your cart they will appear here"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center text-center gap-5 sm:gap-[37px] py-16 sm:py-[106px] px-5 sm:px-[100px]">
      {/* Desktop illustration */}
      <div className="hidden sm:block relative" style={{ width: "184.855px", height: "166.036px" }}>
        <Image src="/img/empty-cart.svg" alt="empty cart" fill className="object-contain dark:hidden" />
        <Image src="/img/empty-cart-dark.svg" alt="empty cart" fill className="object-contain hidden dark:block" />
      </div>
      {/* Mobile illustration */}
      <div className="sm:hidden relative" style={{ width: "133.601px", height: "120px" }}>
        <Image src="/img/empty-cart.svg" alt="empty cart" fill className="object-contain dark:hidden" />
        <Image src="/img/empty-cart-dark.svg" alt="empty cart" fill className="object-contain hidden dark:block" />
      </div>
      <p className="font-medium text-[20px] sm:text-[32px] leading-[28px] sm:leading-[48px] text-[var(--text-primary,#212121)] dark:text-foreground max-w-[342px]">
        {"There's nothing in your cart, yet"}
      </p>
      <button
        onClick={() => router.push("/trips")}
        className="bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7] hover:from-[#FA84F3] hover:to-[#FA93F4] transition-colors text-[#212121] font-medium text-[16px] leading-[24px] rounded-full px-4 h-[56px] w-[185px]"
      >
        See all trips
      </button>
    </div>
  );
};

export default EmptyCart;
