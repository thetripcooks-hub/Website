"use client";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";
import { guthenBloots } from "@/app/font";
import { useRouter } from "next/navigation";

const TravelChef = () => {
  const router = useRouter();
  return (
    <section className="bg-[#fafafa] dark:bg-[#1E2826] py-16 sm:py-[78px] px-5 flex flex-col items-center text-center">
      <div className="flex flex-col items-center gap-6 max-w-[567px] w-full">
        <h2 className="font-ogg-trial text-[32px] sm:text-[52px] leading-tight text-neutral-text dark:text-foreground">
          We&apos;re Like Your <br />
          Personal{" "}
          <span
            className={cn(guthenBloots.className, "text-secondary-irish-green")}
          >
            travel planners
          </span>
        </h2>
        <p className="text-base text-secondary leading-6">
          From group getaways to custom-designed journeys, we&apos;ll craft
          every detail to perfection. We handle the prep, so you can just savor
          the experience.
        </p>
        <Button onClick={() => router.push("/about")} className="w-[185px]">
          Learn more
        </Button>
      </div>
    </section>
  );
};

export default TravelChef;
