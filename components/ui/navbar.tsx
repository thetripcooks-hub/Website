"use client";
import Image from "next/image";
import React from "react";
import Logo from "~/logo.svg";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import SectionWrapper from "@/app/home/_components/section-wrapper";
import { cn } from "@/lib/utils";
import Cart from "./cart";
import { usePathname } from "next/navigation";
import MobileNav from "./mobile-nav";
import CurrencyToggle from "./currency-toggle";

const navConfig = [
  {
    name: "Home",
    url: "/home",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Destinations",
    url: "/trips",
  },
  {
    name: "Private Trips",
    url: "/private-trips",
  },
  
  {
    name: "Contact",
    url: "/contact",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/home" || pathname === "/";
  const [heroVisible, setHeroVisible] = React.useState(true);

  React.useEffect(() => {
    if (!isHome) return;
    setHeroVisible(true);
    const handleScroll = () => {
      setHeroVisible(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const transparent = isHome && heroVisible;
  return (
    <div className={cn("px-5 sm:px-[8%] fixed top-0 w-screen z-[99] transition-colors duration-300", transparent ? "bg-transparent" : "bg-background")}>
      <SectionWrapper className="flex flex-row justify-between items-center sm:h-[95px] h-[75px] gap-5 sm:whitespace-nowrap">
        <Link href="/home" className="cursor-pointer">
          <Image src={Logo} alt="logo" width={102} />
        </Link>

        <section
          className={cn(
            "hidden sm:flex gap-5 text-base sm:items-center transition-colors duration-300",
            transparent ? "text-white" : "text-neutral-text dark:text-foreground"
          )}
        >
          {navConfig.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                !transparent && pathname.includes(item.url) && "text-secondary-irish-green"
              )}
            >
              {item.name}
            </Link>
          ))}
        </section>

        <section className="hidden sm:flex">
          <CurrencyToggle transparent={transparent} />
          <ModeToggle transparent={transparent} />
          {!pathname.includes("cart") && <Cart transparent={transparent} />}
        </section>

        {/* mobile hamburger */}
        <MobileNav navConfig={navConfig} pathname={pathname} isHome={transparent} />
      </SectionWrapper>
    </div>
  );
};

export default Navbar;
