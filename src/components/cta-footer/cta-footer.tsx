/* eslint-disable @next/next/no-img-element -- decorative layers and icons */
import Image from "next/image";
import { MAIN_SITE, REGISTER_HREF, REGISTRATION_DEADLINE } from "@/lib/event";
import { CountdownBlocks } from "./countdown-blocks";

const IMG = "/cta";

// Blue blurred light shape (Figma "Subtract"), rotated 15°, centred at the card's mid-height − 93.65px.
function Glow({ dx, mobile = false }: { dx: number; mobile?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-[calc(50%-93.65px)] ${mobile ? "" : "max-lg:hidden"} flex h-[1607.52px] w-[1335.558px] -translate-x-1/2 -translate-y-1/2 items-center justify-center`}
      style={{ left: `calc(50% + ${dx}px)` }}
    >
      <div className="relative h-[1393.812px] w-[1009.201px] flex-none rotate-15">
        <Image alt="" width={312} height={408} sizes={mobile ? "312px" : "(max-width: 1023px) 16px, 312px"} className="absolute top-[-8.61%] left-[-11.89%] block h-[117.22%] w-[123.78%] max-w-none" src={`${IMG}/glow.png`} />
      </div>
    </div>
  );
}

function Cta() {
  return (
    <div id="daftar" data-reveal className="relative h-[591px] w-full overflow-clip rounded-[12px] border border-white/10 bg-[#0a0a0a] max-lg:flex max-lg:h-auto max-lg:flex-col">
      <Glow dx={109.78} />
      <Glow dx={370.78} />
      <div aria-hidden className="pointer-events-none absolute top-[-1px] right-[-1px] h-[176px] w-[591px] bg-gradient-to-b from-[#0a0a0a] to-[#0a0a0a]/0 max-lg:hidden" />

      {/* Portrait, clipped to Figma's 723px square mask. */}
      {/* Mobile: cheap blue light behind the portrait (stands in for the blurred glow shapes). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(55%_60%_at_65%_65%,rgb(17_60_217/0.6),transparent)] lg:hidden"
      />
      {/* Mobile: the same 723px portrait crop, scaled down and placed under the copy. */}
      <div aria-hidden className="pointer-events-none absolute top-[-34px] left-[627px] size-[723px] overflow-hidden max-lg:relative max-lg:inset-auto max-lg:order-last max-lg:-mt-6 max-lg:self-center max-lg:[mask-image:radial-gradient(70%_75%_at_50%_70%,#000_55%,transparent_100%)] max-sm:[zoom:0.5] sm:max-lg:[zoom:0.72]">
        <Image
          src={`${IMG}/suli.png`}
          alt=""
          width={1672}
          height={941}
          sizes="(max-width: 639px) 700px, (max-width: 1023px) 1000px, 1372px"
          quality={90}
          className="absolute top-[-49px] left-[-386px] h-[772px] w-[1372px] max-w-none object-cover"
        />
      </div>
      <Glow dx={475.78} />

      <div className="absolute top-[39px] left-[39px] flex w-[706px] flex-col items-start gap-[44px] max-lg:relative max-lg:inset-auto max-lg:w-full max-lg:gap-8 max-lg:p-6 sm:max-lg:p-10">
        <img alt="TWS" className="block h-[40px] w-[105px]" src={`${IMG}/tws-logo-lg.svg`} />

        <div className="flex w-full flex-col items-start gap-[24px]">
          <span className="relative flex items-center justify-center gap-[10px] rounded-[24px] px-[15px] py-[8px]">
            <span className="absolute inset-0 rounded-[24px] bg-white/5 backdrop-blur-[20px] max-lg:bg-white/8 max-lg:backdrop-blur-none" />
            <span className="relative size-[12px] rounded-full bg-red-600">
              <span className="absolute inset-0 rounded-full bg-red-600 animate-live-pulse" />
            </span>
            <span className="relative whitespace-nowrap font-mono text-[12px] leading-[1.5] text-white max-sm:text-[10.5px]">
              LIVE VIRTUAL EVENT: NOV 25TH - NOV 28TH
            </span>
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_10px_#e11d48]" />
          </span>

          <div className="flex w-full flex-col items-start gap-[32px]">
            <div className="flex w-full flex-col items-start gap-[8px] text-white">
              <h2 className="font-montreal text-[48px] font-medium leading-[1.2] tracking-[-0.96px] max-sm:text-[34px]">Daftar sekarang</h2>
              <p className="w-[580px] font-montreal text-[20px] leading-[1.4] opacity-90 max-lg:w-full max-sm:text-[16px]">
                Akses riset, edukasi, trade setup, dan komunitas yang membantu kamu membaca market dan menyusun
                keputusan sendiri.
              </p>
            </div>

            <div className="flex w-full flex-col items-start gap-[40px]">
              <a
                href={REGISTER_HREF}
                className="relative flex items-center justify-center gap-[10px] rounded-[67px] border border-white px-[32px] py-[12px] transition-opacity [filter:drop-shadow(0px_31px_9.5px_rgba(42,98,255,0.13))_drop-shadow(0px_14px_10px_rgba(42,98,255,0.12))] hover:opacity-90"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[67px] bg-[linear-gradient(97.74deg,#1447d6_1.4587%,#204fd3_36.588%,#4c79f2_81.52%,#779cff_96.534%)]"
                />
                <img alt="" className="relative size-[16px]" src="/hero/icon-arrow-light.svg" />
                <span className="relative whitespace-nowrap font-montreal text-[18px] font-medium leading-[1.4] text-white">
                  Gabung Sekarang
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-2.135px_2px_0px_rgba(255,255,255,0.25),inset_0px_3.202px_6.405px_0px_rgba(255,255,255,0.25)]"
                />
              </a>

              <div className="flex flex-col items-start gap-[6px]">
                <p className="whitespace-nowrap font-mono text-[18.333px] leading-[1.5] tracking-[1.4667px] text-white/50 max-sm:text-[13px] max-sm:tracking-[1px]">
                  PENDAFTARAN DITUTUP DALAM:
                </p>
                <CountdownBlocks deadline={REGISTRATION_DEADLINE} colon={`${IMG}/colon.svg`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute top-[-1px] right-[-1.5px] h-[591px] w-[295.5px] bg-gradient-to-l from-[#0a0a0a] to-[#0a0a0a]/0 max-lg:hidden" />
      <div aria-hidden className="pointer-events-none absolute right-[-1px] bottom-[-0.89px] h-[176px] w-[937px] bg-gradient-to-t from-[#0a0a0a] to-[#0a0a0a]/0 max-lg:hidden" />
    </div>
  );
}

const FOOTER_LINK = "font-montreal text-[12px] leading-[1.4] whitespace-nowrap text-[#bbb] underline opacity-90 hover:opacity-100";

function Footer() {
  return (
    <footer data-reveal className="flex w-full items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-4">
      <div className="flex items-center gap-[20px] max-sm:flex-col max-sm:items-start max-sm:gap-3">
        <img alt="TWS" className="block h-[32px] w-[84px]" src="/hero/tws-logo.svg" />
        <div className="flex items-center gap-[8px]">
          <a href={`${MAIN_SITE}/privacy`} className={FOOTER_LINK}>
            Privacy Policy
          </a>
          <span aria-hidden className="h-[14px] w-px bg-[#bbb] opacity-90" />
          <a href={`${MAIN_SITE}/terms`} className={FOOTER_LINK}>
            Terms and Conditions
          </a>
        </div>
      </div>
      <p className="whitespace-nowrap font-montreal text-[12px] leading-[1.4] text-[#bbb] opacity-90 max-sm:whitespace-normal">
        PT SOLUSI FINANSIAL MEDIA ©2026 All rights reserved
      </p>
    </footer>
  );
}

export function CtaFooter() {
  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto flex w-[1440px] flex-col items-start justify-center gap-[48px] px-[80px] py-[40px] max-lg:w-full max-lg:gap-10 max-lg:px-5 max-lg:pb-10">
        <Cta />
        <Footer />
      </div>
    </section>
  );
}
