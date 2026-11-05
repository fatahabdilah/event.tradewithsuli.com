import { CtaFooter } from "@/components/cta-footer/cta-footer";
import { DetailEvent } from "@/components/detail-event/detail-event";
import { EpisodeTicketsV2 } from "@/components/episodes/episode-tickets-v2";
import { Hero, UrgencyBar } from "@/components/hero/hero";
import { Profile } from "@/components/profile/profile";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <main className="page-zoom flex flex-1 flex-col overflow-x-clip">
      <UrgencyBar />
      <Hero />
      <Profile />
      <EpisodeTicketsV2 />
      <DetailEvent />
      <CtaFooter />
      <ScrollReveal />
    </main>
  );
}
