import TripsHeroBackground from "../../_components/hero-background";

const PastTripsHero = () => {
  return (
    <TripsHeroBackground>
      <h1 className="font-ogg-trial text-[48px] max-sm:text-[32px] sm:text-[64px] leading-[1.5] text-neutral-text dark:text-foreground">
        Past Trips
      </h1>
      <p className="text-[16px] sm:text-[20px] leading-[1.5] font-normal text-neutral-text dark:text-foreground">
        We&apos;ve been touring!
      </p>
    </TripsHeroBackground>
  );
};

export default PastTripsHero;
