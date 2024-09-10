"use client";
import Image from "next/image";
import React from "react";
import img from "../../public/img/private-trip.svg";
import CartIcon from "../../public/img/shopping-cart.svg";

const TripCard = ({ isDiscounted = false }: { isDiscounted?: boolean }) => {
  return (
    <div>
      <div className="text-foreground cursor-pointer hidden sm:flex sm:flex-col relative">
        <div className="bg-[#020E0B4D] rounded-full w-8 h-8 flex items-center justify-center absolute right-3 top-3">
          <Image src={CartIcon} width={18} height={18} alt="cart-icon" />
        </div>
        <Image
          src={img}
          alt="img"
          className="rounded-[18px] w-full sm:w-[291px]  object-cover lg:w-full h-[301px]"
          width={291}
          height={301}
        />
        <div className="flex flex-col gap-1 mt-2.5">
          <h5 className="text-lg">Athens Greece</h5>
          <p className="text-sm text-neutral-grey-500">Aug 15th, 2024</p>
          <div className="flex gap-1 items-center">
            {isDiscounted && (
              <h3 className="font-medium text-xl text-neutral-grey-500 line-through">
                $6500
              </h3>
            )}
            <h3 className="font-medium text-xl">$5,000</h3>
          </div>
        </div>
      </div>

      <div className="text-foreground cursor-pointer sm:hidden relative">
        <div className="bg-[#020E0B4D] rounded-full w-8 h-8 flex items-center justify-center absolute right-3 top-3">
          <Image src={CartIcon} width={18} height={18} alt="cart-icon" />
        </div>
        <Image
          src={img}
          alt="img"
          className="rounded-[18px] w-full sm:w-[291px]  object-cover lg:w-full h-[301px]"
          width={291}
          height={301}
        />
        <div className="flex flex-col gap-1 mt-2.5">
          <h5 className="text-lg">Athens Greece</h5>
          <p className="text-sm text-neutral-grey-500">Aug 15th, 2024</p>
          <div className="flex gap-1 items-center">
            {isDiscounted && (
              <h3 className="font-medium text-xl text-neutral-grey-500 line-through">
                $6500
              </h3>
            )}
            <h3 className="font-medium text-xl">$5,000</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
