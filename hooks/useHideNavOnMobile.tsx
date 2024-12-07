"use client";
import { useEffect } from "react";
import { useIsMobile } from "./useIsMobile";
import useGeneralStore from "@/stores/generalStore";
import { useTheme } from "next-themes";

export const useHideNavOnMobile = () => {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
  return {};
};
