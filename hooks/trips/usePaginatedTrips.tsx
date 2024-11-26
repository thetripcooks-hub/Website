import { queryPaginatedTrips } from "@/queries/trips-query";
import useTripStore from "@/stores/trip-store";
import { AllPaginatedTripsResponse, TripType } from "@/types/trip";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

const usePaginatedTrips = () => {
  const [paginatedTrips, setPaginatedTrips] = useState<TripType[]>([]);
  const { totalTrips } = useTripStore();
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, loading, error } = useQuery<AllPaginatedTripsResponse>(
    queryPaginatedTrips(page)
  );
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const getPaginationNumbers = () => {
    const pages = [];

    if (totalPages <= 4) {
      // Show all pages if total pages are 4 or less
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 2) {
        // Show first 3 pages + last page
        pages.push(1, 2, 3, "...");
      } else if (page >= totalPages - 1) {
        // Show first page + last 3 pages
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show first page, current page, and next, previous pages, + last page
        pages.push("...", page - 1, page, page + 1, "...");
      }
    }

    return pages;
  };

  useEffect(() => {
    if (data) {
      setPaginatedTrips(data.tripCollection.items ?? []);
      setTotalPages(Math.ceil(data.tripCollection.total / totalTrips));
    }
  }, [data, totalTrips]);

  return {
    paginatedTrips,
    loading,
    error,
    handleNextPage,
    handlePreviousPage,
    getPaginationNumbers,
    handlePageChange,
    totalPages,
    page,
  };
};

export default usePaginatedTrips;
