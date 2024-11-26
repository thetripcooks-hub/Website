"use client";
import ComingSoonBadge from "@/app/home/_components/coming-soon-badge";
import { pounds, formatTripDate, percentage } from "@/lib/utils";
import { CartItem } from "@/types/cart";
import { TripType } from "@/types/trip";
import Image from "next/image";
import React from "react";
import img from "~/img/private-trip.svg";
import CartIcon from "~/img/shopping-cart.svg";

const TripCard = ({
  handleClick,
  handleAddToCart,
  item,
}: {
  handleClick: () => void;
  handleAddToCart: () => void;
  item: CartItem;
}) => {
  return (
    <div>
      <div className="text-foreground cursor-pointer hidden sm:flex sm:flex-col relative">
        {item.soldOut ? (
          <div className="absolute right-3 top-3">
            <ComingSoonBadge text="Sold Out" />
          </div>
        ) : (
          <div
            className="bg-[#020E0B4D] rounded-full w-8 h-8 flex items-center justify-center absolute right-3 top-3"
            onClick={() => {
              if (!item.soldOut) {
                handleAddToCart();
              }
            }}
          >
            <Image src={CartIcon} width={18} height={18} alt="cart-icon" />
          </div>
        )}
        <Image
          src={item.bannerImagesCollection.items[0].url}
          alt="img"
          priority
          className="rounded-[18px] w-full sm:w-[291px]  object-cover lg:w-full h-[301px]"
          width={291}
          height={301}
          onClick={handleClick}
        />
        <div className="flex flex-col gap-1 mt-2.5">
          <h5 className="text-lg">{item.location}</h5>
          <p className="text-sm text-neutral-grey-500">
            {formatTripDate(item)}
          </p>
          <div className="flex gap-1 items-center">
            {item.discount && (
              <h3 className="font-medium text-xl text-neutral-grey-500 line-through">
                {pounds.format(item.fullAmount)}
              </h3>
            )}
            <h3 className="font-medium text-xl">
              {item.discount
                ? pounds.format(
                    item.fullAmount - percentage(item.discount, item.fullAmount)
                  )
                : pounds.format(item.fullAmount)}
            </h3>
          </div>
        </div>
      </div>

      <div className="text-foreground cursor-pointer sm:hidden relative">
        {item.soldOut ? (
          <div className="absolute right-3 top-3">
            <ComingSoonBadge text="Sold Out" />
          </div>
        ) : (
          <div
            className="bg-[#020E0B4D] rounded-full w-8 h-8 flex items-center justify-center absolute right-3 top-3"
            onClick={() => {
              if (!item.soldOut) {
                handleAddToCart();
              }
            }}
          >
            <Image src={CartIcon} width={18} height={18} alt="cart-icon" />
          </div>
        )}
        <Image
          src={item.bannerImagesCollection.items[0].url}
          alt="img"
          className="rounded-[18px] w-full sm:w-[291px]  object-cover lg:w-full h-[301px]"
          width={291}
          height={301}
          onClick={handleClick}
        />
        <div className="flex flex-col gap-1 mt-2.5">
          <h5 className="text-lg">{item.location}</h5>
          <p className="text-sm text-neutral-grey-500">
            {formatTripDate(item)}
          </p>
          <div className="flex gap-1 items-center">
            {item.discount && (
              <h3 className="font-medium text-xl text-neutral-grey-500 line-through">
                {pounds.format(item.fullAmount)}
              </h3>
            )}
            <h3 className="font-medium text-xl">
              {item.discount
                ? pounds.format(
                    item.fullAmount - percentage(item.discount, item.fullAmount)
                  )
                : pounds.format(item.fullAmount)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
