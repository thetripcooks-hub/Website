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

const MobileNav = ({
  navConfig,
  pathname,
  isHome,
}: {
  navConfig: { name: string; url: string }[];
  pathname: string;
  isHome?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);
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
  return (
    <div className="sm:hidden flex gap-1">
      {open ? null : <CurrencyToggle />}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2">
            <Image src={isHome ? MenuDark : Menu} alt="Open navigation menu" className={cn(isHome ? "block" : "block dark:hidden")} />
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
          <section
            className={cn("flex flex-col gap-6 h-[75%] justify-between")}
          >
            {[
              ...navConfig,
              {
                name: "My Cart",
                url: "/cart",
              },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setOpen(false)}
                className={cn(
                  pathname.includes(item.url) && "text-secondary-irish-green"
                )}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex flex-col mt-5 gap-6">
              <h4>Follow us on Instagram</h4>
              <div className="flex gap-4">
                {socials.map((social, index) => (
                  <div
                    className="w-[46px] h-[46px] rounded-full border-neutral-300 border border-solid items-center justify-center flex dark:border-[#383E47]"
                    key={index}
                    onClick={() => {
                      setOpen(false);
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
                      className=" hidden dark:block"
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
