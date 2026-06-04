const PastTripsHero = () => {
  return (
    <div className="w-full h-[calc(350px+75px)] sm:h-[calc(460px+95px)] -mt-[75px] sm:-mt-[95px] bg-[#daf3db] dark:bg-[#133114] flex items-center justify-center pt-[75px] sm:pt-[95px]">
      <div className="flex flex-col items-center gap-6 sm:gap-9 text-center px-5">
        <h1 className="font-ogg-trial text-[48px] sm:text-[64px] leading-[1.5] text-neutral-text dark:text-foreground">
          Past Trips
        </h1>
        <p className="text-[16px] sm:text-[20px] leading-[1.5] font-normal text-neutral-text dark:text-foreground">
          We&apos;ve been touring!
        </p>
      </div>
    </div>
  );
};

export default PastTripsHero;
