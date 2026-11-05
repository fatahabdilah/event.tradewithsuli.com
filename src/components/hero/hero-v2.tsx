/* eslint-disable @next/next/no-img-element -- decorative layers rely on raw transforms/blend modes */
import Image from "next/image";
import { REGISTER_HREF } from "@/lib/event";
import { ArrowIcon, Coin, HeroHeader, PriceDrop } from "./hero";
import { Ticker } from "./ticker";

// Behind Suli's chest in this layout; the coins fly out from here during the entrance.
const PERSON_CENTER = { x: 728, y: 700 };

// Hero version 2 (Figma 461:260325): centred headline above Suli, "BULL RUN" scene behind him. Like v1, the
// 1440×888 frame is centred vertically on screens taller than 888px; below the frame the photo and scene keep
// going for a bit and fade to black, so there is no hard edge above the ticker.
function HeroArtV2() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-[calc((100%-888px)/2)] left-[calc(50%-720px)] h-[888px] w-[1440px] origin-[720px_888px] max-lg:top-auto max-lg:bottom-[-22.4px] sm:max-lg:bottom-[-34.7px] md:max-lg:bottom-[-42px] max-lg:scale-[0.4] sm:max-lg:scale-[0.62] md:max-lg:scale-[0.75]"
    >
      {/* Scene sides fade out so wide screens never show its hard edge. */}
      <div className="absolute top-[42.6px] left-[-135.26px] h-[1052.645px] w-[1712.321px] [mask-image:linear-gradient(90deg,transparent,#000_160px,#000_calc(100%-160px),transparent)] max-lg:[mask-image:none]">
        <div className="absolute inset-0 animate-hero-scene">
          <Image
            src="/hero-v2/bg-scene.jpg"
            alt=""
            fill
            priority
            quality={90}
            sizes="(max-width: 1023px) 1300px, 1713px"
            className="max-w-none object-cover object-bottom"
          />
        </div>
      </div>
      {/* Top fade, stretched past the 1440 column so the scene never pokes out on wide screens. */}
      <div className="absolute top-[-55px] left-[-1000px] h-[427px] w-[3440px] bg-[linear-gradient(180deg,#000_27.249%,rgba(0,0,0,0.874)_48.833%,rgba(0,0,0,0.708)_64.752%,rgba(0,0,0,0.545)_76.084%,rgba(0,0,0,0)_100%)]" />

      <Coin
        from={PERSON_CENTER}
        className="max-lg:translate-x-[150px]"
        delay={1000}
        float={6.5}
        blur={3.4326}
        trail={{ src: "/hero-v2/coin-trail-hype.svg", w: 303.227, h: 279.4287, m: [-1, 0, 0, 1, 426.4688, 145.5313], pad: 11.2017 }}
        coin={{ w: 178.9382, h: 171.5793, m: [-1, 0, 0, 1, 277.9531, 125] }}
        tint={{ color: "#062921", w: 178.9382, h: 171.5793, m: [-1, 0, 0, 1, 277.9531, 125] }}
        face={{
          src: "/hero/coin-face-hype.png",
          w: 133.8053,
          h: 131.0498,
          m: [0.9945, -0.1045, -0.1392, 0.9903, 129.2344, 149.6641],
        }}
      />

      {/* Blurred copy of the scene layered above the HYPE coin so it sits behind "BULL". */}
      <div className="absolute top-[84.47px] left-[-87.99px] h-[994.763px] w-[1618.165px] shadow-[0px_-14.855px_15.867px_0px_rgba(0,0,0,0.38)] blur-[3.173px] [mask-image:linear-gradient(90deg,transparent,#000_120px,#000_calc(100%-120px),transparent)] max-lg:shadow-none">
        <div className="absolute inset-0 animate-hero-scene">
          <Image src="/hero/bg-scene-blur.png" alt="" fill priority quality={90} sizes="(max-width: 1023px) 700px, 1618px" className="max-w-none object-cover" />
        </div>
      </div>

      <div className="absolute top-[-672px] left-[729px] flex h-[1742.06px] w-[2854.777px] items-center justify-center mix-blend-color-dodge animate-hero-fade [animation-delay:300ms] max-lg:hidden">
        <div className="flex-none rotate-[-85.82deg]">
          <div className="relative h-[2749.425px] w-[1545.779px] opacity-70">
            <Image alt="" fill sizes="(max-width: 1023px) 16px, 1546px" className="max-w-none object-cover [filter:hue-rotate(75deg)_saturate(0.35)_brightness(0.6)]" src="/hero/light-rays.png" />
          </div>
        </div>
      </div>
      <div className="absolute top-[-672px] left-[-2125.78px] flex h-[1742.06px] w-[2854.777px] items-center justify-center mix-blend-color-dodge animate-hero-fade [animation-delay:300ms] max-lg:hidden">
        <div className="flex-none rotate-[-94.18deg] -scale-y-100">
          <div className="relative h-[2749.425px] w-[1545.779px] opacity-70">
            <Image alt="" fill sizes="(max-width: 1023px) 16px, 1546px" className="max-w-none object-cover [filter:hue-rotate(75deg)_saturate(0.35)_brightness(0.6)]" src="/hero/light-rays.png" />
          </div>
        </div>
      </div>

      <Coin
        from={PERSON_CENTER}
        className="max-lg:hidden"
        delay={1300}
        float={7}
        blur={2.5444}
        trail={{ src: "/hero-v2/coin-trail-pepe.svg", w: 284.3992, h: 237.7396, m: [-0.6171, 0.7869, 0.7869, 0.6171, 466.6719, 553.5391], pad: 10.8977 }}
        coin={{ w: 169.869, h: 162.883, m: [-0.9784, -0.2068, -0.2068, 0.9784, 454.3125, 696.0156] }}
        tint={{ color: "#4c9641", w: 169.869, h: 162.8831, m: [-0.9784, -0.2068, -0.2068, 0.9784, 454.3281, 696.0156] }}
        face={{
          src: "/hero/coin-face-pepe.png",
          w: 127.0235,
          h: 124.4077,
          m: [0.9946, 0.1034, -0.341, 0.9401, 311.3438, 689.7188],
        }}
      />

      <Coin
        from={PERSON_CENTER}
        className="max-lg:hidden"
        delay={1450}
        float={6}
        blur={4.4901}
        trail={{
          src: "/hero/coin-trail-4.svg",
          w: 219.3572,
          h: 204.4924,
          m: [0.5757, 0.8177, -0.8177, 0.5757, 931.1484, 617.3359],
          pad: 8.5605,
          backdrop: { blur: 8.58, path: "M8.56055 161.693L147.256 8.56055L227.918 95.4666L57.4747 213.053L8.56055 161.693Z" },
        }}
        coin={{ w: 136.7482, h: 131.1244, m: [0.9694, -0.2457, 0.2457, 0.9694, 915.0703, 740.4922] }}
        tint={{ color: "#c9c9c9", w: 136.7482, h: 131.1244, m: [0.9694, -0.2457, 0.2457, 0.9694, 915.0703, 740.4922] }}
        face={{
          src: "/hero/coin-face-pill.png",
          w: 102.2567,
          h: 100.1509,
          m: [-0.9897, 0.143, 0.3782, 0.9257, 1029.8828, 730.8438],
        }}
      />

      <div className="absolute top-[541.38px] left-[479.9px] h-[289.085px] w-[495.555px] animate-hero-fade [animation-delay:500ms]">
        <img alt="" className="block size-full max-w-none" src="/hero-v2/glow.svg" />
      </div>

      <Coin
        from={PERSON_CENTER}
        className="max-lg:-translate-x-[110px]"
        delay={1150}
        float={5.5}
        trail={{
          src: "/hero-v2/coin-trail-btc.svg",
          w: 307.4911,
          h: 283.3582,
          m: [0.9991, 0.0431, -0.0431, 0.9991, 962.2031, 197.5156],
          pad: 14.8552,
          backdrop: { blur: 11.91, path: "M14.8552 230.062L200.111 14.8552L322.346 135.949L79.7606 298.213L14.8552 230.062Z" },
        }}
        coin={{ w: 181.4545, h: 173.9921, m: [0.9991, 0.0431, -0.0431, 0.9991, 1122.5938, 174.8594] }}
        tint={{ color: "#e98f22", w: 181.4545, h: 173.9921, m: [0.9991, 0.0431, -0.0431, 0.9991, 1122.6172, 174.8594] }}
        face={{
          src: "/hero/coin-face-btc.png",
          w: 135.6869,
          h: 132.8927,
          m: [-0.9891, -0.1473, 0.0964, 0.9953, 1272.1953, 206.3438],
        }}
      />

      <div className="absolute top-[303px] left-[141px] h-[655px] w-[1174px] origin-[50%_80.8%] max-lg:scale-[1.35] max-sm:scale-[1.69] animate-hero-rise [animation-delay:350ms]">
        <Image src="/hero/suli.png" alt="" fill priority quality={90} sizes="(max-width: 1023px) 740px, 1174px" className="max-w-none object-cover" />
      </div>

      <div className="absolute top-[-551px] left-[-1559px] flex h-[2185.517px] w-[3884.043px] items-center justify-center mix-blend-overlay max-lg:hidden">
        <div className="flex-none -rotate-90">
          <div className="relative h-[3884.043px] w-[2185.517px] opacity-50">
            <Image alt="" fill sizes="(max-width: 1023px) 16px, 2186px" className="max-w-none object-cover" src="/hero/grain.png" />
          </div>
        </div>
      </div>

      {/* Past the ticker line: on tall desktop screens the photo and scene fade out, then black; on mobile the
          ticker follows straight after, so everything below it is simply cut. Above the frame, black hides the
          light rays. */}
      <div className="absolute top-[832px] left-[-1000px] h-[138px] w-[3440px] bg-gradient-to-b from-black/0 to-black max-lg:hidden" />
      <div className="absolute top-[970px] left-[-1000px] h-[140px] w-[3440px] bg-black max-lg:top-[832px] max-lg:h-[280px]" />
      <div className="absolute bottom-full left-[-1000px] h-[680px] w-[3440px] bg-black" />
    </div>
  );
}

