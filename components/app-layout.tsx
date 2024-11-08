"use client";
import { Toaster } from "@/components/ui";
import { alexandria } from "@/app/font";
import { cn } from "@/lib/utils";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import Navbar from "./ui/navbar";
import useGeneralStore from "@/stores/generalStore";
import { ApolloWrapper } from "./apollo-provider";

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
          <ApolloWrapper>{children}</ApolloWrapper>
        </ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
};

export default AppLayout;
