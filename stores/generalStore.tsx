import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GeneralStore {
  showNav: boolean;
  setShowNav: (showNav: boolean) => void;
}

const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      showNav: true,
      setShowNav: (showNav) => set({ showNav }),
    }),
    { name: "general-storage" }
  )
);
export default useGeneralStore;
