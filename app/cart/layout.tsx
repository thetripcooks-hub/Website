import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Cart | Trip Cooks",
  description: "Review your selected trips and proceed to checkout.",
  robots: { index: false },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
