/* eslint-disable @next/next/no-img-element -- decorative layers rely on raw transforms/blend modes */
import type { CSSProperties } from "react";
import Image from "next/image";

// Inside 1px gradient stroke (Figma: white → #999 at 0%, from the top-right corner).
const cardStroke = {
  padding: 1,
  background: "linear-gradient(228.7deg, #fff 0%, rgb(153 153 153 / 0) 66%)",
  mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
} as const;

const glassShape = 'url("/profile/tws-mark-shape.svg") 0 0 / 100% 100% no-repeat';
const glassMask = { WebkitMask: glassShape, mask: glassShape } as const;

const neonGreen =
  "0 0 4.505px #00ff1a, 0 0 9.01px rgb(0 255 26 / 0.53), 0 0 31.535px #00ff1a, 0 0 63.069px #00ff1a, 0 0 108.119px #00ff1a, 0 0 189.208px #00ff1a";

const cardShadow =
  "drop-shadow(1px 1px 2px rgb(0 0 0 / 0.3)) drop-shadow(4px 6px 3.5px rgb(0 0 0 / 0.26)) drop-shadow(8px 13px 4.5px rgb(0 0 0 / 0.15)) drop-shadow(14px 23px 5.5px rgb(0 0 0 / 0.05)) drop-shadow(22px 36px 6px rgb(0 0 0 / 0.01))";

function HypeTicker() {
  return (
    <div
      data-reveal
      className="absolute top-[51px] left-[146px] flex w-[319.232px] items-center max-lg:top-[8px] max-lg:left-[calc(max(20px,50%-280px)-12px)] max-lg:z-10 max-lg:origin-top-left max-lg:scale-[0.72] gap-[16px] rounded-[8px] border border-[#1a1a1a] bg-gradient-to-b from-[#090909] to-[#0e0e0e] px-[21px] py-[20px]"
      style={{ filter: cardShadow, "--reveal-delay": "250ms" } as CSSProperties}
    >
      <div className="flex w-[170px] shrink-0 flex-col items-start gap-[12px]">
        <div className="flex h-[38px] w-full items-center border-b border-[#1a1a1a] pb-[14px]">
          <div className="flex min-w-px flex-1 items-center gap-[10px]">
            <img alt="" className="size-[24px] shrink-0" src="/profile/hype.png" width={24} height={24} />
            <p className="whitespace-nowrap font-montreal text-[16px] font-medium leading-normal text-white">Hyperliquid</p>
            <p className="whitespace-nowrap font-montreal text-[14px] leading-normal text-white opacity-60">$HYPE</p>
          </div>
        </div>
        <div className="flex w-full items-center gap-[6px] text-[#00ff1a]">
          <p className="whitespace-nowrap font-mono text-[19px] font-bold leading-normal" style={{ textShadow: neonGreen }}>
            +Rp<span className="tracking-[-5px]"> </span>
            <span className="tracking-[-2px]">4.</span>1M
          </p>
          <p className="whitespace-nowrap font-mono text-[18px] leading-normal">(+135%)</p>
        </div>
      </div>
      <div className="relative h-[72px] w-[91.232px] shrink-0">
        <div className="absolute inset-[-0.69%_-2.48%_0_-0.55%]">
          <img alt="" className="block size-full max-w-none" src="/profile/hype-chart.svg" />
        </div>
      </div>
    </div>
  );
}

