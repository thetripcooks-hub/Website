import { cn } from "@/lib/utils";
import React from "react";

const ComingSoonBadge = ({ text }: { text?: string }) => {
  return (
    <div
      className={cn(
        "rounded-[16px] bg-coming_soon_bg flex items-center justify-center text-white text-xs leading-[14.63px] absolute right-3 top-3 whitespace-nowrap",
        text ? "p-2 w-fit" : "w-[96px] h-[31px]"
      )}
    >
      {text || "Coming Soon"}
    </div>
  );
};

export default ComingSoonBadge;
