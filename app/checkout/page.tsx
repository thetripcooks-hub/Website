"use client";
import MobilePageHeader from "@/components/ui/mobile-page-header";
import { cn, pounds } from "@/lib/utils";
import SampleCartIcon from "~/sample-cart-image.svg";
import Calendar from "../../components/icons/svg/calendar.svg";
import { useRouter } from "next/navigation";
import React from "react";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "@/app/home/_components/section-wrapper";
import useCartStore from "@/stores/cartStore";
import {
  Button,
  Card,
  Footer,
  Separator,
  SubcribeToNewsLetter,
} from "@/components/ui";
import Image from "next/image";
import dayjs from "dayjs";
import Reviews from "@/app/home/_components/reviews";
import MobileFloatingCard from "@/components/ui/mobile-floating-card";
import Link from "next/link";
import CheckoutPaymentType from "./_components/checkout-payment-type";
import PoweredByStripe from "@/components/ui/powered-by-stripe";
import { useHideNavOnMobile } from "@/hooks";
import { SAMPLE_CHECKOUT_URL } from "@/constants";

const Page = () => {
  const router = useRouter();
  const { trips, getTotalPrice } = useCartStore();
  const { ref, inView } = useInView();
  useHideNavOnMobile();


  return (
    <main className={cn("bg-white w-full")}>
      <div ref={ref}>
        <MobilePageHeader title="Checkout" />
        <div className="px-5 py=5 sm:pt-10 sm:pb-20 text-neutral-text sm:px-[8%]">
          <SectionWrapper>
            <h3 className="font-medium text-neutral-text leading-[39.01px] text-[32px] hidden sm:flex mb-5">
              Checkout
            </h3>
          </SectionWrapper>
          <SectionWrapper className="flex flex-col sm:flex-row justify-between gap-2.5 sm:gap-10">
            {/* mobile trip details */}
            <div className="w-full sm:w-1/2">
              <h3 className="sm:hidden text-[18px] leading-[21.94px] text-neutral-text">
                Trip Details
              </h3>
              <div className="flex sm:hidden flex-col gap-5">
                {trips.map((trip) => (
                  <div className="w-full flex justify-between" key={trip.id}>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-neutral-text text-[24px] leading-[29.26px] font-medium">
                        {trip.location}
                      </h3>
                      <p className="text-base leading-[19.5px]">
                        {dayjs(trip.startDate).format("MMM DD")} -{" "}
                        {dayjs(trip.endDate).format("MMM DD")},{" "}
                        {dayjs(trip.year).format("YYYY")}
                      </p>
                      <p className="text-[20px] leading-[24.38px] font-medium">
                        {pounds.format(trip.price * trip.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-5 sm:hidden" />
              <div className="flex flex-col gap-5">
                <h3 className="leading-[21.94px] text-[18px] text-neutral-text">
                  Breakdown of your trip
                </h3>
                <div className="flex flex-col gap-5">
                  {trips.length === 1 ? (
                    <div className="flex flex-col sm:flex-row gap-1 sm:justify-between sm:items-center">
                      <div className="flex gap-1">
                        <Image src={Calendar} alt="calendar" />
                        <p className="text-[16px] leading-[19.5px] text-neutral-text">
                          Travel dates
                        </p>
                      </div>
                      <p className="leading-[19.5px] text-[16px] text-neutral-subtext">
                        {dayjs(trips[0].startDate).format("MMM DD")} -{" "}
                        {dayjs(trips[0].endDate).format("MMM DD")},{" "}
                        {dayjs(trips[0].year).format("YYYY")}
                      </p>
                    </div>
                  ) : (
                    trips.map((trip) => (
                      <div
                        key={trip.id}
                        className="flex flex-col sm:flex-row gap-1 sm:justify-between sm:items-center"
                      >
                        <div className="flex gap-1">
                          <Image src={Calendar} alt="calendar" />
                          <p className="text-[16px] leading-[19.5px] text-neutral-text">
                            Trip to {trip.location}
                          </p>
                        </div>
                        <p className="leading-[19.5px] text-[16px] text-neutral-subtext">
                          {dayjs(trip.startDate).format("MMM DD")} -{" "}
                          {dayjs(trip.endDate).format("MMM DD")},{" "}
                          {dayjs(trip.year).format("YYYY")}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                <Separator />
                {/* payment type */}
                <CheckoutPaymentType />
                <Separator />

                {/* refund policy */}
                <div className="flex flex-col gap-5">
                  <h3 className="leading-[21.94px] text-[18px] text-neutral-text">
                    Refund policy{" "}
                  </h3>
                  <p className="text-neutral-subtext">
                    Refunds are subject to{" "}
                    <Link
                      href="/legal"
                      className="text-secondary-irish-green leading-[17.07px]"
                    >
                      terms and conditions.
                    </Link>{" "}
                  </p>
                </div>
                <Separator />

                <PoweredByStripe desktopWidth={391} />
              </div>
            </div>
            <Card className="hidden p-5 w-full sm:w-1/2 sm:max-w-[423px] h-fit shadow-none border-neutral-grey-300 gap-5 sm:flex flex-col">
              <h4 className="text-neutral-subtext text-base leading-[19.5px]">
                Trip details
              </h4>
              {trips.map((trip) => (
                <div className="w-full flex justify-between" key={trip.id}>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-neutral-text text-[24px] leading-[29.26px] font-medium">
                      {trip.location}
                    </h3>
                    <p className="text-base leading-[19.5px]">
                      {dayjs(trip.startDate).format("MMM DD")} -{" "}
                      {dayjs(trip.endDate).format("MMM DD")},{" "}
                      {dayjs(trip.year).format("YYYY")}
                    </p>
                    <p className="text-[20px] leading-[24.38px] font-medium">
                      {pounds.format(trip.price * trip.quantity)}
                    </p>
                  </div>
                  <Image
                    src={SampleCartIcon}
                    alt="selected-trip-image"
                    width={99}
                    height={99.07}
                    className="object-cover rounded-[3.32px]"
                  />
                </div>
              ))}
              <Separator />
              <div className="w-full flex flex-col justify-between gap-2">
                <h6 className="text-neutral-subtext text-[16px] leading-[19.5px] font-alexandria font-normal">
                  Total Price
                </h6>
                <h3 className="text-[#000000] font-semibold text-4xl leading-[43.88px]">
                  {pounds.format(getTotalPrice(trips))}
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full"
                  onClick={() => router.push(SAMPLE_CHECKOUT_URL)}
                >
                  Checkout and Pay
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => router.push("/cart")}
                >
                  Go to cart
                </Button>
              </div>
            </Card>
          </SectionWrapper>
        </div>
        {inView ? (
          <MobileFloatingCard>
            <div className="w-full flex flex-col justify-between gap-2">
              <h6 className="text-neutral-subtext text-[14px] leading-[17px] font-alexandria font-normal">
                Total Price{" "}
              </h6>
              <h3 className="text-[#000000] font-semibold text-2xl leading-[29.26px]">
                {pounds.format(getTotalPrice(trips))}
              </h3>
            </div>
            <div className="flex gap-2">
              <Button className="w-full h-[48px]">Checkout</Button>
              <Button
                className="w-full h-[48px]"
                variant="outline"
                onClick={() => router.push("/cart")}
              >
                Go to Cart
              </Button>
            </div>
          </MobileFloatingCard>
        ) : null}
      </div>
      <Reviews />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
