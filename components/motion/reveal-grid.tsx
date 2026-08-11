"use client";

import { m } from "motion/react";
import { fadeUp, staggerContainer, inViewport } from "@/lib/motion";
import type { ReactNode } from "react";

/**
 * Reusable reveal wrapper for card grids: the grid container fades in and
 * its items stagger in one after another. Pass the same `className` you'd
 * otherwise put on the plain grid `<div>`.
 *
 * By default this reveals on scroll (`whileInView`), which is right for
 * grids that sit further down a page. For a grid that renders at/near the
 * top — nothing to scroll past to see it — pass `eager`, which animates on
 * mount instead. Scroll-reveal margins can leave near-the-fold content
 * (and content whose items change, e.g. after filtering) stuck invisible:
 * a short viewport, or an items array that changes after the container's
 * one-time `whileInView` trigger has already fired, can mean new items
 * never re-enter the (inset) observed region and never fade in.
 */
export function RevealGrid<T>({
  items,
  keyFn,
  renderItem,
  className,
  eager = false,
}: {
  items: T[];
  keyFn: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  className?: string;
  eager?: boolean;
}) {
  const revealProps = eager
    ? { animate: "show" }
    : { whileInView: "show", viewport: inViewport };

  return (
    <m.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      {...revealProps}
    >
      {items.map((item) => (
        <m.div key={keyFn(item)} variants={fadeUp}>
          {renderItem(item)}
        </m.div>
      ))}
    </m.div>
  );
}
