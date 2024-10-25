import { cn } from "@/lib/utils";
import React from "react";
import { Card } from "./card";

const MobileFloatingCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card
      className={cn(
        "fixed bottom-0 sm:hidden border-t-neutral-grey-300 shadow-none w-full p-2.5 z-10 rounded-none flex flex-col gap-3"
      )}
    >
      {children}
    </Card>
  );
};

export default MobileFloatingCard;
