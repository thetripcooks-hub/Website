"use client";
import { Toaster } from "@/components/ui";
import { alexandria } from "@/app/font";
import { cn, fetchExchangeRates } from "@/lib/utils";
import React, { useEffect } from "react";
import { ThemeProvider } from "./theme-provider";
import Navbar from "./ui/navbar";
import useGeneralStore from "@/stores/generalStore";
import { ApolloWrapper } from "./apollo-provider";
import GeneralData from "./general-data";
import emailjs from "@emailjs/browser";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import { useGeolocation } from "@/hooks/useGeolocation";
// dayjs.extend(customParseFormat);

const publicKey = process.env.NEXT_PUBLIC_EMAIL_JS_KEY_PUBLIC_KEY || "";

emailjs.init({
  publicKey: publicKey,
});
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { showNav, setRates, setLoadingRates } = useGeneralStore();
  useEffect(() => {
    setLoadingRates(true);
    // Fetch exchange rates
    fetchExchangeRates().then(newRates => {
      setRates(newRates);
      setLoadingRates(false);
    });
  }, [setLoadingRates, setRates]);
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "m-0 w-full overflow-x-hidden-hidden text-justify",
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
              <Navbar />
              {children}
            </GeneralData>
          </ApolloWrapper>
        </ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
};

export default AppLayout;
