import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed | Trip Cooks",
  description: "Your Trip Cooks booking is confirmed. We'll be in touch with more details.",
  robots: { index: false },
};

export default function PaymentSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
