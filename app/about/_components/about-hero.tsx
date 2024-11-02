import SectionWrapper from "@/app/home/_components/section-wrapper";
import RoadDesktop from "~/img/about/road-desktop.svg";
import RoadMobile from "~/img/about/road-mobile.svg";
import Image from "next/image";
import React from "react";

const AboutHero = () => {
  return (
    <div className="px-5 py-10 sm:py-20 sm:px-[8%]">
      <SectionWrapper>
        <header className="w-full text-center flex flex-col justify-center items-center gap-5">
          <h6 className="text-[15px] leading-[18.29px] font-medium text-[#000000]">
            About TripCooks
          </h6>
          <h3 className="text-[32px] leading-[39.01px] font-semibold text-neutral-text sm:max-w-[822px] sm:text-5xl sm:leading-[58.51px]">
            Our mission is to take the trip out{" "}
            <br className="hidden sm:block" /> of the group chat,{" "}
            <span className="text-secondary-irish-green">for good</span>
          </h3>
        </header>
        <div className="mt-5">
          <Image
            src={RoadDesktop}
            height={558}
            alt="road-image"
            className="hidden sm:flex rounded-[28px] drop-shadow-[-6px_24px_41px_0px_#51515126] w-full object-scale-down"
          />
          <Image
            src={RoadMobile}
            height={558}
            alt="mobile-road-image"
            className="sm:hidden drop-shadow-[-6px_24px_41px_0px_#51515126] rounded-[19px] object-scale-down w-full"
          />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default AboutHero;
