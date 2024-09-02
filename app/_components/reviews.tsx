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
import Marrakesh from "@/components/icons/svg/flags/monaco.svg";
import Montenegro from "@/components/icons/svg/flags/montenegro.svg";
import Turkey from "@/components/icons/svg/flags/turkey.svg";

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
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[60%] sm:w-[90%] mx-auto py-10 sm:py-20"
    >
      <CarouselContent className="flex items-center">
        {data.map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            {/* <div className="p-1"> */}
            <Card className="border border-neutral-grey-200 shadow-[#0000000D] rounded-[16px] h-fit">
              <CardContent className="flex flex-col justify-between aspect-square items-center  p-5">
                <div className="text-[#020E0B] text-lg leading-[32.26px] flex flex-col gap-5">
                  <div>
                    "{_.text}
                    {!_.subText && `"`}
                  </div>
                  {_.subText && <div>{_.subText}"</div>}
                </div>
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Image
                      src={_.flag}
                      width={20}
                      height={20}
                      alt="country_flag"
                      className="w-5 h-5 rounded-full"
                    />
                    <p>
                      {_.name} {_.year}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image src={StarIcon} alt="star_icon" />
                    <p className="text-xl"> {_.starCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* </div> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Reviews;
