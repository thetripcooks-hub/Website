import { AboutUsPageType } from "@/types/about";
import { CurrencyType } from "@/types/currency";
import { PrivateTripType } from "@/types/private-trip";
import { ReviewType } from "@/types/review";
import { OurServicesType } from "@/types/services";
import { TripExperienceType } from "@/types/trip-experience";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GeneralStore {
  showNav: boolean;
  setShowNav: (showNav: boolean) => void;
  about: AboutUsPageType[];
  setAbout: (about: AboutUsPageType[]) => void;
  loadingAbout: boolean;
  setLoadingAbout: (loadingAbout: boolean) => void;
  services: OurServicesType[];
  setServices: (services: OurServicesType[]) => void;
  loadingServices: boolean;
  setLoadingServices: (loadingServices: boolean) => void;
  reviews: ReviewType[];
  setReviews: (reviews: ReviewType[]) => void;
  loadingReviews: boolean;
  setLoadingReviews: (loadingReviews: boolean) => void;
  tripcooksExperience: TripExperienceType[];
  setTripcooksExperience: (tripcooksExperience: TripExperienceType[]) => void;
  loadingTripcooksExperience: boolean;
  setLoadingTripcooksExperience: (loadingTripcooksExperience: boolean) => void;
  privateTrip: PrivateTripType[];
  setPrivateTrip: (privateTrip: PrivateTripType[]) => void;
  loadingPrivateTrip: boolean;
  setLoadingPrivateTrip: (loadingPrivateTrip: boolean) => void;
  selectedCurrency: CurrencyType;
  setSelectedCurrency: (selectedCurrency: CurrencyType) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  loadingRates: boolean;
  setLoadingRates: (loadingRates: boolean) => void;
  rates: {
    USD: number;
    CAD: number;
    GBP: number;
  };
  setRates: (rate: { USD: number; CAD: number; GBP: number }) => void;
}

const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      showNav: true,
      about: [],
      loadingAbout: false,
      services: [],
      loadingServices: false,
      reviews: [],
      loadingReviews: false,
      tripcooksExperience: [],
      loadingTripcooksExperience: false,
      privateTrip: [],
      loadingPrivateTrip: false,
      selectedCurrency: JSON.parse(localStorage.getItem("userCurrency") || '"USD"'),
      setShowNav: (showNav) => set({ showNav }),
      setAbout: (about) => set({ about }),
      setLoadingAbout: (loadingAbout) => set({ loadingAbout }),
      setServices: (services) => set({ services }),
      setLoadingServices: (loadingServices) => set({ loadingServices }),
      setReviews: (reviews) => set({ reviews }),
      setLoadingReviews: (loadingReviews) => set({ loadingReviews }),
      setTripcooksExperience: (tripcooksExperience) =>
        set({ tripcooksExperience }),
      setLoadingTripcooksExperience: (loadingTripcooksExperience) =>
        set({ loadingTripcooksExperience }),
      setPrivateTrip: (privateTrip) => set({ privateTrip }),
      setLoadingPrivateTrip: (loadingPrivateTrip) =>
        set({ loadingPrivateTrip }),
      setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency }),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      loadingRates: false,
      setLoadingRates: (loadingRates) => set({ loadingRates }),
      rates: {
        GBP: 1,
        USD: 1.27,
        CAD: 1.76,
      },
      setRates: (rates) => set({ rates }),
    }),
    {
      name: "general-storage", onRehydrateStorage(state) {
        return () => state.setHasHydrated(true);
      },
    },

  )
);
export default useGeneralStore;
