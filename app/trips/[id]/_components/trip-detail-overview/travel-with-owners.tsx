"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import React from "react";

const TravelWithOwners = () => {
  const router = useRouter();
  return (
    <div className="border border-y-neutral-grey-300 border-x-0 py-5 flex gap-2.5 my-5 items-center">
      <div className="flex relative w-[54px]">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            height={54}
            width={54}
          />
          <AvatarFallback>O</AvatarFallback>
        </Avatar>
        <Avatar className="absolute left-[16px]">
          <AvatarImage
            src="https://github.com/shadcn.png"
            height={54}
            width={54}
          />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
      </div>
      <div onClick={() => router.push("/about")} className="cursor-pointer">
        <h6 className="text-[#000000] text-[16px] leading-[19.5px]">
          Travel with Ovie and Lanre
        </h6>
        <p className="leading-[17.07px] text-[14px] text-neutral-grey-500">
          For the whole trip
        </p>
      </div>
    </div>
  );
};

export default TravelWithOwners;
