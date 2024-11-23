"use client";
import MobilePageHeader from "@/components/ui/mobile-page-header";
import { cn, pounds } from "@/lib/utils";
import React from "react";
import UpcomingTrips from "@/app/home/_components/upcoming-trip";
import { Button, Card, Footer, SubcribeToNewsLetter } from "@/components/ui";
import CardCard from "./_components/cart-card";
import useCartStore from "@/stores/cartStore";
import SectionWrapper from "@/app/home/_components/section-wrapper";
import PoweredByStrip from "@/components/ui/powered-by-stripe";
import { useInView } from "react-intersection-observer";
import MobileFloatingCard from "@/components/ui/mobile-floating-card";
import { useRouter } from "next/navigation";
import { useHideNavOnMobile } from "@/hooks";
import { SAMPLE_CHECKOUT_URL } from "@/constants";
import { loadStripe } from "@stripe/stripe-js";
import type Stripe from "stripe";
import useTripStore from "@/stores/trip-store";


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Page = () => {
  const router = useRouter();
  const { trips, getTripDeposit, getTotalTripDeposit } = useCartStore();
  const { ref, inView } = useInView();
  useHideNavOnMobile();

  const { trips: realTrips } = useTripStore();

  const handleSubmit = async () => {
    const formattedPayload: Stripe.Checkout.SessionCreateParams.LineItem[] =
      realTrips?.map((trip) => ({
        price_data: {
          currency: "GBP",
          product_data: {
            name: trip.location,
            images:
              trip.bannerImagesCollection?.items?.map((image) => image.url) ??
              [],
          },
          unit_amount: trip.fullAmount, // Convert to cents
        },
        quantity: trip.slots || 1,
        adjustable_quantity: {
          enabled: true,
        },
      }));
    try {
      // Create PaymentIntent on the server
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedPayload),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }
    } catch (err) {
      console.log(err instanceof Error ? err.message : "Payment failed");
    } finally {
      // setLoading(false);
    }
  };

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
          <SectionWrapper className="flex flex-col sm:flex-row justify-between gap-2.5 sm:gap-10">
            <div className="w-full sm:w-1/2">
              {trips.map((trip) => (
                <CardCard key={trip.id} trip={trip} />
              ))}
            </div>
            <Card className="hidden p-5 w-full sm:w-1/2 sm:max-w-[423px] h-fit shadow-none border-neutral-grey-300 gap-5 sm:flex flex-col">
              {trips.map((trip) => (
                <div className="w-full flex justify-between" key={trip.id}>
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
                  {pounds.format(getTotalTripDeposit(trips))}
                </h3>
              </div>
              <Button
                className="w-full"
                type="submit"
                role="link"
                onClick={handleSubmit}
              >
                Proceed to checkout
              </Button>
              <PoweredByStrip />
            </Card>
            <div className="my-4 sm:my-0 flex sm:hidden flex-col gap-3">
              <div className="flex flex-col gap-3 text-[14px] leading-[17.07px] font-alexandria">
                <h3 className="font-medium text-black">Cart breakdown</h3>
                {trips.map((trip) => (
                  <div key={trip.id} className="flex justify-between">
                    <h6 className="max-w-[192px] text-neutral-subtext">
                      Deposit for trip to {trip.location} ({trip.quantity}{" "}
                      guests)
                    </h6>
                    <h3 className="text-[#000000] font-semibold text-[20px] leading-[24.38px]">
                      {pounds.format(getTripDeposit(trip))}
                    </h3>
                  </div>
                ))}
              </div>
              <PoweredByStrip />
            </div>
          </SectionWrapper>
        </div>
        {inView ? (
          <MobileFloatingCard>
            <div className="w-full flex items-end justify-between gap-2 mb-2">
              <h6 className="text-neutral-subtext text-[14px] leading-[17px] font-alexandria font-normal">
                Est. total
              </h6>
              <h3 className="text-[#000000] font-semibold text-2xl leading-[29.26px]">
                {pounds.format(getTotalTripDeposit(trips))}
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
            <Button onClick={() => router.push(SAMPLE_CHECKOUT_URL)}>
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
