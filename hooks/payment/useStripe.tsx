"use client";
import type Stripe from "stripe";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "@/types/cart";

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
  const router = useRouter();

  const handlePay = async () => {
    const formattedPayload: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items?.map((trip) => ({
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
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        body: JSON.stringify({
          lineItems: formattedPayload,
          success_url,
          cancel_url,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const { url } = await response.json();
      router.push(url);
    } catch (err) {
      console.log(err instanceof Error ? err.message : "Payment failed");
    } finally {
      // setLoading(false);
    }
  };

  return {
    handlePay,
  };
};

export default useStripe;
