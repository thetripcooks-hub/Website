import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { DropdownMenu } from "./dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import useGeneralStore from "@/stores/generalStore";
import { cn } from "@/lib/utils";
import { CURRENCIES } from "@/constants/currency";

const CurrencyToggle = ({
  mobileNavOpen,
  transparent,
}: {
  mobileNavOpen?: boolean;
  transparent?: boolean;
}) => {
  const { selectedCurrency, setSelectedCurrency, hasHydrated } =
    useGeneralStore();

  const selected = CURRENCIES.find((c) => c.code === selectedCurrency);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 h-[47px] rounded-full px-4 outline-none focus-visible:ring-0 text-base font-normal",
            transparent
              ? "text-white"
              : "text-[hsl(var(--text-primary))] dark:text-foreground",
            !hasHydrated && "blur-sm",
            mobileNavOpen && "h-[47px]"
          )}
        >
          <span>{selectedCurrency}</span>
          <span className="hidden sm:inline">{selected?.flag}</span>
          <ChevronDown size={20} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="p-6 min-w-[132px] rounded-xl z-[99] bg-[hsl(var(--bg-primary))]"
      >
        <div className="flex flex-col gap-3">
          {CURRENCIES.map((currency) => (
            <button
              key={currency.code}
              onClick={() => setSelectedCurrency(currency.code)}
              className="flex items-center gap-2 w-full"
            >
              <span className="font-medium text-[14px] leading-[21px] text-[hsl(var(--text-primary))]">
                {currency.code}
              </span>
              {currency.flag}
              {selectedCurrency === currency.code && (
                <Check size={14} className="ml-auto text-[hsl(var(--text-secondary))]" />
              )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyToggle;
