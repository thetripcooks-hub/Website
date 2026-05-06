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
import { ChevronDown } from "lucide-react";
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

  const allItems: NavItem[] = [...navConfig, { name: "My Cart", url: "/cart" }];

  const handleClose = () => {
    setOpen(false);
    setOpenItem(null);
  };

  return (
    <div className="sm:hidden flex gap-1">
      {open ? null : <CurrencyToggle />}
      <DropdownMenu
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setOpenItem(null);
        }}
      >
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2">
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
        <DropdownMenuContent className="w-screen rounded-none border-none p-5 py-10 h-[85vh] shadow-top-none sm:hidden -top-[75px] absolute -right-[36px] z-[99]">
          <div className="flex justify-between my-6">
            <Link href="/home" className="cursor-pointer">
              <Image src={Logo} alt="logo" />
            </Link>
            <div className="flex items-center gap-2">
              <CurrencyToggle mobileNavOpen={open} />
              <ModeToggle />
            </div>
          </div>
          <section className={cn("flex flex-col gap-6 h-[75%] justify-between")}>
            <div className="flex flex-col gap-4">
              {allItems.map((item) => {
                if (!item.children?.length) {
                  return (
                    <Link
                      key={item.name}
                      href={item.url!}
                      onClick={handleClose}
                      className={cn(
                        item.url &&
                          pathname.includes(item.url) &&
                          "text-secondary-irish-green"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                }

                const isExpanded = openItem === item.name;
                return (
                  <div key={item.name}>
                    <button
                      className="flex items-center justify-between w-full text-left"
                      onClick={() =>
                        setOpenItem((prev) =>
                          prev === item.name ? null : item.name
                        )
                      }
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        width={20}
                        height={20}
                        className={cn(
                          "transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                    {isExpanded && (
                      <div className="flex flex-col gap-3 mt-3 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.url}
                            onClick={handleClose}
                            className="text-sm text-muted-foreground"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col mt-5 gap-6">
              <h4>Follow us on Instagram</h4>
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
          </section>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNav;
