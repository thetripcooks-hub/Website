"use client";
import { formatTripDate, pounds } from "@/lib/utils";
// import SampleCartIcon from "~/sample-cart-image.svg";
import Calendar from "@/components/icons/svg/calendar.svg";
import CalendarDark from "@/components/icons/svg/calendar-dark.svg";
import MinusIcon from "@/components/icons/svg/minus.svg";
import MinusIconDark from "@/components/icons/svg/minus-dark.svg";
import PlusIcon from "@/components/icons/svg/plus.svg";
import PlusIconDark from "@/components/icons/svg/plus-dark.svg";
import useCartStore from "@/stores/cartStore";

import Image from "next/image";
import React from "react";
import { TripType } from "@/types/trip";
import { CartItem } from "@/types/cart";

const CardCard = ({ trip }: { trip: CartItem }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } =
    useCartStore();
  return (
    <div className="w-full">
      <div className="flex gap-2 py-2.5 w-full">
        <Image
          src={trip.bannerImagesCollection.items[0].url}
          width={168}
          height={118}
          alt="trip-image"
          className="rounded-[4.39px] object-cover max-h-[188px]"
        />
        <div className="flex flex-col justify-between w-full dark:text-foreground">
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between items-center">
              <h3 className="leading-[17.07px] font-medium text-[14px]">
                {trip.location}
              </h3>

              {/* <div className="w-fit flex gap-1 items-center align-middle border border-solid border-neutral-grey-300 rounded-[4px] text-[16px] leading-[19.5px]">
                <Image
                  src={MinusIcon}
                  alt="minus-icon"
                  className="cursor-pointer"
                  onClick={() => decrementQuantity(trip)}
                />
                {trip.quantity}
                <Image
                  src={PlusIcon}
                  alt="plus-icon"
                  className="cursor-pointer"
                  onClick={() => incrementQuantity(trip)}
                />
              </div> */}
              <div className="sm:flex items-center gap-2.5 text-neutral-text leading-[17.07px] text-[14px] hidden dark:text-foreground">
                Slots
                <div className="w-fit flex gap-1 items-center align-middle border border-solid border-neutral-grey-300 rounded-[4px] text-[16px] leading-[19.5px]">
                  <Image
                    src={MinusIcon}
                    alt="minus-icon"
                    className="cursor-pointer dark:hidden"
                    onClick={() => decrementQuantity(trip)}
                  />
                  <Image
                    src={MinusIconDark}
                    alt="minus-icon"
                    className="cursor-pointer hidden dark:block"
                    onClick={() => decrementQuantity(trip)}
                  />
                  {trip.quantity}
                  <Image
                    src={PlusIcon}
                    alt="plus-icon"
                    className="cursor-pointer dark:hidden"
                    onClick={() => incrementQuantity(trip)}
                  />
                  <Image
                    src={PlusIconDark}
                    alt="plus-icon"
                    className="cursor-pointer dark:block"
                    onClick={() => incrementQuantity(trip)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={Calendar}
                alt="calendar"
                width={20}
                height={20}
                className="dark:hidden"
              />
              <Image
                src={CalendarDark}
                alt="calendar"
                width={20}
                height={20}
                className="hidden dark:block"
              />
              <p className="leading-[17.07px] text-[14px] dark:text-[#BFC0C2]">
                {formatTripDate(trip as TripType)}
              </p>
            </div>
            <h1 className="text-[16px] leading-[19.5px] font-semibold">
              {pounds.format(trip.downPayment)}
            </h1>
            <div className="flex items-center gap-2.5 text-neutral-text leading-[17.07px] text-[14px] sm:hidden dark:text-foreground">
              Slots
              <div className="w-fit flex gap-1 items-center align-middle border border-solid border-neutral-grey-300 rounded-[4px] text-[16px] leading-[19.5px]">
                <Image
                  src={MinusIcon}
                  alt="minus-icon"
                  className="cursor-pointer dark:hidden"
                  onClick={() => decrementQuantity(trip)}
                />
                <Image
                  src={MinusIconDark}
                  alt="minus-icon"
                  className="cursor-pointer dark:hidden"
                  onClick={() => decrementQuantity(trip)}
                />
                {trip.quantity}
                <Image
                  src={PlusIcon}
                  alt="plus-icon"
                  className="cursor-pointer dark:hidden"
                  onClick={() => incrementQuantity(trip)}
                />
                <Image
                  src={PlusIconDark}
                  alt="plus-icon"
                  className="cursor-pointer dark:hidden"
                  onClick={() => incrementQuantity(trip)}
                />
              </div>
            </div>
          </div>

          <p
            className="cursor-pointer text-secondary-irish-green leading-[17.07px] text-[14px] font-alexandria"
            onClick={() => removeFromCart(trip)}
          >
            Remove from cart
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardCard;
