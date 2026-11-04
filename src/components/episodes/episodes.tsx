"use client";

/* eslint-disable @next/next/no-img-element -- small decorative icons */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";

const IMG = "/episodes";

type Episode = {
  date: string;
  title: string;
  /** Title box width; defaults to Figma's 218.472px. */
  titleWidth?: number;
  points: { text: string; width: number }[];
  art: { src: string; width: number; height: number; left: number; top: number; w: number; h: number; onTop?: boolean };
};

// Point text widths: night 1 uses Figma's boxes; nights 2–4 use 228px so every point breaks into two lines.
const EPISODES: Episode[] = [
  {
    date: "25 November",
    title: "Kenapa 2027–2028 Adalah Bullrun Terakhir?",
    points: [
      { text: "Siklus 4 tahunan: Kenapa pola halving bikin 2027–2028 jadi momen penting", width: 190 },
      { text: "Kenapa “terakhir”: Alasan Suli melihat siklus ini beda dari sebelumnya", width: 188 },
      { text: "Posisi market sekarang: Kita lagi di fase mana, dan apa artinya buat lu", width: 176 },
    ],
    art: { src: "bull.png", width: 738, height: 518, left: -19, top: 330, w: 339, h: 238, onTop: true },
  },
  {
    date: "26 November",
    title: "Narasi & Altcoin yang Bakal 10X di 2027",
    points: [
      { text: "Narasi besar 2027: Sektor yang Suli pantau sebelum ramai dibicarakan", width: 228 },
      { text: "Cara pilih altcoin: Bedain proyek yang punya fundamental dengan yang cuma hype", width: 228 },
      { text: "Daftar pantauan Suli: Koin yang sedang dia pantau, lengkap dengan alasannya", width: 228 },
    ],
    art: { src: "coins.png", width: 1792, height: 2398, left: 15, top: 230, w: 373, h: 500 },
  },
  {
    date: "27 November",
    title: "Bitcoin Bakal Hit $1.000.000",
    points: [
      { text: "Hitungannya: Skenario dan asumsi di balik angka $1.000.000", width: 228 },
      { text: "Faktor pendorong: Institusi, ETF, dan supply yang makin langka setelah halving", width: 228 },
      { text: "Artinya buat lu: Cara memposisikan diri kalau skenario ini terjadi", width: 228 },
    ],
    art: { src: "btc.png", width: 1792, height: 2400, left: -20, top: 246, w: 360, h: 482, onTop: true },
  },
  {
    date: "28 November",
    title: "Cara Paling Gampang Mulai Trading Crypto Modal 1 Juta",
    titleWidth: 270, // keeps this longer title to two lines
    points: [
      { text: "Mulai dari nol: Setup akun dan exchange yang aman, langkah demi langkah", width: 228 },
      { text: "Alokasi modal 1 juta: Cara bagi modal supaya nggak habis di satu koin", width: 228 },
      { text: "Manajemen risiko: Kapan masuk, kapan keluar, dan cara supaya nggak panik", width: 228 },
    ],
    art: { src: "candles.png", width: 2730, height: 1536, left: -93, top: 319, w: 398, h: 224 },
  },
];

function Art({ art }: { art: Episode["art"] }) {
  return (
    <div className="pointer-events-none absolute" style={{ left: art.left, top: art.top, width: art.w, height: art.h }}>
      <Image src={`${IMG}/${art.src}`} alt="" width={art.width} height={art.height} sizes={`${art.w}px`} className="size-full max-w-none object-cover" />
    </div>
  );
}

type CardState = "past" | "active" | "upcoming";

