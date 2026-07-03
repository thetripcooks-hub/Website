"use client";
import Image from "next/image";
import React from "react";
import useGeneralStore from "@/stores/generalStore";
import { CustomLoader, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { guthenBloots } from "@/app/font";
import { useRouter } from "next/navigation";

const Adventurers = () => {
  const { about, loadingAbout } = useGeneralStore();
  const router = useRouter();
  const photo = about[0]?.ownersPicture?.url;

  const photoNode = loadingAbout ? (
    <div className="flex items-center justify-center rounded-full bg-neutral-grey-100 shrink-0 w-[194px] h-[194px] sm:w-[250px] sm:h-[250px]">
      <CustomLoader />
    </div>
  ) : photo ? (
    <Image
      src={photo}
      alt="Ovie and Lanre — TripCooks founders"
      width={250}
      height={250}
      className="rounded-full object-cover border-[5px] border-white shadow-[0px_4px_21.7px_2px_rgba(159,159,159,0.25)] shrink-0 w-[194px] h-[194px] sm:w-[250px] sm:h-[250px]"
    />
  ) : null;

  return (
    <div className="px-5 py-16 sm:py-24 sm:px-[8%] bg-neutral-grey-100 dark:bg-[#1D2120]">

      {/* ── Mobile: label → arrow → photo, stacked ── */}
      <div className="sm:hidden flex flex-col items-center gap-4 mb-10">
        <p className={cn(guthenBloots.className, "text-[32px] leading-[42px] text-[#09af0d] text-center whitespace-nowrap")}>
          That&apos;s Ovie and Lanre
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/about/arrow-mobile.svg" alt="" aria-hidden width={64} height={64} />
        {photoNode}
      </div>

      {/* ── Desktop: [label + arrow] | photo | [arrow + label] ── */}
      <div className="hidden sm:flex items-center justify-center gap-10 mb-12">

        {/* Left: "That's Ovie" + arrow pointing toward photo */}
        <div className="flex flex-col items-end gap-1">
          <p className={cn(guthenBloots.className, "text-[41.333px] leading-[62px] text-[#09af0d] whitespace-nowrap")}>
            That&apos;s Ovie
          </p>
          <div className="-scale-y-100 rotate-180 self-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/about/arrow-left.svg" alt="" aria-hidden width={93} height={93} />
          </div>
        </div>

        {/* Center: circular founders photo */}
        {photoNode}

        {/* Right: arrow pointing toward photo + "And that's Lanre" */}
        <div className="flex flex-col items-start gap-1">
          <p className={cn(guthenBloots.className, "text-[42px] leading-[33px] text-[#09af0d] whitespace-nowrap")}>
            And that&apos;s Lanre
          </p>
          <div className="rotate-[15deg] self-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/about/arrow-right.svg" alt="" aria-hidden width={93} height={93} />
          </div>
        </div>

      </div>

      {/* ── Body text — centered ── */}
      <div className="flex flex-col items-center text-center">
        <h2 className="font-ogg-trial text-[32px] sm:text-[48px] leading-[1.2] sm:leading-[72px] text-neutral-text dark:text-foreground">
          Two adventurers,
          <br />
          One shared goal
        </h2>

        <div className="flex flex-col gap-3 mt-6 max-w-[559px] text-neutral-grey-500 dark:text-[#BFC0C2] text-base text-[14px] sm:text-[18px] leading-[28px]">
          <p>
            In August 2022, Ovie and Lanre planned a group trip to Stonehaven
            in Scotland. This was a trip with friends and one key point that
            stood out was the balance between vacationing and traveling.
          </p>
          <p>
            Post Stonehaven, the friendship group kept expanding and has
            explored other countries including Mexico, Turkey and Morocco. So
            far, the TripCooks community has ticked off 10 countries and
            counting with the best views, food, vibes and energy!
          </p>
          <p>
            We&apos;re always in the kitchen &ldquo;cooking&rdquo; the next
            destination to explore. Hence our name TRIP COOKS. We truly believe
            travel should not be a luxury, anyone can and should be able to
            travel.
          </p>
        </div>

        <Button
          className="mt-8 w-[222px]"
          onClick={() => router.push("/how-to-book")}
        >
          Let&apos;s show you how!
        </Button>
      </div>
    </div>
  );
};

export default Adventurers;
