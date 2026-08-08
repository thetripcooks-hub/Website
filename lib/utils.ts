import { TripType } from "@/types/trip";
import { clsx, type ClassValue } from "clsx";
import dayjs from "@/lib/dayjs";

import { twMerge } from "tailwind-merge";
import { CurrencyType, ExchangeRates } from "@/types/currency";
import { DEFAULT_EXCHANGE_RATES } from "@/constants/currency";
import useGeneralStore from "@/stores/generalStore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type { ExchangeRates };

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
    return DEFAULT_EXCHANGE_RATES;
  }
}

// Convert an amount from its source currency to a target currency.
// `rates` is anchored to GBP (rates[X] = units of X per 1 GBP), so cross-currency
// conversion routes through GBP: source -> GBP -> target.
export function convertPrice(
  amount: number,
  sourceCurrency: CurrencyType,
  targetCurrency: CurrencyType,
  rates: ExchangeRates,
): number {
  if (sourceCurrency === targetCurrency) return Math.round(amount * 100) / 100;
  const amountInGBP = amount / rates[sourceCurrency];
  return Math.round(amountInGBP * rates[targetCurrency] * 100) / 100;
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

// Renders an amount that is already denominated in `currency` — no conversion.
function renderAmount(amount: number, currency: string) {
  switch (currency) {
    case "GBP":
      return pounds.format(amount);
    case "USD":
      return dollars.format(amount);
    case "CAD":
      return "CA$" + amount.toFixed(2);
    default:
      return dollars.format(amount);
  }
}

// Converts `amount` from `sourceCurrency` (defaults to GBP, matching legacy
// Contentful trips that predate the per-trip currency field) to `displayCurrency`,
// then renders it.
export const formatAmount = (
  amount: number,
  displayCurrency: string,
  sourceCurrency: CurrencyType = "GBP",
) => {
  const currentRates = useGeneralStore.getState().rates;
  const converted = convertPrice(
    amount,
    sourceCurrency,
    displayCurrency as CurrencyType,
    currentRates,
  );
  return renderAmount(converted, displayCurrency);
};

// Renders an amount that has already been converted to `currency` (e.g. a cart
// total computed via convertPrice) — formats only, does not convert again.
export const formatConvertedAmount = (amount: number, currency: CurrencyType) =>
  renderAmount(amount, currency);

const VALID_TRIP_CURRENCIES: CurrencyType[] = ["USD", "CAD", "GBP"];

// Coerces a trip's Contentful `currency` field to a known-valid value at runtime.
// Contentful can return null/undefined/unexpected strings regardless of the TS
// type, so this must be a real runtime check, not just a type assumption — applied
// once where trip data enters app state, so downstream code can trust trip.currency.
export function normalizeTripCurrency<T extends { currency?: CurrencyType | null }>(
  trip: T,
): T & { currency: CurrencyType } {
  const currency = VALID_TRIP_CURRENCIES.includes(trip.currency as CurrencyType)
    ? (trip.currency as CurrencyType)
    : "GBP";
  return { ...trip, currency };
}

export const formatTripDate = (item: TripType) => {
  const startDate = dayjs.utc(item.startDate);
  const endDate = dayjs.utc(item.endDate);

  return `${startDate.format("MMM Do - ")}${endDate.format(
    "MMM Do, ",
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
  searchTerm: string,
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

export const locationToSlug = (location: string) =>
  location.replace(/,/g, "").replace(/ /g, "-").toLowerCase();

export const getTripYear = (trip: TripType) =>
  trip.startDate ? dayjs.utc(trip.startDate).format("YYYY") : null;

// Trip URLs are keyed on destination + year so a repeat destination in a
// future year gets its own unique, stable URL instead of colliding with
// the earlier trip's.
export const generateTripSlug = (trip: TripType) => {
  const year = getTripYear(trip);
  return year
    ? `${locationToSlug(trip.location)}-${year}`
    : locationToSlug(trip.location);
};

export const generateTripLink = (trip: TripType) => {
  return `/trips/${generateTripSlug(trip)}`;
};
