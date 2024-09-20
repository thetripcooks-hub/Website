import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";
import { guthenBloots } from "../font";

const TravelChef = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row px-5 py-10 text-neutral-text sm:pt-32 sm:pb-28 sm:justify-center sm:gap-20 sm:px-[12%]">
        <section className="text-[32px] sm:text-[52px] font-medium sm:w-[418px]">
          We’re like your personal{" "}
          <span
            className={cn(guthenBloots.className, "text-secondary-irish-green")}
          >
            travel chef
          </span>
        </section>
        <section className="sm:max-w-[618px]">
          <p className="text-base sm:text-xl mt-5 sm:mt-0">
            Think of us as your travel chefs — whipping up adventures just the
            way you like them. Whether you crave a group getaway or a
            custom-made trip, we’ll handle all the ingredients to cook up a
            journey that’s perfectly you.
          </p>

          <Button className="mt-10 sm:mt-4 w-full sm:w-fit h-[54px]">
            Learn more
          </Button>
        </section>
      </div>
      <hr className="w-3/4 mx-auto bg-neutral-grey-100" />
    </>
  );
};

export default TravelChef;
