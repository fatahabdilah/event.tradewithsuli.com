/* eslint-disable @next/next/no-img-element -- decorative layers rely on raw transforms/masks */
import type { CSSProperties } from "react";
import Image from "next/image";
import { REGISTER_HREF, REGISTRATION_DEADLINE } from "@/lib/event";
import { Countdown } from "./countdown";
import { Ticker } from "./ticker";

// Figma relativeTransform as CSS matrix(a, b, c, d, tx, ty), in hero-frame coordinates.
type Matrix = [number, number, number, number, number, number];
type Layer = { w: number; h: number; m: Matrix };

function layerStyle({ w, h, m }: Layer): CSSProperties {
  return {
    position: "absolute",
    left: 0,
    top: 0,
    width: w,
    height: h,
    transformOrigin: "0 0",
    transform: `matrix(${m.join(",")})`,
  };
}

const COIN_MASK = 'url("/_next/image?url=%2Fhero%2Fcoin-base.png&w=1080&q=75")';

// Region of coin-base.png that Figma's image crop shows on every coin body.
const COIN_CROP = { x: 0.3075, y: 0.21037, w: 0.385, h: 0.6563 };

function coinCrop({ w, h }: Layer) {
  const width = w / COIN_CROP.w;
  const height = h / COIN_CROP.h;
  return { width, height, left: -COIN_CROP.x * width, top: -COIN_CROP.y * height };
}

// Point behind Suli's torso that coins emerge from during the entrance.
const PERSON_CENTER = { x: 720, y: 380 };

export type CoinProps = {
  /** Point (frame coordinates) the coin flies out from during the entrance; defaults to behind Suli's torso. */
  from?: { x: number; y: number };
  /** Extra classes on the coin's outer box (e.g. hiding it on some breakpoints). */
  className?: string;
  /** Entrance delay in ms. */
  delay: number;
  /** Duration of the idle float loop in seconds. */
  float: number;
  /** Group layer blur, in CSS px (Figma radius / 2). */
  blur?: number;
  trail: Layer & { src: string; pad: number; backdrop?: { blur: number; path: string } };
  coin: Layer;
  tint: Layer & { color: string };
  face: Layer & { src: string };
};

function corners({ w, h, m: [a, b, c, d, e, f] }: Layer, pad = 0) {
  return [
    [-pad, -pad],
    [w + pad, -pad],
    [-pad, h + pad],
    [w + pad, h + pad],
  ].map(([x, y]) => [a * x + c * y + e, b * x + d * y + f]);
}

