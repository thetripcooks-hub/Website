import React from "react";
import img1 from "../img/trip-detail-overview/1-desktop.svg";
import img2 from "../img/trip-detail-overview/2-desktop.svg";
import img3 from "../img/trip-detail-overview/3-desktop.svg";
import Image from "next/image";
import SectionWrapper from "@/app/home/_components/section-wrapper";
import TripInfo from "./trip-info";
import TravelWithOwners from "./travel-with-owners";
import WhatsIncluded from "./whats-included";
import PaymentCard from "./payment-card";
import PaymentTermsMobile from "./payment-terms-mobile";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useTripStore from "@/stores/trip-store";

const TripDetailOverview = () => {
  const tripImages = [img1, img2, img3];
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    fade: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  const { selectedTrip } = useTripStore();
  return (
    selectedTrip && (
      <div className="px-5 py=5 sm:pt-10 sm:pb-20 text-neutral-text sm:px-[8%]">
        <SectionWrapper>
          <h3 className="font-medium text-neutral-text leading-[39.01px] text-[32px] hidden sm:flex mb-5">
            {selectedTrip?.location || ""}
          </h3>
          {/* desktop image section */}
          <div className="sm:grid grid-cols-2 gap-2 sm:gap-5 hidden">
            <Image
              src={selectedTrip?.bannerImagesCollection.items[0].url}
              alt="trip location images"
              width={581}
              height={537}
              className="w-full object-cover rounded-[18px] h-[268.5px] sm:h-[537px]"
            />
            <div className="flex flex-col sm:gap-5 justify-between">
              {selectedTrip?.bannerImagesCollection.items
                .slice(1)
                .map((item) => (
                  <Image
                    key={`${item}-${Math.random()}`}
                    src={item.url}
                    alt="trip location images"
                    width={581}
                    height={259}
                    className="w-full object-cover rounded-[18px] h-[129.5px] sm:h-[259px]"
                  />
                ))}
            </div>
          </div>
          {/* mobile images */}
          <div className="sm:hidden">
            <Slider {...settings}>
              {selectedTrip.bannerImagesCollection.items.map((item) => (
                <Image
                  key={`${item}-${Math.random()}`}
                  src={item.url}
                  width={581}
                  height={259}
                  alt="trip location images"
                  className="w-[80vw] object-cover rounded-[18px] h-[268.5px]"
                />
              ))}
            </Slider>
          </div>

          <div className="flex w-full justify-between mt-5 sm:mt-10">
            <section className="sm:w-1/2 sm:max-w-[601px]">
              <TripInfo />
              {selectedTrip.travelWithOwners ? <TravelWithOwners /> : null}
              <PaymentTermsMobile />
              <WhatsIncluded />
            </section>
            <section className="hidden sm:flex sm:w-1/2 sm:max-w-[424px]">
              <PaymentCard />
            </section>
          </div>
        </SectionWrapper>
      </div>
    )
  );
};

export default TripDetailOverview;
