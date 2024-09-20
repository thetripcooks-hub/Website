"use client";
import Reviews from "@/app/_components/reviews";
import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import Navbar from "@/components/ui/navbar";
import { cn } from "@/lib/utils";
import React from "react";
import ViewOfLocation from "./_components/view-of-location";
import Itinerary from "./_components/Itinerary";
import TripDetailOverview from "./_components/trip-detail-overview";
import Image from "next/image";
import Cart from "../../../public/img/cart.svg";

const Page = () => {
  return (
    <main className={cn("bg-white w-full")}>
      <div className="hidden sm:block">
        <Navbar hasBg={false} />
      </div>
      <div className=" sm:hidden flex items-center justify-between m-5">
        <div className="flex items-center gap-2.5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
          <h3>Madrid, Spain</h3>
        </div>

        <Image
          src={Cart}
          alt="cart-icon"
          className="cursor-pointer"
          height={32}
        />
      </div>
      <TripDetailOverview />
      <Itinerary />
      <ViewOfLocation />
      <Reviews />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
