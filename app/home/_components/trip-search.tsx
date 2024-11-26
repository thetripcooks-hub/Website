"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Input,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@/components/ui";
import { Command as CommandPrimitive } from "cmdk";
import React, { useMemo } from "react";
import SearchIcon from "@/components/icons/svg/search-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TripType } from "@/types/trip";

type Props<T extends string> = {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: TripType[];
  isLoading?: boolean;
  emptyMessage?: string;
};

function TripSearch<T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = "No search result",
}: Props<T>) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const labels = useMemo(
    () =>
      items?.reduce((acc, item) => {
        acc[item.location] = item.location;
        return acc;
      }, {} as Record<string, string>),
    [items]
  );

  const reset = () => {
    onSelectedValueChange("" as T);
    onSearchValueChange("");
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget?.hasAttribute("cmdk-list") &&
      labels[selectedValue] !== searchValue
    ) {
      reset();
    }
  };

  const onSelectItem = (inputValue: string) => {
    console.log(inputValue);
    const selectedTripArray = items.filter(
      (item) => item.location === inputValue
    );

    if (inputValue === selectedValue) {
      return;
      //   reset();
    } else {
      //   onSelectedValueChange(inputValue as T);
      onSearchValueChange(labels[inputValue] ?? "");
    }

    if (selectedTripArray) {
      router.push(`/trips/${selectedTripArray[0].sys.id}`);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Command className="bg-transparent">
        <div
          className="flex items-center justify-center mt-10 px-2.5 w-full"
          // role="combobox"
          // aria-expanded={open}
          // aria-controls="search"
        >
          <PopoverAnchor asChild>
            <div className="bg-white w-full h-[69px] sm:h-[81px] rounded-[200px] max-w-[604px] px-5 sm:px-6 py-2 sm:py-4 flex gap-5 items-center border border-[#E1E6EF]">
              <Image src={SearchIcon} alt="search-icon" />
              <div className="flex flex-col w-full gap-0">
                <label
                  htmlFor="location"
                  className="text-[#000000] text-sm sm:text-base"
                >
                  Where
                </label>
                <CommandPrimitive.Input
                  asChild
                  value={searchValue}
                  onValueChange={onSearchValueChange}
                  onKeyDown={(e) => setOpen(e.key !== "Escape")}
                  onMouseDown={() => setOpen((open) => !!searchValue || !open)}
                  onFocus={() => setOpen(true)}
                  onBlur={onInputBlur}
                >
                  <Input
                    id="location"
                    type="search"
                    placeholder="Where are we going to?"
                    className="p-0 border-none hover:outline-none shadow-none focus-visible:ring-0 h-fit text-neutral-grey-500 text-xs sm:text-sm"
                  />
                </CommandPrimitive.Input>
              </div>
            </div>
          </PopoverAnchor>
        </div>
        {!open && <CommandList aria-hidden="true" className="hidden" />}
        <PopoverContent
          asChild
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            if (
              e.target instanceof Element &&
              e.target.hasAttribute("cmdk-input")
            ) {
              e.preventDefault();
            }
          }}
          className="w-[--radix-popover-trigger-width] p-0 rounded-[16px]"
        >
          <CommandList>
            {isLoading && (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-6 w-full" />
                </div>
              </CommandPrimitive.Loading>
            )}
            {items?.length > 0 && !isLoading ? (
              <>
                <CommandGroup>
                  {items?.slice(0, 5).map((option) => (
                    <div key={option.sys.id}>
                      <CommandItem
                        key={option.sys.id}
                        value={option.location}
                        onMouseDown={(e) => e.preventDefault()}
                        onSelect={onSelectItem}
                      >
                        {/* <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValue === option.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      /> */}
                        {option.location}
                      </CommandItem>
                      {items.length > 0 && <CommandSeparator />}
                    </div>
                  ))}
                </CommandGroup>
                <CommandGroup>
                  <CommandItem
                    value="See all trips"
                    onMouseDown={(e) => e.preventDefault()}
                    className="text-secondary-irish-green"
                    onSelect={() => router.push("/trips")}
                  >
                    All trips
                  </CommandItem>
                </CommandGroup>
              </>
            ) : null}
            {!isLoading ? (
              <>
                <CommandEmpty className="text-left py-2.5 flex flex-col gap-1">
                  <div className="px-5">{emptyMessage ?? "No items."}</div>
                  <hr />
                  <Link
                    href="/trips"
                    onMouseDown={(e) => e.preventDefault()}
                    className="text-secondary-irish-green px-5"
                  >
                    All trips
                  </Link>
                </CommandEmpty>
              </>
            ) : null}
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
}

export default TripSearch;
