"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui";
import SectionWrapper from "./section-wrapper";
import TripCard from "@/components/ui/trip-card";
import CartIcon from "~/img/shopping-cart.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useTripStore from "@/stores/trip-store";
import {
  formatTripDate,
  generateTripLink,
  percentage,
  formatAmount,
} from "@/lib/utils";
import useGeneralStore from "@/stores/generalStore";
import { Loader } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import { CartItem } from "@/types/cart";
import { useIsMobile } from "@/hooks";
import ComingSoonBadge from "./coming-soon-badge";

const UpcomingTrips = ({ isCart = false }: { isCart?: boolean }) => {
  const { selectedCurrency } = useGeneralStore();
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

  // const currentDate = new Date();

  const formatttedTrips =
    trips?.map((x) => ({
      ...x,
      quantity: 1,
    })) ?? [];
  // ?.filter((item) => new Date(item.startDate) >= currentDate)
  // .sort(
  //   (a, b) => Number(new Date(a.startDate)) - Number(new Date(b.startDate)))

  return formatttedTrips.length > 0 ? (
    <section className="px-5 py-10 sm:py-20 sm:px-[8%]">
      <SectionWrapper>
        <h3 className="text-[32px] font-medium sm:text-5xl">Upcoming Trips</h3>
        {loading ? (
          <div className="w-full h-[300px] flex justify-center items-center">
            <Loader className="text-secondary-irish-green animate-spin" />
          </div>
        ) : (
          <>
            {/* desktop */}
            <div className="hidden sm:grid mt-10 grid-cols-3 gap-10">
              {/* (isCart ? 3 : 6) */}
              {formatttedTrips.slice(0, 3).map((trip) => (
                <TripCard
                  key={trip.sys.id}
                  handleClick={() => router.push(generateTripLink(trip))}
                  item={trip}
                  handleAddToCart={() => handleAddToCart(trip)}
                />
              ))}
            </div>

            {/* mobile */}
            <div className="mt-5 sm:hidden flex flex-col gap-10">
              <Carousel className="w-full">
                <CarouselContent>
                  {formatttedTrips.map((trip, index) => (
                    <CarouselItem
                      className="text-foreground basis-4/5 cursor-pointer relative"
                      key={trip.sys.id}
                    >
                      {trip.soldOut ? (
                        <div className="absolute right-3 top-3">
                          <ComingSoonBadge text="Sold Out" />
                        </div>
                      ) : (
                        <div
                          className="bg-[#020E0B4D] rounded-full w-8 h-8 flex items-center justify-center absolute right-3 top-3"
                          onClick={() =>
                            trip.soldOut ? {} : handleAddToCart(trip)
                          }
                        >
                          <Image
                            src={CartIcon}
                            width={18}
                            height={18}
                            alt="cart-icon"
                          />
                        </div>
                      )}
                      <Image
                        src={trip.bannerImagesCollection.items[0].url}
                        alt="img"
                        className="rounded-[18px] w-full sm:w-[291px]  object-cover h-[285.41px] lg:w-full"
                        width={291}
                        height={301}
                        onClick={() => router.push(generateTripLink(trip))}
                      />
                      <div className="flex flex-col gap-1 mt-2.5">
                        <h5 className="text-lg">{trip.location}</h5>
                        <p className="text-sm text-neutral-grey-500">
                          {formatTripDate(trip)}
                        </p>
                        <div className="flex gap-1 items-center">
                          {trip.discount && (
                            <h3 className="font-medium text-xl text-neutral-grey-500 line-through">
                              {formatAmount(trip.fullAmount, selectedCurrency)}
                            </h3>
                          )}
                          <h3 className="font-medium text-xl">
                            {trip.discount
                              ? formatAmount(
                                  trip.fullAmount -
                                    percentage(trip.discount, trip.fullAmount),
                                  selectedCurrency
                                )
                              : formatAmount(trip.fullAmount, selectedCurrency)}
                          </h3>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </>
        )}

        <div className="w-full flex justify-center">
          <Link href="/trips">
            <Button
              role="link"
              className="mt-10 sm:mt-14 w-full sm:w-fit mx-auto"
            >
              See more trips
            </Button>
          </Link>
        </div>
      </SectionWrapper>
    </section>
  ) : null;
};

export default UpcomingTrips;
