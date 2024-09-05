import { Button } from "@/components/ui";
import React from "react";
import SectionWrapper from "./section-wrapper";

const ReadyToStart = () => {
  return (
    <section className="bg-tripcook-pattern px-5 py-5 sm:py-24 sm:px-[8%] bg-cover bg-no-repeat bg-center  w-full">
      <SectionWrapper>
        <h3 className="text-4xl sm:text-6xl text-[#1A071B sm:max-w-[633px]">
          Ready to Start Your Next Adventure?
        </h3>
        <p className="text-xl mt-10 sm:max-w-[596px]">
          Join a group trip or let us create a personalized journey just for
          you. Your unforgettable experience awaits
        </p>
        <Button variant="secondary" className="mt-16 sm:mt-10">
          Explore trips
        </Button>
      </SectionWrapper>
    </section>
  );
};

export default ReadyToStart;