// A floating crypto coin: motion trail, coin body, color tint and coin face. The coin lives in a box sized to its
// own bounds (not the whole 1440×888 frame), so its blur/float/entrance layers stay small on phones.
export function Coin({ from = PERSON_CENTER, className, delay, float, blur, trail: rawTrail, coin: rawCoin, tint: rawTint, face: rawFace }: CoinProps) {
  const spill = (blur ?? 0) * 3 + 4;
  const pts = [...corners(rawTrail, rawTrail.pad), ...corners(rawCoin), ...corners(rawFace)];
  const box = {
    x: Math.min(...pts.map((p) => p[0])) - spill,
    y: Math.min(...pts.map((p) => p[1])) - spill,
    r: Math.max(...pts.map((p) => p[0])) + spill,
    b: Math.max(...pts.map((p) => p[1])) + spill,
  };
  const local = <T extends Layer>(l: T): T => ({ ...l, m: [l.m[0], l.m[1], l.m[2], l.m[3], l.m[4] - box.x, l.m[5] - box.y] });
  const trail = local(rawTrail);
  const coin = local(rawCoin);
  const tint = local(rawTint);
  const face = local(rawFace);

  const base = coinCrop(coin);
  const mask = coinCrop(tint);
  const [a, b, c, d, e, f] = rawCoin.m;
  const cx = a * (rawCoin.w / 2) + c * (rawCoin.h / 2) + e;
  const cy = b * (rawCoin.w / 2) + d * (rawCoin.h / 2) + f;
  const origin = `${cx - box.x}px ${cy - box.y}px`;
  return (
    <div
      className={`absolute animate-hero-pop ${className ?? ""}`}
      style={
        {
          left: box.x,
          top: box.y,
          width: box.r - box.x,
          height: box.b - box.y,
          transformOrigin: origin,
          animationDelay: `${delay}ms`,
          "--coin-from-x": `${from.x - cx}px`,
          "--coin-from-y": `${from.y - cy}px`,
        } as CSSProperties
      }
    >
      <div
        className="absolute inset-0 animate-coin-float"
        style={{ transformOrigin: origin, animationDuration: `${float}s`, animationDelay: `${delay}ms` }}
      >
        <div className="absolute inset-0" style={blur ? { filter: `blur(${blur}px)` } : undefined}>
          <div style={layerStyle(trail)}>
            {trail.backdrop && (
              <div
                className="absolute max-lg:hidden"
                style={{
                  left: -trail.pad,
                  top: -trail.pad,
                  width: trail.w + trail.pad * 2,
                  height: trail.h + trail.pad * 2,
                  clipPath: `path("${trail.backdrop.path}")`,
                  backdropFilter: `blur(${trail.backdrop.blur}px)`,
                }}
              />
            )}
            <img
              alt=""
              className="absolute block max-w-none"
              style={{ left: -trail.pad, top: -trail.pad, width: trail.w + trail.pad * 2, height: trail.h + trail.pad * 2 }}
              src={trail.src}
            />
          </div>
          <div className="overflow-hidden" style={layerStyle(coin)}>
            {/* Figma fill uses saturation -1; the overlay tint below supplies the coin color. */}
            <Image alt="" width={1200} height={675} sizes="480px" className="absolute max-w-none grayscale" style={base} src="/hero/coin-base.png" />
          </div>
          <div
            className="mix-blend-overlay"
            style={{
              ...layerStyle(tint),
              backgroundColor: tint.color,
              // Optimized (AVIF/WebP) copy instead of the raw 133KB PNG.
              maskImage: COIN_MASK,
              maskMode: "alpha",
              maskRepeat: "no-repeat",
              maskSize: `${mask.width}px ${mask.height}px`,
              maskPosition: `${mask.left}px ${mask.top}px`,
            }}
          />
          <Image alt="" width={283} height={277} sizes="180px" className="block max-w-none" style={layerStyle(face)} src={face.src} />
        </div>
      </div>
    </div>
  );
}

export function ArrowIcon({ variant }: { variant: "light" }) {
  return (
    <span className="relative size-[16px] shrink-0">
      <img alt="" className="absolute inset-0 block size-full max-w-none" src={`/hero/icon-arrow-${variant}.svg`} />
    </span>
  );
}