export function Profile() {
  return (
    // The extra 80px on top holds the blue glow that bleeds above the 631px Figma frame.
    <section id="profile" className="relative isolate w-full overflow-hidden bg-black pt-[80px] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[80px] h-[631px] max-lg:bottom-0 max-lg:h-auto">
        {/* 28px dot grid, anchored to the centered 1440 frame (dot centers at x/y ≈ 1.5px). */}
        <div
          className="absolute inset-y-0 left-1/2 w-[3680px] -translate-x-1/2 opacity-20 max-lg:left-0 max-lg:w-full max-lg:translate-x-0"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 2px, transparent 2.5px)",
            backgroundSize: "28px 28px",
            backgroundPosition: "-12.5px -12.5px",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#000_4.932%,rgb(0_0_0/0.2)_53.089%,#000_100%)]" />
      </div>

      {/* No transform here: it would create a stacking context and stop the blends reaching the dots. */}
      <div aria-hidden className="pointer-events-none absolute top-0 left-[calc(50%-720px)] h-[260px] w-[1440px]">
        <div className="absolute inset-0 -scale-y-100 overflow-hidden mix-blend-screen">
          <img alt="" className="absolute top-[0.07%] left-0 h-[134.06%] w-full max-w-none" src="/profile/glow.png" />
        </div>
        <div className="absolute inset-0 bg-[#2a62ff] mix-blend-color" />
      </div>

      <div className="relative mx-auto flex h-[631px] w-[1440px] flex-col items-start px-[232px] py-[109px] max-lg:h-auto max-lg:w-full max-lg:items-center max-lg:px-5 max-lg:pt-[48px] max-lg:pb-16">
        <div className="flex items-center gap-[40px] max-lg:w-full max-lg:max-w-[560px] max-lg:flex-col max-lg:gap-8">
          <div data-reveal className="relative size-[413px] shrink-0 overflow-hidden rounded-[12px] max-lg:aspect-square max-lg:size-auto max-lg:w-full max-lg:max-w-[413px]">
            <Image
              src="/profile/portfolio.png"
              alt="Portofolio Suli: total aset Rp7.030.092.901"
              width={2412}
              height={2922}
              sizes="(max-width: 1023px) 92vw, 413px"
              quality={90}
              className="absolute top-[-8.68%] left-0 h-[121.14%] w-full max-w-none"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[12px]" style={cardStroke} />
          </div>

          <div data-reveal style={{ "--reveal-delay": "150ms" } as CSSProperties} className="flex w-[522px] shrink-0 flex-col items-start gap-[16px] max-lg:w-full">
            <h2 className="font-montreal text-[30px] font-medium leading-[36px] max-sm:text-[24px] max-sm:leading-[30px]">
              Waktu orang panik jual,
              <br />
              Suli cicil HYPE dari{" "}
              <span className="bg-gradient-to-r from-[#2a62ff] from-[7.212%] to-white bg-clip-text font-bold text-transparent">
                Rp3M jadi Rp7M.
              </span>
            </h2>
            <div className="flex w-[477px] flex-col gap-[22.4px] max-lg:w-full font-montreal text-[16px] leading-[1.4] text-[#bbb]">
              <p>
                Sepanjang bear market, saat banyak orang jual karena panik, Suli terus cicil $HYPE. Modal Rp3 miliar,
                sekarang jadi Rp7 miliar*. Semuanya di portofolio publik yang bisa dicek siapa pun.
              </p>
              <p>Call-nya juga tercatat: $HYPE $3,88 → $59, $TRUMP $0,47 → $75, $ASTER $0,17 → $1,8.</p>
              <p>25–28 November, Suli bongkar cara berpikirnya, live dan gratis.</p>
              <p>*Nilai per [tanggal]. Hasil masa lalu bukan jaminan hasil di masa depan.</p>
            </div>
          </div>
        </div>

        {/* Glass mark, same technique as the main TWS site (Web3JobsV2): a backdrop blur clipped to the
            logo shape softens the dot grid behind it, with the gradient outline drawn on top. Kept light (1px,
            tuned against Figma's render) so the dots stay visible through the glass. */}
        <div aria-hidden className="pointer-events-none absolute top-[109px] left-[1195px] size-[434px] max-lg:hidden">
          <span className="absolute inset-0 backdrop-blur-[1px]" style={glassMask} />
          <img alt="" className="relative block size-full max-w-none" src="/profile/tws-mark.svg" />
          {/* The exported SVG drops Figma's GLASS rim lighting; this layer adds it back on the lit edges. */}
          <img alt="" className="absolute inset-0 block size-full max-w-none" src="/profile/tws-mark-rim.svg" />
        </div>

        <HypeTicker />
      </div>
    </section>
  );
}
