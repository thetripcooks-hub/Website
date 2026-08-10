import { SubcribeToNewsLetter, Footer } from "@/components/ui";
import HowToBookHero from "./_components/how-to-book-hero";
import HowToBookSteps from "./_components/how-to-book-steps";

const Page = () => {
  return (
    <main className="bg-white dark:bg-background w-full">
      <HowToBookHero />
      <HowToBookSteps />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
};

export default Page;
