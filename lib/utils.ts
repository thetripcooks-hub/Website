import { TripType } from "@/types/trip";
import { clsx, type ClassValue } from "clsx";
import dayjs from "@/lib/dayjs";

import { twMerge } from "tailwind-merge";
import { CurrencyType } from "@/types/currency";
import useGeneralStore from "@/stores/generalStore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ExchangeRates {
  USD: number;
  CAD: number;
  GBP: number;
}

// Fetch live exchange rates from an API
export async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    // Using exchangerate-api.com (free tier available)
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/GBP");
    const data = await res.json();

    return {
      GBP: 1,
      USD: data.rates.USD,
      CAD: data.rates.CAD,
    };
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    // Fallback rates (update these periodically)
    return {
      GBP: 1,
      USD: 1.27,
      CAD: 1.76,
    };
  }
}

// Convert GBP price to target currency
export function convertPrice(
  priceInGBP: number,
  targetCurrency: CurrencyType,
  rates: ExchangeRates
): number {
  return priceInGBP * rates[targetCurrency];
}

export const pounds = Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export const dollars = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const canadianDollars = Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

export const formatAmount = (amount: number, currency: string) => {
  const currentRates = useGeneralStore.getState().rates;

  switch (currency) {
    case "GBP":
      return pounds.format(amount);
    case "USD":
      return dollars.format(convertPrice(amount, "USD", currentRates));
    case "CAD":
      return "CA$" + convertPrice(amount, "CAD", currentRates).toFixed(2);
    default:
      return dollars.format(convertPrice(amount, "USD", currentRates));
  }
};

export const formatTripDate = (item: TripType) => {
  const startDate = dayjs.utc(item.startDate);
  const endDate = dayjs.utc(item.endDate);
  
  return `${startDate.format("MMM Do - ")}${endDate.format(
    "MMM Do, "
  )}${startDate.format("YYYY")}`;
};


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
