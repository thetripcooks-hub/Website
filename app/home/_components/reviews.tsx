"use client";
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import Image from "next/image";
import React from "react";
import StarIcon from "@/components/icons/svg/star.svg";
import HotAirBallon from "~/img/hot-air-ballon.svg";
import Marrakesh from "@/components/icons/svg/flags/monaco.svg";
import Montenegro from "@/components/icons/svg/flags/montenegro.svg";
import Turkey from "@/components/icons/svg/flags/turkey.svg";
import SectionWrapper from "./section-wrapper";

const data = [
  {
    text: "The most memorable moment on the trip was my rafting experience, just being with everyone while the waves hit was so amazing.",
    subText:
      "Also, the conversation and banter in Ovie’s room from our last night at the hotel.",
    name: "Turkey",
    year: "2024",
    flag: Turkey,
    starCount: 5,
  },

  {
    text: "Getting to meet everyone tbh. Camel riding at Agafay Desert was amazing - the views, the dress ups were my highlights.",
    subText:
      "I also enjoyed dancing afterwards with the performers before we had dinner at the Desert.",
    name: "Marrakech and Tangier",
    year: "2024",
    flag: Marrakesh,
    starCount: 5,
  },
  {
    text: "Mishaps that were not the fault of the organizers were swiftly addressed through being available and following up all the way. Commendable",
    name: "Montenegro",
    year: "2024",
    flag: Montenegro,
    starCount: 5,
  },
];

const Reviews = () => {
  return (
    <section className="px-5 py-12 sm:py-24 sm:px-[8%] bg-cover bg-no-repeat bg-center  w-full">
      <SectionWrapper>
        <div className="w-full text-center mb-10 sm:mb-20">
          <h3 className="text-[#1D2433] leading-[39.01px] text-[32px] font-medium sm:leading-[58.51px] sm:text-[48px] mb-5">
            Our wall of love
          </h3>
          <p className="text-neutral-subtext text-[16px] leading-[19.5px] sm:text-[20px] sm:leading-[24.38px]">
            The early adopters have spoken
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          // className="w-[90%] sm:w-[90%] mx-auto py-10 sm:py-20"
        >
          <CarouselContent className="flex items-center">
            {data.map((_, index) => (
              <CarouselItem key={index}>
                {/* className="md:basis-1/2 lg:basis-1/3"*/}
                <Card className="border border-neutral-grey-200 shadow-[#0000000D] rounded-[14px] bg-secondary-forest-green relative sm:pl-5 sm:pr-2.5 sm:py-2.5 pb-16">
                  <CardContent className="flex flex-col sm:flex-row justify-between sm:pl-5 sm:py-2.5 sm:pr-2.5 gap-5">
                    <div className="sm:max-w-[487.92px] flex flex-col gap-5 h-[340px] sm:h-fit">
                      <h3 className="text-white text-2xl leading-[29.26px] font-alexandria sm:leading-[39.01px] sm:text-[32px] mt-5">
                        {_.name} {_.year}
                      </h3>
                      <div className="text-[#93B4AB] text-base leading-[32.26px] flex flex-col sm:gap-5 sm:text-lg font-alexandria">
                        <div>
                          &quot;{_.text}
                          {!_.subText && `"`}
                        </div>
                        {_.subText && <div>{_.subText}&quot;</div>}
                      </div>
                      <div className="flex items-center gap-1">
                        <Image src={StarIcon} alt="star_icon" />
                        <p className="text-xl text-white"> {_.starCount}</p>
                      </div>
                      <div className="flex w-[85%] sm:w-fit gap-5 absolute sm:left-10 sm:bottom-0 -bottom-3 justify-center sm:justify-normal">
                        <CarouselPrevious
                          className="relative -left-0 top-0 w-[53px] h-[53px] bg-[#14382E] border-none"
                          customIcon
                        />
                        <CarouselNext
                          className="relative -right-0 top-0 w-[53px] h-[53px] bg-[#14382E] border-none"
                          customIcon
                        />
                      </div>
                    </div>
                    <div className="h-full">
                      <Image
                        src={HotAirBallon}
                        alt="review image"
                        width={516}
                        height={449}
                        className="rounded-[14px] object-cover sm:object-fill w-full sm:h-[449px]"
                      />
                    </div>
                    {/* <div className="flex w-full gap-5 justify-center items-center mt-5 h-[53px]">
                      <CarouselPrevious
                        className="relative -left-0 top-0 w-[53px] h-[53px] bg-[#14382E] border-none"
                        customIcon
                      />
                      <CarouselNext
                        className="relative -right-0 top-0 w-[53px] h-[53px] bg-[#14382E] border-none"
                        customIcon
                      />
                    </div> */}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </SectionWrapper>
    </section>
  );
};

export default Reviews;
