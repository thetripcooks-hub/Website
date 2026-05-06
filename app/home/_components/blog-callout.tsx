"use client";
import React from "react";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import SectionWrapper from "./section-wrapper";
import Image from "next/image";
import Link from "next/link";

const BLOG_POSTS = [
  {
    id: "1",
    date: "Feb 28, 2026",
    readTime: "5 min read",
    title: "10 Things to Pack for a Group Trip (That Nobody Ever Does)",
    excerpt:
      "Veteran group travellers share the most overlooked essentials that make or break a shared adventure. From portable chargers to foldable tote bags.",
    image: "/img/public-trip.svg",
    href: "/blog",
  },
  {
    id: "2",
    date: "Mar 10, 2026",
    readTime: "4 min read",
    title: "Why Group Travel Is the New Solo Travel",
    excerpt:
      "Forget what you thought you knew about travelling in a group. The new wave of curated group trips is changing everything.",
    image: "/img/private-trip.svg",
    href: "/blog",
  },
  {
    id: "3",
    date: "Mar 18, 2026",
    readTime: "6 min read",
    title: "Top 5 Destinations for First-Time Group Travellers",
    excerpt:
      "Not sure where to start? These five destinations are perfectly suited for first-timers looking to explore with a crew.",
    image: "/img/travel-planning.svg",
    href: "/blog",
  },
  {
    id: "4",
    date: "Apr 1, 2026",
    readTime: "3 min read",
    title: "How to Budget for a Group Trip Without Losing Friends",
    excerpt:
      "Money talk can get awkward. Here's how top group travel organizers keep costs transparent and friendships intact.",
    image: "/img/public-trip.svg",
    href: "/blog",
  },
];

const BlogCallout = () => {
  return (
    <section className="px-5 py-10 sm:py-[60px] sm:px-[109px]">
      <SectionWrapper>
        <Carousel opts={{ align: "start" }}>
          {/* Header with nav buttons inside Carousel context */}
          <div className="flex items-start justify-between mb-8 sm:mb-12">
            <h2 className="font-ogg-trial text-[28px] sm:text-[48px] text-neutral-text dark:text-white max-w-[455px] leading-tight">
              Travel Insights from our blog
            </h2>
            <div className="hidden sm:flex gap-2 items-center">
              <CarouselPrevious className="relative left-0 top-0 translate-y-0 w-[48px] h-[48px] bg-neutral-grey-200 border-none rounded-full hover:bg-neutral-grey-200/80" />
              <CarouselNext
                className="relative right-0 top-0 translate-y-0 w-[48px] h-[48px] bg-gradient-to-r from-[#FA93F4] from-[28.5%] to-[#EE7FE7] border-none rounded-full hover:opacity-90"
                customIcon
              />
            </div>
          </div>

          <CarouselContent className="-ml-3">
            {BLOG_POSTS.map((post) => (
              <CarouselItem key={post.id} className="pl-3 basis-full sm:basis-[399px] shrink-0">
                <div className="flex flex-col gap-3 p-4">
                  {/* Image */}
                  <div className="h-[220px] rounded-[12px] overflow-hidden relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover rounded-[12px]"
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-2 text-sm font-medium text-neutral-subtext">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title + excerpt */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[24px] font-semibold text-neutral-text leading-[36px]">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-subtext leading-[22px] line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link href={post.href}>
                    <Button variant="green-outline" className="w-full mt-1">
                      Read more
                    </Button>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </SectionWrapper>
    </section>
  );
};

export default BlogCallout;
