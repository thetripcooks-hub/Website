"use client";
import Image from "next/image";
import StripeMobile from "../icons/svg/stripe-mobile.svg";
import StripeDesktop from "../icons/svg/stripe-desktop.svg";
import React from "react";
import { cn } from "@/lib/utils";

const PoweredByStripe = ({
  desktopWidth,
  mobileWidth,
}: {
  desktopWidth?: number;
  mobileWidth?: number;
}) => {
  return (
    <>
      <Image
        src={StripeMobile}
        className={cn(
          "sm:hidden w-full object-fill",
          mobileWidth && `w-[${mobileWidth}]`
        )}
        alt="powered-by-stripe"
      />
      <Image
        src={StripeDesktop}
        className={cn("hidden sm:block w-full object-fill", desktopWidth && `w-[${desktopWidth}]`)}
        alt="powered-by-stripe"
      />
    </>
  );
};

export default PoweredByStripe;
