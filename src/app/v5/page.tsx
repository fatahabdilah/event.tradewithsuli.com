import { CtaFooter } from "@/components/cta-footer/cta-footer";
import { ScrollReveal } from "@/components/scroll-reveal";

// The closing "Daftar sekarang" card on its own (no footer).
export default function CtaOnly() {
  return (
    <main className="page-zoom flex flex-1 flex-col overflow-x-clip">
      <CtaFooter footer={false} />
      <ScrollReveal />
    </main>
  );
}
