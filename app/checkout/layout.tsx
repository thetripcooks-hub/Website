import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Trip Cooks",
  description: "Complete your booking and secure your spot on a Trip Cooks experience.",
  robots: { index: false },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
