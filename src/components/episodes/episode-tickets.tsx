/* eslint-disable @next/next/no-img-element -- blurred light-ray SVGs */
import type { CSSProperties } from "react";

const IMG = "/episode-tickets";

/** One blurred light ray (Figma frame box + rotated inner layer), in ticket coordinates. */
type Ray = {
  box: [left: number, top: number, w: number, h: number];
  inner: [w: number, h: number];
  /** The SVG overflows its layer by this much (its blur), as CSS inset percentages. */
  inset: string;
  src: string;
};

// The stub's rays and the main part's first set share the same four light shapes; the main part's second
// set is a larger, 70% copy fanning in from the left.
const STUB_ROTATE = "rotate-[-27.92deg]";
const MAIN_ROTATE = "-scale-y-100 rotate-[-152.08deg]";
const LEFT_ROTATE = "rotate-[-146.8deg] opacity-70";

function rays(day: number) {
  const r = (k: string) => `${IMG}/r${day}-${k}.svg`;
  const shared = { d: `${IMG}/r-d.svg`, h: `${IMG}/r-h.svg` };
  const four = (lefts: number[]): Ray[] => [
    { box: [lefts[0], -425.19, 1340.345, 997.704], inner: [1277.141, 452.43], inset: "-30.74% -10.89%", src: r("a") },
    { box: [lefts[1], -393.53, 1152.266, 858.392], inner: [1097.357, 390.026], inset: "-15.18% -5.39%", src: r("b") },
    { box: [lefts[2], -414.69, 1152.266, 858.392], inner: [1097.357, 390.026], inset: "-17.92% -6.37%", src: r("c") },
    { box: [lefts[3], -418.62, 1131.397, 819.004], inner: [1097.357, 345.452], inset: "-13.8% -4.34%", src: shared.d },
  ];
  return {
    stub: four([698.69, 707.34, 661.59, 659.5]),
    main: four([133, 312.43, 358.18, 381.14]),
    left: [
      { box: [-641.17, -308, 1626.841, 1332.159], inner: [1578.344, 559.132], inset: "-30.74% -10.89%", src: r("e") },
      { box: [-517.25, -99.82, 1398.7, 1145.959], inner: [1356.16, 482.01], inset: "-15.18% -5.39%", src: r("f") },
      { box: [-512.83, -37.68, 1398.7, 1145.959], inner: [1356.16, 482.01], inset: "-17.92% -6.37%", src: r("g") },
      { box: [-515.84, 13.03, 1368.534, 1099.865], inner: [1356.16, 426.924], inset: "-13.8% -4.34%", src: shared.h },
    ] satisfies Ray[],
  };
}

function RayLayer({ ray, rotate }: { ray: Ray; rotate: string }) {
  const [left, top, w, h] = ray.box;
  return (
    <div className="absolute flex items-center justify-center" style={{ left, top, width: w, height: h }}>
      <div className={`flex-none ${rotate}`}>
        <div className="relative" style={{ width: ray.inner[0], height: ray.inner[1] }}>
          <div className="absolute" style={{ inset: ray.inset }}>
            <img alt="" className="block size-full max-w-none" src={ray.src} />
          </div>
        </div>
      </div>
    </div>
  );
}

type Ticket = {
  day: number;
  /** Ticket outline (main part + stub); the first and last tickets have their own perforated edges. */
  shape: 1 | 2 | 4;
  color: string;
  date: string;
  title: string;
  titleWidth?: number;
  description: string;
};

const TICKETS: Ticket[] = [
  {
    day: 1,
    shape: 1,
    color: "#2a62ff",
    date: "25 Nov 2026",
    title: "Kenapa 2027–2028 Adalah Bullrun Terakhir?",
    description: "Pahami siklus halving, alasan Suli melihat siklus ini berbeda, dan posisi market kita sekarang.",
  },
  {
    day: 2,
    shape: 2,
    color: "#545454",
    date: "26 Nov 2026",
    title: "Narasi & Altcoin yang Bakal 10X di 2027",
    description: "Narasi besar 2027 dan cara Suli memilih altcoin yang punya fundamental, bukan sekadar hype.",
  },
  {
    day: 3,
    shape: 2,
    color: "#e38a1d",
    date: "27 Nov 2026",
    title: "Bitcoin Bakal Hit $1.000.000",
    description: "Hitungan di balik skenario $1.000.000, faktor pendorongnya, dan cara lu memposisikan diri.",
  },
  {
    day: 4,
    shape: 4,
    color: "#566eb2",
    date: "28 Nov 2026",
    title: "Cara Paling Gampang Mulai Trading Crypto Modal 1 Juta",
    titleWidth: 531,
    description: "Setup akun yang aman, cara bagi modal 1 juta, dan kapan masuk atau keluar tanpa panik.",
  },
];

// The day number's mid stop: Figma uses a lighter tint than the pill for days 2 and 4.
const DAY_TINT: Record<number, string> = { 1: "#2a62ff", 2: "#b0b0b0", 3: "#e38a1d", 4: "#708ad6" };

const MASK = "lg:[mask-repeat:no-repeat] lg:[mask-image:var(--mask)]";

