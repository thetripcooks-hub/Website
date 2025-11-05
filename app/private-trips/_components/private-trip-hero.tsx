import SectionWrapper from "@/app/home/_components/section-wrapper";
import React from "react";
import PrivateTripForm from "./private-trip-form";
import { arial } from "@/app/font";
import { cn } from "@/lib/utils";

const PrivateTripHero = () => {
  return (
    <>
      <div className="bg-neutral-grey-100  bg-hero-mobile sm:bg-hero-desktop bg-no-repeat bg-cover h-[50svh]">
        {/* <main className="pt-10 sm:pt-[65px]">
          {" "}
          <div className="px-5 flex flex-col items-center justify-center">
            <h3 className="text-center text-white text-4xl sm:text-5xl font-semibold max-w-[291px] sm:max-w-[393px]">
              Private trips on Trip cooks
            </h3>
            <p
              className={cn(
                "mt-5 sm:mt-12 max-w-[288px] sm:max-w-[548px] text-center text-white text-xl sm:text-2xl font-normal",
                arial.className
              )}
            >
              You can book a private trip and enjoy an exclusive experience with
              you and your friends or loved ones, to your selected destination.{" "}
            </p>
          </div>
        </main> */}
      </div>
      <div className="px-5 py-10 sm:py-20 sm:px-[8%]">
        <SectionWrapper className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="lg:max-w-[550px] w-full text-neutral-subtext sm:text-secondary-forest-green">
            <h4 className="font-medium text-[24px] leading-[29.26px] text-neutral-text sm:text-[32px] sm:leading-[39.01px] dark:text-foreground">
              Needing a Private Getaway?
            </h4>
            <div className="text-base leading-[29px] text-neutral-subtext mt-5 dark:text-[#BFC0C2]">
              <p>
                Book a private trip for an exclusive experience at your chosen
                destination. Just fill out the form, and our team will reach out
                to you shortly.
              </p>
            </div>
          </div>
          {/* private trip from */}
          <PrivateTripForm />
        </SectionWrapper>
      </div>
    </>
  );
};

export default PrivateTripHero;
