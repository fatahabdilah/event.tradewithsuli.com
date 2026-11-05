import { Hero, UrgencyBar } from "@/components/hero/hero";

// Hero version 1 on its own, without the rest of the landing page.
export default function HeroV1Only() {
  return (
    <main className="page-zoom flex flex-1 flex-col overflow-x-clip">
      <UrgencyBar />
      <Hero />
    </main>
  );
}
