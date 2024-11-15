import { TripType } from "@/types/trip";
import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
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
