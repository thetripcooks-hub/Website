import React from "react";
import Image from "next/image";
import SectionWrapper from "./section-wrapper";

const items = [
  {
    lightIcon: "/img/why-choose-us/group-trips.svg",
    darkIcon: "/img/why-choose-us/group-trips-dark.svg",
    iconW: 108,
    iconH: 78,
    title: "Group trips made easy",
    description: "Join a community of vibrant like-minded travelers.",
  },
  {
    lightIcon: "/img/why-choose-us/private-trips.svg",
    darkIcon: "/img/why-choose-us/private-trips-dark.svg",
    iconW: 67,
    iconH: 78,
    title: "Exclusive Private Trips",
    description: "Bespoke travel plans to match your preferred destination.",
  },
  {
    lightIcon: "/img/why-choose-us/expert-support.svg",
    darkIcon: "/img/why-choose-us/expert-support-dark.svg",
    iconW: 78,
    iconH: 78,
    title: "Expert Support, Anytime",
    description: "Our team of travel experts is here 24/7, providing guidance and support.",
  },
  {
    lightIcon: "/img/why-choose-us/safe-booking.svg",
    darkIcon: "/img/why-choose-us/safe-booking-dark.svg",
    iconW: 59,
    iconH: 73,
    title: "Safe and Secure Booking",
    description: "Your payments are protected, and we ensure all safety standards are met.",
  },
  {
    lightIcon: "/img/why-choose-us/global-destinations.svg",
    darkIcon: "/img/why-choose-us/global-destinations-dark.svg",
    iconW: 73,
    iconH: 73,
    title: "Global Destinations",
    description: "Explore 30+ curated destinations across Europe, Africa, and beyond.",
  },
  {
    lightIcon: "/img/why-choose-us/travel-guides.svg",
    darkIcon: "/img/why-choose-us/travel-guides-dark.svg",
    iconW: 43,
    iconH: 78,
    title: "Travel Guides Included",
    description: "Every trip comes with insider tips and day-by-day plans so you're always in the know.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="px-5 py-10 sm:py-20 sm:pb-28 sm:px-[8%] bg-background dark:bg-[#1D2120]">
      <SectionWrapper>
        <h2 className="font-ogg-trial text-[26px] sm:text-[42px] text-center max-w-[446px] mx-auto mb-8 sm:mb-20 leading-tight sm:leading-[60px]">
          Why choose us to curate your travel?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 w-full">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-6 sm:gap-[42px] text-center"
            >
              {/* Icon — fixed 78px height so all items align on the same baseline */}
              <div className="h-[78px] flex items-center justify-center">
                <Image
                  src={item.lightIcon}
                  alt={item.title}
                  width={item.iconW}
                  height={item.iconH}
                  className="object-contain dark:hidden"
                  unoptimized
                />
                <Image
                  src={item.darkIcon}
                  alt={item.title}
                  width={item.iconW}
                  height={item.iconH}
                  className="object-contain hidden dark:block"
                  unoptimized
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-[13px] items-center">
                <h5 className="text-[18px] sm:text-[24px] font-semibold text-neutral-text dark:text-foreground leading-[24px] sm:leading-[36px]">
                  {item.title}
                </h5>
                <p className="text-[13px] sm:text-base text-neutral-subtext dark:text-[#BFC0C2] leading-[18px] sm:leading-[24px] max-w-[323px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
};

export default WhyChooseUs;
