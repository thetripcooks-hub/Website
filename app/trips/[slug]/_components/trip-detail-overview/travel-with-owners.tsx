"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TravelWithOwners = () => {
  const router = useRouter();
  return (
    <div className="flex gap-[11px] items-center">
      <div className="flex relative shrink-0 w-[54px] h-[54px] rounded-full overflow-hidden">
        <Image
          src="/img/tripcooks-submark-lavender.png"
          alt="Trip Cooks"
          fill
          className="object-cover"
        />
      </div>
      <div onClick={() => router.push("/about")} className="cursor-pointer flex flex-col gap-[5px]">
        <p className="text-[16px] font-medium leading-[24px] text-[hsl(var(--text-primary))]">
          Travel with Ovie and Lanre
        </p>
        <p className="text-[14px] leading-[22px] text-[hsl(var(--text-secondary))]">
          For the whole trip
        </p>
      </div>
    </div>
  );
};

export default TravelWithOwners;
