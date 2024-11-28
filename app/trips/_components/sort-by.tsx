import React, { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
import useTripStore from "@/stores/trip-store";

const sortKeys = [
  { key: "location_ASC", value: "Alphabetically - A - Z" },
  { key: "startDate_ASC", value: "Date - earliest to latest" },
  // { key: "endDate", value: "Date - latest to earliest" },
  { key: "fullAmount_ASC", value: "Price - lowest to highest" },
];

const SortByButton = () => {
  const [sortKey, setSortKey] = useState<{
    key: string;
    value: string;
  } | null>(null);

  const { setOrderKey } = useTripStore();

  const handleSortChange = (val: { key: string; value: string }) => {
    setSortKey(val);
  };

  useEffect(() => {
    setOrderKey(sortKey ? sortKey.key : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortKey]);

  return (
    <div>
      <section className="text-neutral-text flex justify-between gap-5 items-center mb-5">
        <DropdownMenu>
          <div
            className={cn(
              "min-w-fit border-[#E1E6EF] rounded-[8px] items-center flex border border-solid cursor-pointer",
              sortKey && "pr-4"
            )}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="sm:flex text-neutral-text border-none gap-2.5 items-center"
              >
                {sortKey?.value || "Sort by"}
                {sortKey ? null : (
                  <Image
                    src={SettingsDesktop}
                    alt="light-mode"
                    style={{ height: "20px" }}
                  />
                )}
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
            {sortKey ? <XIcon onClick={() => setSortKey(null)} /> : null}
          </div>

          <DropdownMenuContent className="rounded-[16px] py-2 ml-2">
            {sortKeys.map((key) => (
              <DropdownMenuItem
                key={key.key}
                onClick={() => handleSortChange(key)}
                className="text-neutral-text h-[48px]"
              >
                {key.value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  );
};

export default SortByButton;
