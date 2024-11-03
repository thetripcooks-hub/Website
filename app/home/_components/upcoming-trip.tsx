"use client";
import Image from "next/image";
import React from "react";
import img from "~/img/public-trip.svg";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui";
import SectionWrapper from "./section-wrapper";
import TripCard from "@/components/ui/trip-card";
import CartIcon from "~/img/shopping-cart.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UpcomingTrips = ({ isCart = false }: { isCart?: boolean }) => {
  const router = useRouter();
  const handleAddToCart = () => {
    toast.success("Added to cart");
  };
  return (
    <section className="px-5 py-10 sm:py-20 sm:px-[8%]">
      <SectionWrapper>
        <h3 className="text-[32px] font-medium sm:text-5xl">Upcoming Trips</h3>

        {/* desktop */}
        <div className="hidden sm:grid mt-10 grid-cols-3 gap-10">
          {Array.from({ length: isCart ? 3 : 6 }).map((_, index) => (
            <TripCard
              key={index}
              isDiscounted={index > 3}
              handleClick={() => router.push(`/trips/${index}`)}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* mobile */}
        <div className="mt-5 sm:hidden flex flex-col gap-10">
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: 8 }).map((_, index) => (
                <CarouselItem
                  className="text-foreground basis-4/5 cursor-pointer relative"
                  key={index}
                >
                  <div
                    className="bg-[#020E0B4D] rounded-full w-8 h-8 flex items-center justify-center absolute right-3 top-3"
                    onClick={handleAddToCart}
                  >
                    <Image
                      src={CartIcon}
                      width={18}
                      height={18}
                      alt="cart-icon"
                    />
                  </div>
                  <Image
                    src={img}
                    alt="img"
                    className="rounded-[18px] w-full sm:w-[291px]  object-cover lg:w-full"
                    width={291}
                    height={301}
                    onClick={() => router.push(`/trips/${index}`)}
                  />
                  <div className="flex flex-col gap-1 mt-2.5">
                    <h5 className="text-lg">Athens Greece</h5>
                    <p className="text-sm text-neutral-grey-500">
                      Aug 15th - Aug 18th, 2024
                    </p>
                    <div className="flex gap-1 items-center">
                      {index > 3 && (
                        <h3 className="font-medium text-xl text-neutral-grey-500 line-through">
                          $6500
                        </h3>
                      )}
                      <h3 className="font-medium text-xl">$5,000</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="w-full flex justify-center">
          <Link href="/trips">
            <Button
              role="link"
              className="mt-10 sm:mt-14 w-full sm:w-fit mx-auto"
            >
              See more trips
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </section>
  );
};

export default UpcomingTrips;
