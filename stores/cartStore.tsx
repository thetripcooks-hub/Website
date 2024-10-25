import { dummyCartTrips } from "@/data/trips";
import { Trip } from "@/types/trip";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartState {
  trips: Trip[];
  addToCart: (trip: Trip) => void;
  removeFromCart: (trip: Trip) => void;
  clearCart: () => void;
  setTrips: (trips: Trip[]) => void;
  incrementQuantity: (trip: Trip) => void;
  decrementQuantity: (trip: Trip) => void;
  getTotalPrice: (trips: Trip[]) => number;
  getTripDeposit: (trip: Trip) => number;
  getTotalTripDeposit: (trips: Trip[]) => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      trips: dummyCartTrips,
      addToCart: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
      removeFromCart: (trip) =>
        set((state) => ({ trips: state.trips.filter((t) => t !== trip) })),
      clearCart: () => set({ trips: [] }),
      setTrips: (trips) => set({ trips }),
      incrementQuantity: (trip) =>
        set((state) => ({
          trips: state.trips.map((t) => {
            return t.id === trip.id ? { ...t, quantity: t.quantity + 1 } : t;
          }),
        })),
      decrementQuantity: (trip) =>
        set((state) => ({
          trips: state.trips.map((t) =>
            t.id === trip.id && t.quantity > 1
              ? { ...t, quantity: t.quantity - 1 }
              : t
          ),
        })),
      getTotalPrice: (trips) =>
        trips.reduce((acc, trip) => acc + trip.price * trip.quantity, 0),
      getTripDeposit: (trip) => trip.quantity * 300,
      getTotalTripDeposit: (trips) =>
        trips.reduce((acc, trip) => acc + 300 * trip.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
