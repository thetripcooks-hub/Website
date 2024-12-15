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
  return (
    <div className="px-5 sm:px-[8%] fixed top-0 w-screen z-[99] bg-background">
      <SectionWrapper className="flex flex-row justify-between items-center sm:h-[95px] h-[75px] gap-5 sm:whitespace-nowrap">
        <Link href="/home" className="cursor-pointer">
          <Image src={Logo} alt="logo" width={102} />
        </Link>

        <section
          className={cn(
            "hidden sm:flex gap-5 text-neutral-text dark:text-foreground text-[16px] leading-[19.5px] sm:items-center"
          )}
        >
          {navConfig.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                pathname.includes(item.url) && "text-secondary-irish-green"
              )}
            >
              {item.name}
            </Link>
          ))}
        </section>

        <section className="hidden sm:flex gap-2.5">
          <ModeToggle />
          {!pathname.includes("cart") && <Cart />}
        </section>

        {/* mobile hamburger */}
        <MobileNav navConfig={navConfig} pathname={pathname} />
      </SectionWrapper>
    </div>
  );
};

export default Navbar;
