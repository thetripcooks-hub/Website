"use client";

import * as React from "react";
// import { MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Moon from "~/img/moon.svg";
import Sun from "~/img/sun.svg";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModeToggle({ transparent }: { transparent?: boolean }) {
  const { setTheme, theme } = useTheme();

  const modes = ["light", "dark", "system"];
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="bg-transparent outline-none bg-none hover:bg-transparent  focus-visible:bg-transparent focus-visible:ring-0 shadow-none h-[28px] sm:h-[46px]"
        >
          {/* <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
          <Image
            src={Moon}
            alt="light-mode"
            className={cn("dark:hidden invert h-[28px] sm:h-[46px]", transparent ? "md:invert-0" : "md:invert")}
          />
          <Image
            src={Sun}
            alt="dark-mode"
            className="hidden dark:block h-[28px] sm:h-[46px]"
          />
          {/* <MoonIcon className="absolute h-[36px] w-[36px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 bg-white rounded-[8px]" />
          <span className="sr-only">Toggle theme</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[99]">
        {modes.map((mode) => (
          <DropdownMenuItem
            key={mode}
            onClick={() => setTheme(mode)}
            className="capitalize flex justify-between items-center"
          >
            {mode} {theme === mode && <Check width={16} height={16} />}
          </DropdownMenuItem>
        ))}
        {/* <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
