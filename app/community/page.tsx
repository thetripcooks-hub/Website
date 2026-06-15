"use client";

import { Footer, SubcribeToNewsLetter } from "@/components/ui";
import Reviews from "@/app/home/_components/reviews";
import CommunityHero from "./_components/community-hero";
import AlumniGrid from "./_components/alumni-grid";

export default function CommunityPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[color:var(--bg-primary)]">
      <CommunityHero />
      <AlumniGrid />
      <Reviews />
      <SubcribeToNewsLetter />
      <Footer />
    </main>
  );
}
