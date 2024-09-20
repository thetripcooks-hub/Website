import React from "react";
import img1 from "../img/trip-detail-overview/1-desktop.svg";
import img2 from "../img/trip-detail-overview/2-desktop.svg";
import img3 from "../img/trip-detail-overview/3-desktop.svg";
import Image from "next/image";
import SectionWrapper from "@/app/_components/section-wrapper";
import TripInfo from "./trip-info";
import TravelWithOwners from "./travel-with-owners";
import WhatsIncluded from "./whats-included";
import PaymentCard from "./payment-card";

const TripDetailOverview = () => {
  const tripImages = [img1, img2, img3];
  return (
    <div className="px-5 py=5 sm:pt-10 sm:pb-20 text-neutral-text sm:px-[8%]">
      <SectionWrapper>
        <h3 className="font-medium text-neutral-text leading-[39.01px] text-[32px] hidden sm:flex mb-5">
          Madrid, Spain
        </h3>
        {/* image section */}
        <div className="grid grid-cols-2 gap-2 sm:gap-5">
          <Image
            src={tripImages[0]}
            alt="trip location images"
            className="w-full object-cover rounded-[18px] sm:h-[537px]"
          />
          <div className="flex flex-col sm:gap-5 justify-between">
            {tripImages.slice(1).map((item) => (
              <Image
                key={`${item}-${Math.random()}`}
                src={item}
                alt="trip location images"
                className="w-full object-cover rounded-[18px] sm:h-[259px]"
              />
            ))}
          </div>
        </div>

        <div className="flex w-full justify-between mt-5 sm:mt-10">
          <section className="sm:w-1/2 sm:max-w-[601px]">
            <TripInfo />
            <TravelWithOwners />
            <WhatsIncluded />
          </section>
          <section className="hidden sm:flex sm:w-1/2 sm:max-w-[424px]">
            <PaymentCard />
          </section>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default TripDetailOverview;
