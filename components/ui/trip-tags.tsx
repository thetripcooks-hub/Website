"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ROTATE_INTERVAL_MS = 2500;

const TripTags = ({
  tags,
  className,
}: {
  tags?: string[] | null;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!tags || tags.length <= 1) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % tags.length);
    }, ROTATE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [tags]);

  if (!tags || tags.length === 0) return null;

  const activeTag = tags[index % tags.length];

  return (
    <div
      key={activeTag}
      className={cn(
        "bg-white dark:bg-[#121716] rounded-full px-3 py-1 text-xs sm:text-sm font-medium text-neutral-text dark:text-primary flex items-center gap-1 border border-[#eee] dark:border-[#585E6A] animate-in fade-in-0 duration-500 w-fit",
        className
      )}
    >
      {activeTag}
    </div>
  );
};

export default TripTags;
