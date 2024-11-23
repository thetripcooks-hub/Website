import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const origin: string = headers().get("origin") as string;

  const lineItems = await req.json();

  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      line_items: lineItems,
      currency: "GBP",
      success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      mode: "payment",
      automatic_tax: { enabled: true },
    };
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.redirect(new URL(checkoutSession.url!), {
      status: 303,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
