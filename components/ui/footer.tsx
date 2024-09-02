import Image from "next/image";
import React from "react";
import LogoBig from "../../public/logo-big.svg";
import Instagram from "@/components/icons/svg/instagram.svg";
import Facebook from "@/components/icons/svg/facebook.svg";
import X from "@/components/icons/svg/x.svg";
import Link from "next/link";

const config = [
  {
    title: "Company",
    routes: [
      {
        name: "About Us",
        url: "/about",
      },
      {
        name: "Contact Us",
        url: "/contact",
      },
    ],
  },
  {
    title: "Trips",
    routes: [
      {
        name: "Upcoming trips",
        url: "/trips",
      },
      {
        name: "Group trips",
        url: "/trips",
      },
    ],
  },
  {
    title: "Legal",
    routes: [
      {
        name: "Privacy Policy",
        url: "/privacy",
      },
      {
        name: "Terms and Conditions",
        url: "/terms",
      },
    ],
  },
];

const Footer = () => {
  return (
    <section className="px-5 py-5 sm:px-[8%] flex flex-col sm:flex-row sm:justify-between gap-5">
      <div className="flex flex-col gap-5 sm:w-2/5">
        <Image src={LogoBig} alt="logo" />
        <div className="flex gap-4">
          {[Instagram, Facebook, X].map((icon, index) => (
            <div
              className="bg-white border border-neutral-grey-300 rounded-full h-[46px] w-[46px] flex items-center justify-center cursor-pointer"
              key={index}
            >
              <Image
                src={icon}
                className="w-5 h-5 sm:w-[25px] sm:h-[25px]"
                alt="social-media-icon"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:w-3/5 sm:justify-between sm:max-w-[600px] gap-5">
        {config.map((item, index) => (
          <div key={index}>
            <h3 className="text-xl leading-[24px] text-neutral-text">
              {item.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {item.routes.map((route, index) => (
                <li
                  key={index}
                  className="text-lg leading-[24px] text-neutral-subtext"
                >
                  <Link href={route.url}>{route.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export { Footer };
