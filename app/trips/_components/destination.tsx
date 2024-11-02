"use client";
import SectionWrapper from "@/app/home/_components/section-wrapper";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui";
import React from "react";
import TripCard from "@/components/ui/trip-card";
import { useRouter } from "next/navigation";
import SortByButton from "./sort-by";

const Destination = () => {
  const router = useRouter();
  return (
    <div className="px-5 py-10 sm:py-20 text-white sm:px-[8%]">
      <SectionWrapper>
        <SortByButton />

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-y-8 sm:gap-y-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
            <TripCard
              key={item}
              isDiscounted={index > 3}
              handleClick={() => router.push(`/trips/${index + 1}`)}
            />
          ))}
        </section>
        <Pagination className="text-neutral-text mt-10">
          <PaginationContent className="flex items-center gap-1 sm:gap-2.5">
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">6</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </SectionWrapper>
    </div>
  );
};

export default Destination;
