import React, { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
  const { orderKey, setOrderKey, trips, filterTags, setFilterTags } =
    useTripStore();

  const availableTags = useMemo(
    () =>
      Array.from(
        new Set(trips.filter((t) => !t.soldOut).flatMap((t) => t.tags ?? []))
      ).sort(),
    [trips]
  );

  const toggleTag = (tag: string, checked: boolean) => {
    setFilterTags(
      checked ? [...filterTags, tag] : filterTags.filter((t) => t !== tag)
    );
  };

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

      {availableTags.length > 0 && (
        <DropdownMenu>
          <div
            className={cn(
              "flex items-center gap-1 bg-[#fafafa] dark:bg-[#1D2120] rounded-full px-3 py-1 cursor-pointer border border-transparent",
              filterTags.length > 0 && "pr-2"
            )}
          >
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 text-sm font-medium text-neutral-text dark:text-foreground outline-none">
                {filterTags.length > 0
                  ? `Filter by (${filterTags.length})`
                  : "Filter by"}
                <ChevronDown className="w-4 h-4 shrink-0" />
              </button>
            </DropdownMenuTrigger>
            {filterTags.length > 0 && (
              <X
                className="w-3.5 h-3.5 ml-0.5 text-neutral-text dark:text-foreground cursor-pointer"
                onClick={() => setFilterTags([])}
              />
            )}
          </div>
          <DropdownMenuContent className="rounded-[16px] py-2 ml-2">
            {availableTags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={filterTags.includes(tag)}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={(checked) => toggleTag(tag, checked)}
                className="text-neutral-text h-[48px] dark:text-foreground"
              >
                {tag}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default SortByButton;
