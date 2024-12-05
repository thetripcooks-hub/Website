import React from "react";
import Image from "next/image";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import SettingsMobileDark from "@/components/icons/svg/settings-desktop-dark.svg";
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
  const { orderKey, setOrderKey } = useTripStore();

  const handleSortChange = (val: { key: string; value: string }) => {
    setOrderKey(val);
  };

  return (
    <div>
      <section className="text-neutral-text flex justify-between gap-5 items-center mb-5">
        <DropdownMenu>
          <div
            className={cn(
              "min-w-fit border-[#E1E6EF] rounded-[8px] items-center flex border border-solid cursor-pointer",
              orderKey && "pr-4"
            )}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="sm:flex text-neutral-text border-none gap-2.5 items-center dark:text-foreground"
              >
                {orderKey?.value || "Sort by"}
                {orderKey ? null : (
                  <>
                    <Image
                      src={SettingsDesktop}
                      alt="light-mode"
                      style={{ height: "20px" }}
                      className="dark:hidden"
                    />
                    <Image
                      src={SettingsMobileDark}
                      alt="light-mode"
                      style={{ height: "20px" }}
                      className="hidden dark:block"
                    />
                  </>
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
            {orderKey ? <XIcon onClick={() => setOrderKey(null)} /> : null}
          </div>

          <DropdownMenuContent className="rounded-[16px] py-2 ml-2">
            {sortKeys.map((key) => (
              <DropdownMenuItem
                key={key.key}
                onClick={() => handleSortChange(key)}
                className="text-neutral-text h-[48px] dark:text-foreground"
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
