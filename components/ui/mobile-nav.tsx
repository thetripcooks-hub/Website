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
import Logo from "~/logo.svg";
import { ModeToggle } from "./mode-toggle";
import { useRouter } from "next/navigation";

const MobileNav = ({
  navConfig,
  pathname,
}: {
  navConfig: { name: string; url: string }[];
  pathname: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  return (
    <div className="sm:hidden">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div>
            <Image src={Menu} alt="hamburger-menu" className="dark:hidden" />
            <Image
              src={MenuDark}
              alt="hamburger-menu"
              className="hidden dark:block"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-screen rounded-none border-none p-5 py-10 h-[85vh] shadow-top-none sm:hidden -top-[75px] absolute -right-[36px] z-[99]">
          <div className="flex justify-between my-6">
            <Link href="/home" className="cursor-pointer">
              <Image src={Logo} alt="logo" />
            </Link>
            <ModeToggle />
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

            <div
              className="flex flex-col mt-5 gap-6"
              onClick={() => {
                setOpen(false);
                router.replace("https://www.instagram.com/");
              }}
            >
              <h4>Follow us on Instagram</h4>
              <div className="w-[46px] h-[46px] rounded-full border-neutral-300 border border-solid items-center justify-center flex dark:border-[#383E47]">
                <Image
                  src={Instagram}
                  alt="instagram-logo"
                  width={19.88}
                  className="dark:hidden"
                />
                <Image
                  src={InstagramDark}
                  width={19.88}
                  className=" hidden dark:block"
                  alt="social-media-icon"
                />
              </div>
            </div>
          </section>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNav;
