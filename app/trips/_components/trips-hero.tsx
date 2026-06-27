import TripsHeroBackground from "./hero-background";

const TripsHero = () => {
  return (
    <TripsHeroBackground>
      <h1 className="font-ogg-trial text-[48px] sm:text-[64px] leading-[1.5] text-neutral-text dark:text-foreground">
        Group Trips
      </h1>
      <p className="text-[16px] sm:text-[20px] leading-[1.5] font-normal text-neutral-text dark:text-foreground">
        Browse our rollout!
      </p>
    </TripsHeroBackground>
  );
};

export default TripsHero;
