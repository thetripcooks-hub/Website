import { CurrencyListItem } from "@/types/currency";
import { US, CA, GB } from "country-flag-icons/react/3x2";

export const CURRENCIES: CurrencyListItem[] = [
  {
    code: "USD",
    symbol: "$",
    name: "US Dollars",
    flag: (
      <span className="rounded-full overflow-hidden inline-flex w-5 h-5 items-center justify-center">
        <US className="w-7 h-7 shrink-0" />
      </span>
    ),
  },
  {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollars",
    flag: (
      <span className="rounded-full overflow-hidden inline-flex w-5 h-5 items-center justify-center">
        <CA className="w-7 h-7 shrink-0" />
      </span>
    ),
  },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pounds",
    flag: (
      <span className="rounded-full overflow-hidden inline-flex w-5 h-5 items-center justify-center">
        <GB className="w-7 h-7 shrink-0" />
      </span>
    ),
  },
];
