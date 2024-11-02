import SectionWrapper from "@/app/home/_components/section-wrapper";
import React from "react";
import PrivateTripForm from "./private-trip-form";

const PrivateTripHero = () => {
  return (
    <div className="px-5 py-10 sm:py-20 sm:px-[8%]">
      <SectionWrapper className="flex flex-col sm:flex-row justify-between gap-5">
        <div className="sm:max-w-[550px] w-full text-neutral-subtext sm:text-secondary-forest-green">
          <h4 className="font-medium text-[32px] leading-[39.01px] text-neutral-text sm:text-[40px] sm:leading-[48.76px]">
            Need a solo getaway?
          </h4>
          <div className="text-base leading-[29px] text-neutral-subtext mt-5">
            <p>
              Group trips are amazing, private trips are on a whole new level.
              You can book a private trip and enjoy an exclusive experience with
              you and your friends or loved ones, to your selected destination.
              Please fill out the form below and a member of our team will be in
              touch.
            </p>
          </div>
        </div>
        {/* private trip from */}
        <PrivateTripForm />
      </SectionWrapper>
    </div>
  );
};

export default PrivateTripHero;
