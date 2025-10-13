export type CurrencyType = "USD" | "CAD" | "GBP" | "NGN";


export type CurrencyListItem = {
  code: CurrencyType;
  symbol: string;
  name: string;
  flag: string;
};

