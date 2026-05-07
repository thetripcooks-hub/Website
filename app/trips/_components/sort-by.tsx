import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import useTripStore from "@/stores/trip-store";

const sortKeys = [
  { key: "location_ASC", value: "Alphabetically - A - Z" },
  { key: "startDate_ASC", value: "Date - earliest to latest" },
  { key: "fullAmount_ASC", value: "Price - lowest to highest" },
];

const SortByButton = () => {
  const { orderKey, setOrderKey } = useTripStore();

  return (
    <div className="flex gap-6 items-center mb-5">
      <DropdownMenu>
        <div
          className={cn(
            "flex items-center gap-1 bg-[#fafafa] dark:bg-[#1D2120] rounded-full px-3 py-1 cursor-pointer border border-transparent",
            orderKey && "pr-2"
          )}
        >
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1.5 text-sm font-medium text-neutral-text dark:text-foreground outline-none">
              {orderKey?.value || "Sort by"}
              <ChevronDown className="w-4 h-4 shrink-0" />
            </button>
          </DropdownMenuTrigger>
          {orderKey && (
            <X
              className="w-3.5 h-3.5 ml-0.5 text-neutral-text dark:text-foreground cursor-pointer"
              onClick={() => setOrderKey(null)}
            />
          )}
        </div>
        <DropdownMenuContent className="rounded-[16px] py-2 ml-2">
          {sortKeys.map((key) => (
            <DropdownMenuItem
              key={key.key}
              onClick={() => setOrderKey(key)}
              className="text-neutral-text h-[48px] dark:text-foreground"
            >
              {key.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-1.5 bg-[#fafafa] dark:bg-[#1D2120] rounded-full px-3 py-1 text-sm font-medium text-neutral-text dark:text-foreground cursor-pointer">
        Filter by
        <ChevronDown className="w-4 h-4 shrink-0" />
      </div>
    </div>
  );
};

export default SortByButton;
