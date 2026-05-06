"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Menu from "~/img/harmburger-menu.svg";
import MenuDark from "~/img/harmburger-menu-dark.svg";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Instagram from "@/components/icons/svg/instagram.svg";
import InstagramDark from "@/components/icons/svg/instagram-dark.svg";
import Tiktok from "@/components/icons/svg/tiktok.svg";
import TiktokDark from "@/components/icons/svg/tiktok-dark.svg";
import Logo from "~/logo.svg";
import { ModeToggle } from "./mode-toggle";
import { useRouter } from "next/navigation";
import CurrencyToggle from "./currency-toggle";
import Cart from "./cart";
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
  const router = useRouter();

  const socials = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/tripcooks/",
      icon: Instagram,
      darkIcon: InstagramDark,
    },
    {
      name: "Tiktok",
      url: "https://www.tiktok.com/@tripcooks?_t=ZM-8smTfjMee4k&_r=1",
      icon: Tiktok,
      darkIcon: TiktokDark,
    },
  ];

  const plainLinks: NavItem[] = [
    ...navConfig.filter((item) => !item.children?.length),
    { name: "My Cart", url: "/cart" },
  ];
  const accordionItems = navConfig.filter((item) => item.children?.length);

  const handleClose = () => {
    setOpen(false);
    setOpenItem(null);
  };

  return (
    <div className="sm:hidden flex gap-1">
      <DropdownMenu
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setOpenItem(null);
        }}
      >
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2 cursor-pointer">
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
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-screen rounded-none border-none p-4 h-[85vh] shadow-none sm:hidden -top-[75px] absolute -right-[36px] z-[99] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Link href="/home" className="cursor-pointer" onClick={handleClose}>
              <Image src={Logo} alt="logo" />
            </Link>
            <button
              onClick={handleClose}
              className="size-[47px] rounded-full bg-[hsl(var(--bg-tertiary))] dark:bg-[hsl(var(--bg-tertiary))] flex items-center justify-center shrink-0"
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
                    <span
                      className={cn(
                        "font-medium text-base leading-6",
                        isExpanded
                          ? "text-[hsl(var(--text-secondary))]"
                          : "text-[hsl(var(--text-secondary))]"
                      )}
                    >
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
                      {item.children!.map((child) => (
                        <Link
                          key={child.name}
                          href={child.url}
                          onClick={handleClose}
                          className="flex flex-col gap-[6px]"
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
                      ))}
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

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom controls */}
          <div className="flex gap-2 items-center mb-4">
            <div className="bg-[hsl(var(--bg-tertiary))] rounded-full">
              <CurrencyToggle mobileNavOpen={open} />
            </div>
            <div className="bg-[hsl(var(--bg-tertiary))] rounded-full size-[47px] flex items-center justify-center">
              <ModeToggle />
            </div>
            <div className="bg-[hsl(var(--bg-tertiary))] rounded-full size-[47px] flex items-center justify-center">
              <Cart transparent={false} />
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-medium text-[hsl(var(--text-secondary))]">Follow us on Instagram</h4>
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <div
                  className="w-[46px] h-[46px] rounded-full border-neutral-300 border border-solid items-center justify-center flex dark:border-[#383E47]"
                  key={index}
                  onClick={() => {
                    handleClose();
                    router.push(social.url);
                  }}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={19.88}
                    className="dark:hidden"
                  />
                  <Image
                    src={social.darkIcon}
                    width={19.88}
                    className="hidden dark:block"
                    alt={social.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNav;
