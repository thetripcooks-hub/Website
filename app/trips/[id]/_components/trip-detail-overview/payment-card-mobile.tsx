import { Button, Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const PaymentCardMobile = () => {
  const router = useRouter();
  return (
    <Card
      className={cn(
        "fixed bottom-0 sm:hidden border-t-neutral-grey-300 shadow-none w-full p-2.5 z-10 rounded-none flex flex-col gap-3"
      )}
    >
      <div className="flex flex-col gap-3">
        <h6 className="line-through text-[24px] leading-[29.26px] text-neutral-grey-500">
          £4,000
        </h6>
        <p className="items-center flex text-[12px] leading-[14.63px] gap-1 text-neutral-subtext">
          <span>12 Days</span>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="inline-flex"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4" r="4" fill="#1D2433" />
          </svg>
          <span>10 people</span>
        </p>
      </div>
      <div className="flex w-full gap-2">
        <Button className="w-full" onClick={() => router.push("/cart")}>
          Book Now
        </Button>
        <Button
          variant="outline"
          className="w-full border-[#020E0B]"
          onClick={() => toast.success("Added to cart")}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default PaymentCardMobile;
