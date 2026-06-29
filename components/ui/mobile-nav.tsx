"use client";
import React, { useEffect } from "react";
import Menu from "~/img/harmburger-menu.svg";
import MenuDark from "~/img/harmburger-menu-dark.svg";
import CartIcon from "~/img/cart.svg";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "~/logo.svg";
import { ModeToggle } from "./mode-toggle";
import CurrencyToggle from "./currency-toggle";
import useCartStore from "@/stores/cartStore";
import { ChevronDown, X } from "lucide-react";
import type { NavItem } from "./navbar";

const MobileNav = ({
  navConfig,
  pathname,
  isHome,
}: {
  navConfig: NavItem[];
  pathname: string;
  isHome?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const { items } = useCartStore();
  const itemCount = items.reduce((sum, t) => sum + t.quantity, 0);

  const plainLinks: NavItem[] = navConfig.filter((item) => !item.children?.length);
  const accordionItems = navConfig.filter((item) => item.children?.length);

  const handleClose = () => {
    setOpen(false);
    setOpenItem(null);
  };

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="sm:hidden flex gap-1 items-center">
      {/* Always-visible controls */}
      <div className="bg-[hsl(var(--bg-tertiary))] rounded-full">
        <CurrencyToggle mobileNavOpen={open} />
      </div>
      <div className="bg-[hsl(var(--bg-tertiary))] rounded-full size-[34px] flex items-center justify-center">
        <ModeToggle />
      </div>
      <Link
        href="/cart"
        className="bg-[hsl(var(--bg-tertiary))] rounded-full size-[34px] flex items-center justify-center relative"
        aria-label="Cart"
      >
        <Image src={CartIcon} alt="cart" className="h-[18px] invert dark:invert-0" />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 min-w-[13px] h-[13px] rounded-full bg-[#09AF0D] text-white text-[8px] font-normal flex items-center justify-center p-[2px]">
            {itemCount}
          </span>
        )}
      </Link>

      {/* Hamburger trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className="flex gap-2 cursor-pointer"
      >
        <Image
          src={isHome ? MenuDark : Menu}
          alt="Open navigation menu"
          className={cn(isHome ? "block" : "block dark:hidden")}
        />
        {!isHome && (
          <Image
            src={MenuDark}
            alt="Open navigation menu"
            className="hidden dark:block"
          />
        )}
      </button>

      {/* Overlay panel */}
      {open && (
        <div className="fixed inset-0 z-[150] flex flex-col bg-[hsl(var(--bg-primary))] p-4 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Link href="/home" className="cursor-pointer" onClick={handleClose}>
              <Image src={Logo} alt="logo" />
            </Link>
            <button
              onClick={handleClose}
              className="size-[47px] rounded-full bg-[hsl(var(--bg-tertiary))] flex items-center justify-center shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* Accordion nav items */}
          <div className="flex flex-col gap-4">
            {accordionItems.map((item) => {
              const isExpanded = openItem === item.name;
              return (
                <div
                  key={item.name}
                  className={cn(
                    "bg-[hsl(var(--bg-tertiary))] rounded-xl w-full transition-all",
                    isExpanded ? "p-6" : "p-4"
                  )}
                >
                  <button
                    className="flex items-center justify-between w-full"
                    onClick={() =>
                      setOpenItem((prev) =>
                        prev === item.name ? null : item.name
                      )
                    }
                  >
                    <span className="font-medium text-base leading-6 text-[hsl(var(--text-secondary))]">
                      {item.name}
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "transition-transform duration-200 text-[hsl(var(--text-secondary))]",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <div className="flex flex-col gap-3 mt-4">
                      {item.children!.map((child) => {
                        const isExternal = child.url.startsWith("http");
                        return (
                        <Link
                          key={child.name}
                          href={child.url}
                          onClick={handleClose}
                          className="flex flex-col gap-[6px]"
                          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          <span className="font-medium text-[14px] leading-[21px] text-[hsl(var(--text-primary))]">
                            {child.name}
                          </span>
                          {child.description && (
                            <span className="text-xs font-normal leading-[18px] text-[hsl(var(--text-tertiary))]">
                              {child.description}
                            </span>
                          )}
                        </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Plain links */}
            {plainLinks.map((item) => (
              <Link
                key={item.name}
                href={item.url!}
                onClick={handleClose}
                className={cn(
                  "font-medium text-base text-[hsl(var(--text-primary))] dark:text-foreground",
                  item.url && pathname.includes(item.url) && "text-secondary-irish-green"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default MobileNav;
