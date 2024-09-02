import { Button } from "@/components/ui";
import Image from "next/image";
import React from "react";
import FeatureTripImage from "../../public/img/sample-featured-trip.svg";

const FeatureTrip = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:pt-32 px-5 pt-5 text-neutral-text sm:items-center sm:px-[5%] pb-10 sm:pb-0 gap-20">
      <section>
        <Image src={FeatureTripImage} alt="featured-trip-image" />
      </section>
      <section className="flex flex-col gap-6 sm:gap-10">
        <h3 className="text-[32px] sm:text-5xl font-medium">Featured trip</h3>
        <p className="max-w-[318px] text-base sm:text-xl sm:max-w-[415px] text-neutral-subtext">
          Explore Mauritius with a friend or two this summer. Enjoy full support
          from our team 24/7.
        </p>
        <Button className="w-full sm:w-fit h-[54px]">Book trip</Button>
      </section>
    </div>
  );
};

export default FeatureTrip;
