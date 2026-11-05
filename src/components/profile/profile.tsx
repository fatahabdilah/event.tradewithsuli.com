import type { CSSProperties } from "react";
import Image from "next/image";

const IMG = "/profile";

// Figma's stacked drop shadow under the three front screenshots.
const SHOT_SHADOW =
  "shadow-[0px_262.159px_73.049px_0px_rgba(0,0,0,0.01),0px_167.945px_66.905px_0px_rgba(0,0,0,0.08),0px_94.213px_56.665px_0px_rgba(0,0,0,0.28),0px_41.645px_41.645px_0px_rgba(0,0,0,0.48),0px_10.241px_23.212px_0px_rgba(0,0,0,0.55)]";

type Shot = {
  src: string;
  width: number;
  height: number;
  /** Position and size inside the 958×414 collage. */
  box: [left: number, top: number, w: number, h: number];
  /** Side screenshots sit back at 30% opacity; the front three carry the shadow. */
  faded?: boolean;
};

// Back to front, as layered in Figma (481:261798).
const SHOTS: Shot[] = [
  { src: "shot-right.png", width: 894, height: 890, box: [666.46, 75.05, 291.537, 290.233], faded: true },
  { src: "shot-right-mid.png", width: 884, height: 886, box: [523.86, 52.98, 335.56, 336.32] },
  { src: "shot-left.png", width: 898, height: 896, box: [0, 75.05, 292.842, 292.19], faded: true },
  { src: "shot-left-mid.png", width: 884, height: 886, box: [98.74, 52.98, 335.56, 336.32] },
];

/** Blue light band (Figma "image 1849734100" + a #2a62ff color-blend layer); the top one is flipped. */
function GlowBand({ className, flip = false }: { className: string; flip?: boolean }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute left-[calc(50%-720px)] h-[260px] w-[1440px] ${className}`}>
      <div className={`absolute inset-0 overflow-hidden mix-blend-screen ${flip ? "-scale-y-100" : ""}`}>
        <Image alt="" width={736} height={542} sizes="(max-width: 1023px) 100vw, 1440px" className="absolute top-[0.07%] left-0 h-[134.06%] w-full max-w-none" src={`${IMG}/glow.png`} />
      </div>
      <div className="absolute inset-0 bg-[#2a62ff] mix-blend-color" />
    </div>
  );
}

function Collage() {
  return (
    <div data-reveal className="relative h-[413.956px] w-[958px] shrink-0 max-lg:w-full max-sm:h-[207px] sm:max-lg:h-[290px]">
      <div className="absolute top-0 left-1/2 h-[413.956px] w-[958px] -translate-x-1/2 origin-top max-sm:scale-50 sm:max-lg:scale-[0.7]">
        {SHOTS.map(({ src, width, height, box: [left, top, w, h], faded }) => (
          <div
            key={src}
            className={`absolute overflow-hidden rounded-[12.289px] ${faded ? "opacity-30" : SHOT_SHADOW}`}
            style={{ left, top, width: w, height: h }}
          >
            <Image alt="" width={width} height={height} sizes="(max-width: 639px) 170px, 336px" className="size-full object-cover" src={`${IMG}/${src}`} />
          </div>
        ))}

        <div className={`absolute top-0 left-[211.93px] h-[413.956px] w-[532.12px] overflow-hidden rounded-[12.289px] ${SHOT_SHADOW}`}>
          <Image
            alt="Portofolio publik Suli di Discord: keuntungan belum terealisasi +Rp4.096.968.203 (+135,17%)"
            width={657}
            height={700}
            sizes="(max-width: 639px) 270px, 532px"
            quality={90}
            className="absolute top-[-0.01%] left-0 h-[136.96%] w-full max-w-none"
            src={`${IMG}/shot-main.png`}
          />
        </div>

        {/* The P&L figure, lifted out of the portfolio screenshot with a green glow. */}
        <div
          aria-hidden
          className="absolute top-[167.14px] left-[279.66px] h-[79.622px] w-[363.894px] overflow-hidden rounded-[7.896px] shadow-[0px_0px_12.824px_0px_#03bd00,0px_0px_7.328px_0px_#03bd00,0px_0px_4.275px_0px_#03bd00,0px_0px_2.137px_0px_#03bd00,0px_0px_0.611px_0px_#03bd00,0px_0px_0.305px_0px_#03bd00]"
        >
          <Image
            alt=""
            width={1206}
            height={1774}
            sizes="(max-width: 639px) 210px, 412px"
            quality={90}
            className="absolute top-[-89.32%] left-[-6.57%] h-[763.86%] w-[113.13%] max-w-none"
            src={`${IMG}/highlight.png`}
          />
        </div>
      </div>
    </div>
  );
}

export function Profile() {
  return (
    // The extra 80px on top holds the blue glow that bleeds above the 840px Figma frame.
    <section id="profile" className="relative isolate w-full overflow-hidden bg-black pt-[80px] text-white">
      {/* 28px dot grid over the frame's bottom 631px, faded by the black gradient above it. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[631px]">
        <div
          className="absolute inset-y-0 left-1/2 w-[3680px] -translate-x-1/2 opacity-20 max-lg:left-0 max-lg:w-full max-lg:translate-x-0"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 2px, transparent 2.5px)",
            backgroundSize: "28px 28px",
            backgroundPosition: "-12.5px -12.5px",
          }}
        />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[736px] bg-[linear-gradient(180deg,#000_4.932%,rgb(0_0_0/0.2)_53.089%,#000_100%)]" />

      {/* No transforms on these wrappers: a stacking context would stop the blends reaching the dots. */}
      <GlowBand className="top-0" flip />
      <GlowBand className="bottom-[-84px]" />

      <div className="relative mx-auto flex h-[840px] w-[1440px] flex-col items-center gap-[40px] pt-[109px] max-lg:h-auto max-lg:w-full max-lg:gap-8 max-lg:overflow-hidden max-lg:px-5 max-lg:pt-12 max-lg:pb-20">
        <Collage />

        <div
          data-reveal
          style={{ "--reveal-delay": "150ms" } as CSSProperties}
          // Positioned so it paints above the screenshots' long drop shadows, as in Figma.
          className="relative flex w-[522px] flex-col items-center gap-[16px] text-center max-lg:w-full max-lg:max-w-[522px]"
        >
          <h2 className="w-[496px] font-montreal text-[30px] leading-[36px] max-lg:w-full max-sm:text-[24px] max-sm:leading-[30px]">
            Public Portfolio Suli Cuan
            <br />
            <span className="box-decoration-clone bg-gradient-to-r from-[#6e92f6] to-white bg-clip-text font-bold text-transparent">Rp 4 Miliar Selama Bear Market.</span>
            <br />
            Gimana Kalo Bull Market?
          </h2>
          <p className="w-[488px] font-montreal text-[16px] leading-[1.4] text-pretty text-[#bbb] max-lg:w-full">
            Buat yang ketinggalan, Bullrun selanjutnya bisa kasih cuan lebih besar dari ini, dan Suli bakal kasih tau kamu
            strategi lengkapnya di webinar ini.
          </p>
        </div>
      </div>
    </section>
  );
}