function TicketCard({ ticket, delay }: { ticket: Ticket; delay: number }) {
  const { stub, main, left } = rays(ticket.day);
  const shape = (part: string) => `url(${IMG}/m${ticket.shape}-${part}.svg)`;

  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className="relative h-[373.886px] w-full overflow-clip text-white max-lg:flex max-lg:h-auto max-lg:min-h-[300px] max-sm:min-h-[330px] max-lg:flex-col max-lg:justify-between max-lg:gap-10 max-lg:rounded-[16px] max-lg:p-6"
    >
      {/* Main part: light rays and the big day number, cut to the ticket outline. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-black ${MASK} lg:[mask-size:1087.67px_373.886px]`}
        style={{ "--mask": shape("main") } as CSSProperties}
      >
        <div className="absolute top-0 left-0 h-[374px] w-[1087.67px] max-lg:right-0 max-lg:left-auto max-lg:origin-top-right max-lg:scale-[0.6] sm:max-lg:scale-[0.8]">
          {main.map((ray) => (
            <RayLayer key={ray.src} ray={ray} rotate={MAIN_ROTATE} />
          ))}
          {left.map((ray) => (
            <RayLayer key={ray.src} ray={ray} rotate={LEFT_ROTATE} />
          ))}
          <p
            className="absolute top-[-41px] left-[621px] origin-top-right max-sm:translate-y-[95px] max-sm:scale-[0.55] bg-clip-text font-bebas text-[257.178px] leading-[1.4] whitespace-nowrap text-transparent"
            style={{ backgroundImage: `linear-gradient(194.77deg, #fff 21.833%, ${DAY_TINT[ticket.day]} 34.85%, rgb(0 0 0 / 0.4) 72.918%)` }}
          >
            DAY {ticket.day}
          </p>
        </div>
      </div>

      {/* Stub. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-black ${MASK} [mask-position:1087.66px_0] [mask-size:192.331px_373.887px] max-lg:hidden`}
        style={{ "--mask": shape("stub") } as CSSProperties}
      >
        {stub.map((ray) => (
          <RayLayer key={ray.src} ray={ray} rotate={STUB_ROTATE} />
        ))}
        <p className="absolute top-[184.18px] left-[1149.53px] w-[236.122px] -translate-1/2 -rotate-90 text-center font-montreal text-[21.919px] leading-[1.09] tracking-[-0.6576px] uppercase">
          Preparing for
        </p>
        <p className="absolute top-[183.63px] left-[1194.67px] -translate-1/2 -rotate-90 bg-gradient-to-b from-white to-[#2a62ff] to-[120.06%] bg-clip-text font-bebas text-[63.523px] leading-[1.09] tracking-[-1.9057px] whitespace-nowrap text-transparent">
          2027 BULLRUN
        </p>
      </div>

      <div className="absolute top-[64px] left-[64px] flex items-center gap-[10px] max-lg:relative max-lg:inset-auto">
        {[ticket.date, "19.00 WIB"].map((label) => (
          <span
            key={label}
            className="rounded-full px-[9.55px] py-[3.183px] font-montreal text-[12.733px] font-medium leading-[1.4] whitespace-nowrap"
            style={{ backgroundColor: ticket.color }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="absolute bottom-[63.55px] left-[64px] flex w-[531.289px] flex-col items-start gap-[12px] max-lg:relative max-lg:inset-auto max-lg:w-full max-lg:gap-2">
        <h3
          className="font-montreal text-[38.222px] font-bold leading-[1.2] max-lg:w-full! max-lg:max-w-[340px] max-lg:text-[26px]"
          style={{ width: ticket.titleWidth ?? 462.489 }}
        >
          {ticket.title}
        </h3>
        <p className="w-full font-montreal text-[20.802px] leading-[1.4] text-balance max-lg:text-[15px]">{ticket.description}</p>
      </div>
    </article>
  );
}

export function EpisodesHeading() {
  return (
    <h2 data-reveal className="flex w-[393px] flex-col items-center text-center uppercase leading-[36px] max-lg:w-full">
      <span className="w-full whitespace-nowrap font-montreal text-[16px] text-white">4 malam yang nentuin</span>
      <span className="w-max whitespace-nowrap bg-gradient-to-r from-[#2a62ff] from-[7.212%] to-white bg-clip-text font-montreal text-[30px] font-bold text-transparent max-sm:text-[24px] max-sm:leading-[30px]">
        posisi lu di bullrun 2027
      </span>
    </h2>
  );
}

/** "4 malam" schedule shown as four event tickets (Figma 470:260635). */
export function EpisodeTickets() {
  return (
    <section id="episodes" className="w-full bg-black text-white">
      <div className="mx-auto flex w-[1440px] flex-col items-center gap-[48px] p-[80px] max-lg:w-full max-lg:gap-8 max-lg:px-5 max-lg:py-16">
        <EpisodesHeading />

        <div className="flex w-full flex-col gap-[32px] max-lg:gap-4">
          {TICKETS.map((ticket, i) => (
            <TicketCard key={ticket.day} ticket={ticket} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
