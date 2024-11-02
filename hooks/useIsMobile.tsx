import { useLayoutEffect, useState } from "react";
import debounce from "lodash/debounce";

export const useIsMobile = (width = 768): boolean => {
  const getIsMobile = () => window.innerWidth <= width;
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < width);
    };
    window.addEventListener("resize", debounce(updateSize, 250));
    return (): void => window.removeEventListener("resize", updateSize);
  }, [width]);

  return isMobile;
};