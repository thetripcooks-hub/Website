import React from "react";
import dayjs from "dayjs";
import SampleCartIcon from "../../public/sample-cart-image.svg";
import CartIcon from "../../public/img/cart.svg";
import CashIn from "../../components/icons/svg/cash-in.svg";
import Calendar from "../../components/icons/svg/calendar.svg";
import MinusIcon from "../../components/icons/svg/minus.svg";
import PlusIcon from "../../components/icons/svg/plus.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { CardDescription, CardHeader, CardTitle } from "./card";
import { Separator } from "./separator";
import useCartStore from "@/stores/cartStore";
import { pounds } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Cart = () => {
  const {
    trips,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCartStore();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={CartIcon}
          alt="cart-icon"
          className="cursor-pointer h-[32px] sm:h-[46px]"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:max-w-[414px] shadow-none px-0">
        <CardHeader className="p-5">
          <CardTitle className="text-[16px] leading-[19.5px] font-medium">
            Total Price:{" "}
            <span className="font-bold">
              {pounds.format(getTotalPrice(trips))}
            </span>
          </CardTitle>
          <CardDescription className="flex gap-4 py-2">
            <Button
              variant="outline"
              onClick={() => router.push("/cart")}
              className="max-w-[179px] w-full border-[#020E0B] h-[44.5px] px-1 text-foreground"
            >
              View Cart{" "}
            </Button>
            <Button
              className="max-w-[179px] w-full h-[44.5px] px-2 min-w-min"
              onClick={() => router.push("/checkout")}
            >
              Proceed to checkout
            </Button>
          </CardDescription>
        </CardHeader>

        <Separator />
        <div className="flex w-full justify-center my-4 items-center gap-1 text-neutral-text">
          <Image src={CashIn} alt="dollar-in" />
          <p className="text-[16px] leading-[19.5px] text-neutral-text">
            Installment payment available!
          </p>
        </div>
        <Separator />
        <div className="py-5 px-4 w-full">
          {trips.map((trip) => {
            return (
              <div key={trip.id} className="w-full">
                <div className="flex gap-2 py-2.5">
                  <Image src={trip.image || SampleCartIcon} alt="trip-image" />
                  <div className="flex flex-col justify-between">
                    <>
                      <div className="flex w-full justify-between items-center">
                        <h3 className="leading-[17.07px] font-medium text-[14px]">
                          {trip.location}
                        </h3>
                      </div>
                      <div className="flex items-center">
                        <Image
                          src={Calendar}
                          alt="calendar"
                          width={20}
                          height={20}
                        />
                        <p className="leading-[17.07px] text-[14px]">
                          {dayjs(trip.startDate).format("MMM DD")}
                          {" - "}
                          {dayjs(trip.endDate).format("MMM DD")}
                          {", "}
                          {dayjs(trip.year).format("YYYY")}
                        </p>
                      </div>
                      <h1 className="text-[16px] leading-[19.5px] font-semibold">
                        {pounds.format(trip.price)}
                      </h1>
                      <div className="flex items-center gap-2.5 text-neutral-text leading-[17.07px] text-[14px]">
                        Slots
                        <div className="w-fit flex gap-1 items-center align-middle border border-solid border-neutral-grey-300 rounded-[4px] text-[16px] leading-[19.5px]">
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
                        </div>
                      </div>
                    </>

                    <p
                      className="cursor-pointer text-secondary-irish-green leading-[17.07px] text-[14px] font-normal"
                      onClick={() => removeFromCart(trip)}
                    >
                      Remove from cart
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Cart;
