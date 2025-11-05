import { TripType } from "@/types/trip";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TripState {
  loading: boolean;
  trips: TripType[];
  orderKey: {
    key: string;
    value: string;
  } | null;
  setOrderKey: (
    orderKey: {
      key: string;
      value: string;
    } | null
  ) => void;
  setTrips: (trips: TripType[]) => void;
  totalTrips: number;
  setTotalTrips: (totalTrips: number) => void;
  selectedTrip: TripType | null;
  setSelectedTrip: (trips: TripType | null) => void;
  setLoading: (loading: boolean) => void;
}

const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      trips: [],
      loading: false,
      totalTrips: 9,
      orderKey: null,
      setOrderKey: (orderKey) => set({ orderKey }),
      setLoading: (loading) => set({ loading }),
      setTrips: (trips) => set({ trips }),
      selectedTrip: null,
      setTotalTrips: (totalTrips) => set({ totalTrips }),
      setSelectedTrip: (selectedTrip) => set({ selectedTrip }),
    }),
    { name: "trip-storage" }
  )
);

export default useTripStore;
