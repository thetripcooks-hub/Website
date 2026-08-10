import { AppConfig } from "@/lib/config";
import useTripStore from "@/stores/trip-store";
import { TripType } from "@/types/trip";
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = AppConfig.pagination.pageSize;

function sortPastTrips(
  trips: TripType[],
  orderKey: { key: string; value: string } | null
): TripType[] {
  if (!orderKey) {
    return [...trips].sort(
      (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
    );
  }

  const sorted = [...trips];
  switch (orderKey.key) {
    case "startDate_ASC":
      return sorted.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    case "fullAmount_ASC":
      return sorted.sort((a, b) => (a.fullAmount ?? 0) - (b.fullAmount ?? 0));
    case "location_ASC":
      return sorted.sort((a, b) => a.location.localeCompare(b.location));
    default:
      return sorted;
  }
}

const usePastTrips = () => {
  const { trips, loading, orderKey } = useTripStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [orderKey]);

  const sorted = useMemo(() => {
    const now = new Date();
    return sortPastTrips(
      trips.filter((t) => new Date(t.endDate) < now),
      orderKey
    );
  }, [trips, orderKey]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginatedTrips = useMemo(
    () => sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [sorted, page]
  );

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handlePageChange = (p: number) => setPage(p);

  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 2) {
        pages.push(1, 2, 3, "...");
      } else if (page >= totalPages - 1) {
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push("...", page - 1, page, page + 1, "...");
      }
    }
    return pages;
  };

  return {
    paginatedTrips,
    loading,
    error: null,
    handleNextPage,
    handlePreviousPage,
    getPaginationNumbers,
    handlePageChange,
    totalPages,
    page,
  };
};

export default usePastTrips;
