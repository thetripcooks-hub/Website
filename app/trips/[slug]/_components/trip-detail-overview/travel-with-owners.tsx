"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGeneralStore from "@/stores/generalStore";
import { useRouter } from "next/navigation";
import React from "react";

const TravelWithOwners = () => {
  const router = useRouter();
  const { about } = useGeneralStore();
  return (
    <div className="flex gap-[11px] items-center">
      <div className="flex relative shrink-0">
        <Avatar className="w-[54px] h-[54px]">
          <AvatarImage
            src={about[0]?.ownersPicture?.url ?? ""}
            height={54}
            width={54}
            className="object-cover"
          />
          <AvatarFallback>O&L</AvatarFallback>
        </Avatar>
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
