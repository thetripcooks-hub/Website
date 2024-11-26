import React from "react";
import SampleCartIcon from "~/sample-cart-image.svg";
import CartIcon from "~/img/cart.svg";
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
import { formatTripDate, pounds } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TripType } from "@/types/trip";
import useStripe from "@/hooks/payment/useStripe";
import EmptyCart from "@/app/cart/_components/empty-cart";

const Cart = () => {
  const {
    items: trips,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    getTotalPrice,
    showCart,
    setShowCart,
  } = useCartStore();
  const router = useRouter();
  const { handlePay, isPaying } = useStripe({
    items: trips,
  });

  const hasTrips = trips.length > 0;
  return (
    <DropdownMenu modal={false} open={showCart} onOpenChange={setShowCart}>
      <DropdownMenuTrigger asChild>
        <Image
          src={CartIcon}
          alt="cart-icon"
          className="cursor-pointer h-[32px] sm:h-[46px]"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="sm:max-w-[414px] shadow-none px-0 mr-2 z-[99]"
        onMouseLeave={() => {
          setShowCart(false);
        }}
      >
        {hasTrips ? (
          <>
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
                  loading={isPaying}
                  onClick={handlePay}
                  disabled={isPaying}
                >
                  Proceed to checkout
                </Button>
              </CardDescription>
            </CardHeader>
            <Separator />
          </>
        ) : null}

        {hasTrips ? (
          <>
            <div className="flex w-full justify-center my-4 items-center gap-1 text-neutral-text">
              <Image src={CashIn} alt="dollar-in" />
              <p className="text-[16px] leading-[19.5px] text-neutral-text">
                Installment payment available!
              </p>
            </div>
            <Separator />
          </>
        ) : null}
        <div className="py-5 px-4 w-full">
          {trips.length === 0 ? <EmptyCart isModal={true} /> : null}
          {hasTrips
            ? trips.slice(0, 2).map((trip) => {
                return (
                  <div key={trip.sys.id} className="w-full">
                    <div className="flex gap-2 py-2.5">
                      <Image
                        src={
                          trip.bannerImagesCollection.items[0].url ||
                          SampleCartIcon
                        }
                        width={168}
                        height={107}
                        className="rounded-[4.39px] w-[168px] h-[107px] object-cover"
                        alt="trip-image"
                      />
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
                              {formatTripDate(trip as TripType)}
                            </p>
                          </div>
                          <h1 className="text-[16px] leading-[19.5px] font-semibold">
                            {pounds.format(trip.downPayment)}
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
              })
            : null}
          {hasTrips ? (
            <div className="flex justify-center">
              <Link href="/cart" className="text-center w-fit underline">
                See all
              </Link>
            </div>
          ) : null}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Cart;
