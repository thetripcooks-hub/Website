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
import React, { useEffect, useState } from "react";
import TripCard from "@/components/ui/trip-card";
import { useRouter } from "next/navigation";
import SortByButton from "./sort-by";
import useCartStore from "@/stores/cartStore";
import { CartItem } from "@/types/cart";
import { useIsMobile } from "@/hooks";
import EmptyCart from "@/app/cart/_components/empty-cart";
import usePaginatedTrips from "@/hooks/trips/usePaginatedTrips";
import { cn, generateTripLink } from "@/lib/utils";
import { Loader } from "lucide-react";

const Destination = () => {
  const {
    paginatedTrips,
    page: currentPage,
    totalPages,
    loading,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    getPaginationNumbers,
  } = usePaginatedTrips();

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

  const [formatttedTrips, setFormattedValue] = useState<CartItem[]>([]);

  useEffect(() => {
    setFormattedValue(
      paginatedTrips?.map((x) => ({
        ...x,
        quantity: 1,
      })) ?? []
    );
  }, [paginatedTrips]);

  return (
    <div className="px-5 py-10 sm:py-20 text-white sm:px-[8%]">
      {loading ? (
        <div className="w-full h-[20vh] flex text-foreground justify-center  items-center">
          <Loader className="w-5 h-5 text-secondary-irish-green animate-spin" />
        </div>
      ) : formatttedTrips.length > 0 ? (
        <SectionWrapper>
          <SortByButton />
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-y-8 sm:gap-y-12">
            {formatttedTrips.map((item) => (
              <TripCard
                key={item.sys.id}
                item={item}
                handleClick={() => router.push(generateTripLink(item))}
                handleAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </section>
          <Pagination className="text-neutral-text mt-10">
            <PaginationContent className="flex items-center gap-1 sm:gap-2.5">
              <PaginationItem onClick={handlePreviousPage}>
                <PaginationPrevious
                  href={{}}
                  className={cn(currentPage === 1 && "cursor-not-allowed")}
                  // scroll={false}
                  onClick={(e) => e.preventDefault()}
                />
              </PaginationItem>
              {getPaginationNumbers().map((page, index) => {
                if (page === "...") {
                  return (
                    <PaginationItem key={Math.random()}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return (
                  <PaginationItem
                    key={index}
                    onClick={() => handlePageChange(page as number)}
                  >
                    <PaginationLink href="#" isActive={page === currentPage}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              {/* <PaginationItem>
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
              </PaginationItem> */}
              <PaginationItem
                onClick={handleNextPage}
                className={cn(
                  currentPage === totalPages && "cursor-not-allowed"
                )}
              >
                <PaginationNext
                  href={{}}
                  // scroll={false}
                  onClick={(e) => e.preventDefault()}
                />
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
