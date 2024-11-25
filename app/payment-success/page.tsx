"use client";
import { Button } from "@/components/ui";
import useCartStore from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { clearCart } = useCartStore();
  useEffect(() => {
    return () => clearCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mx-auto w-screen flex justify-center items-center flex-col h-[calc(100vh-70px)]">
      <p>Your payment was successful!</p>
      <div className="flex gap-2.5">
        <Button onClick={() => router.push("/home")}>Go Home</Button>
        <Button variant="secondary" onClick={() => router.push("/trips")}>
          All Trips
        </Button>
      </div>
    </div>
  );
};

export default Page;
