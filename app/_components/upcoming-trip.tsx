import Image from "next/image";
import React from "react";
import img from "../../public/img/public-trip.svg";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui";

const UpcomingTrips = () => {
  return (
    <section className="px-5 py-10 sm:py-20 sm:px-[8%]">
      <h3 className="text-[32px] font-medium sm:text-5xl">Upcoming Trips</h3>

      {/* desktop */}
      <div className="hidden sm:grid mt-10 grid-cols-4 gap-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div className="text-foreground cursor-pointer" key={item}>
            <Image
              src={img}
              alt="img"
              className="rounded-[18px] w-full sm:w-[291px]  object-cover lg:w-full"
              width={291}
              height={301}
            />
            <div className="flex flex-col gap-1 mt-2.5">
              <h5 className="text-lg">Athens Greece</h5>
              <p className="text-sm text-neutral-grey-500">Aug 15th, 2024</p>
              <h3 className="font-medium text-xl">$5,000</h3>
            </div>
          </div>
        ))}
      </div>

      {/* mobile */}
      <div className="mt-5 sm:hidden flex flex-col gap-10">
        <Carousel className="w-full">
          <CarouselContent>
            {[1, 2, 3, 4].map((item) => (
              <CarouselItem
                className="text-foreground basis-4/5 cursor-pointer"
                key={item}
              >
                <Image
                  src={img}
                  alt="img"
                  className="rounded-[18px] w-full sm:w-[291px]  object-cover lg:w-full"
                  width={291}
                  height={301}
                />
                <div className="flex flex-col gap-1 mt-2.5">
                  <h5 className="text-lg">Athens Greece</h5>
                  <p className="text-sm text-neutral-grey-500">
                    Aug 15th, 2024
                  </p>
                  <h3 className="font-medium text-xl">$5,000</h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Carousel className="w-full">
          <CarouselContent>
            {[5, 6, 7, 8].map((item) => (
              <CarouselItem
                className="text-foreground basis-4/5 cursor-pointer"
                key={item}
              >
                <Image
                  src={img}
                  alt="img"
                  className="rounded-[18px] w-full sm:w-[291px]  object-cover lg:w-full"
                  width={291}
                  height={301}
                />
                <div className="flex flex-col gap-1 mt-2.5">
                  <h5 className="text-lg">Athens Greece</h5>
                  <p className="text-sm text-neutral-grey-500">
                    Aug 15th, 2024
                  </p>
                  <h3 className="font-medium text-xl">$5,000</h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="w-full flex justify-center">
        <Button className="mt-10 sm:mt-14 w-full sm:w-fit mx-auto">
          See more trips
        </Button>
      </div>
    </section>
  );
};

export default UpcomingTrips;
