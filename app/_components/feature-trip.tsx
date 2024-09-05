import { Button } from "@/components/ui";
import Image from "next/image";
import React from "react";
import FeatureTripImage from "../../public/img/sample-featured-trip.svg";
import SectionWrapper from "./section-wrapper";

const FeatureTrip = () => {
  return (
    <div className="sm:pt-32 px-5 pt-5 text-neutral-text  pb-10 sm:pb-0 sm:px-[5%] ">
      <SectionWrapper className="flex flex-col-reverse sm:flex-row sm:items-center sm:gap-20">
        <section>
          <Image src={FeatureTripImage} alt="featured-trip-image" className="mt-2.5 sm:mt-0" />
        </section>
        <section className="flex flex-col gap-6 sm:gap-10">
          <h3 className="text-[32px] sm:text-5xl font-medium">Featured trip</h3>
          <p className="max-w-[318px] text-base sm:text-xl sm:max-w-[415px] text-neutral-subtext">
            Explore Mauritius with a friend or two this summer. Enjoy full
            support from our team 24/7.
          </p>
          <Button className="w-full sm:w-fit h-[54px] hidden sm:flex">Book trip</Button>
        </section>
      </SectionWrapper>
      <Button className="w-full sm:w-fit h-[54px] sm:hidden">Book trip</Button>
    </div>
  );
};

export default FeatureTrip;
