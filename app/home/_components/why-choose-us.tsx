import React from "react";
import SectionWrapper from "./section-wrapper";

const items = [
  {
    title: "Group trips made easy",
    description: "Join a community of vibrant like-minded travellers.",
  },
  {
    title: "Exclusive Private Trips",
    description: "Bespoke travel plans to match your preferred destination.",
  },
  {
    title: "Expert Support, Anytime",
    description:
      "Our team of travel experts is here 24/7, providing guidance and support.",
  },
  {
    title: "Safe and Secure Booking",
    description:
      "Your payments are protected, and we ensure all safety standards are met.",
  },
  {
    title: "Global Destinations",
    description:
      "Explore 30+ curated destinations across Europe, Africa, and beyond.",
  },
  {
    title: "Travel Guides Included",
    description:
      "Every trip comes with insider tips and day-by-day plans so you're always in the know.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="px-5 py-10 sm:py-20 sm:pb-28 sm:px-[8%] bg-background dark:bg-[#1D2120]">
      <SectionWrapper>
        <h2 className="font-ogg-trial text-[32px] sm:text-[48px] text-center max-w-[446px] mx-auto mb-10 sm:mb-20">
          Why choose us to curate your travel?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-10 text-center">
              <div className="w-[78px] h-[78px] rounded-full bg-neutral-grey-200 shrink-0" />
              <div className="flex flex-col gap-3">
                <h5 className="text-[24px] font-semibold text-neutral-text dark:text-foreground">
                  {item.title}
                </h5>
                <p className="text-base text-neutral-subtext dark:text-[#BFC0C2]">
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