// The art follows Figma's wide frame (3621px) so zoomed-out / ultra-wide screens stay covered.
// Its 1440px content column starts at x=998 and is kept centered on the viewport. Layout is the compact
// 888px-tall hero (Figma 445:259885); the wide scene is scaled the same way the 1440 scene was (×0.8912).
// On viewports taller than 888px the hero fills the screen: the ticker sticks to the bottom and the 888px
// art + copy block is centred vertically (the scene top edge fades out; its bottom gradient ends in black).
function HeroArt() {
  return (
    <div
      aria-hidden
      className="hero-art pointer-events-none absolute top-[calc((100%-888px)/2)] left-[calc(50%-1718px)] h-[888px] w-[3621px] origin-[1718px_888px] overflow-x-clip max-lg:top-auto max-lg:bottom-[-150px] max-lg:overflow-clip sm:max-lg:bottom-[-235px] md:max-lg:bottom-[-340px] max-lg:scale-[0.48] sm:max-lg:scale-[0.75] md:max-lg:scale-[0.9]"
    >
      <div className="absolute top-[-25.02px] left-[378.63px] h-[939.3px] w-[2711.9px] overflow-hidden [mask-image:linear-gradient(180deg,transparent_0,#000_160px,#000_calc(100%-26.3px),transparent_calc(100%-26.3px))]">
        <div className="absolute inset-0 animate-hero-scene">
          <Image
            src="/hero/bg-scene-wide.png"
            alt=""
            fill
            priority
            quality={90}
            sizes="(max-width: 1023px) 1300px, 2712px"
            className="max-w-none object-cover object-bottom"
          />
        </div>
      </div>

      <div className="absolute top-0 left-[998px] h-[888px] w-[1440px]">
        <Coin
          delay={1000}
          float={6.5}
          blur={3.6271}
          trail={{
            src: "/hero/coin-trail-1.svg",
            w: 320.4124,
            h: 295.2653,
            m: [-1, 0, 0, 1, 709.0313, 115.6914],
            pad: 11.8365,
          }}
          coin={{ w: 189.0795, h: 181.3035, m: [-1, 0, 0, 1, 552.0938, 94] }}
          tint={{ color: "#062921", w: 189.0795, h: 181.3035, m: [-1, 0, 0, 1, 552.0938, 94] }}
          face={{
            src: "/hero/coin-face-hype.png",
            w: 141.3887,
            h: 138.477,
            m: [0.9945, -0.1045, -0.1392, 0.9903, 394.9531, 120.0625],
          }}
        />

        {/* Blurred copy of the scene (Figma 445:259894) layered above the HYPE coin so it sits behind "BULL".
            Its sides fade out so no hard edge shows on screens wider than the 1440 column. */}
        <div
          className="absolute top-[-40px] left-[0.91px] h-[887px] w-[1443px] shadow-[0px_-14.855px_15.867px_0px_rgba(0,0,0,0.38)] max-lg:shadow-none blur-[3.173px] [mask-image:linear-gradient(90deg,transparent,#000_120px,#000_calc(100%-120px),transparent)]"
        >
          <div className="absolute inset-0 animate-hero-scene">
            <Image src="/hero/bg-scene-blur.png" alt="" fill priority quality={90} sizes="(max-width: 1023px) 700px, 1443px" className="max-w-none object-cover" />
          </div>
        </div>

        <div className="absolute top-[-897px] left-[729px] flex h-[1742.06px] w-[2854.777px] items-center justify-center mix-blend-color-dodge animate-hero-fade [animation-delay:300ms] max-lg:hidden">
          <div className="flex-none rotate-[-85.82deg]">
            <div className="relative h-[2749.425px] w-[1545.779px] opacity-70">
              <Image alt="" fill sizes="(max-width: 1023px) 16px, 1546px" className="max-w-none object-cover [filter:hue-rotate(75deg)_saturate(0.35)_brightness(0.6)]" src="/hero/light-rays.png" />
            </div>
          </div>
        </div>
        <div className="absolute top-[-897px] left-[-2125.77px] flex h-[1742.06px] w-[2854.777px] items-center justify-center mix-blend-color-dodge animate-hero-fade [animation-delay:300ms] max-lg:hidden">
          <div className="flex-none rotate-[-94.18deg] -scale-y-100">
            <div className="relative h-[2749.425px] w-[1545.779px] opacity-70">
              <Image alt="" fill sizes="(max-width: 1023px) 16px, 1546px" className="max-w-none object-cover [filter:hue-rotate(75deg)_saturate(0.35)_brightness(0.6)]" src="/hero/light-rays.png" />
            </div>
          </div>
        </div>

        <Coin
          delay={1150}
          float={5.5}
          trail={{
            src: "/hero/coin-trail-2.svg",
            w: 270.5439,
            h: 249.3107,
            m: [0.9969, -0.0786, 0.0786, 0.9969, 732.0467, 163.4898],
            pad: 13.0703,
            backdrop: {
              blur: 10.48,
              path: "M13.0703 202.419L176.067 13.0703L283.614 119.614L70.1768 262.381L13.0703 202.419Z",
            },
          }}
          coin={{ w: 159.6514, h: 153.0857, m: [0.9969, -0.0786, 0.0786, 0.9969, 869.7022, 126.5586] }}
          tint={{ color: "#e98f22", w: 159.6514, h: 153.0857, m: [0.9969, -0.0786, 0.0786, 0.9969, 869.7186, 126.5585] }}
          face={{
            src: "/hero/coin-face-btc.png",
            w: 119.3831,
            h: 116.9246,
            m: [-0.9997, -0.026, 0.2166, 0.9763, 1003.7128, 138.0596],
          }}
        />

        <Coin
          delay={1300}
          float={7}
          blur={8.25}
          trail={{
            src: "/hero/coin-trail-3.svg",
            w: 396.6856,
            h: 331.6038,
            m: [-0.6302, 0.7764, 0.7764, 0.6302, 221.4703, 281.4825],
            pad: 18.1322,
          }}
          coin={{ w: 236.9366, h: 227.1924, m: [-0.9748, -0.2232, -0.2232, 0.9748, 200.902, 479.8947] }}
          tint={{ color: "#4c9641", w: 236.9366, h: 227.1924, m: [-0.9748, -0.2232, -0.2232, 0.9748, 200.9024, 479.8975] }}
          face={{
            src: "/hero/coin-face-pepe.png",
            w: 177.1749,
            h: 173.5263,
            m: [0.9928, 0.1201, -0.3567, 0.9342, 1.6546, 467.776],
          }}
        />

        <Coin
          delay={1450}
          float={6}
          blur={4.4901}
          trail={{
            src: "/hero/coin-trail-4.svg",
            w: 219.3572,
            h: 204.4924,
            m: [0.7287, 0.6848, -0.6848, 0.7287, 1202.8854, 347.6468],
            pad: 8.5605,
            backdrop: {
              blur: 8.58,
              path: "M8.56055 161.693L147.256 8.56055L227.918 95.4666L57.4747 213.053L8.56055 161.693Z",
            },
          }}
          coin={{ w: 136.7482, h: 131.1244, m: [0.8999, -0.4361, 0.4361, 0.8999, 1211.9682, 471.5194] }}
          tint={{ color: "#c9c9c9", w: 136.7482, h: 131.1244, m: [0.8999, -0.4361, 0.4361, 0.8999, 1211.9694, 471.5167] }}
          face={{
            src: "/hero/coin-face-pill.png",
            w: 102.2567,
            h: 100.1509,
            m: [-0.9406, 0.3396, 0.5571, 0.8305, 1322.4708, 438.9181],
          }}
        />

        <div className="absolute top-[364px] left-[483.35px] h-[261.515px] w-[488.589px] animate-hero-fade [animation-delay:500ms]">
          <div className="absolute inset-[-9.81%_-5.25%]">
            <img alt="" className="block size-full max-w-none" src="/hero/glow.svg" />
          </div>
        </div>

        <div className="absolute top-[-10px] left-[-76px] h-[898px] w-[1608px] animate-hero-rise [animation-delay:350ms]">
          <Image src="/hero/suli.png" alt="" fill priority quality={90} sizes="(max-width: 1023px) 780px, 1608px" className="max-w-none object-cover" />
        </div>
      </div>

      <div className="absolute top-[457px] left-0 h-[431px] w-[3621px] bg-[linear-gradient(0deg,#000_27.249%,rgba(0,0,0,0.874)_48.833%,rgba(0,0,0,0.708)_64.752%,rgba(0,0,0,0.545)_76.084%,rgba(0,0,0,0)_100%)]" />

      <div className="absolute top-[-551px] left-[-561px] flex h-[2185.517px] w-[3884.043px] items-center justify-center mix-blend-overlay max-lg:hidden">
        <div className="flex-none -rotate-90">
          <div className="relative h-[3884.043px] w-[2185.517px] opacity-50">
            <Image alt="" fill sizes="(max-width: 1023px) 16px, 2186px" className="max-w-none object-cover" src="/hero/grain.png" />
          </div>
        </div>
      </div>

      {/* Covers anything that slips below the 888px frame (e.g. the photo mid-rise) on very tall/zoomed-out
          screens, where the hero is taller than the art and there is open space under it. */}
      <div className="absolute top-full left-0 hidden h-[200vh] w-full bg-black lg:block" />
    </div>
  );
}

