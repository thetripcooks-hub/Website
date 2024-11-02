import { Input } from "@/components/ui";
import React from "react";
import SearchIcon from "@/components/icons/svg/search-icon.svg";
import Image from "next/image";

const TripSearch = () => {
  return (
    <div className="flex items-center justify-center mt-10 px-2.5 w-full">
      <div className="bg-white w-full h-[69px] sm:h-[81px] rounded-[200px] max-w-[604px] px-5 sm:px-6 py-2 sm:py-4 flex justify-between items-center border border-[#E1E6EF]">
        <div className="flex flex-col w-3/4 gap-0">
          <label
            htmlFor="location"
            className="text-[#000000] text-sm sm:text-base"
          >
            Where
          </label>
          <Input
            id="location"
            placeholder="Where are we going to?"
            className="p-0 border-none hover:outline-none shadow-none focus-visible:ring-0 h-fit text-neutral-grey-500 text-xs sm:text-sm"
          />
        </div>
        <Image src={SearchIcon} alt="search-icon" />
      </div>
    </div>
  );
};

export default TripSearch;
