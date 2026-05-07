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
import TripCard from "@/components/ui/trip-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useTripStore from "@/stores/trip-store";
import { generateTripLink } from "@/lib/utils";
import { Loader } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import { CartItem } from "@/types/cart";
import { useIsMobile } from "@/hooks";

const UpcomingTrips = ({ isCart = false }: { isCart?: boolean }) => {
  const isMobile = useIsMobile(640);
  const router = useRouter();

  const { addToCart, setShowCart, showCart } = useCartStore();

  const handleAddToCart = (item: CartItem) => {
    if (!showCart && !isMobile) {
      setShowCart(true);
    }
    toast.success("Added to cart");
    addToCart(item);
  };

  const { trips, loading } = useTripStore();
  const currentDate = new Date();

  const formattedTrips =
    trips
      ?.map((x) => ({ ...x, quantity: 1 }))
      ?.filter((item) => new Date(item.startDate) >= currentDate && !item?.soldOut)
      .sort((a, b) => Number(new Date(a?.startDate)) - Number(new Date(b?.startDate))) ?? [];

  if (formattedTrips.length === 0) return null;

  return (
    <section className="px-5 py-10 sm:py-[62px] sm:px-[100px]">
      <div className="max-w-[1440px] mx-auto">
        <Carousel opts={{ align: "start" }}>
          <div className="flex items-center justify-between mb-8 sm:mb-9">
            <h2 className="font-ogg-trial text-[32px] sm:text-[42px] leading-tight text-[hsl(var(--text-primary))]">
              Upcoming group trips
            </h2>
            <div className="flex gap-2 items-center">
              <CarouselPrevious
                className="relative left-0 top-0 translate-y-0 w-[56px] h-[56px] bg-[#EEEEEE] border-none rounded-full hover:bg-[#EEEEEE]/80 dark:bg-[hsl(var(--bg-tertiary))] dark:hover:bg-[hsl(var(--bg-tertiary))]/80"
                customIcon
              />
              <CarouselNext
                className="relative right-0 top-0 translate-y-0 w-[56px] h-[56px] bg-gradient-to-r from-[#FA93F4] from-[28.5%] to-[#EE7FE7] border-none rounded-full hover:opacity-90"
                customIcon
              />
            </div>
          </div>

          {loading ? (
            <div className="w-full h-[300px] flex justify-center items-center">
              <Loader className="text-secondary-irish-green animate-spin" />
            </div>
          ) : (
            <CarouselContent className="-ml-5">
              {formattedTrips.map((trip) => (
                <CarouselItem
                  key={trip.sys.id}
                  className="pl-5 basis-4/5 sm:basis-[416px] shrink-0"
                >
                  <TripCard
                    handleClick={() => router.push(generateTripLink(trip))}
                    item={trip}
                    handleAddToCart={() => handleAddToCart(trip)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
        </Carousel>

        <div className="w-full flex justify-center">
          <Link href="/trips">
            <Button role="link" className="mt-10 sm:mt-9 w-full sm:w-fit mx-auto">
              See all trips
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingTrips;
