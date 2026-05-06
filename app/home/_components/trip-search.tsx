"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  Input,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Skeleton,
} from "@/components/ui";
import { Command as CommandPrimitive } from "cmdk";
import React, { useMemo } from "react";
import SearchIcon from "@/components/icons/svg/search-icon.svg";
import SearchIconLg from "@/components/icons/svg/search-icon-lg.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { TripType } from "@/types/trip";
import { generateTripLink } from "@/lib/utils";

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
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const labels = useMemo(
    () =>
      items?.reduce(
        (acc, item) => {
          acc[item.location] = item.location;
          return acc;
        },
        {} as Record<string, string>,
      ),
    [items],
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
    const selectedTripArray = items.filter(
      (item) => item.location === inputValue,
    );

    if (inputValue === selectedValue) {
      return;
    } else {
      onSearchValueChange(labels[inputValue] ?? "");
    }

    if (selectedTripArray) {
      router.push(generateTripLink(selectedTripArray[0]));
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Command className="bg-transparent">
        <div className="flex items-center justify-center mt-10 px-2.5 w-full">
          <PopoverAnchor asChild>
            <div className="bg-background w-full rounded-[200px] max-w-[604px] px-4 py-3 sm:px-[16px] sm:py-[12px] flex gap-5 items-center border border-[#E1E6EF] dark:border-[#383E47]">
              {/* Search icon — desktop only, left side */}
              <Image
                src={SearchIconLg}
                alt="search-icon"
                width={34}
                height={34}
                className="hidden sm:block shrink-0"
              />
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
                  className="p-0 border-none hover:outline-none shadow-none focus-visible:ring-0 h-fit text-[#616161] dark:text-neutral-grey-500 text-base sm:text-[20px] sm:font-medium sm:leading-[30px] dark:bg-transparent"
                />
              </CommandPrimitive.Input>
              {/* Desktop button — pill with "Search" label */}
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (searchValue) {
                    const match = items.find((i) =>
                      i.location
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()),
                    );
                    if (match) router.push(generateTripLink(match));
                    else router.push("/trips");
                  } else {
                    router.push("/trips");
                  }
                }}
                className="hidden sm:flex shrink-0 bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7] h-[48px] w-[148px] rounded-full items-center justify-center font-medium text-black text-sm transition-opacity hover:opacity-90"
              >
                Search
              </button>
              {/* Mobile button — circular with search icon */}
              {/* <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (searchValue) {
                    const match = items.find((i) =>
                      i.location
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()),
                    );
                    if (match) router.push(generateTripLink(match));
                    else router.push("/trips");
                  } else {
                    router.push("/trips");
                  }
                }}
                className="sm:hidden shrink-0 bg-gradient-to-r from-[#fa93f4] from-[28.5%] to-[#ee7fe7] h-[49px] w-[49px] rounded-full flex items-center justify-center transition-opacity hover:opacity-90"
              >
                <Image
                  src={SearchIcon}
                  alt="search"
                  width={20}
                  height={20}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (searchValue) {
                      const match = items.find((i) =>
                        i.location
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()),
                      );
                      if (match) router.push(generateTripLink(match));
                      else router.push("/trips");
                    } else {
                      router.push("/trips");
                    }
                  }}
                />
              </button> */}
              <Image
                src={SearchIcon}
                alt="search"
                width={49}
                height={49}
                className="sm:hidden"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (searchValue) {
                    const match = items.find((i) =>
                      i.location
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()),
                    );
                    if (match) router.push(generateTripLink(match));
                    else router.push("/trips");
                  } else {
                    router.push("/trips");
                  }
                }}
              />
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
                        {option.location}
                      </CommandItem>
                      {items.length > 0 && !pathname.includes("/trips") && (
                        <CommandSeparator />
                      )}
                    </div>
                  ))}
                </CommandGroup>
                {pathname.includes("/trips") ? null : (
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
                )}
              </>
            ) : null}
            {!isLoading && (
              <>
                <CommandEmpty className="text-left py-2.5 flex flex-col gap-1">
                  <div className="px-5">{emptyMessage ?? "No items."}</div>
                  {!pathname.includes("/trips") && (
                    <>
                      <hr />
                      <Link
                        href="/trips"
                        onMouseDown={(e) => e.preventDefault()}
                        className="text-secondary-irish-green px-5"
                      >
                        All trips
                      </Link>
                    </>
                  )}
                </CommandEmpty>
              </>
            )}
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
}

export default TripSearch;
