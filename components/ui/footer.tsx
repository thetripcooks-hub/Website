"use client";
import Image from "next/image";
import React from "react";
import LogoBig from "~/logo-big.svg";
import Instagram from "@/components/icons/svg/instagram.svg";
import InstagramDark from "@/components/icons/svg/instagram-dark.svg";
import Tiktok from "@/components/icons/svg/tiktok.svg";
import TiktokDark from "@/components/icons/svg/tiktok-dark.svg";
import LinkedIn from "@/components/icons/svg/linkedin.svg";
import LinkedInDark from "@/components/icons/svg/linkedin-dark.svg";
import Link from "next/link";

const footerConfig = [
  {
    title: "Resources",
    routes: [
      { name: "Blog", url: "/blog" },
      { name: "Community", url: "/community" },
      { name: "Travel Guides", url: "/travel-guides" },
    ],
  },
  {
    title: "Trips",
    routes: [
      { name: "Past Trips", url: "/trips/past" },
      { name: "Private Trips", url: "/private-trips" },
      { name: "Current Trips", url: "/trips" },
    ],
  },
  {
    title: "Company",
    routes: [
      { name: "Our Story", url: "/about" },
      { name: "How To Book", url: "/how-to-book" },
      { name: "Contact Us", url: "/contact" },
    ],
  },
  {
    title: "Legal",
    routes: [
      { name: "Privacy Policy", url: "/legal" },
      { name: "Terms and Conditions", url: "/legal" },
    ],
  },
];

const socials = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/tripcooks/",
    icon: Instagram,
    darkIcon: InstagramDark,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@tripcooks?_t=ZM-8smTfjMee4k&_r=1",
    icon: Tiktok,
    darkIcon: TiktokDark,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/tripcooks/",
    icon: LinkedIn,
    darkIcon: LinkedInDark,
  },
];

const Footer = () => {
  return (
    <section className="px-5 pb-10 sm:pb-[64px] sm:px-[100px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-10">
          {/* Logo + socials */}
          <div className="flex flex-col gap-[25px] shrink-0">
            <Image src={LogoBig} alt="TripCooks logo" />
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="size-[46px] rounded-[23px] bg-[hsl(var(--bg-tertiary))] flex items-center justify-center shrink-0"
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={20}
                    height={20}
                    className="dark:hidden"
                  />
                  <Image
                    src={social.darkIcon}
                    alt={social.name}
                    width={20}
                    height={20}
                    className="hidden dark:block"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[36px]">
            {footerConfig.map((section) => (
              <div key={section.title} className="flex flex-col gap-[23px]">
                <h3 className="font-medium text-[18px] leading-[27px] text-[hsl(var(--text-primary))]">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-[11px]">
                  {section.routes.map((route) => (
                    <li key={route.name}>
                      <Link
                        href={route.url}
                        className="text-[16px] leading-[24px] text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors"
                      >
                        {route.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Footer };
