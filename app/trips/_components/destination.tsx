"use client";
import SectionWrapper from "@/app/_components/section-wrapper";
import {
  Button,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui";
import Image from "next/image";
import React from "react";
import SettingsMobile from "@/components/icons/svg/settings-mobile.svg";
import SettingsDesktop from "@/components/icons/svg/settings-desktop.svg";
import TripCard from "@/components/ui/trip-card";
import { useRouter } from "next/navigation";

const Destination = () => {
  const router = useRouter();
  return (
    <div className="px-5 py-20 text-white sm:px-[8%]">
      <SectionWrapper>
        <section className="text-neutral-text flex justify-between gap-5 items-center mb-5">
          <h6>&nbsp;</h6>
          <Button
            variant="outline"
            className="hidden sm:flex text-neutral-text min-w-fit gap-2.5 border-[#E1E6EF] rounded-[8px]"
          >
            Sort by
            <Image
              src={SettingsDesktop}
              alt="light-mode"
              style={{ height: "20px" }}
            />
          </Button>
          <Button
            size="icon"
            className="bg-transparent outline-none bg-none hover:bg-transparent  focus-visible:bg-transparent focus-visible:ring-0 shadow-none h-[40px] w-[40px] sm:hidden border rounded-full border-[#E1E6EF]"
          >
            <Image
              src={SettingsMobile}
              alt="light-mode"
              style={{ height: "14.81px" }}
            />
          </Button>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
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
