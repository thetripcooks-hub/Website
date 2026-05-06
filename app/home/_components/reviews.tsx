"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CustomLoader,
} from "@/components/ui";
import Image from "next/image";
import React from "react";
import { Star } from "lucide-react";
import SectionWrapper from "./section-wrapper";
import useGeneralStore from "@/stores/generalStore";
import dayjs from "@/lib/dayjs";

const Reviews = () => {
  const { reviews, loadingReviews } = useGeneralStore();

  const data = reviews.map((review) => ({
    id: review.sys.id,
    text: review?.text?.json?.content[0]?.content[0]?.value ?? "",
    subText: review.subText
      ? review?.subText?.json?.content[0]?.content[0]?.value
      : "",
    name: review.location,
    year: dayjs.utc(review.date).format("YYYY"),
    starCount: review.starCount,
    imageUrl: review.reviewImage ? review.reviewImage.url : "",
  }));

  return (
    <section className="bg-[#f8f9fc] px-5 py-12 sm:py-24 sm:px-[8%] w-full">
      <SectionWrapper>
        <h2 className="font-ogg-trial text-[32px] sm:text-[44px] text-center text-neutral-text dark:text-foreground mb-10 sm:mb-16">
          People actually really like us..
        </h2>

        {loadingReviews ? (
          <div className="h-[400px] w-full flex items-center justify-center">
            <CustomLoader />
          </div>
        ) : (
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="flex items-center">
              {data.map((review, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-14 p-6 sm:p-9 max-w-[1145px] mx-auto">
                    {/* Polaroid image */}
                    {review.imageUrl && (
                      <div className="shrink-0 flex items-center justify-center w-[189px] h-[189px]">
                        <div className="rotate-[-10deg] border-4 border-white shadow-[0px_4px_15.5px_2px_rgba(117,117,117,0.25)] rounded-[12px] w-[163px] h-[163px] overflow-hidden">
                          <Image
                            src={review.imageUrl}
                            alt={review.name}
                            width={163}
                            height={163}
                            className="object-cover w-full h-full rounded-[12px]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-col gap-4 max-w-[697px]">
                      <h3 className="text-[28px] sm:text-[32px] font-semibold text-neutral-text dark:text-foreground leading-tight">
                        {review.name} {review.year}
                      </h3>
                      <p className="text-base sm:text-[18px] text-neutral-subtext dark:text-[#BFC0C2] leading-[28px]">
                        &quot;{review.text}
                        {review.subText && (
                          <>
                            <br /><br />{review.subText}
                          </>
                        )}&quot;
                      </p>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-secondary-irish-green text-secondary-irish-green" />
                        <span className="text-[20px] font-medium text-neutral-text">
                          {review.starCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Nav buttons centered below */}
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="relative left-0 top-0 w-[48px] h-[48px] bg-neutral-grey-200 border-none rounded-full hover:bg-neutral-grey-200/80" />
              <CarouselNext className="relative right-0 top-0 w-[48px] h-[48px] bg-gradient-to-r from-[#FA93F4] from-[28.5%] to-[#EE7FE7] border-none rounded-full hover:opacity-90" customIcon />
            </div>
          </Carousel>
        )}
      </SectionWrapper>
    </section>
  );
};

export default Reviews;
