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
import { useGeolocation } from "@/hooks/useGeolocation";
import Script from "next/script";

const publicKey = process.env.NEXT_PUBLIC_EMAIL_JS_KEY_PUBLIC_KEY || "";

emailjs.init({
  publicKey: publicKey,
});
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { getCurrentPosition } = useGeolocation();
  const { showNav, setRates, setLoadingRates } = useGeneralStore();

  useEffect(() => {
    getCurrentPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoadingRates(true);
    // Fetch exchange rates
    fetchExchangeRates().then((newRates) => {
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
        showNav && "mt-[75px] sm:mt-[95px]",
      )}
    >
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1264907759033529');
              fbq('track', 'PageView');
            `,
        }}
      />
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
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1264907759033529&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
};

export default AppLayout;