export function HeroV2() {
  return (
    <section className="relative isolate flex w-full flex-col overflow-hidden bg-black text-white max-lg:min-h-svh lg:h-[max(888px,calc(100svh/var(--zoom,1)))]">
      <HeroHeader />

      {/* Figma 461:260406: live chip, headline, sub line, then price + CTA. */}
      <div className="absolute top-[calc((100%-888px)/2+129px)] left-1/2 z-10 flex w-[630px] -translate-x-1/2 flex-col items-center gap-[20px] text-center max-lg:relative max-lg:top-auto max-lg:left-auto max-lg:w-full max-lg:flex-1 max-lg:translate-x-0 max-lg:justify-center max-lg:gap-4 max-lg:px-5 max-lg:py-6">
        <div className="relative flex animate-hero-up items-center gap-[10px] rounded-[24px] bg-black px-[15px] py-[8px] shadow-[inset_0px_0px_10px_0px_#e11d48] [animation-delay:900ms]">
          <span className="relative size-[12px] shrink-0 rounded-full bg-red-600 max-sm:size-[10px]">
            <span className="absolute inset-0 rounded-full bg-red-600 animate-live-pulse" />
          </span>
          <p className="whitespace-nowrap font-mono text-[12px] leading-[1.5] max-sm:text-[11px]">LIVE VIRTUAL EVENT: NOV 25TH - NOV 28TH</p>
        </div>

        <h1 className="w-[668px] shrink-0 animate-hero-up bg-gradient-to-t from-[#2a62ff] to-white to-80% bg-clip-text font-montreal text-[62.009px] leading-[1.09] font-bold tracking-[-2.4804px] text-transparent uppercase [animation-delay:1050ms] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] max-lg:w-full max-lg:max-w-[668px] max-lg:text-[clamp(28px,8.6vw,34px)] max-lg:tracking-[-1.2px] max-sm:max-w-[340px] sm:max-lg:text-[52px] sm:max-lg:tracking-[-2px]">
          2027 Bisa Jadi Bullrun Terakhir.
        </h1>

        <p className="-mt-[5px] animate-hero-up font-montreal text-[20px] leading-none tracking-[1px] uppercase opacity-60 [animation-delay:1200ms] max-sm:text-[15px]">
          Jangan Jadi Penonton Lagi.
        </p>

        {/* CTA + price (button first, as in hero v1), hero v1 sizes scaled to 72.55%. */}
        <div className="-mt-1.5 flex animate-hero-up items-center gap-[14.51px] max-lg:-mt-2 rounded-[50px] px-[5.8px] [animation-delay:1350ms] max-sm:flex-col max-sm:gap-3">
          <a
            href={REGISTER_HREF}
            className="relative flex w-[225.627px] shrink-0 items-center justify-center gap-[7.255px] rounded-[44.98px] border-[0.725px] border-white px-[17.412px] py-[8.706px] transition-opacity [filter:drop-shadow(0px_22.49px_6.892px_rgba(42,98,255,0.13))_drop-shadow(0px_10.157px_7.255px_rgba(42,98,255,0.12))] hover:opacity-90"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[44.98px] bg-[linear-gradient(100.33deg,#1447d6_1.4587%,#204fd3_36.588%,#4c79f2_81.52%,#779cff_96.534%)]"
            />
            <span className="relative flex [&>span]:size-[11.608px]">
              <ArrowIcon variant="light" />
            </span>
            <span className="relative whitespace-nowrap font-montreal text-[13.059px] leading-[1.4] font-medium text-white">
              DAFTAR SEKARANG <strong className="font-bold">GRATIS</strong>
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-1.549px_1.451px_0px_rgba(255,255,255,0.25),inset_0px_2.323px_4.647px_0px_rgba(255,255,255,0.25)]"
            />
          </a>
          {/* Same animated price as hero v1, at this hero's 72.55% scale; sized to its final width so the row stays centred. */}
          <PriceDrop className="w-[200px] [zoom:0.7255]" />
        </div>
      </div>

      {/* Mobile stage: fixed height with the scaled frame's ticker line on its bottom edge, so the photo runs
          straight into the ticker; the copy above takes the remaining height and centres itself in it.
          Desktop: `contents`, so the art stays positioned against the section. */}
      <div className="relative h-[290px] shrink-0 sm:h-[392px] md:h-[474px] lg:contents">
        <HeroArtV2 />
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-black max-lg:relative max-lg:z-10">
        <div className="mx-auto max-w-[1440px] animate-hero-up [animation-delay:1600ms]">
          <Ticker />
        </div>
      </div>
    </section>
  );
}
