import { Button } from "@/components/ui";
import React from "react";

const ReadyToStart = () => {
  return (
    <section className="bg-tripcook-pattern px-5 py-5 sm:pt-10 sm:px-[8%] object-fill w-full">
      <h3 className="text-4xl sm:text-6xl text-[#1A071B sm:max-w-[633px]">
        Ready to Start Your Next Adventure?
      </h3>
      <p className="text-xl mt-10 sm:max-w-[596px]">
        Join a group trip or let us create a personalized journey just for you.
        Your unforgettable experience awaits
      </p>
      <Button variant="secondary" className="mt-16 sm:mt-10">
        Explore trips
      </Button>
    </section>
  );
};

export default ReadyToStart;
