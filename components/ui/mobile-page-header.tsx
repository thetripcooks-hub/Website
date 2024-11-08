"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import CartIcon from "~/img/cart.svg";

interface MobilePageHeaderProps {
  title: string;
  backAction?: () => void;
  showCartBtn?: boolean;
}

const MobilePageHeader = ({
  title,
  backAction,
  showCartBtn = true,
}: MobilePageHeaderProps) => {
  const router = useRouter();

  return (
    <div className=" sm:hidden flex items-center justify-between m-5">
      <div className="flex items-center gap-2.5">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => (backAction ? backAction() : router.back())}
        >
          <path
            d="M12.5005 16.5999L7.06719 11.1666C6.42552 10.5249 6.42552 9.4749 7.06719 8.83324L12.5005 3.3999"
            stroke="#020E0B"
            strokeWidth="1.25"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3>{title}</h3>
      </div>

      {showCartBtn ? (
        <Image
          src={CartIcon}
          alt="cart-icon"
          className="cursor-pointer h-[32px] sm:h-[46px]"
          onClick={() => router.push("/cart")}
        />
      ) : null}
    </div>
  );
};

export default MobilePageHeader;
