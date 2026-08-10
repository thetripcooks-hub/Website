export type CurrencyType = "USD" | "CAD" | "GBP";

export type CurrencyListItem = {
  code: CurrencyType;
  symbol: string;
  name: string;
  flag: React.ReactNode;
};

export interface ExchangeRates {
  USD: number;
  CAD: number;
  GBP: number;
}
