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
import React, { useEffect, useState } from "react";
import TripCard from "@/components/ui/trip-card";
import { useRouter } from "next/navigation";
import SortByButton from "@/app/trips/_components/sort-by";
import { CartItem } from "@/types/cart";
import EmptyCart from "@/app/cart/_components/empty-cart";
import usePastTrips from "@/hooks/trips/usePastTrips";
import { cn, generateTripLink } from "@/lib/utils";
import { Loader } from "lucide-react";
import { RevealGrid } from "@/components/motion/reveal-grid";

const PastDestination = () => {
  const {
    paginatedTrips,
    page: currentPage,
    totalPages,
    loading,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    getPaginationNumbers,
  } = usePastTrips();

  const router = useRouter();

  const [formattedTrips, setFormattedTrips] = useState<CartItem[]>([]);

  useEffect(() => {
    setFormattedTrips(
      paginatedTrips?.map((x) => ({
        ...x,
        quantity: 1,
      })) ?? []
    );
  }, [paginatedTrips]);

  return (
    <div className="px-4 py-9 sm:px-[109px]">
      {loading ? (
        <div className="w-full h-[20vh] flex text-foreground justify-center items-center">
          <Loader className="w-5 h-5 text-secondary-irish-green animate-spin" />
        </div>
      ) : formattedTrips.length > 0 ? (
        <SectionWrapper>
          <SortByButton />
          <RevealGrid
            eager
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-y-8 sm:gap-y-12"
            items={formattedTrips}
            keyFn={(item) => item.sys.id}
            renderItem={(item) => (
              <TripCard
                item={item}
                isPast
                handleClick={() => router.push(generateTripLink(item))}
                handleAddToCart={() => {}}
              />
            )}
          />
          <Pagination className="text-neutral-text mt-10">
            <PaginationContent className="flex items-center gap-1 sm:gap-2.5">
              <PaginationItem onClick={handlePreviousPage}>
                <PaginationPrevious
                  href={{}}
                  className={cn(currentPage === 1 && "cursor-not-allowed")}
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
              <PaginationItem
                onClick={handleNextPage}
                className={cn(
                  currentPage === totalPages && "cursor-not-allowed"
                )}
              >
                <PaginationNext
                  href={{}}
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
            text="No past trips to show yet."
          />
        </div>
      )}
    </div>
  );
};

export default PastDestination;
