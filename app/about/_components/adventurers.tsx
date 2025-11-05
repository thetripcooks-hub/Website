import SectionWrapper from "@/app/home/_components/section-wrapper";
import Image from "next/image";
import React from "react";
// import OwnersMobile from "~/img/about/owners-mobile.png";
// import OwnersDesktop from "~/img/about/owners-desktop.png";
import useGeneralStore from "@/stores/generalStore";
import { Loader } from "lucide-react";
import { CustomLoader } from "@/components/ui";

const Adventurers = () => {
  const { about, loadingAbout } = useGeneralStore();
  return (
    <div className="px-5 py-10 sm:py-20 sm:px-[8%] bg-neutral-grey-100 dark:bg-[#1D2120]">
      <SectionWrapper className="flex flex-col sm:flex-row gap-6 sm:gap-12 sm:justify-between w-full">
        <div className="sm:pt-4 flex flex-col gap-5">
          <h3 className="text-[32px] leading-[39.01px] font-semibold text-neutral-text sm:text-[48px] sm:leading-[58.51px] dark:text-foreground">
            Two adventurers, <br /> One shared goal
          </h3>
          <div className="flex flex-col gap-1.5 sm:gap-2 sm:max-w-[559px] text-neutral-grey-500 text-base leading-[26.08px] dark:text-[#BFC0C2]">
            <p>
              {/* Trip Cooks started off with Ovie and Lanre planning a group trip
              to Montenegro in February 2023. This was a trip with friends and
              one key point that stood out was the balance between vacationing
              and traveling.{" "} */}
              In August 2022, Ovie and Lanre planned a group trip to Stonehaven
              in Scotland. This was a trip with friends and one key point that
              stood out was the balance between vacationing and traveling.
            </p>
            <p>
              {/* A friend then told us “you’re good at this, I love the community
              you’re building too and you should share this passion of
              exploring”, thus TripCooks came to be. So far, this community has
              ticked off 10 countries and counting with the best views, food,
              vibes and energy!{" "} */}
              Post Stonehaven, the friendship group kept expanding and has
              explored other countries including Mexico, Turkey and Morocco. So
              far, the TripCooks community has ticked off 10 countries and
              counting with the best views, food, vibes and energy!
            </p>
            <p>
              {/* More to come from us! Join our group trips for the best experience
              you will have without breaking the bank. We truly believe travel
              should not be a luxury, anyone can and should be able to travel.
              Let’s show you how! */}
              We’re always in the kitchen “cooking” the next destination to
              explore. Hence our name TRIP COOKS. We truly believe travel should
              not be a luxury, anyone can and should be able to travel. Let’s
              show you how!
            </p>
          </div>
        </div>
        <div>
          {loadingAbout ? (
            <div className="flex w-full sm:w-[544px] justify-center items-center h-[389px] sm:h-[558px]">
              <CustomLoader />
            </div>
          ) : (
            <Image
              src={about[0]?.ownersPicture?.url ?? ""}
              alt="owners-image"
              width={544}
              height={558}
              className="object-cover h-[389px] sm:h-[558px] sm:w-[544px] w-full rounded-[21px]"
            />
          )}
          {/* <Image
            src={OwnersMobile}
            alt="owners mobile"
            className="sm:hidden object-scale-down w-full"
          /> */}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Adventurers;
