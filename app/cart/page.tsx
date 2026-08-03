"use client";
import React from "react";
import { Check, Loader } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import useGeneralStore from "@/stores/generalStore";
import useStripe from "@/hooks/payment/useStripe";
import CartCard from "./_components/cart-card";
import EmptyCart from "./_components/empty-cart";
import UpcomingTrips from "@/app/home/_components/upcoming-trip";
import Faq from "@/app/home/_components/faq";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import { formatConvertedAmount } from "@/lib/utils";

const Page = () => {
  const { items, getTotalTripDeposit, hasHydrated } = useCartStore();
  const { selectedCurrency, rates } = useGeneralStore();
  const { handlePay, isPaying } = useStripe({ items });

  const total = getTotalTripDeposit(items, selectedCurrency, rates);
  const itemCount = items.length;

  return (
    <main className="bg-white dark:bg-background w-full">
      {!hasHydrated ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Loader className="text-secondary-irish-green animate-spin w-6 h-6" />
        </div>
      ) : items.length > 0 ? (
        <div className="px-5 sm:px-[109px] pt-7 pb-16">
          <h1 className="font-ogg-trial font-bold text-[40px] leading-[60px] text-[#1d2433] dark:text-foreground mb-[35px] hidden sm:block">
            Cart
          </h1>
          <h1 className="font-ogg-trial font-bold text-[40px] leading-[60px] text-[#1d2433] dark:text-foreground mb-[26px] sm:hidden">
            Cart
          </h1>

          {/* Desktop: 2-column layout */}
          <div className="hidden sm:flex gap-10 items-start">
            {/* Left: cart items */}
            <div className="flex flex-col gap-6 flex-1 min-w-0 max-w-[808px]">
              {items.map((trip) => (
                <CartCard key={trip.sys.id} trip={trip} />
              ))}
            </div>

            {/* Right: sticky checkout card */}
            <div className="w-[394px] shrink-0 sticky top-[120px]">
              <div className="bg-white dark:bg-background border border-[#eee] dark:border-border rounded-[8px] p-6 flex flex-col gap-[22px]">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[22px] leading-[33px] text-[#6c707a] dark:text-[#8C909B] max-w-[244px]">
                    Total ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </p>
                  <p className="font-medium text-[24px] leading-[36px] text-[var(--text-primary,#212121)] dark:text-foreground whitespace-nowrap">
                    {formatConvertedAmount(total, selectedCurrency)}
                  </p>
                </div>

                <button
                  onClick={() => handlePay(selectedCurrency)}
                  disabled={isPaying}
                  className="w-full h-[56px] bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7] hover:from-[#FA84F3] hover:to-[#FA93F4] transition-colors text-[#212121] font-medium text-[16px] leading-[24px] rounded-full disabled:opacity-70"
                >
                  {isPaying ? "Loading..." : "Checkout"}
                </button>

                <hr className="border-[#eee] dark:border-border" />

                <div className="flex flex-col gap-4">
                  <TrustBadge
                    title="No Hidden Costs"
                    description="All taxes and fees have been included to the final price"
                  />
                  <TrustBadge
                    title="Secure Payments"
                    description="Our payments are secured and powered by Stripe."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: stacked layout */}
          <div className="sm:hidden flex flex-col gap-4">
            {items.map((trip) => (
              <CartCard key={trip.sys.id} trip={trip} />
            ))}

            <div className="flex items-center justify-between mt-2">
              <p className="font-medium text-[22px] leading-[33px] text-[#6c707a] dark:text-[#8C909B]">
                Total ({itemCount} {itemCount === 1 ? "item" : "items"})
              </p>
              <p className="font-medium text-[24px] leading-[36px] text-[var(--text-primary,#212121)] dark:text-foreground whitespace-nowrap">
                {formatConvertedAmount(total, selectedCurrency)}
              </p>
            </div>

            <button
              onClick={() => handlePay(selectedCurrency)}
              disabled={isPaying}
              className="w-full h-[56px] bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7] hover:from-[#FA84F3] hover:to-[#FA93F4] transition-colors text-[#212121] font-medium text-[16px] leading-[24px] rounded-full disabled:opacity-70"
            >
              {isPaying ? "Loading..." : "Checkout"}
            </button>

            <hr className="border-[#eee] dark:border-border" />

            <div className="flex flex-col gap-4">
              <TrustBadge
                title="No Hidden Costs"
                description="All taxes and fees have been included to the final price"
              />
              <TrustBadge
                title="Secure Payments"
                description="Our payments are secured and powered by Stripe."
              />
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}

      <UpcomingTrips isCart={true} />
      <Faq />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

const TrustBadge = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex gap-[7px] items-start">
    <div className="size-6 flex items-center justify-center shrink-0 mt-0.5">
      <Check
        size={20}
        strokeWidth={2.5}
        className="text-[var(--text-primary,#212121)] dark:text-foreground"
      />
    </div>
    <div className="flex flex-col gap-[7px]">
      <p className="font-medium text-[16px] leading-[24px] text-[var(--text-primary,#212121)] dark:text-foreground whitespace-nowrap">
        {title}
      </p>
      <p className="font-normal text-[14px] leading-[22px] text-[#6c707a] dark:text-[#8C909B]">
        {description}
      </p>
    </div>
  </div>
);

export default Page;