function EpisodeCard({ episode, state, onSelect }: { episode: Episode; state: CardState; onSelect: () => void }) {
  const active = state === "active";
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`relative h-[551px] w-[320px] shrink-0 cursor-pointer snap-center max-lg:opacity-100! overflow-clip rounded-[12px] bg-black text-left transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a62ff] ${
        active ? "opacity-100" : state === "past" ? "opacity-30 hover:opacity-60" : "opacity-15 hover:opacity-50"
      }`}
    >
      {/* Background: blue glow on the active night, grey glow on nights already passed. */}
      <div aria-hidden className="pointer-events-none absolute top-[-317px] left-[-114px] h-[868px] w-[434px] -scale-y-100">
        <Image
          src={`${IMG}/past-bg.png`}
          alt=""
          width={512}
          height={1024}
          sizes="434px"
          className={`absolute inset-0 size-full max-w-none object-cover transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${state === "past" ? "opacity-100" : "opacity-0"} max-lg:opacity-0!`}
        />
        <Image
          src={`${IMG}/active-bg.png`}
          alt=""
          width={736}
          height={1472}
          sizes="434px"
          className={`absolute inset-0 size-full max-w-none object-cover transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${active ? "opacity-100" : "opacity-0"} max-lg:opacity-100!`}
        />
      </div>
      {!episode.art.onTop && <Art art={episode.art} />}

      <span className="absolute top-[40px] left-[calc(50%-0.5px)] flex -translate-x-1/2 items-center justify-center rounded-[68px] border-[0.5px] border-white px-[12px] py-[4px]">
        <span className="absolute inset-0 rounded-[68px] bg-black/12" />
        <span className="relative whitespace-nowrap font-montreal text-[16px] font-medium leading-[1.4] text-white">{episode.date}</span>
        <span
          className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-shadow duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            active ? "shadow-[inset_0_0_10.9px_rgba(42,98,255,0.59)]" : "shadow-[inset_0_0_10.9px_rgba(176,176,176,0.59)]"
          }`}
        />
      </span>

      <div className="absolute top-[92px] left-1/2 flex w-[290px] -translate-x-1/2 flex-col items-center justify-center gap-[18.66px]">
        <h3
          className="text-center text-balance font-montreal text-[18.66px] font-medium leading-[1.4] text-white"
          style={{ width: episode.titleWidth ?? 218.472 }}
        >
          {episode.title}
        </h3>
        <ul className="flex w-full flex-col items-start gap-[9.33px]">
          {episode.points.map((point, i) => (
            <li
              key={point.text}
              className={`flex w-full items-start justify-center gap-[9.33px] ${
                i < episode.points.length - 1 ? "border-b-[0.777px] border-white/10 pb-[12.44px]" : ""
              }`}
            >
              <span className="flex items-center pt-[1.555px]">
                <span
                  className={`relative size-[12.44px] shrink-0 overflow-clip rounded-full transition-colors duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${active ? "bg-[#07f]" : "bg-[#484848]"} max-lg:bg-[#07f]!`}
                >
                  <img alt="" className="absolute top-1/2 left-1/2 size-[8.708px] max-w-none -translate-x-1/2 -translate-y-1/2" src={`${IMG}/check.svg`} />
                </span>
              </span>
              <p className="self-stretch font-sans text-[10.885px] leading-[1.4] text-balance text-white" style={{ width: point.width }}>
                {point.text}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {episode.art.onTop && <Art art={episode.art} />}
    </button>
  );
}

// Faint vertical rule fading in from the top (Figma: #999 → white at 20%, 20% opacity).
const FADE_RULE = "absolute top-0 h-[831px] w-px bg-[linear-gradient(180deg,rgb(153_153_153/0)_0%,#fff_20%)] opacity-20";
// Full strength across the 1440 frame, then darkening gradually all the way to the screen edges.
const RULE_FADE_MASK =
  "linear-gradient(90deg, transparent 0%, #000 calc(50% - 720px), #000 calc(50% + 720px), transparent 100%)";
const RULE_FADE = { maskImage: RULE_FADE_MASK, WebkitMaskImage: RULE_FADE_MASK } as const;
// Card centres (the dots) in the 1440 frame: 80px padding + 320px cards.
const DOT_X = [240, 560, 880, 1200];

// The worm never stops: its head runs at a constant speed along the cards' top rule, one card width (320px)
// per CARD_MS, and a card turns on the moment the head crosses its dot. Past the last dot it keeps going beyond
// the frame's right edge (x 1600) while fading out, then fades back in from the left and keeps going.
const TRACK_START = 80;
const TRACK_END = 1600;
const CARD_MS = 2200;
const CYCLE_MS = (CARD_MS * (TRACK_END - TRACK_START)) / 320;
const FADE_IN_PX = 80;
const FADE_OUT_PX = 240;

const headAt = (ms: number) => TRACK_START + (ms / CYCLE_MS) * (TRACK_END - TRACK_START);
const msAt = (x: number) => ((x - TRACK_START) / (TRACK_END - TRACK_START)) * CYCLE_MS;

/** Worm head x, the last dot it has crossed (-1 before the first), and its opacity. */
function timeline(ms: number) {
  const head = headAt(ms);
  const index = DOT_X.findLastIndex((x) => head >= x);
  const fade = Math.min(1, (head - TRACK_START) / FADE_IN_PX, (TRACK_END - head) / FADE_OUT_PX);
  return { head, index, fade };
}

