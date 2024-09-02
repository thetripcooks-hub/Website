import Image from "next/image";
import React from "react";
import Logo from "../../public/logo.svg";
import Menu from "../../public/img/harmburger-menu.svg";
import Cart from "../../public/img/cart.svg";
import ArrowLeft from "@/components/icons/svg/arrow-left.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const navConfig = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Trips",
    children: [
      {
        name: "All Trips",
        url: "/trips",
      },
    ],
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];

const Navbar = () => {
  return (
    <div className="bg-none h-[95px] flex flex-row justify-between items-center px-5 sm:px-[8%]">
      <Image src={Logo} alt="logo" />

      <section className="hidden sm:flex gap-5 text-white text-[16px] leading-[19.5px]">
        {navConfig.map((item) =>
          item.children ? (
            <DropdownMenu key={item.name}>
              <DropdownMenuTrigger asChild className="flex gap-1">
                <div className="cursor-pointer">
                  {item.name}
                  <Image src={ArrowLeft} alt="arrow-down" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {item.children.map((x) => (
                  <Link key={x.name} href={x.url}>
                    {x.name}
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link key={item.name} href={item.url}>
              {item.name}
            </Link>
          )
        )}
      </section>

      <section className="hidden sm:flex gap-2.5">
        <ModeToggle />
        <Image src={Cart} alt="cart-icon" className="cursor-pointer" height={46} />
      </section>

      {/* mobile hamburger */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image src={Menu} alt="hamburger-menu" />
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
