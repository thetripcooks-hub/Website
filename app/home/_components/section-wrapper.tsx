"use client";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React, { ReactNode } from "react";

const SectionWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: ClassValue;
}) => {
  return (
    <div className={cn("lg:mx-auto lg:max-w-[1280px]", className)}>
      {children}
    </div>
  );
};

export default SectionWrapper;
