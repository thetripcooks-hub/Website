"use client";
import React from "react";
import Image from "next/image";
import flag from "../img/whats-included/flag.svg";
import driving from "../img/whats-included/driving.svg";
import airplane from "../img/whats-included/airplane.svg";
import heart from "../img/whats-included/heart.svg";
import house from "../img/whats-included/house.svg";

const SeeMore = ({ handleClick }: { handleClick: () => void }) => (
  <p
    role="button"
    onClick={handleClick}
    className="cursor-pointer text-secondary-irish-green underline text-base sm:leading-[19.5px] w-full text-center sm:w-fit sm:text-start"
  >
    See more
  </p>
);

const WhatsIncluded = () => {
  const data: {
    icon: any;
    title: string;
  }[] = [
    {
      icon: airplane,
      title: "Flight ticket",
    },
    {
      icon: heart,
      title: "Breakfast included",
    },
    {
      icon: driving,
      title: "Airport pickup and  transfer",
    },
    {
      icon: house,
      title: "Accomodation",
    },
    {
      icon: flag,
      title: "Tourist activities",
    },
  ];
  return (
    <div>
      <h3 className="text-[24px] leading-[29.26px] font-medium mb-5 text-neutral-text">
        What’s included
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {data.map((item) => (
          <div
            key={item.icon + Math.random()}
            className="flex gap-2.5 items-center"
          >
            <Image
              src={item.icon}
              alt="icon"
              width={28}
              height={28}
              className="w-[28px] h-[28px] object-contain"
            />
            <p className="text-[16px] leading-[19.5px]">{item.title}</p>
          </div>
        ))}
        {/* <div className="hidden sm:flex">
          <SeeMore handleClick={() => {}} />
        </div> */}
      </div>
      <div className="flex sm:hidden mt-5">
        <SeeMore handleClick={() => {}} />
      </div>
    </div>
  );
};

export default WhatsIncluded;
