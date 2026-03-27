"use client";
import { Button } from "@/components/ui";
import Image from "next/image";
import React from "react";
import FeatureTripImage from "~/img/sample-featured-trip.svg";
import SectionWrapper from "./section-wrapper";
import { useRouter } from "next/navigation";
import useTripStore from "@/stores/trip-store";
import { generateTripLink } from "@/lib/utils";

const FeatureTrip = () => {
  const router = useRouter();
  const { trips } = useTripStore();
  const featuredTripArray = trips.filter((x) => x.isFeaturedTrip);
  return featuredTripArray.length > 0 ? (
    <div className="sm:pt-32 px-5 pt-10 text-neutral-text dark:text-foreground  pb-10 sm:pb-24 sm:px-[5%] ">
      <SectionWrapper className="flex flex-col-reverse sm:flex-row sm:items-center sm:gap-20">
        <section>
          <Image
            src={
              featuredTripArray[0].bannerImagesCollection.items[0].url ??
              FeatureTripImage
            }
            priority
            width={390}
            height={398.72}
            alt="featured-trip-image"
            className="my-5 sm:my-0 sm:max-w-[544px] rounded-[21px] w-full h-[392px] sm:h-[558px]"
          />
        </section>
        <section className="flex flex-col gap-6 sm:gap-10">
          <h3 className="text-[32px] sm:text-5xl font-medium">Featured Trip</h3>
          <p className="max-w-[318px] text-base sm:text-xl sm:max-w-[415px] text-neutral-subtext dark:text-[#BFC0C2]">
            Explore {featuredTripArray[0].location} with a friend or two this
            summer. Enjoy full support from our team 24/7.
          </p>
          <Button
            className="w-full sm:w-fit h-[54px] hidden sm:flex"
            onClick={() => router.push(generateTripLink(featuredTripArray[0]))}
          >
            Book trip
          </Button>
        </section>
      </SectionWrapper>
      <Button
        className="w-fit h-[54px] sm:hidden"
        onClick={() => router.push(generateTripLink(featuredTripArray[0]))}
      >
        Book trip
      </Button>
    </div>
  ) : null;
};

export default FeatureTrip;
