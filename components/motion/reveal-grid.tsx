"use client";

import { m } from "motion/react";
import { fadeUp, staggerContainer, inViewport } from "@/lib/motion";
import type { ReactNode } from "react";

/**
 * Reusable scroll-reveal wrapper for card grids: the grid container fades
 * in once it enters the viewport, and its items stagger in one after another.
 * Pass the same `className` you'd otherwise put on the plain grid `<div>`.
 */
export function RevealGrid<T>({
  items,
  keyFn,
  renderItem,
  className,
}: {
  items: T[];
  keyFn: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={inViewport}
    >
      {items.map((item) => (
        <m.div key={keyFn(item)} variants={fadeUp}>
          {renderItem(item)}
        </m.div>
      ))}
    </m.div>
  );
}
