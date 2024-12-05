"use client";
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CustomLoader,
} from "@/components/ui";
import Image from "next/image";
import React from "react";
import StarIcon from "@/components/icons/svg/star.svg";
import SectionWrapper from "./section-wrapper";
import useGeneralStore from "@/stores/generalStore";
import dayjs from "dayjs";

const Reviews = () => {
  const { reviews, loadingReviews } = useGeneralStore();

  const data = reviews.map((review) => ({
    id: review.sys.id,
    text: review?.text?.json?.content[0]?.content[0]?.value ?? "",
    subText: review.subText
      ? review?.subText?.json?.content[0]?.content[0]?.value
      : "",
    name: review.location,
    year: dayjs(review.date).format("YYYY"),
    flag: "",
    starCount: review.starCount,
    imageUrl: review.reviewImage ? review.reviewImage.url : "",
  }));

  return (
    <section className="px-5 py-12 sm:py-24 sm:px-[8%] bg-cover bg-no-repeat bg-center  w-full">
      <SectionWrapper>
        <div className="w-full text-center mb-10 sm:mb-20">
          <h3 className="text-[#1D2433] leading-[39.01px] text-[32px] font-medium sm:leading-[58.51px] sm:text-[48px] mb-5 dark:text-foreground">
            Our wall of love
          </h3>
          <p className="text-neutral-subtext text-[16px] leading-[19.5px] sm:text-[20px] sm:leading-[24.38px] dark:text-[#BFC0C2]">
            The early adopters have spoken
          </p>
        </div>
        {loadingReviews ? (
          <div className="h-[485px] w-full">
            <CustomLoader />
          </div>
        ) : (
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
                  <Card className="border border-neutral-grey-200 dark:border-none shadow-[#0000000D] rounded-[14px] bg-secondary-forest-green relative sm:pl-5 sm:pr-2.5 sm:py-2.5 pb-16">
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
                      <div className="h-full mt-12 sm:mt-0">
                        <Image
                          src={_.imageUrl}
                          alt="review image"
                          width={516}
                          height={449}
                          className="rounded-[14px] object-cover sm:object-fill w-full sm:h-[449px] sm:max-w-[516px]"
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
        )}
      </SectionWrapper>
    </section>
  );
};

export default Reviews;
