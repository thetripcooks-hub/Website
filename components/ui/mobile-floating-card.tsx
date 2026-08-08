"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Card } from "./card";
import { m } from "motion/react";

const MobileFloatingCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <m.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 sm:hidden z-10"
    >
      <Card
        className={cn(
          "border-t-neutral-grey-300 shadow-none w-full p-2.5 rounded-none flex flex-col gap-3"
        )}
      >
        {children}
      </Card>
    </m.div>
  );
};

export default MobileFloatingCard;
