export type CurrencyType = "USD" | "CAD" | "GBP";

export type CurrencyListItem = {
  code: CurrencyType;
  symbol: string;
  name: string;
  flag: React.ReactNode;
};
