"use client";
import Image from "next/image";
import React from "react";
import Logo from "~/logo.svg";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";
import Cart from "./cart";
import { usePathname } from "next/navigation";
import MobileNav from "./mobile-nav";
import CurrencyToggle from "./currency-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ChevronDown } from "lucide-react";

export type NavChild = {
  name: string;
  url: string;
  description?: string;
};

export type NavItem = {
  name: string;
  url?: string;
  children?: NavChild[];
};

const navConfig: NavItem[] = [
  { name: "Home", url: "/home" },
  {
    name: "Trips",
    children: [
      {
        name: "Group trips",
        url: "/trips",
        description:
          "Expertly planned, effortlessly enjoyed. Experience the world in good company with pre-arranged itineraries designed for social discovery.",
      },
      {
        name: "Past trips",
        url: "/trips/past",
        description:
          "Looking back? Revisit your favorite destinations and browse the highlights of your previous escapes.",
      },
      {
        name: "Private trips",
        url: "/private-trips",
        description:
          "Need to explore a new location on your own terms? We curate an exclusive private experience just for you.",
      },
    ],
  },
  {
    name: "Company",
    children: [
      { name: "Our Story", url: "/about" },
      { name: "How To Book", url: "/how-to-book" },
    ],
  },
  {
    name: "Resources",
    children: [
      { name: "Blog", url: "/blog" },
      { name: "Community", url: "/community" },
      { name: "Travel guides", url: "/travel-guides" },
    ],
  },
  { name: "Contact", url: "/contact" },
];

const NavDropdownItem = ({
  item,
  transparent,
  pathname,
}: {
  item: NavItem;
  transparent: boolean;
  pathname: string;
}) => {
  const [open, setOpen] = React.useState(false);

  if (!item.children?.length) {
    return (
      <Link
        href={item.url!}
        className={cn(
          !transparent &&
            item.url &&
            pathname.includes(item.url) &&
            "text-secondary-irish-green"
        )}
      >
        {item.name}
      </Link>
    );
  }

  const hasDescriptions = item.children.some((c) => c.description);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 outline-none cursor-pointer">
          {item.name}
          <ChevronDown
            width={20}
            height={20}
            className={cn(
              "transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={16}
        className="p-6 max-w-[352px] rounded-xl z-[99] bg-[hsl(var(--bg-primary))]"
      >
        <p className="font-medium text-base leading-6 mb-2 text-[hsl(var(--text-secondary))]">
          {item.name}
        </p>
        <div className="flex flex-col gap-3">
          {item.children.map((child) => (
            <Link
              key={child.name}
              href={child.url}
              onClick={() => setOpen(false)}
              className="flex flex-col gap-[6px]"
            >
              <p className="text-base font-medium leading-6 text-[hsl(var(--text-primary))]">
                {child.name}
              </p>
              {child.description && (
                <p className="text-xs font-normal leading-[18px] text-[hsl(var(--text-tertiary))]">
                  {child.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/home" || pathname === "/";
  const isTrips = pathname === "/trips";
  const isPastTrips = pathname === "/trips/past";
  const [heroVisible, setHeroVisible] = React.useState(true);

  React.useEffect(() => {
    if (!isHome && !isTrips && !isPastTrips) return;
    setHeroVisible(true);
    const handleScroll = () => {
      setHeroVisible(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, isTrips, isPastTrips]);

  // transparent bg for hero pages; white text only on home (dark image bg)
  const transparent = (isHome || isTrips || isPastTrips) && heroVisible;
  const whiteText = isHome && heroVisible;

  return (
    <div
      className={cn(
        "fixed top-0 w-screen z-[99] transition-colors duration-300",
        transparent ? "bg-transparent" : "bg-background"
      )}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-[100px] flex flex-row justify-between items-center sm:h-[95px] h-[75px] gap-5 sm:whitespace-nowrap">
        <Link href="/home" className="cursor-pointer">
          <Image src={Logo} alt="logo" width={102} />
        </Link>

        <section
          className={cn(
            "hidden sm:flex gap-5 text-base sm:items-center transition-colors duration-300",
            whiteText ? "text-white" : "text-neutral-text dark:text-foreground"
          )}
        >
          {navConfig.map((item) => (
            <NavDropdownItem
              key={item.name}
              item={item}
              transparent={whiteText}
              pathname={pathname}
            />
          ))}
        </section>

        <section className="hidden sm:flex">
          <CurrencyToggle transparent={whiteText} />
          <ModeToggle transparent={whiteText} />
          {!pathname.includes("cart") && <Cart transparent={whiteText} />}
        </section>

        <MobileNav navConfig={navConfig} pathname={pathname} isHome={whiteText} />
      </div>
    </div>
  );
};

export default Navbar;
