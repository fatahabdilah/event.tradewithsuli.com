import { CtaFooter } from "@/components/cta-footer/cta-footer";
import { DetailEvent } from "@/components/detail-event/detail-event";
import { EpisodeTicketsV2 } from "@/components/episodes/episode-tickets-v2";
import { UrgencyBar } from "@/components/hero/hero";
import { HeroV2 } from "@/components/hero/hero-v2";
import { Profile } from "@/components/profile/profile";
import { ScrollReveal } from "@/components/scroll-reveal";

// Same landing page with the second hero version (Figma 461:260325).
export default function HomeV2() {
  return (
    <main className="page-zoom flex flex-1 flex-col overflow-x-clip">
      <UrgencyBar />
      <HeroV2 />
      <Profile />
      <EpisodeTicketsV2 />
      <DetailEvent />
      <CtaFooter />
      <ScrollReveal />
    </main>
  );
}
