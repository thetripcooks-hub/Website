"use client";
import MobilePageHeader from "@/components/ui/mobile-page-header";
import { cn, pounds } from "@/lib/utils";
import React from "react";
import UpcomingTrips from "@/app/home/_components/upcoming-trip";
import { Button, Card, Footer, SubcribeToNewsLetter } from "@/components/ui";
import CardCard from "./_components/cart-card";
import useCartStore from "@/stores/cartStore";
import SectionWrapper from "@/app/home/_components/section-wrapper";
// import PoweredByStrip from "@/components/ui/powered-by-stripe";
import { useInView } from "react-intersection-observer";
import MobileFloatingCard from "@/components/ui/mobile-floating-card";
import { useHideNavOnMobile } from "@/hooks";
import useStripe from "@/hooks/payment/useStripe";
import EmptyCart from "./_components/empty-cart";
import useTripStore from "@/stores/trip-store";
import { Loader } from "lucide-react";

const Page = () => {
  const { items, getTripDeposit, getTotalTripDeposit } = useCartStore();
  const { loading } = useTripStore();
  const { ref, inView } = useInView();
  useHideNavOnMobile();

  const { handlePay, isPaying } = useStripe({ items });

  return (
    <main className={cn("bg-white w-full")}>
      <div ref={ref}>
        <MobilePageHeader title="My cart" showCartBtn={false} />
        <div className="px-5 py=5 sm:pt-10 sm:pb-20 text-neutral-text sm:px-[8%]">
          <SectionWrapper>
            <h3 className="font-medium text-neutral-text leading-[39.01px] text-[32px] hidden sm:flex mb-5">
              My Cart
            </h3>
          </SectionWrapper>
          {loading ? (
            <div className="w-full h-[150px] flex justify-center items-center">
              <Loader className="text-secondary-irish-green animate-spin w-5 h-5" />
            </div>
          ) : items.length > 0 ? (
            <SectionWrapper className="flex flex-col sm:flex-row justify-between gap-2.5 sm:gap-10">
              <div className="w-full sm:w-1/2">
                {items.map((trip) => (
                  <CardCard key={trip.sys.id} trip={trip} />
                ))}
              </div>
              <Card className="hidden p-5 w-full sm:w-1/2 sm:max-w-[423px] h-fit shadow-none border-neutral-grey-300 gap-5 sm:flex flex-col">
                {items.map((trip) => (
                  <div
                    className="w-full flex justify-between"
                    key={trip.sys.id}
                  >
                    <h6 className="text-neutral-subtext text-[16px] leading-[19.5px] font-alexandria font-normal max-w-[192px]">
                      Deposit for trip to {trip.location} ({trip.quantity} slot
                      {trip.quantity > 1 ? "s" : ""})
                    </h6>
                    <h3 className="text-[#000000] font-semibold text-2xl leading-[29.26px]">
                      {pounds.format(getTripDeposit(trip))}{" "}
                    </h3>
                  </div>
                ))}
                <div className="w-full flex justify-between">
                  <h6 className="text-neutral-subtext text-[16px] leading-[19.5px] font-alexandria font-normal">
                    Est. total
                  </h6>
                  <h3 className="text-[#000000] font-semibold text-2xl leading-[29.26px]">
                    {pounds.format(getTotalTripDeposit(items))}
                  </h3>
                </div>
                <Button
                  className="w-full"
                  type="submit"
                  role="link"
                  loading={isPaying}
                  onClick={handlePay}
                  disabled={isPaying}
                >
                  Proceed to checkout
                </Button>
                {/* <PoweredByStrip /> */}
              </Card>
              {items.length > 0 ? (
                <div className="my-4 sm:my-0 flex sm:hidden flex-col gap-3">
                  <div className="flex flex-col gap-3 text-[14px] leading-[17.07px] font-alexandria">
                    <h3 className="font-medium text-black">Cart breakdown</h3>
                    {items.map((trip) => (
                      <div key={trip.sys.id} className="flex justify-between">
                        <h6 className="max-w-[192px] text-neutral-subtext">
                          Deposit for trip to {trip.location} ({trip.quantity}{" "}
                          slots)
                        </h6>
                        <h3 className="text-[#000000] font-semibold text-[20px] leading-[24.38px]">
                          {pounds.format(getTripDeposit(trip))}
                        </h3>
                      </div>
                    ))}
                  </div>
                  {/* <PoweredByStrip /> */}
                </div>
              ) : null}
            </SectionWrapper>
          ) : (
            <EmptyCart />
          )}
        </div>
        {inView && items.length > 0 ? (
          <MobileFloatingCard>
            <div className="w-full flex items-end justify-between gap-2 mb-2">
              <h6 className="text-neutral-subtext text-[14px] leading-[17px] font-alexandria font-normal">
                Est. total
              </h6>
              <h3 className="text-[#000000] font-semibold text-2xl leading-[29.26px]">
                {pounds.format(getTotalTripDeposit(items))}
              </h3>
            </div>
            {/* <Separator />
            <div className="w-full flex flex-col justify-between gap-2">
              <h6 className="text-neutral-subtext text-[16px] leading-[19.5px] font-alexandria font-normal">
                Or 3 payments starting at{" "}
              </h6>
              <h3 className="text-[#000000] font-semibold text-2xl leading-[29.26px]">
                {pounds.format(getTotalPrice(trips) / 3)}
              </h3>
            </div> */}
            <Button loading={isPaying} onClick={handlePay} disabled={isPaying}>
              Proceed to checkout
            </Button>
          </MobileFloatingCard>
        ) : null}
      </div>
      <UpcomingTrips isCart={true} />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
