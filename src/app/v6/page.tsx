import { EpisodeTickets } from "@/components/episodes/episode-tickets";
import { ScrollReveal } from "@/components/scroll-reveal";

// Only the "4 malam" episode tickets section (Figma 470:260635).
export default function EpisodeTicketsOnly() {
  return (
    <main className="page-zoom flex flex-1 flex-col overflow-x-clip">
      <EpisodeTickets />
      <ScrollReveal />
    </main>
  );
}
