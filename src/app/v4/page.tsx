import { UrgencyBar } from "@/components/hero/hero";
import { HeroV2 } from "@/components/hero/hero-v2";

// Hero version 2 on its own, without the rest of the landing page.
export default function HeroV2Only() {
  return (
    <main className="page-zoom flex flex-1 flex-col overflow-x-clip">
      <UrgencyBar />
      <HeroV2 />
    </main>
  );
}
