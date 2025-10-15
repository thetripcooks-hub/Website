import { CurrencyListItem } from "@/types/currency";
import { US, CA, GB } from "country-flag-icons/react/3x2";

export const CURRENCIES: CurrencyListItem[] = [
  {
    code: "USD",
    symbol: "$",
    name: "US Dollars",
    flag: <US  className="w-5 h-5"/>,
  },
  {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollars",
    flag: <CA className="w-5 h-5" />,
  },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pounds",
    flag: <GB className="w-5 h-5" />,
  },
];
