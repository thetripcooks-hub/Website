import { CurrencyListItem } from "@/types/currency";
import Image from "next/image";

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
