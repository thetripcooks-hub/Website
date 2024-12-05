"use client";
import { Toaster } from "@/components/ui";
import { alexandria } from "@/app/font";
import { cn } from "@/lib/utils";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import Navbar from "./ui/navbar";
import useGeneralStore from "@/stores/generalStore";
import { ApolloWrapper } from "./apollo-provider";
import GeneralData from "./general-data";
import emailjs from "@emailjs/browser";

emailjs.init({
  publicKey: "QSwtYwPZkY9JzVuTa",
});
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
          <ApolloWrapper>
            <GeneralData>
              {showNav ? <Navbar /> : null}
              {children}
            </GeneralData>
          </ApolloWrapper>
        </ThemeProvider>
        <Toaster richColors position="top-right" />
        {/* <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        ></script> */}
      </body>
    </html>
  );
};

export default AppLayout;
