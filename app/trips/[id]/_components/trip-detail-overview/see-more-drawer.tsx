"use client";
import * as React from "react";

// import { Bar, BarChart, ResponsiveContainer } from "recharts";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { CircleCheck } from "lucide-react";

export function DrawerDemo({
  data,
}: {
  data: {
    icon: any;
    title: string;
  }[];
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <p
          role="button"
          className="cursor-pointer underline text-base sm:leading-[19.5px] w-full text-center sm:w-fit sm:text-start text-secondary-irish-green sm:text-neutral-text"
        >
          See more
        </p>
      </DrawerTrigger>
      <DrawerContent className="h-fit">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="my-4 text-2xl leading-[29.26px] text-center">
              Here is what’s included on your trip
            </DrawerTitle>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
          <div className="px-4 pb-10 flex flex-col gap-5 max-h-[60vh] overflow-y-auto">
            {data.map((item) => (
              <div
                key={item.icon + Math.random()}
                className="flex gap-2.5 items-center"
              >
                {/* <Image
                  src={item.icon}
                  alt="icon"
                  width={28}
                  height={28}
                  className="w-[28px] h-[28px] object-contain dark:hidden"
                /> */}
                <CircleCheck className="text-foreground w-[28px] h-[28px]" />
                <p className="text-[16px] leading-[19.5px]">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
