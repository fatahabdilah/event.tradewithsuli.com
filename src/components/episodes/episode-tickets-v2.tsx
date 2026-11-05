/* eslint-disable @next/next/no-img-element -- ticket outline and glow SVGs */
import type { CSSProperties } from "react";
import { EpisodesHeading } from "./episode-tickets";

const IMG = "/episode-tickets";

type Ticket = {
  day: number;
  color: string;
  date: string;
  title: string;
  points: [string, string, string];
};

const TICKETS: Ticket[] = [
  {
    day: 1,
    color: "#2a62ff",
    date: "25 Nov 2026",
    title: "Kenapa 2027–2028 Adalah Bullrun Terakhir?",
    points: [
      "Kenapa pola halving bikin 2027–2028 penting",
      "Alasan Suli melihat siklus ini beda dari sebelumnya",
      "Posisi market sekarang dan artinya buat lu",
    ],
  },
  {
    day: 2,
    color: "#545454",
    date: "26 Nov 2026",
    title: "Narasi & Altcoin yang Bakal 10X di 2027",
    points: [
      "Sektor yang Suli pantau sebelum ramai dibicarakan",
      "Bedain proyek fundamental dengan yang cuma hype",
      "Koin pantauan Suli, lengkap dengan alasannya",
    ],
  },
  {
    day: 3,
    color: "#e38a1d",
    date: "27 Nov 2026",
    title: "Bitcoin Bakal Hit $1.000.000",
    points: [
      "Skenario dan asumsi di balik angka $1.000.000",
      "Institusi, ETF, dan supply yang makin langka",
      "Cara memposisikan diri kalau ini terjadi",
    ],
  },
  {
    day: 4,
    color: "#566eb2",
    date: "28 Nov 2026",
    title: "Cara Paling Gampang Mulai Trading Crypto Modal 1 Juta",
    points: [
      "Setup akun dan exchange yang aman",
      "Cara bagi modal 1 juta biar nggak habis",
      "Kapan masuk, kapan keluar, tanpa panik",
    ],
  },
];

// Trims the line box to the capitals, as in Figma, so `top` places the letters themselves.
const CAP_TRIM = "[text-box:trim-both_cap_alphabetic]";
// Gradient text paints only inside its box, so the cap-trimmed box is padded to also cover round letters that
// overshoot the cap line (the 3, 0, 2); the stops are in px so the gradient sits where Figma puts it.
const DAY_FADE = "bg-[linear-gradient(to_bottom,#fff_20px,rgb(153_153_153/0)_97.5px)] bg-clip-text text-transparent";

