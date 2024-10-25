import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pounds = Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
