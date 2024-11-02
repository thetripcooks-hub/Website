"use client";
import { useEffect } from "react";
import { useIsMobile } from "./useIsMobile";
import useGeneralStore from "@/stores/generalStore";

export const useHideNavOnMobile = () => {
  const isMobile = useIsMobile();
  const { setShowNav } = useGeneralStore();

  useEffect(() => {
    if (isMobile) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }

    return () => {
      setShowNav(true);
    };
  }, [isMobile]);
  return {};
};
