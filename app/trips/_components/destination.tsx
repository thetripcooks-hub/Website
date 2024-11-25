"use client";
import { toast } from "sonner";
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
import useTripStore from "@/stores/trip-store";
import useCartStore from "@/stores/cartStore";
import { CartItem } from "@/types/cart";
import { useIsMobile } from "@/hooks";
import EmptyCart from "@/app/cart/_components/empty-cart";

const Destination = () => {
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

  const formatttedTrips =
    trips?.map((x) => ({
      ...x,
      quantity: 1,
    })) ?? [];
  return (
    <div className="px-5 py-10 sm:py-20 text-white sm:px-[8%]">
      {formatttedTrips.length > 0 ? (
        <SectionWrapper>
          <SortByButton />

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-y-8 sm:gap-y-12">
            {formatttedTrips.map((item) => (
              <TripCard
                key={item.sys.id}
                item={item}
                handleClick={() => router.push(`/trips/${item.sys.id}`)}
                handleAddToCart={() => handleAddToCart(item)}
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
      ) : (
        <div className="my-5">
          <EmptyCart
            isModal={true}
            text="Not sure you’re searching for the right thing here. Try again?"
          />
        </div>
      )}
    </div>
  );
};

export default Destination;