/** Blue countdown bar, fixed to the top of the viewport (rendered once, at page level, above every section). */
export function UrgencyBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-[48px] w-full items-center justify-center border-b border-white/10 bg-[#2a62ff] px-[80px] lg:backdrop-blur-[12px] animate-hero-down [animation-delay:200ms] max-lg:h-[40px] max-lg:px-4">
      <div className="flex items-center gap-[10px]">
        <span className="relative size-[6px] shrink-0 rounded-full bg-white">
          <span className="absolute inset-0 rounded-full bg-white animate-live-pulse" />
        </span>
        <div className="flex items-center gap-[14px] font-mono tracking-[0.96px] text-white/55 max-sm:gap-2 max-sm:tracking-[0.3px] max-sm:[&_p]:text-[10px]">
          <p className="whitespace-nowrap text-[12px] leading-normal">
            <span className="max-sm:hidden">PENDAFTARAN </span>DITUTUP DALAM
          </p>
          <Countdown deadline={REGISTRATION_DEADLINE} />
        </div>
      </div>
    </div>
  );
}

/** Logo + register nav, shared by both hero versions. */
export function HeroHeader() {
  return (
    <header className="relative z-10 flex w-full flex-col items-start">
      {/* Room for the fixed <UrgencyBar /> so the hero layout stays as designed. */}
      <div aria-hidden className="h-[48px] w-full shrink-0 max-lg:h-[40px]" />

      <nav className="mx-auto flex w-full max-w-[1440px] animate-hero-down items-center justify-between px-[80px] py-[20px] [animation-delay:350ms] max-lg:px-5 max-lg:py-4">
        <div className="flex items-center gap-[16px] overflow-clip">
          <img alt="TWS" className="block h-[32px] w-[84px]" src="/hero/tws-logo.svg" />
          <div className="h-[28px] w-px bg-white/25 max-sm:hidden" />
          <div className="whitespace-nowrap font-mono text-[12px] leading-[16px] font-medium tracking-[0.96px] max-sm:hidden">
            <p>BULL RUN 2027</p>
            <p className="font-normal text-white/55">LIVE EVENT</p>
          </div>
        </div>
        {/* Figma 461:260281 */}
        <a
          href={REGISTER_HREF}
          className="relative flex items-center justify-center gap-[10px] rounded-[62px] border border-white px-[20px] py-[6px] transition-opacity [filter:drop-shadow(0px_31px_9.5px_rgba(42,98,255,0.13))_drop-shadow(0px_14px_10px_rgba(42,98,255,0.12))] hover:opacity-90 max-lg:px-4 max-lg:py-[5px] max-sm:gap-[6px] max-sm:px-3"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[62px] bg-[linear-gradient(99.06deg,#1447d6_1.4587%,#204fd3_36.588%,#4c79f2_81.52%,#779cff_96.534%)]"
          />
          <span className="relative flex">
            <ArrowIcon variant="light" />
          </span>
          <span className="relative whitespace-nowrap font-montreal text-[18px] leading-[1.4] font-medium text-white max-lg:text-[15px] max-sm:text-[12.5px]">
            DAFTAR SEKARANG <strong className="font-bold">GRATIS</strong>
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-2.135px_2px_0px_rgba(255,255,255,0.25),inset_0px_3.202px_6.405px_0px_rgba(255,255,255,0.25)]"
          />
        </a>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative isolate flex w-full flex-col overflow-hidden bg-black text-white max-lg:min-h-svh lg:h-[max(888px,calc(100svh/var(--zoom,1)))]">
      <HeroHeader />

      {/* Mobile stage: the scaled art sits on its bottom edge and its faded lower part runs under the copy.
          Desktop: `contents`, so the art stays positioned against the section. */}
      <div className="relative h-[276px] shrink-0 sm:h-[431px] md:h-[459px] lg:contents">
        <HeroArt />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black to-black/0 lg:hidden" />
        {/* Fades the art out where it runs under the copy (cheaper than masking the whole stage). */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[calc(100%-40px)] h-[200px] bg-gradient-to-b from-black/0 via-black/80 via-60% to-black sm:h-[285px] md:h-[390px] lg:hidden" />
      </div>

      {/* Both columns share one row so their top and bottom edges line up: the live chip with the kicker, the CTA
          with the headline's baseline. */}
      <div className="absolute top-[calc((100%-888px)/2+565px)] left-1/2 flex w-[1440px] -translate-x-1/2 items-stretch justify-between px-[80px] max-lg:relative max-lg:z-10 max-lg:top-auto max-lg:left-auto max-lg:flex max-lg:h-auto max-lg:w-full max-lg:translate-x-0 max-lg:flex-col max-lg:items-center max-lg:gap-5 max-lg:px-5 max-lg:text-center">
        <div className="flex w-[508.021px] flex-col items-start justify-center gap-[19.353px] max-lg:w-full max-lg:max-w-[600px] max-lg:items-center max-lg:gap-3">
          <p className="animate-hero-up whitespace-nowrap font-montreal text-[25.804px] leading-[1.2] uppercase [animation-delay:900ms] max-lg:text-[15px] max-lg:whitespace-normal sm:max-lg:text-[20px]">
            2017 lu kelewat. 2021 lu juga kelewat
          </p>
          <h1 className="w-[598.336px] max-lg:w-full max-lg:text-[46px] max-lg:tracking-[-1.5px] sm:max-lg:text-[72px] animate-hero-up [animation-delay:1050ms] bg-gradient-to-t from-[#2a62ff] to-white to-80% bg-clip-text font-bebas text-[84.711px] leading-[1.09] tracking-[-3.3884px] text-transparent uppercase [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            JANGAN SAMPE kelewat bull run 2027 juga!
          </h1>
        </div>

        {/* Figma 460:260106: live chip, copy, then price (Rp 0 + struck-through normal price tag) and the CTA. */}
        <div className="flex w-[554px] flex-col items-start justify-between gap-[24px] max-lg:w-full max-lg:max-w-[600px] max-lg:items-center max-lg:gap-5">
          <div className="flex animate-hero-up items-center gap-[14.348px] [animation-delay:1200ms] max-lg:gap-[10px]">
            <span className="relative size-[14px] shrink-0 rounded-full bg-red-600 max-lg:size-[10px]">
              <span className="absolute inset-0 rounded-full bg-red-600 animate-live-pulse" />
            </span>
            <p className="whitespace-nowrap font-mono text-[17.217px] leading-[1.5] max-lg:text-[13px] max-sm:text-[11px]">
              LIVE VIRTUAL EVENT: NOV 25TH - NOV 28TH
            </p>
          </div>
          <p className="w-[566px] animate-hero-up font-montreal text-[20px] leading-[1.4] opacity-90 [animation-delay:1250ms] max-lg:w-full max-lg:text-[16px] sm:max-lg:text-[18px]">
            Suli bedah cara siap-siap sebelum bullrun berikutnya, live selama 4 malam. Tanpa pengalaman, tanpa modal
            besar, tanpa bayar.
          </p>
          <div className="flex animate-hero-up items-center gap-[20px] px-[8px] pt-[8px] [animation-delay:1400ms] lg:mb-[-6px] max-lg:pb-[8px] max-lg:w-full max-lg:flex-col max-lg:gap-4 max-lg:px-0">
            <p className="flex w-[221px] shrink-0 items-center justify-center gap-[20px] whitespace-nowrap max-lg:w-auto">
              <span className="sr-only">Harga normal Rp 2.799.000, sekarang</span>
              <span className="font-montreal text-[42.029px] leading-normal font-bold text-white max-sm:text-[34px]">Rp 0</span>
              <span aria-hidden className="flex h-[28.227px] items-center rounded-[8.065px] bg-[#ff2a2a] px-[9.46px]">
                <s className="font-montreal text-[16.444px] leading-none font-bold text-white decoration-white decoration-[1.17px]">
                  Rp 2.799.000
                </s>
              </span>
            </p>
            <a
              href={REGISTER_HREF}
              className="relative flex w-[311px] shrink-0 items-center justify-center gap-[10px] rounded-[62px] border border-white px-[24px] py-[12px] transition-opacity [filter:drop-shadow(0px_31px_9.5px_rgba(42,98,255,0.13))_drop-shadow(0px_14px_10px_rgba(42,98,255,0.12))] hover:opacity-90 max-sm:w-full"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[62px] bg-[linear-gradient(100.29deg,#1447d6_1.4587%,#204fd3_36.588%,#4c79f2_81.52%,#779cff_96.534%)]"
              />
              <span className="relative flex">
                <ArrowIcon variant="light" />
              </span>
              <span className="relative whitespace-nowrap font-montreal text-[18px] leading-[1.4] font-medium text-white">
                DAFTAR SEKARANG <strong className="font-bold">GRATIS</strong>
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-2.135px_2px_0px_rgba(255,255,255,0.25),inset_0px_3.202px_6.405px_0px_rgba(255,255,255,0.25)]"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-black max-lg:relative max-lg:z-10 max-lg:mt-auto max-lg:bg-transparent max-lg:pt-8">
        <div className="mx-auto max-w-[1440px] animate-hero-up [animation-delay:1600ms]">
          <Ticker />
        </div>
      </div>
    </section>
  );
}
