/* eslint-disable @next/next/no-img-element -- decorative glows, icons and coin avatars */
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { CountdownLine } from "@/components/hero/countdown";
import { REGISTER_HREF, REGISTRATION_DEADLINE } from "@/lib/event";

const IMG = "/social-proof";

const neon = (a: number, b: number, c: number, d: number, e: number) =>
  `0 0 ${a}px #00ff1a, 0 0 ${b}px #00ff1a, 0 0 ${c}px #00ff1a, 0 0 ${d}px #00ff1a, 0 0 ${e}px #00ff1a`;

type Call = {
  coin: string;
  avatar: ReactNode;
  gain: string;
  glow: string; // neon text-shadow
  from: string;
  to: string;
  light: string; // blurred colour pool behind the screenshot
  height: number;
  lightTop: number;
  shot: ReactNode;
};

function Avatar({ src, crop }: { src: string; crop?: CSSProperties }) {
  return (
    <span className="relative size-[29.787px] shrink-0 overflow-hidden rounded-full">
      <Image alt="" width={120} height={120} sizes="34px" className={crop ? "absolute max-w-none" : "size-full object-cover"} style={crop} src={`${IMG}/${src}`} />
    </span>
  );
}

/** Screenshot box clipped to Figma's crop (percentages are relative to the box). */
function Shot({ src, w, h, bg, crop, aspect, radius = 4.382 }: {
  src: string;
  w: number;
  h: number;
  bg?: string;
  crop?: CSSProperties;
  aspect: string;
  radius?: number;
}) {
  return (
    <div
      className="relative w-full overflow-hidden border-[0.863px] border-white/10"
      style={{ aspectRatio: aspect, borderRadius: radius, backgroundColor: bg }}
    >
      <Image
        src={`${IMG}/${src}`}
        alt=""
        width={w}
        height={h}
        sizes="(max-width: 1023px) 92vw, 1013px"
        quality={90}
        className={crop ? "absolute max-w-none" : "size-full object-cover"}
        style={crop}
      />
    </div>
  );
}

const TRUMP: Call = {
  coin: "TRUMP",
  avatar: <Avatar src="trump.png" crop={{ height: "148.89%", width: "112.17%", left: "-5.06%", top: "-9.34%" }} />,
  gain: "+15.000%",
  glow: neon(7.471, 26.147, 52.295, 89.648, 156.884),
  from: "$0.47",
  to: "$75",
  light: "glow-yellow.png",
  height: 445.319,
  lightTop: 286.7,
  shot: (
    <Shot
      src="trump-call.png"
      w={1074}
      h={842}
      bg="#323338"
      aspect="604.681 / 354.188"
      crop={{ height: "224.05%", width: "167.4%", left: "-9.11%", top: "-133.05%" }}
    />
  ),
};

const COLUMNS: Call[][] = [
  [
    {
      coin: "HYPE",
      avatar: <Avatar src="hype.png" />,
      gain: "+1552%",
      glow: neon(5.863, 20.521, 41.041, 70.357, 123.124),
      from: "$3,88",
      to: "$59",
      light: "glow-teal.png",
      height: 445.039,
      lightTop: 286.7,
      shot: <Shot src="hype-call.png" w={1310} h={770} aspect="261.81 / 153.36" radius={8.33} />,
    },
    {
      coin: "EVAA",
      avatar: <Avatar src="evaa.png" />,
      gain: "+135%",
      glow: neon(4.917, 17.211, 34.422, 59.009, 103.266),
      from: "$3.51",
      to: "$8.17",
      light: "glow-violet.png",
      height: 579.362,
      lightTop: 461.7,
      shot: (
        <Shot
          src="evaa-call.png"
          w={1493}
          h={960}
          aspect="604.681 / 488.737"
          radius={2.981}
          crop={{ height: "257.57%", width: "323.77%", left: "-13.58%", top: "-46.8%" }}
        />
      ),
    },
  ],
  [
    TRUMP,
    {
      coin: "ASTER",
      avatar: <Avatar src="aster.png" />,
      gain: "+958%",
      glow: neon(5.296, 18.535, 37.07, 63.548, 111.209),
      from: "$0.17",
      to: "$1.8",
      light: "glow-orange.png",
      height: 444.333,
      lightTop: 286.25,
      shot: (
        <Shot
          src="aster-call.png"
          w={1206}
          h={1246}
          bg="#25201f"
          aspect="275.46 / 161.35"
          crop={{ height: "116.6%", width: "66.11%", left: "0.05%", top: "-0.03%" }}
        />
      ),
    },
    TRUMP,
  ],
];

