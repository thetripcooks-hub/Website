import SectionWrapper from "@/app/home/_components/section-wrapper";
// import RoadDesktop from "~/img/about/road-desktop.svg";
// import RoadMobile from "~/img/about/road-mobile.svg";
import Image from "next/image";
import React from "react";
import useGeneralStore from "@/stores/generalStore";
import { Loader } from "lucide-react";

const AboutHero = () => {
  const { about, loadingAbout } = useGeneralStore();

  return (
    <div className="px-5 py-10 sm:py-20 sm:px-[8%]">
      <SectionWrapper>
        <header className="w-full text-center flex flex-col justify-center items-center gap-5">
          {/* <h6 className="text-[15px] leading-[18.29px] font-medium text-[#000000]">
            About TripCooks
          </h6> */}
          <h3 className="text-[32px] leading-[39.01px] font-semibold text-neutral-text sm:max-w-[822px] sm:text-5xl sm:leading-[58.51px] dark:text-foreground">
            Our mission is to see the world{" "}
            {/*. Our mission is to take the trip out*/}{" "}
            {/* <br className="hidden sm:block" /> */}
            {/*of the group chat,*/} one country{" "}
            <span className="text-secondary-irish-green">
              {/*for good*/} at a time
            </span>
          </h3>
        </header>
        <div className="mt-5">
          {loadingAbout ? (
            <div className="w-full h-[558px] flex justify-center items-center">
              <Loader className="w-5 h-5 text-secondary-irish-green animate-spin" />
            </div>
          ) : (
            <Image
              src={about[0]?.bannerImage?.url ?? ""}
              loading="lazy"
              height={558}
              width={1222}
              alt="about hero image"
              className="h-[558px] rounded-[28px] drop-shadow-[-6px_24px_41px_0px_#51515126] w-full object-cover"
            />
          )}
          {/* <Image
            src={RoadMobile}
            height={558}
            alt="mobile-road-image"
            className="sm:hidden drop-shadow-[-6px_24px_41px_0px_#51515126] rounded-[19px] object-scale-down w-full"
          /> */}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default AboutHero;