/** One upright 374×905 ticket (Figma 471:260905): the horizontal ticket artwork turned 90° clockwise. */
function TicketCard({ ticket, delay }: { ticket: Ticket; delay: number }) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className="relative h-[905px] w-[374px] text-center text-white"
    >
      {/* The perforation is a gap between the two ticket halves; in Figma the grey canvas shows through it.
          This strip behind the seam (between the side notches) plays that canvas on the black page. */}
      <div aria-hidden className="pointer-events-none absolute top-[710.5px] right-[31px] left-[31px] h-[4.5px] bg-[#404040]" />
      <div aria-hidden className="pointer-events-none absolute top-0 left-0 h-[374px] w-[905px] origin-top-left translate-x-[374px] rotate-90">
        <img alt="" className="absolute top-0 left-[-0.33px] h-[374px] w-[713px] max-w-none" src={`${IMG}/v-main.svg`} />
        <img alt="" className="absolute top-0 left-[-0.33px] h-[374px] w-[713px] max-w-none" src={`${IMG}/v-glow-${ticket.day}.svg`} />
        <img alt="" className="absolute top-[0.11px] left-[712.66px] h-[373.886px] w-[192.332px] max-w-none" src={`${IMG}/v-stub.svg`} />
        {/* 10% white border tracing each half's outline (notches included); the SVGs are padded 1px so it isn't clipped. */}
        <img alt="" className="absolute top-[-1px] left-[-1.33px] h-[376px] w-[715px] max-w-none" src={`${IMG}/v-main-outline.svg`} />
        <img alt="" className="absolute top-[-0.89px] left-[711.66px] h-[375.886px] w-[194.332px] max-w-none" src={`${IMG}/v-stub-outline.svg`} />
      </div>

      {/* Day number: a solid soft-light layer plus two fading copies stacked on it, as in Figma. */}
      {["text-white", DAY_FADE, DAY_FADE].map((fill, i) => (
        <p
          key={i}
          aria-hidden
          className={`absolute top-[66px] inset-x-0 pt-[20px] font-bebas text-[178.222px] leading-[1.4] whitespace-nowrap mix-blend-soft-light ${fill} ${CAP_TRIM}`}
        >
          DAY {ticket.day}
        </p>
      ))}

      <div className="absolute top-[357px] inset-x-0 flex justify-center gap-[10px]">
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

      <h3 className="absolute top-[397px] left-[36.5px] w-[301.511px] font-bebas text-[31.918px] leading-[1.2] uppercase">{ticket.title}</h3>

      <ul className="absolute top-[496.5px] inset-x-0 flex flex-col items-center gap-[12px] font-montreal text-[17px] leading-[1.2]">
        {ticket.points.map((point, i) => (
          <li key={point} className="contents">
            {i > 0 && <img alt="" aria-hidden className="block h-px w-[245px] max-w-none" src={`${IMG}/v-divider.svg`} />}
            <span className="flex h-[40px] w-[245px] items-center justify-center text-balance opacity-80">{point}</span>
          </li>
        ))}
      </ul>

      <p className={`absolute top-[781px] inset-x-0 font-montreal text-[16.253px] leading-[1.09] tracking-[-0.4876px] uppercase ${CAP_TRIM}`}>
        Preparing for
      </p>
      <p
        className={`absolute top-[798.09px] left-1/2 -translate-x-1/2 py-[6px] bg-[linear-gradient(to_bottom,#fff_6px,#2a62ff_45.62px)] bg-clip-text font-bebas text-[47.103px] leading-[1.09] tracking-[-1.4131px] whitespace-nowrap text-transparent ${CAP_TRIM}`}
      >
        2027 BULLRUN
      </p>
    </article>
  );
}

/** Upright-ticket version of the "4 malam" schedule (Figma 475:261160). Figma's row is 1601px wide (four 374px
    tickets, 35px apart); desktop scales the tickets to fit it into 1280px, phones and tablets swipe through them. */
export function EpisodeTicketsV2() {
  return (
    <section id="episodes" className="relative w-full overflow-hidden bg-black text-white">
      {/* Blue light behind the tickets (a blurred, half-opacity group pre-rendered to WebP), anchored to the row's
          top centre and scaled with the tickets. */}
      <div aria-hidden className="pointer-events-none absolute top-[200px] left-1/2 max-lg:top-[168px]">
        <div className="absolute top-[-239.87px] left-[-2400.34px] h-[2027.371px] w-[4800.674px] rotate-[170.55deg] [zoom:0.7995] max-lg:[zoom:0.8]">
          <div className="absolute inset-[-12.13%_-10.89%_-25.79%_-10.89%]">
            <img alt="" className="block size-full max-w-none" src={`${IMG}/bg-glow.webp`} />
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex w-[1440px] flex-col items-center gap-[48px] p-[80px] max-lg:w-full max-lg:gap-8 max-lg:px-0 max-lg:py-16">
        <EpisodesHeading />

        <div className="flex w-full justify-between max-lg:snap-x max-lg:snap-mandatory max-lg:gap-4 max-lg:overflow-x-auto max-lg:overflow-y-hidden max-lg:overscroll-x-contain max-lg:px-5 max-lg:[scrollbar-width:none]">
          {TICKETS.map((ticket, i) => (
            <div key={ticket.day} className="shrink-0 [zoom:0.7995] max-lg:snap-center max-lg:[zoom:0.7914] max-sm:[zoom:0.8]">
              <TicketCard ticket={ticket} delay={i * 80} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
