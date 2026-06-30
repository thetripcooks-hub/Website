"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import useGeneralStore from "@/stores/generalStore";
import useStripe from "@/hooks/payment/useStripe";
import { formatTripDate } from "@/lib/utils";
import { TripType } from "@/types/trip";

const DISMISS_DELAY = 2500;
const FADE_DURATION = 300;

const CartToastBanner = () => {
  const { lastAddedItem, setLastAddedItem, items, incrementQuantity, decrementQuantity } =
    useCartStore();
  const { selectedCurrency } = useGeneralStore();
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { handlePay, isPaying } = useStripe({ items });

  const currentItem = lastAddedItem
    ? items.find((i) => i.sys.id === lastAddedItem.sys.id)
    : null;
  const lastItemRef = useRef<NonNullable<typeof currentItem> | null>(null);
  const visible = !!lastAddedItem && !!currentItem;

  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      const id = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(id);
    }
    setShow(false);
    const t = setTimeout(() => setMounted(false), FADE_DURATION);
    return () => clearTimeout(t);
  }, [visible]);

  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setLastAddedItem(null), DISMISS_DELAY);
  };

  const pauseTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (visible) startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const dismiss = () => {
    pauseTimer();
    setLastAddedItem(null);
  };

  const handleGoToCart = () => {
    dismiss();
    router.push("/cart");
  };

  const handleCheckout = () => {
    dismiss();
    handlePay(selectedCurrency);
  };

  if (currentItem) lastItemRef.current = currentItem;
  const displayItem = currentItem ?? lastItemRef.current;

  if (!mounted || !displayItem) return null;

  const imageUrl = displayItem.bannerImagesCollection.items[0]?.url;
  const dateRange = formatTripDate(displayItem as unknown as TripType);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] bg-[#dcfae6] transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onPointerEnter={pauseTimer}
      onPointerLeave={startTimer}
    >
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between w-full px-[109px] py-[22px] gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <CheckCircle2 className="text-[#09af0d] shrink-0" size={36} />
          <span className="font-medium text-[22px] leading-[33px] text-[#053321] whitespace-nowrap font-plus-jakarta-sans">
            Added to Cart
          </span>
        </div>

        <div className="flex items-center gap-4 flex-1 min-w-0">
          {imageUrl && (
            <div className="relative rounded-[7.984px] size-[55px] shrink-0 overflow-hidden">
              <Image src={imageUrl} alt={displayItem.location} fill className="object-cover" />
            </div>
          )}
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-medium text-[20px] leading-[30px] text-[#053321] whitespace-nowrap font-plus-jakarta-sans">
              {displayItem.location}
            </span>
            <span className="text-[14px] leading-[21px] text-[#9e9e9e] font-plus-jakarta-sans">
              {dateRange}
            </span>
          </div>
          <div className="flex items-center gap-[18px] bg-[#02231a] rounded-full px-4 py-[10px] shrink-0">
            <span className="font-medium text-[14px] leading-[21px] text-white font-plus-jakarta-sans">
              Spots
            </span>
            <div className="flex items-center gap-[15px]">
              <button
                onClick={() => decrementQuantity(displayItem)}
                className="size-6 flex items-center justify-center text-white"
                aria-label="Decrease spots"
              >
                <Minus size={15} strokeWidth={2} />
              </button>
              <span className="font-medium text-[16px] leading-[24px] text-white font-plus-jakarta-sans">
                {displayItem.quantity}
              </span>
              <button
                onClick={() => incrementQuantity(displayItem)}
                className="size-6 flex items-center justify-center text-white"
                aria-label="Increase spots"
              >
                <Plus size={15} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={handleGoToCart}
            className="border border-[#09af0d] text-[#09af0d] font-medium text-[16px] leading-[24px] rounded-full px-4 py-4 w-[182px] text-center font-plus-jakarta-sans hover:bg-[#09af0d]/5 transition-colors"
          >
            Go to Cart
          </button>
          <button
            onClick={handleCheckout}
            disabled={isPaying}
            className="bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7] text-[#212121] font-medium text-[16px] leading-[24px] rounded-full px-4 py-4 w-[182px] text-center font-plus-jakarta-sans disabled:opacity-70"
          >
            {isPaying ? "Loading..." : "Checkout"}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden px-4 py-[22px] flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-[#09af0d] shrink-0" size={24} />
          <span className="font-medium text-[16px] leading-[24px] text-[#053321] font-plus-jakarta-sans">
            Added to Cart
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-start">
            {imageUrl && (
              <div className="relative rounded-[7.984px] size-[55px] shrink-0 overflow-hidden">
                <Image src={imageUrl} alt={displayItem.location} fill className="object-cover" />
              </div>
            )}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-[20px] leading-[30px] text-[#053321] font-plus-jakarta-sans">
                  {displayItem.location}
                </span>
                <span className="text-[14px] leading-[21px] text-[#9e9e9e] font-plus-jakarta-sans">
                  {dateRange}
                </span>
              </div>
              <div className="flex items-center gap-[18px] bg-[#02231a] rounded-full px-2 py-2 w-fit">
                <div className="flex items-center gap-[15px]">
                  <button
                    onClick={() => decrementQuantity(displayItem)}
                    className="size-[18px] flex items-center justify-center text-white"
                    aria-label="Decrease spots"
                  >
                    <Minus size={11} strokeWidth={2} />
                  </button>
                  <span className="font-medium text-[14px] leading-[21px] text-white font-plus-jakarta-sans">
                    {displayItem.quantity}
                  </span>
                  <button
                    onClick={() => incrementQuantity(displayItem)}
                    className="size-[18px] flex items-center justify-center text-white"
                    aria-label="Increase spots"
                  >
                    <Plus size={11} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleGoToCart}
              className="border border-[#09af0d] text-[#09af0d] font-medium text-[16px] leading-[24px] rounded-full px-4 py-4 w-full text-center font-plus-jakarta-sans"
            >
              Go to Cart
            </button>
            <button
              onClick={handleCheckout}
              disabled={isPaying}
              className="bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7] text-[#212121] font-medium text-[16px] leading-[24px] rounded-full px-4 py-4 w-full text-center font-plus-jakarta-sans disabled:opacity-70"
            >
              {isPaying ? "Loading..." : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartToastBanner;
