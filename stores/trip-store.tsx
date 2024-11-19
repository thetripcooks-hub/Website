import { TripType } from "@/types/trip";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TripState {
  loading: boolean;
  trips: TripType[];
  setTrips: (trips: TripType[]) => void;
  selectedTrip: TripType | null;
  setSelectedTrip: (trips: TripType) => void;
  setLoading: (loading: boolean) => void;
}

const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      trips: [],
      loading: false,
      setLoading: (loading) => set({ loading }),
      setTrips: (trips) => set({ trips }),
      selectedTrip: null,
      setSelectedTrip: (selectedTrip) => set({ selectedTrip }),
    }),
    { name: "trip-storage" }
  )
);

export default useTripStore;
