"use client";
import React from "react";
import Image from "next/image";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CustomLoader,
} from "@/components/ui";
import SectionWrapper from "./section-wrapper";
import useGeneralStore from "@/stores/generalStore";
import dayjs from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Community = () => {
  const { reviews, loadingReviews } = useGeneralStore();

  const data = reviews.map((review) => ({
    id: review.sys.id,
    text: review?.text?.json?.content[0]?.content[0]?.value ?? "",
    subText: review.subText
      ? review?.subText?.json?.content[0]?.content[0]?.value
      : "",
    name: review.location,
    handle: `@${review.location?.replace(/\s/g, "")}TC`,
    imageUrl: review.reviewImage ? review.reviewImage.url : "",
    avatarUrl: review.reviewImage ? review.reviewImage.url : "",
  }));

  return (
    <section className="bg-[#f8f9fc] px-5 py-10 sm:py-[79px] overflow-hidden">
      <SectionWrapper>
        {/* Header */}
        <div className="flex items-start justify-between mb-10 sm:mb-[179px]">
          <h2 className="font-ogg-trial text-[28px] sm:text-[48px] text-neutral-text max-w-[521px] leading-tight">
            Why our community loves TripCooks
          </h2>
          <Link href="/reviews" className="shrink-0 hidden sm:block">
            <Button>Read more</Button>
          </Link>
        </div>

        {loadingReviews ? (
          <div className="h-[300px] flex items-center justify-center">
            <CustomLoader />
          </div>
        ) : (
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="-ml-4">
              {data.map((review) => (
                <CarouselItem key={review.id} className="pl-4 basis-full sm:basis-auto sm:w-[calc(100%-80px)]">
                  <div className="bg-white rounded-[20px] p-[25px] flex gap-6">
                    {/* Image */}
                    {review.imageUrl && (
                      <div className="flex-1 h-[301px] rounded-[12px] overflow-hidden shrink-0 hidden sm:block min-w-0">
                        <Image
                          src={review.imageUrl}
                          alt={review.name}
                          width={400}
                          height={301}
                          className="object-cover w-full h-full rounded-[12px]"
                        />
                      </div>
                    )}
                    {/* Quote + author */}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <p className="text-base sm:text-[20px] leading-[30px] text-neutral-text whitespace-pre-wrap">
                        {review.text}
                        {review.subText && `\n\n${review.subText}`}
                      </p>
                      <div className="flex items-center gap-4 mt-6">
                        {review.avatarUrl && (
                          <div className="w-[58px] h-[58px] rounded-full overflow-hidden shrink-0">
                            <Image
                              src={review.avatarUrl}
                              alt={review.name}
                              width={58}
                              height={58}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-[18px] font-medium text-neutral-text">{review.name}</p>
                          <p className="text-base text-neutral-subtext">{review.handle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        <Link href="/reviews" className="mt-6 flex sm:hidden">
          <Button className="w-full">Read more</Button>
        </Link>
      </SectionWrapper>
    </section>
  );
};

export default Community;
