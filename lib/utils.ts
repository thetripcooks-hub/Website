import { TripType } from "@/types/trip";
import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
dayjs.extend(advancedFormat);

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pounds = Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export const dollars = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatTripDate = (item: TripType) =>
  `${dayjs(item.startDate).format("MMM Do - ")}${dayjs(item.endDate).format(
    "MMM Do, "
  )}${dayjs(item.startDate).format("YYYY")}`;

export function percentage(percent: number, total: number) {
  return (percent / 100) * total;
}

/**
 * Searches for a string in an array of objects based on a specified key.
 *
 * @param {Array} array - The array of objects to search in.
 * @param {string} key - The key of the object to search for the string.
 * @param {string} searchTerm - The string to search for.
 * @returns {Array} - An array of matching objects.
 */
export function searchInArray(
  array: any[],
  key: string,
  searchTerm: string
): Array<any> {
  if (!Array.isArray(array)) {
    throw new Error("First argument must be an array.");
  }
  if (typeof key !== "string") {
    throw new Error("Key must be a string.");
  }
  if (typeof searchTerm !== "string") {
    throw new Error("Search term must be a string.");
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return array.filter((item) => {
    const value = item[key];
    return (
      typeof value === "string" &&
      value.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });
}

export default function contentfulLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const url = new URL(`https://example.com${src}`);
  url.searchParams.set("fm", "webp");
  url.searchParams.set("w", width.toString());
  url.searchParams.set("q", (quality || 75).toString());
  return url.href;
}

export const generateTripLink = (trip: TripType) => {
  return `/trips/${trip.sys.id}/${trip.location
    .replace(/,/g, "")
    .replace(/ /g, "-")
    .toLowerCase()}`;
};
