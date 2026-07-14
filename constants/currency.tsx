import { CurrencyListItem, ExchangeRates } from "@/types/currency";
import Image from "next/image";

// Used as the initial store value before fetchExchangeRates() resolves, and
// as its fallback if that live fetch fails. Last updated 2026-07-14.
export const DEFAULT_EXCHANGE_RATES: ExchangeRates = {
  GBP: 1,
  USD: 1.34,
  CAD: 1.89,
};

export const CURRENCIES: CurrencyListItem[] = [
  {
    code: "USD",
    symbol: "$",
    name: "US Dollars",
    flag: <Image src="/img/flags/usd.svg" alt="US flag" width={24} height={24} />,
  },
  {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollars",
    flag: <Image src="/img/flags/cad.svg" alt="Canadian flag" width={24} height={24} />,
  },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pounds",
    flag: <Image src="/img/flags/gbp.svg" alt="British flag" width={24} height={24} />,
  },
];
