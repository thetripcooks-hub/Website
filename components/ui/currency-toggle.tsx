import React from "react";
import { Button } from "./button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { DropdownMenu } from "./dropdown-menu";
import { Check, Loader } from "lucide-react";
import useGeneralStore from "@/stores/generalStore";
import { cn } from "@/lib/utils";
import { CURRENCIES } from "@/constants/currency";

const CurrencyToggle = ({ mobileNavOpen }: {
  mobileNavOpen?: boolean;
}) => {
  const { selectedCurrency, setSelectedCurrency, hasHydrated } = useGeneralStore();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          className={cn("bg-transparent outline-none bg-none hover:bg-transparent  focus-visible:bg-transparent focus-visible:ring-0 shadow-none w-fit px-2 max-w-fit border border-solid border-[#E1E6EF] text-foreground h-[32px] sm:h-[46px] dark:border-[#383E47] flex gap-1 text-[#1D2433] dark:text-white", mobileNavOpen && "h-[46px]", !hasHydrated && "filter blur-sm")}
        >

          <span className="text-lg">
            {CURRENCIES.find((currency) => currency.code === selectedCurrency)?.flag}
          </span>
          {selectedCurrency}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[99]">
        {CURRENCIES.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => setSelectedCurrency(currency.code)}
            className="capitalize flex gap-1 items-center"
          >
            <span className="text-lg">
              {currency.flag}
            </span>
            {currency.name}{" "}
            {selectedCurrency === currency.code && <Check width={16} height={16} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyToggle;
