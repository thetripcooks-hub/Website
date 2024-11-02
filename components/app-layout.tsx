"use client";
import { alexandria } from "@/app/font";
import { cn } from "@/lib/utils";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import Navbar from "./ui/navbar";
import useGeneralStore from "@/stores/generalStore";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { showNav } = useGeneralStore();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "m-0 w-full overflow-x-hidden-hidden",
        alexandria.className,
        showNav && "mt-[75px] sm:mt-[95px]"
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {showNav ? <Navbar /> : null}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default AppLayout;
