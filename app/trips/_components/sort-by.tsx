import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
// import SettingsMobile from "@/components/icons/svg/settings-mobile.svg";
import SettingsDesktop from "@/components/icons/svg/settings-desktop.svg";
import { XIcon } from "lucide-react";

const sortKeys = [
  "Alphabetically - A - Z",
  "Date - earliest to latest",
  "Price - lowest to highest",
];

const SortByButton = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  // const [sortKey, setSortKey] = useState<string|null>(null);
  // const handleSortChange = (key: string) => {
  //   setSortKey(key);
  // };
  const handleAddFilter = (filter: string) => {
    if (activeFilters.includes(filter)) return;
    setActiveFilters([...activeFilters, filter]);
  };

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div>
      <section className="text-neutral-text flex justify-between gap-5 items-center mb-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              className="sm:flex text-neutral-text min-w-fit gap-2.5 border-[#E1E6EF] rounded-[8px]"
            >
              Sort by
              <Image
                src={SettingsDesktop}
                alt="light-mode"
                style={{ height: "20px" }}
              />
            </Button>
            {/* <Button
              size="icon"
              className="bg-transparent outline-none bg-none hover:bg-transparent  focus-visible:bg-transparent focus-visible:ring-0 shadow-none h-[40px] w-[40px] sm:hidden border rounded-full border-[#E1E6EF]"
            >
              <Image
                src={SettingsMobile}
                alt="light-mode"
                style={{ height: "14.81px" }}
              />
            </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-[16px] py-2 ml-2">
            {sortKeys.map((key) => (
              <DropdownMenuItem
                key={key}
                onClick={() => handleAddFilter(key)}
                className="text-neutral-text h-[48px]"
              >
                {key}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {activeFilters.length > 0 ? (
        <div className="mb-4">
          <div className="bg-white border border-solid border-neutral-grey-300 rounded-[8px] p-2.5 gap-2.5 flex flex-col sm:flex-row">
            {activeFilters.map((filter) => (
              <p
                key={filter}
                className="flex gap-2.5 bg-[#020E0B] items-center rounded-[200px] h-[39.2px] px-2.5 text-white text-base leading-[19.5px] w-fit"
              >
                {filter}
                <XIcon onClick={() => handleRemoveFilter(filter)} />
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SortByButton;