function CallCard({ call, desktopOnly, delay }: { call: Call; desktopOnly?: boolean; delay: number }) {
  return (
    <article
      data-reveal
      className={`relative flex w-full shrink-0 flex-col items-start gap-[17.872px] max-lg:h-auto! max-lg:pb-4 ${desktopOnly ? "max-lg:hidden" : ""} rounded-[8.936px] border-[0.745px] border-white/10 bg-gradient-to-b from-[#0a0a0a] to-[#141414] pb-[11.915px] shadow-[0_-5.957px_23.83px_black]`}
      style={{ height: call.height, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {/* Only the coloured light pool is clipped to the card; the neon gain text glow may spill past its edges. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <div className="absolute left-1/2 h-[233.085px] w-[466.17px] -translate-x-1/2" style={{ top: call.lightTop }}>
          <Image alt="" width={265} height={207} sizes="265px" className="absolute top-[-127.8%] left-[-63.9%] block h-[355.6%] w-[227.8%] max-w-none" src={`${IMG}/${call.light}`} />
        </div>
      </div>

      <header className="relative flex w-full items-center gap-[11.915px] px-[11.915px] pt-[17.872px] pb-[11.915px]">
        <div className="flex min-w-px flex-1 items-center gap-[11.915px]">
          {call.avatar}
          <h3 className="font-montreal text-[22.34px] font-medium leading-[26.809px] text-white max-sm:text-[18px]">{call.coin}</h3>
        </div>
        <p className="flex items-center gap-[5.957px] whitespace-nowrap font-montreal text-[17.872px] max-sm:text-[14px]">
          {/* Phones: mobile Safari clips very wide text-shadows into a box, so a tight text glow plus a soft
              radial light behind the number stand in for the wide desktop neon. */}
          <span className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-x-8 -inset-y-5 bg-[radial-gradient(closest-side,rgb(0_255_26/0.32),transparent)] lg:hidden"
            />
            <span
              className="relative font-bold leading-[1.4] text-[#00ff1a] max-lg:[text-shadow:0_0_4px_#00ff1a,0_0_12px_rgb(0_255_26/0.55)]!"
              style={{ textShadow: call.glow }}
            >
              {call.gain}
            </span>
          </span>
          <span aria-hidden className="h-[15.585px] w-[1.251px] bg-white/20" />
          <span className="text-white/60">
            {call.from} &gt; <b className="font-bold text-white">{call.to}</b>
          </span>
        </p>
      </header>

      <div className="relative w-full px-[11.915px]">{call.shot}</div>
    </article>
  );
}


export function SocialProof() {
  return (
    <section id="bukti-call" className="relative isolate w-full overflow-hidden bg-[#2a62ff] py-[80px] text-white">
      {/* Blue light texture (Figma: rotated image, lighten blend) under a black vertical fade. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-[calc(50%-427.59px)] flex h-[1483px] w-[2636.03px] -translate-x-1/2 items-center justify-center mix-blend-lighten max-lg:hidden"
      >
        <div className="relative h-[2636.03px] w-[1483px] flex-none rotate-90 -scale-y-100">
          <Image src={`${IMG}/bg-texture.png`} alt="" fill sizes="(max-width: 1023px) 16px, 2636px" className="object-cover" />
        </div>
      </div>
      {/* Mobile stand-in for the blended texture: a plain gradient glow. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[30%] h-[60%] bg-[radial-gradient(60%_50%_at_50%_50%,rgb(42_98_255/0.45),transparent)] lg:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#000_4.932%,rgb(0_0_0/0.2)_53.089%,#000_100%)]"
      />

      <div className="relative mx-auto flex w-[1440px] flex-col items-center gap-[48px] max-lg:w-full max-lg:gap-10 max-lg:px-5">
        <div data-reveal className="flex w-[522px] flex-col items-center gap-[16px] text-center max-lg:w-full">
          <h2 className="w-[364px] max-lg:w-full max-lg:max-w-[364px] max-sm:text-[24px] max-sm:leading-[30px] font-montreal text-[30px] font-medium leading-[36px]">
            Dibahas sebelum ramai.{" "}
            <span className="bg-gradient-to-r from-[#2a62ff] from-[7.212%] to-white bg-clip-text font-bold text-transparent">
              Naik sampai 15.000%+
            </span>
          </h2>
          <p className="w-[502px] max-lg:w-full max-lg:max-w-[502px] font-montreal text-[16px] leading-[1.4] opacity-90">
            TRUMP dibahas di $0,47, HYPE di $3,88, ASTER di $0,17. Di bootcamp gratis 25–28 November, Suli bedah narasi
            yang dia pantau untuk 2027.
          </p>
        </div>

        <div className="relative h-[1181px] w-[1440px] max-lg:flex max-lg:h-auto max-lg:w-full max-lg:max-w-[630px] max-lg:flex-col max-lg:gap-10">
          <div className="absolute inset-x-0 top-[-80px] h-[1124px] overflow-clip lg:[mask-image:linear-gradient(180deg,#000_0,#000_998.5px,transparent_1124px)] max-lg:static max-lg:flex max-lg:h-auto max-lg:flex-col max-lg:gap-5 max-lg:overflow-visible">
            {COLUMNS.map((column, i) => (
              <div
                key={i}
                className="absolute flex w-[630px] flex-col items-start gap-[20px] max-lg:static max-lg:w-full"
                style={{ left: i === 0 ? 80 : 730, top: i === 0 ? 80 : 81 }}
              >
                {column.map((call, j) => (
                  // The repeated TRUMP card only fills the fading tail of the desktop grid.
                  <CallCard key={j} call={call} desktopOnly={i === 1 && j === 2} delay={j * 120 + i * 80} />
                ))}
              </div>
            ))}
          </div>

          <div data-reveal className="absolute top-[1068px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-[20px] max-lg:static max-lg:translate-x-0">
            <a
              href={REGISTER_HREF}
              className="relative flex items-center justify-center gap-[10px] rounded-[60px] border border-white px-[32px] py-[12px] transition-opacity [filter:drop-shadow(0px_31px_9.5px_rgba(42,98,255,0.13))_drop-shadow(0px_14px_10px_rgba(42,98,255,0.12))] hover:opacity-90"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[60px] bg-[linear-gradient(97.74deg,#1447d6_1.4587%,#204fd3_36.588%,#4c79f2_81.52%,#779cff_96.534%)]"
              />
              <img alt="" className="relative size-[16px]" src="/hero/icon-arrow-light.svg" />
              <span className="relative whitespace-nowrap font-montreal text-[18px] font-medium leading-[1.4]">DAFTAR SEKARANG <strong className="font-bold">GRATIS</strong></span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-2.135px_2px_0px_rgba(255,255,255,0.25),inset_0px_3.202px_6.405px_0px_rgba(255,255,255,0.25)]"
              />
            </a>
            <div className="text-center font-mono text-[14px] leading-[1.5] tracking-[1.12px] whitespace-nowrap max-sm:text-[12px] max-sm:tracking-[0.5px]">
              <p className="text-white/50">PENDAFTARAN DITUTUP DALAM:</p>
              <CountdownLine deadline={REGISTRATION_DEADLINE} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
