import { CtaFooter } from "@/components/cta-footer/cta-footer";
import { DetailEvent } from "@/components/detail-event/detail-event";
import { Episodes } from "@/components/episodes/episodes";
import { Hero, UrgencyBar } from "@/components/hero/hero";
import { Profile } from "@/components/profile/profile";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SocialProof } from "@/components/social-proof/social-proof";

export default function Home() {
  return (
    <main className="page-zoom flex flex-1 flex-col overflow-x-clip">
      <UrgencyBar />
      <Hero />
      <Profile />
      <Episodes />
      <SocialProof />
      <DetailEvent />
      <CtaFooter />
      <ScrollReveal />
    </main>
  );
}