export function Episodes() {
  const [active, setActive] = useState(0);
  const worm = useRef<HTMLSpanElement>(null);
  const elapsed = useRef(msAt(DOT_X[0]));
  const paused = useRef(false);
  const current = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 1023px)").matches) return;
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      if (!paused.current) elapsed.current = (elapsed.current + now - last) % CYCLE_MS;
      last = now;
      const { head, index, fade } = timeline(elapsed.current);
      if (worm.current) {
        worm.current.style.width = `${head}px`;
        worm.current.style.opacity = String(fade);
      }
      // Before the first dot (right after looping) the last night stays on until the head reaches dot 1.
      if (index >= 0 && index !== current.current) {
        current.current = index;
        setActive(index);
      }
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const select = (i: number) => {
    elapsed.current = msAt(DOT_X[i]);
    current.current = i;
    setActive(i);
  };
  const setPaused = (value: boolean) => {
    paused.current = value;
  };

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Horizontal rules reach both screen edges, darkening outside the 1440 frame on wide screens. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[200px] h-px bg-white/20 max-lg:hidden" style={RULE_FADE} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[751px] h-px bg-white/20 max-lg:hidden" style={RULE_FADE} />

      <div className="relative mx-auto flex w-[1440px] flex-col items-center gap-[48px] p-[80px] max-lg:w-full max-lg:gap-8 max-lg:px-0 max-lg:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 max-lg:hidden">
          <span className={`${FADE_RULE} left-[80px]`} />
          <span className={`${FADE_RULE} left-[400px]`} />
          <span className="absolute top-[200px] left-[719px] h-[631px] w-px bg-white/20" />
          <span className={`${FADE_RULE} left-[1040px]`} />
          <span className={`${FADE_RULE} left-[1360px]`} />
        </div>

        <h2 data-reveal className="relative flex w-[393px] flex-col items-center text-center uppercase leading-[36px] max-lg:w-full max-lg:px-5">
          <span className="w-full whitespace-nowrap font-montreal text-[16px] text-white">4 malam yang nentuin</span>
          <span className="w-full whitespace-nowrap max-sm:text-[24px]! max-sm:leading-[30px] bg-gradient-to-r from-[#2a62ff] from-[7.212%] to-white bg-clip-text font-montreal text-[30px] font-bold text-transparent">
            posisi lu di bullrun 2027
          </span>
        </h2>

        <div
          data-reveal
          style={{ "--reveal-delay": "150ms" } as CSSProperties}
          className="relative flex items-center max-lg:w-full max-lg:snap-x max-lg:snap-mandatory max-lg:gap-3 max-lg:overflow-x-auto max-lg:px-5 max-lg:[scrollbar-width:none] md:max-lg:justify-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {EPISODES.map((episode, i) => (
            <EpisodeCard
              key={i}
              episode={episode}
              state={i < active ? "past" : i === active ? "active" : "upcoming"}
              onSelect={() => select(i)}
            />
          ))}
        </div>

        {/* The worm: one unbroken line from the frame's left edge (transparent) to its head (white), as in Figma. */}
        <span
          ref={worm}
          aria-hidden
          className="pointer-events-none absolute top-[200px] left-0 h-px bg-[linear-gradient(90deg,rgb(153_153_153/0)_0%,#fff_100%)] motion-reduce:hidden max-lg:hidden"
          style={{ width: DOT_X[0] }}
        />

        {/* Dots stay put: grey ahead, white once passed, the ring marks the active night — cross-faded in place. */}
        {DOT_X.map((x, i) => {
          const state = i < active ? "past" : i === active ? "active" : "upcoming";
          const layer = "pointer-events-none absolute transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]";
          return (
            <span key={i} aria-hidden className="max-lg:hidden">
              <img alt="" className={`${layer} top-[194px] size-[12px] ${state === "upcoming" ? "opacity-100" : "opacity-0"}`} style={{ left: x - 6 }} src={`${IMG}/marker.svg`} />
              <img alt="" className={`${layer} top-[194px] size-[12px] ${state === "past" ? "opacity-100" : "opacity-0"}`} style={{ left: x - 6 }} src={`${IMG}/dot-done.svg`} />
              <img
                alt=""
                className={`${layer} top-[178px] size-[44px] ${state === "active" ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                style={{ left: x - 22 }}
                src={`${IMG}/marker-active.svg`}
              />
            </span>
          );
        })}
      </div>
    </section>
  );
}
