"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { Variants } from "motion/react";

/**
 * Loads only the `domAnimation` feature set (opacity/transform/scale
 * animations, `whileInView`, `AnimatePresence`) instead of the full
 * `motion/react` bundle. Mount once, high in the tree (see
 * `components/app-layout.tsx`) so the feature chunk is fetched a single
 * time and reused by every animated section.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

/** Shared entrance transition — fade in while sliding up slightly. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Shared entrance transition — fade in only, no movement. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Wrap a group of `fadeUp`/`fadeIn` children in this to stagger them in. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/** Default `whileInView` viewport config — animate once, slightly before it's fully on screen. */
export const inViewport = { once: true, margin: "-100px" } as const;
