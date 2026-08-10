import { CurrencyListItem, ExchangeRates } from "@/types/currency";
import Image from "next/image";
import exchangeRatesData from "./exchange-rates.json";

const { updatedAt, ...defaultRates } = exchangeRatesData;

// Used as the initial store value before fetchExchangeRates() resolves, and
// as its fallback if that live fetch fails. Kept in sync daily by
// scripts/update-exchange-rates.mjs via .github/workflows/update-exchange-rates.yml
export const DEFAULT_EXCHANGE_RATES: ExchangeRates = defaultRates;

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
