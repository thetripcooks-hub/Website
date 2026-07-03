"use client";
import { Button } from "@/components/ui";
import React from "react";
import SectionWrapper from "./section-wrapper";
import { useRouter } from "next/navigation";

const ReadyToStart = () => {
  const router = useRouter();
  return (
    <section className="bg-[#09AF0D] sm:bg-transparent sm:bg-tripcook-pattern px-5 py-12 sm:py-24 sm:px-[8%] bg-cover bg-no-repeat bg-center w-full">
      <SectionWrapper className="text-white sm:text-[#1A071B] text-center sm:text-left">
        <h3 className="text-4xl sm:text-6xl sm:max-w-[633px] font-semibold text-center sm:text-left">
          Ready to Start Your Next Adventure?
        </h3>
        <p className="text-xl mt-10 sm:max-w-[596px]">
          Join a group trip or let us create a personalized journey just for
          you. Your unforgettable experience awaits
        </p>
        <Button
          variant="secondary"
          className="mt-16 sm:mt-10"
          onClick={() => router.push("/trips")}
        >
          Explore trips
        </Button>
      </SectionWrapper>
    </section>
  );
};

export default ReadyToStart;
