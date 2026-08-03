"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import TripInfo from "./trip-info";
import TravelWithOwners from "./travel-with-owners";
import WhatsIncluded from "./whats-included";
import PaymentCard from "./payment-card";
import useTripStore from "@/stores/trip-store";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import type { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const AUTOPLAY_INTERVAL = 4000;

const TripDetailOverview = () => {
  const { selectedTrip } = useTripStore();
  const [mobileApi, setMobileApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const openLightbox = (index = 0) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  return (
    <div className="px-4 py-6 sm:px-[109px] sm:py-10 bg-[hsl(var(--bg-primary))]">
      {/* Location title — desktop only, full width above the two-column layout */}
      <div className="hidden sm:flex items-center gap-3 mb-6">
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

      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-5">
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Desktop image grid */}
          <div className="hidden sm:flex gap-2 h-[520px] relative overflow-hidden">
            {/* Large image */}
            <div
              className="w-[394px] shrink-0 relative rounded-[8px] overflow-hidden cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              {img0 && (
                <Image
                  src={img0}
                  alt={selectedTrip.location}
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            {/* Two stacked images */}
            <div className="flex-1 flex flex-col gap-2">
              <div
                className="flex-1 relative rounded-[8px] overflow-hidden cursor-pointer"
                onClick={() => openLightbox(1)}
              >
                {img1 && (
                  <Image
                    src={img1}
                    alt={selectedTrip.location}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div
                className="flex-1 relative rounded-[8px] overflow-hidden cursor-pointer"
                onClick={() => openLightbox(2)}
              >
                {img2 && (
                  <Image
                    src={img2}
                    alt={selectedTrip.location}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
            </div>
            {/* View all pill */}
            <button
              onClick={() => openLightbox(0)}
              className="absolute bottom-[22px] right-[26px] bg-[hsl(var(--bg-primary))] rounded-full px-4 py-1.5 flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <ImageIcon width={20} height={20} className="text-[hsl(var(--text-primary))]" />
              <span className="text-[16px] text-[hsl(var(--text-primary))]">View all</span>
            </button>
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
              <h1 className="font-ogg-trial text-[28px] leading-[42px] text-[hsl(var(--text-primary))]">
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
                  <CarouselItem
                    key={i}
                    className="relative h-[354px] rounded-[8px] overflow-hidden cursor-pointer"
                    onClick={() => openLightbox(i)}
                  >
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

          {/* Inline booking card — mobile only */}
          <div className="sm:hidden mt-2">
            <PaymentCard />
          </div>
        </div>

        {/* Right column — desktop payment card (sticky) */}
        <div className="hidden sm:block shrink-0 w-[394px] sticky top-[95px] self-start">
          <PaymentCard />
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <LightBox
          images={images}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
};

function LightBox({
  images,
  initialIndex,
  onClose,
}: {
  images: { url: string; title?: string }[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const total = images.length;

  const goTo = useCallback(
    (i: number) => setIndex((i + total) % total),
    [total]
  );

  // Auto-play — restarts whenever index changes
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, onClose, goTo]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Counter */}
      <span className="absolute top-5 left-5 text-white/70 text-sm font-medium">
        {index + 1} / {total}
      </span>

      {/* Image */}
      <div
        className="relative w-full max-w-4xl h-[70vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={index}
          src={images[index].url}
          alt={images[index].title ?? ""}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Prev / Next */}
      <button
        onClick={(e) => { e.stopPropagation(); goTo(index - 1); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); goTo(index + 1); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Dot indicators */}
      <div
        className="absolute bottom-6 flex gap-2 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
            className={cn(
              "rounded-full transition-all duration-300",
              i === index ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default TripDetailOverview;
