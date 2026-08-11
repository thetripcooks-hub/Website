"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useTripStore from "@/stores/trip-store";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import type { CarouselApi } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ItineraryItem = {
  day: string;
  activity: string;
  coverImage?: string;
  description?: string;
};

function PrevArrowButton({
  canScrollPrev,
  onClick,
}: {
  canScrollPrev: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!canScrollPrev}
      aria-label="Previous"
      className={cn(
        "w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors disabled:cursor-not-allowed",
        canScrollPrev
          ? "bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7]"
          : "bg-[hsl(var(--border))]",
      )}
    >
      <ArrowLeft
        className={cn(
          "w-5 h-5",
          canScrollPrev ? "text-neutral-text" : "text-[hsl(var(--text-primary))]",
        )}
      />
    </button>
  );
}

function NextArrowButton({
  canScrollNext,
  onClick,
}: {
  canScrollNext: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!canScrollNext}
      aria-label="Next"
      className={cn(
        "w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors disabled:cursor-not-allowed",
        canScrollNext
          ? "bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7]"
          : "bg-[hsl(var(--border))]",
      )}
    >
      <ArrowRight
        className={cn(
          "w-5 h-5",
          canScrollNext ? "text-neutral-text" : "text-[hsl(var(--text-primary))]",
        )}
      />
    </button>
  );
}

const Itinerary = () => {
  const { selectedTrip } = useTripStore();
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (!selectedTrip || !selectedTrip.itinerary?.length) return null;

  const itinerary = selectedTrip.itinerary as ItineraryItem[];

  return (
    <div className="bg-[hsl(var(--bg-secondary))] px-4 py-14 sm:px-[109px]">
      {/* Heading row — desktop shows arrows here, mobile hides them */}
      <div className="flex items-center justify-between mb-[43px]">
        <h3 className="font-ogg-trial text-[24px] sm:text-[42px] leading-tight text-[hsl(var(--text-primary))]">
          Daily Itinerary
        </h3>

        {/* Desktop-only nav arrows */}
        <div className="hidden sm:flex gap-2">
          <PrevArrowButton
            canScrollPrev={canScrollPrev}
            onClick={() => emblaApi?.scrollPrev()}
          />
          <NextArrowButton
            canScrollNext={canScrollNext}
            onClick={() => emblaApi?.scrollNext()}
          />
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        setApi={setEmblaApi}
        opts={{ align: "start" }}
        className="w-full"
      >
        <CarouselContent className="-ml-5">
          {itinerary.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-5 basis-[calc(100vw-12px)] sm:basis-[394px]"
            >
              <div className="bg-[hsl(var(--bg-primary))] dark:bg-[hsl(var(--bg-tertiary))] flex flex-col gap-3 p-4 h-full rounded-[12px] border border-[#eee] dark:border-[#585E6A]">
                {item.coverImage ? (
                  <div className="relative h-[220px] rounded-[12px] overflow-hidden shrink-0">
                    <Image
                      src={item.coverImage}
                      fill
                      alt={item.activity}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-[220px] rounded-[12px] bg-[hsl(var(--bg-tertiary))] shrink-0" />
                )}
                <div className="flex flex-col gap-[13px]">
                  <p className="text-[14px] font-medium leading-[21px] text-[hsl(var(--text-secondary))]">
                    Day {item.day}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[18px] sm:text-[24px] font-semibold leading-[26px] sm:leading-[36px] text-[hsl(var(--text-primary))]">
                      {item.activity}
                    </h4>
                    {item.description && (
                      <p className="text-[14px] leading-[22px] text-[hsl(var(--text-secondary))]">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Mobile-only nav arrows at bottom */}
      <div className="flex sm:hidden gap-4 items-center justify-center mt-8">
        <PrevArrowButton
          canScrollPrev={canScrollPrev}
          onClick={() => emblaApi?.scrollPrev()}
        />
        <NextArrowButton
          canScrollNext={canScrollNext}
          onClick={() => emblaApi?.scrollNext()}
        />
      </div>
    </div>
  );
};

export default Itinerary;
