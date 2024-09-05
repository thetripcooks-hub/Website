import React from "react";
import AirplaneIcon from "@/components/icons/svg/airplane.svg";
import Image from "next/image";
import SectionWrapper from "./section-wrapper";

const items = [
  {
    title: "Group trips made easy",
    description:
      "Join a group of like-minded travellers, forget the  hassle of planning. From accommodation to planning an itinerary, we’ve got you covered",
  },
  {
    title: "Personalized Travel Planning",
    description:
      "Want a trip that’s uniquely yours? We’ll curate a personalized itinerary based on your preferences, ensuring every moment is tailored just for you.",
  },
  {
    title: "Expert Support, Anytime",
    description:
      "Our team of travel experts is here for you, providing guidance, recommendations, and support before, during, and after your trip.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="px-5 py-10 sm:py-20 sm:pb-28 sm:px-[8%] bg-neutral-grey-100">
      <SectionWrapper>
        <h3 className="text-[32px] font-medium sm:text-5xl text-center max-w-[318px] sm:max-w-[445px] mx-auto ">
          Why choose us to curate your travel?
        </h3>
        <div className="mt-10 sm:mt-20 flex gap-5 justify-between w-full flex-col sm:flex-row">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 text-foreground"
            >
              <Image src={AirplaneIcon} alt="airplane-icon" />
              <h5 className="text-2xl font-medium text-neutral-text">
                {item.title}
              </h5>
              <p className="text-base text-neutral-grey-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
};

export default WhyChooseUs;
