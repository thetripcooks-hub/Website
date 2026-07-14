import Image from "next/image";
import Link from "next/link";

export default function HowToBookHero() {
  return (
    <section className="bg-[#fafafa] dark:bg-[var(--bg-secondary)] w-full px-4 sm:px-[100px] py-[48px] flex flex-col items-center gap-[47px]">
      {/* Title + description */}
      <div className="flex flex-col items-center gap-3 sm:gap-[24px] text-center w-full">
        <h1 className="font-ogg-trial font-bold text-[26px] sm:text-[48px] leading-[34px] sm:leading-[72px] text-[var(--text-primary,#212121)] dark:text-foreground w-full sm:max-w-[556px]">
          How To Book a Trip
        </h1>

        <div className="font-normal text-[14px] sm:text-[18px] leading-[22px] sm:leading-[28px] text-[#6C707A] dark:text-[#8C909B] w-full sm:max-w-[900px] text-center space-y-0 flex gap-4 flex-col font-plus-jakarta-sans">
          <p>
            Booking with TripCooks is easy and exciting. We want to make the
            process as seamless as possible.
          </p>
          {/* because we exist to make
            travel more flavorful and fulfilling */}
          <p className="mt-[28px]">
            Check out our group trip booking process below. If you have any
            questions, please reach out to us at{" "}
            <Link
              href="mailto:hello@tripcooks.tours"
              className="text-[#09af0d] underline underline-offset-2"
            >
              hello@tripcooks.tours
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative w-full sm:w-[804px] h-[536px] border-8 border-white dark:border-white rounded-[12px] shadow-[0px_4px_29.4px_2px_rgba(146,146,146,0.25)] overflow-hidden shrink-0">
        <Image
          src="/img/how-to-book-photo.jpg"
          alt="Trip Cooks group adventure"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20 rounded-[12px]" />
      </div>
    </section>
  );
}
