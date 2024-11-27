"use client";
import type Stripe from "stripe";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "@/types/cart";
import { useState } from "react";
import { toast } from "sonner";
import useTripStore from "@/stores/trip-store";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const useStripe = ({
  items,
  success_url,
  cancel_url,
}: {
  items: CartItem[];
  success_url?: string;
  cancel_url?: string;
}) => {
  const { trips } = useTripStore();
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);

  const handlePay = async () => {
    const updatedItems = items.map((item) => {
      const foundItem = trips.find((x) => x.sys.id === item.sys.id);
      if (foundItem) {
        return { ...item, ...foundItem };
      }
      return item;
    });
    const formattedPayload: Stripe.Checkout.SessionCreateParams.LineItem[] =
      updatedItems
        ?.filter((trip) => !trip.soldOut)
        ?.map((trip) => ({
          price_data: {
            currency: "GBP",
            product_data: {
              name: trip.location,
              images:
                trip.bannerImagesCollection?.items?.map((image) => image.url) ??
                [],
            },
            unit_amount: trip.downPayment * 100,
          },
          quantity: trip.quantity,
          adjustable_quantity: {
            enabled: true,
          },
        }));
    try {
      if (isPaying) return;
      setIsPaying(true);
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        body: JSON.stringify({
          lineItems: formattedPayload,
          success_url,
          cancel_url,
        }),
      });

      if (!response.ok) {
        setIsPaying(false);
        throw new Error("Payment failed");
      }

      const { url } = await response.json();
      router.push(url);
    } catch (err) {
      setIsPaying(false);
      toast.error(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setIsPaying(false);
    }
  };

  return {
    isPaying,
    handlePay,
  };
};

export default useStripe;
