"use client";
import React from "react";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CustomLoader,
} from "@/components/ui";
import SectionWrapper from "./section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { queryGetLatestBlogPosts } from "@/queries/blog-query";
import { BlogPostsResponse } from "@/types/blog";
import { calcReadTime } from "@/lib/read-time";
import dayjs from "@/lib/dayjs";
import { m } from "motion/react";
import { fadeUp, inViewport } from "@/lib/motion";

const FALLBACK_IMAGE = "/img/public-trip.svg";

const BlogCallout = () => {
  const { data, loading } = useQuery<BlogPostsResponse>(
    queryGetLatestBlogPosts(4)
  );
  const posts = data?.blogPostCollection.items ?? [];

  return (
    <section className="px-5 py-10 sm:py-[60px] sm:px-[109px]">
      <SectionWrapper>
        <Carousel opts={{ align: "start" }}>
          <div className="flex items-start justify-between sm:mb-6 sm:mb-12">
            <m.h2
              className="font-ogg-trial text-[24px] sm:text-[42px] text-neutral-text dark:text-white leading-tight"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inViewport}
            >
              Travel Insights from our blog
            </m.h2>
            <div className="hidden sm:flex gap-2 items-center">
              <CarouselPrevious
                className="relative left-0 top-0 translate-y-0 w-[48px] h-[48px]"
                customIcon
              />
              <CarouselNext
                className="relative right-0 top-0 translate-y-0 w-[48px] h-[48px]"
                customIcon
              />
            </div>
          </div>

          {loading ? (
            <div className="h-[280px] flex items-center justify-center">
              <CustomLoader />
            </div>
          ) : (
            <CarouselContent className="-ml-3">
              {posts.map((post) => (
                <CarouselItem
                  key={post.sys.id}
                  className="pl-3 basis-full sm:basis-[399px] shrink-0 h-auto"
                >
                  <div className="flex flex-col gap-3 p-4 h-full">
                    <div className="h-[220px] rounded-[12px] overflow-hidden relative">
                      <Image
                        src={post.coverImage?.url ?? FALLBACK_IMAGE}
                        alt={post.title}
                        fill
                        className="object-cover rounded-[12px]"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-subtext dark:text-[#BFC0C2]">
                      <span>{dayjs.utc(post.date).format("MMM D, YYYY")}</span>
                      {post.body?.json && (
                        <>
                          <span>·</span>
                          <span>{calcReadTime(post.body.json)}</span>
                        </>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1">
                      <h3 className="text-[16px] sm:text-[20px] font-semibold text-neutral-text dark:text-white leading-[24px] sm:leading-[32px] line-clamp-2 min-h-[60px]">
                        {post.title}
                      </h3>
                      <p className="text-[14px] sm:text-sm text-neutral-subtext dark:text-[#BFC0C2] leading-[18px] sm:leading-[22px] line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="mt-auto">
                      <Button variant="green-outline" className="w-full mt-1">
                        Read more
                      </Button>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
        </Carousel>
      </SectionWrapper>
    </section>
  );
};

export default BlogCallout;
