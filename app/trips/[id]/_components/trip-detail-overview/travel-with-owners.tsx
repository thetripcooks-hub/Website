"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGeneralStore from "@/stores/generalStore";
import useTripStore from "@/stores/trip-store";
import { useRouter } from "next/navigation";
import React from "react";

const TravelWithOwners = () => {
  const router = useRouter();
  const { about } = useGeneralStore();
  return (
    <div className="border border-y-neutral-grey-300 border-x-0 py-5 flex gap-2.5 my-5 items-center">
      <div className="flex relative">
        <Avatar>
          <AvatarImage
            src={about[0]?.ownersPicture?.url ?? ""}
            height={54}
            width={54}
            className="object-cover"
          />
          <AvatarFallback>O&L</AvatarFallback>
        </Avatar>
        {/* <Avatar className="absolute left-[16px] hidden sm:block">
          <AvatarImage src={} height={54} width={54} />
          <AvatarFallback>L</AvatarFallback>
        </Avatar> */}
      </div>
      <div onClick={() => router.push("/about")} className="cursor-pointer">
        <h6 className="text-[#000000] text-[16px] leading-[19.5px] dark:text-[#BFC0C2]">
          Travel with Ovie and Lanre
        </h6>
        <p className="leading-[17.07px] text-[14px] text-neutral-grey-500 dark:text-[#BFC0C2]">
          For the whole trip
        </p>
      </div>
    </div>
  );
};

export default TravelWithOwners;
