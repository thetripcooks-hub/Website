"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./cart";
import { cn } from "@/lib/utils";
import Logo from "~/logo.svg";
import { ModeToggle } from "./mode-toggle";
import CurrencyToggle from "./currency-toggle";
import useCartStore from "@/stores/cartStore";
import { ChevronDown, Menu, X } from "lucide-react";
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
      <Link href="/cart" aria-label="Cart" className="relative bg-[hsl(var(--bg-tertiary))] rounded-full size-[32px] flex items-center justify-center">
        <Cart iconOnly hideBadge />
        {itemCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] rounded-full bg-[#09AF0D] text-white text-[8px] font-normal flex items-center justify-center p-[2px]">
            {itemCount}
          </span>
        )}
      </Link>

      {/* Hamburger trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className={cn(
          "rounded-full size-[32px] flex items-center justify-center cursor-pointer",
          isHome ? "bg-[#121716]" : "bg-[hsl(var(--bg-tertiary))]"
        )}
      >
        <Menu size={16} className={isHome ? "text-white" : "text-neutral-text dark:text-foreground"} />
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

          {/* Nav items in order */}
          <div className="flex flex-col gap-4 flex-1">
            {navConfig.map((item) => {
              if (item.children?.length) {
                const isExpanded = openItem === item.name;
                const isParentActive = item.children.some(
                  (child) => pathname === child.url || pathname.startsWith(child.url + "/")
                );
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
                      <span className={cn(
                        "font-medium text-base leading-6",
                        isParentActive ? "text-secondary-irish-green" : "text-[hsl(var(--text-secondary))]"
                      )}>
                        {item.name}
                      </span>
                      <ChevronDown
                        size={20}
                        className={cn(
                          "transition-transform duration-200",
                          isParentActive ? "text-secondary-irish-green" : "text-[hsl(var(--text-secondary))]",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                    {isExpanded && (
                      <div className="flex flex-col gap-3 mt-4">
                        {item.children!.map((child) => {
                          const isExternal = child.url.startsWith("http");
                          const isChildActive =
                            pathname === child.url ||
                            (pathname.startsWith(child.url + "/") &&
                              !item.children!.some(
                                (sibling) =>
                                  sibling.url !== child.url &&
                                  (pathname === sibling.url || pathname.startsWith(sibling.url + "/"))
                              ));
                          return (
                            <Link
                              key={child.name}
                              href={child.url}
                              onClick={handleClose}
                              className="flex flex-col gap-[6px]"
                              {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                            >
                              <span className={cn(
                                "font-medium text-[14px] leading-[21px]",
                                isChildActive ? "text-secondary-irish-green" : "text-[hsl(var(--text-primary))]"
                              )}>
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
              }

              const isActive =
                !!item.url &&
                (pathname === item.url ||
                  (item.url === "/home" && pathname === "/") ||
                  pathname.startsWith(item.url + "/"));
              return (
                <Link
                  key={item.name}
                  href={item.url!}
                  onClick={handleClose}
                  className={cn(
                    "bg-[hsl(var(--bg-tertiary))] rounded-xl w-full p-4 font-medium text-base leading-6",
                    isActive ? "text-secondary-irish-green" : "text-[hsl(var(--text-secondary))]"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Bottom-right mode toggle */}
          <div className="flex justify-end pt-4">
            <div className="bg-[hsl(var(--bg-tertiary))] rounded-full size-[47px] flex items-center justify-center">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
