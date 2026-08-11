"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui";
import type { CarouselApi } from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import useGeneralStore from "@/stores/generalStore";
import { useIsMobile } from "@/hooks";
import Link from "next/link";
import { m } from "motion/react";
import { fadeUp } from "@/lib/motion";

const SERVICES = [
  {
    key: "groupTrips",
    title: "Group Trips",
    description:
      "Get those travel plans out of the group chat and explore new territories",
    href: "/trips",
  },
  {
    key: "privateTrips",
    title: "Private Trips",
    description:
      "Need to explore a new location on your own? We're here for you!",
    href: "/private-trips",
  },
  {
    key: "travelGuide",
    title: "Travel Guide",
    description:
      "Receive a professionally curated travel guide packed with insider tips, hidden gems, and day-by-day itineraries.",
    href: "https://tripcooks.gumroad.com/",
  },
  {
    key: "travelPlanning",
    title: "Travel Planning",
    description:
      "Tell us your dream trip and we'll build a tailor-made itinerary from scratch.",
    href: "/contact",
  },
];

const OurServices = () => {
  const { services: data } = useGeneralStore();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile(640);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const getImage = (key: string) => {
    if (key === "travelPlanning") {
      return "https://res.cloudinary.com/dqpyorulu/image/upload/v1786197627/IMG_2338_elaayl.jpg";
    }
    if (!data?.[0]) return "";
    switch (key) {
      case "groupTrips":
        return data[0].groupTrips?.url ?? "/img/public-trip.svg";
      case "privateTrips":
        return data[0].privateTrips?.url ?? "/img/private-trip.svg";
      case "travelGuide":
        return data[0].travelPlanning?.url ?? "/img/travel-planning.svg";
      default:
        return "/img/public-trip.svg";
    }
  };

  return (
    <section className="bg-[#02231A] py-10 sm:py-[62px] rounded-[28px] my-4 overflow-hidden">
      {/* Header */}
      <m.div
        className="flex flex-col items-center gap-4 text-center mb-10 sm:mb-[75px] px-5"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <h2 className="font-ogg-trial text-[26px] sm:text-[42px] text-white leading-tight">
          Our Services
        </h2>
        <p className="text-[#5d9f8b] text-base text-[14px] sm:text-[18px] max-w-[554px] leading-[22px] sm:leading-[28px]">
          From organizing unforgettable group trips to crafting tailor-made
          adventures, our services cover every aspect of your journey.
        </p>
      </m.div>

      {/* Cards carousel */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: false,
          dragFree: true,
          duration: isMobile ? 20 : 500,
          inViewThreshold: 0.5,
          skipSnaps: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 sm:-ml-6 px-5 sm:px-[109px]">
          {SERVICES.map((service, i) => {
            const imgSrc = getImage(service.key);
            const isActive = i === current;
            return (
              <CarouselItem
                key={service.key}
                className={cn(
                  "pl-4 sm:pl-6 transition-all duration-500 basis-[85%]",
                  isActive ? "sm:basis-[57%]" : "sm:basis-[44%]",
                )}
              >
                <m.div
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-[350px] sm:h-[485px] rounded-[16px] overflow-hidden"
                >
                  <Link
                    href={service.href}
                    className="relative block h-full w-full"
                    style={{
                      backgroundImage: imgSrc ? `url(${imgSrc})` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-[16px] transition-all duration-500",
                        isActive ? "bg-black/50" : "bg-black/35",
                      )}
                    />

                    {/* Bottom content */}
                    <div className="absolute bottom-4 sm:bottom-8 left-5 right-5 sm:left-6 sm:right-6 flex items-end gap-4 sm:gap-9">
                      <div className="flex-1 flex flex-col gap-2 sm:gap-[11px] text-white min-w-0">
                        <h3 className="font-ogg-trial text-[22px] sm:text-[44px] leading-tight sm:leading-[66px]">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-[20px] leading-6 sm:leading-[30px] font-plus-jakarta-sans font-normal">
                          {service.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost-arrow"
                        className="items-center gap-2 whitespace-nowrap font-plus-jakarta-sans font-medium hidden sm:flex shrink-0 pointer-events-none"
                      >
                        Learn more <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </Link>
                </m.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Dot pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {SERVICES.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-4 rounded-full transition-all duration-700",
              i === current
                ? "w-[63px] bg-white"
                : "w-4 bg-secondary-forest-green-100",
            )}
            aria-label={`Go to service ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default OurServices;
