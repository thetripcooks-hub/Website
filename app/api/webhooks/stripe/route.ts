import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const name = session.customer_details?.name;

    if (email) {
      await addToMailchimp(email, name ?? undefined);
    }
  }

  return NextResponse.json({ received: true });
}

async function addToMailchimp(email: string, name?: string) {
  const [firstName = "", ...rest] = (name ?? "").split(" ");
  const lastName = rest.join(" ");

  const res = await fetch(
    `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      }),
    }
  );

  if (!res.ok) {
    const data = await res.json();
    // "Member Exists" (title) means they're already subscribed — not an error
    if (res.status === 400 && data.title === "Member Exists") return;
    console.error("Mailchimp error:", data);
  }
}
