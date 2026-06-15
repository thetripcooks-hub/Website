"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, ChevronLeft } from "lucide-react";
import TripInfo from "./trip-info";
import TravelWithOwners from "./travel-with-owners";
import WhatsIncluded from "./whats-included";
import PaymentCard from "./payment-card";
import useTripStore from "@/stores/trip-store";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import type { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const TripDetailOverview = () => {
  const { selectedTrip } = useTripStore();
  const [mobileApi, setMobileApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const onSelect = useCallback(() => {
    if (!mobileApi) return;
    setSelectedIndex(mobileApi.selectedScrollSnap());
  }, [mobileApi]);

  useEffect(() => {
    if (!mobileApi) return;
    mobileApi.on("select", onSelect);
    return () => { mobileApi.off("select", onSelect); };
  }, [mobileApi, onSelect]);

  if (!selectedTrip) return null;

  const images = selectedTrip.bannerImagesCollection.items;
  const img0 = images[0]?.url;
  const img1 = images[1]?.url ?? img0;
  const img2 = images[2]?.url ?? img0;

  return (
    <div className="px-4 py-6 sm:px-[109px] sm:py-10 bg-[hsl(var(--bg-primary))]">
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-5">
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Location title — desktop only */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="w-10 h-10 rounded-full bg-[hsl(var(--bg-secondary))] flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
            >
              <ChevronLeft size={20} className="text-[hsl(var(--text-primary))]" />
            </button>
            <h1 className="font-ogg-trial text-[40px] leading-[60px] text-[hsl(var(--text-primary))]">
              {selectedTrip.location}
            </h1>
          </div>

          {/* Desktop image grid */}
          <div className="hidden sm:flex gap-2 h-[520px] relative overflow-hidden">
            {/* Large image */}
            <div className="w-[394px] shrink-0 relative rounded-[8px] overflow-hidden">
              {img0 && (
                <Image
                  src={img0}
                  alt={selectedTrip.location}
                  fill
                  priority
                  className="object-cover"
                />
              )}
            </div>
            {/* Two stacked images */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex-1 relative rounded-[8px] overflow-hidden">
                {img1 && (
                  <Image
                    src={img1}
                    alt={selectedTrip.location}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 relative rounded-[8px] overflow-hidden">
                {img2 && (
                  <Image
                    src={img2}
                    alt={selectedTrip.location}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
            {/* View all pill */}
            <div className="absolute bottom-[22px] right-[26px] bg-[hsl(var(--bg-primary))] rounded-full px-4 py-1.5 flex items-center gap-1.5 cursor-pointer">
              <ImageIcon width={20} height={20} className="text-[hsl(var(--text-primary))]" />
              <span className="text-[16px] text-[hsl(var(--text-primary))]">View all</span>
            </div>
          </div>

          {/* Mobile image carousel */}
          <div className="sm:hidden flex flex-col gap-4">
            {/* Location title — mobile */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                aria-label="Go back"
                className="w-10 h-10 rounded-full bg-[hsl(var(--bg-secondary))] flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
              >
                <ChevronLeft size={20} className="text-[hsl(var(--text-primary))]" />
              </button>
              <h1 className="font-ogg-trial text-[40px] leading-[60px] text-[hsl(var(--text-primary))]">
                {selectedTrip.location}
              </h1>
            </div>
            <Carousel
              setApi={setMobileApi}
              opts={{ loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i} className="relative h-[354px] rounded-[8px] overflow-hidden">
                    <Image
                      src={img.url}
                      alt={selectedTrip.location}
                      fill
                      priority={i === 0}
                      className="object-cover rounded-[8px]"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* Dots */}
            <div className="flex gap-2 items-center justify-center">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-full transition-all duration-200",
                    i === selectedIndex
                      ? "w-8 h-1.5 bg-secondary-irish-green"
                      : "w-1.5 h-1.5 bg-border"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Trip info, dividers, travel-with-owners, included */}
          <div className="flex flex-col gap-6">
            <TripInfo />
            <div className="border-t border-border" />
            {selectedTrip.travelWithOwners && (
              <>
                <TravelWithOwners />
                <div className="border-t border-border" />
              </>
            )}
            <WhatsIncluded />
          </div>
        </div>

        {/* Right column — desktop payment card (sticky) */}
        <div className="hidden sm:block shrink-0 w-[394px] sticky top-[95px] self-start">
          <PaymentCard />
        </div>
      </div>
    </div>
  );
};

export default TripDetailOverview;
