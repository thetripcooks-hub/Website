import { CartItem } from "@/types/cart";
import { CurrencyType } from "@/types/currency";
import { ExchangeRates, convertPrice } from "@/lib/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  setTrips: (trips: CartItem[]) => void;
  incrementQuantity: (item: CartItem) => void;
  decrementQuantity: (item: CartItem) => void;
  // amounts are converted to targetCurrency (using rates) before summing, since
  // cart items may be priced in different source currencies
  getTotalPrice: (
    trips: CartItem[],
    targetCurrency: CurrencyType,
    rates: ExchangeRates
  ) => number;
  getTripDeposit: (
    item: CartItem,
    targetCurrency: CurrencyType,
    rates: ExchangeRates
  ) => number;
  getTotalTripDeposit: (
    trips: CartItem[],
    targetCurrency: CurrencyType,
    rates: ExchangeRates
  ) => number;
  showCart: boolean;
  setShowCart: (showCart: boolean) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  lastAddedItem: CartItem | null;
  setLastAddedItem: (item: CartItem | null) => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => {
          const isItemInCart = state.items.find(
            (t) => t.sys.id === item.sys.id
          );
          if (isItemInCart) {
            return {
              items: state.items.map((t) =>
                t.sys.id === item.sys.id
                  ? { ...t, quantity: t.quantity + 1 }
                  : t
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeFromCart: (item) =>
        set((state) => ({
          items: state.items.filter((t) => t.sys.id !== item.sys.id),
        })),
      clearCart: () => set({ items: [] }),
      setTrips: (items) => set({ items }),
      incrementQuantity: (item) =>
        set((state) => ({
          items: state.items.map((t) => {
            return t.sys.id === item.sys.id
              ? { ...t, quantity: t.quantity + 1 }
              : t;
          }),
        })),
      decrementQuantity: (item) =>
        set((state) => ({
          items: state.items.map((t) =>
            t.sys.id === item.sys.id && t.quantity > 1
              ? { ...t, quantity: t.quantity - 1 }
              : t
          ),
        })),
      getTotalPrice: (trips, targetCurrency, rates) =>
        trips.reduce(
          (acc, item) =>
            acc +
            convertPrice(item.downPayment, item.currency, targetCurrency, rates) *
              item.quantity,
          0
        ),
      getTripDeposit: (item, targetCurrency, rates) =>
        item.quantity *
        convertPrice(item.downPayment, item.currency, targetCurrency, rates),
      getTotalTripDeposit: (trips, targetCurrency, rates) =>
        trips.reduce(
          (acc, item) =>
            acc +
            convertPrice(item.downPayment, item.currency, targetCurrency, rates) *
              item.quantity,
          0
        ),
      showCart: false,
      setShowCart: (showCart) => set({ showCart }),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      lastAddedItem: null,
      setLastAddedItem: (lastAddedItem) => set({ lastAddedItem }),
    }),
    {
      name: "cart-storage",
      onRehydrateStorage(state) {
        return () => state.setHasHydrated(true);
      },
    }
  )
);

export default useCartStore;
