/* eslint-disable @next/next/no-img-element -- small decorative icons and illustrations */
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

const IMG = "/detail-event";

// Figma copy placeholder — swap in the real descriptions.
const PLACEHOLDER = "A 100% free, 5-day live event where Mark Tilbury and Iman Gadzhi.";

const fadeBottom = "absolute bottom-0 left-0 h-[100px] w-[379px] bg-gradient-to-b from-[#111]/0 to-[#111]";
const glassInset =
  "pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0.175px_0.175px_rgba(255,255,255,0.1),inset_0_-0.175px_0.175px_rgba(0,0,0,0.1)]";
const chipShadow = "shadow-[0_1.401px_5.604px_rgba(0,0,0,0.2),0_2.802px_8.407px_rgba(0,0,0,0.15)]";

function Card({ title, delay, children }: { title: string; delay: number; children: ReactNode }) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className="flex w-[413px] shrink-0 flex-col items-center justify-end gap-[16px] overflow-clip max-lg:w-full max-lg:max-w-[413px] rounded-[12px] border border-white/10 bg-gradient-to-b from-[#0a0a0a] to-[#141414] p-[16px]">
      {children}
      <div className="flex w-full flex-col items-start gap-[8px] leading-[1.4]">
        <h3 className="w-full font-montreal text-[24px] font-medium text-white max-sm:text-[20px]">{title}</h3>
        <p className="w-full font-montreal text-[18px] text-[#bbb] max-sm:text-[16px]">{PLACEHOLDER}</p>
      </div>
    </div>
  );
}

// Figma relativeTransform as CSS matrix(a, b, c, d, tx, ty), in the 379×255 illustration frame.
type Matrix = [number, number, number, number, number, number];
const TILT: [number, number, number, number] = [0.9976, -0.0698, 0.0698, 0.9976]; // -4°

function place(m: Matrix, w?: number, h?: number): CSSProperties {
  return { position: "absolute", left: 0, top: 0, width: w, height: h, transformOrigin: "0 0", transform: `matrix(${m.join(",")})` };
}

function Ticket() {
  return (
    <div
      role="img"
      aria-label="Tiket Bull Run 2027, 4 - 7 November 2026"
      className="relative h-[255px] w-[379px] shrink-0 overflow-clip rounded-[12px] bg-[#0b0b0b] max-sm:[zoom:0.79]"
    >
      <img alt="" className="max-w-none" style={place([...TILT, 24.9972, 75.3144], 247.2402, 127.8584)} src={`${IMG}/ticket-body.svg`} />
      <img alt="" className="max-w-none" style={place([...TILT, 274.3882, 57.8752], 69.9336, 127.5059)} src={`${IMG}/ticket-stub.svg`} />
      <p
        className="w-[113px] whitespace-pre-line font-mono text-[4px] font-medium leading-[1.2] text-black"
        style={place([-0.0698, -0.9976, 0.9976, -0.0698, 292.736, 176.8853])}
      >
        {"TWS BULL RUN 2027 ADMISSION TICKET\nALL ACCESS PASS"}
      </p>
      <img alt="" className="max-w-none" style={place([-0.9976, 0.0698, -0.0698, -0.9976, 342.7984, 174.3871], 36.1146, 114)} src={`${IMG}/ticket-barcode.svg`} />
      <img alt="" className="max-w-none" style={place([...TILT, 271.8838, 65.0675], 3, 114)} src={`${IMG}/ticket-perforation.svg`} />
      <img alt="" className="max-w-none" style={place([...TILT, 41.5163, 82.1788], 32, 12)} src={`${IMG}/ticket-logo.svg`} />
      <p
        className="whitespace-nowrap font-montreal text-[36px] font-medium leading-[1.2] text-white"
        style={place([...TILT, 45.3529, 137.0448])}
      >
        Bull Run 2027
      </p>
      <p
        className="whitespace-nowrap font-montreal text-[12px] font-medium leading-[1.2] text-white opacity-50"
        style={place([...TILT, 48.3524, 179.94])}
      >
        4 - 7 November 2026
      </p>
    </div>
  );
}

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
// September 2026 starts on a Tuesday; rows sit at Figma's fixed offsets inside the 228px grid.
const WEEKS: { top: number; days: (number | null)[] }[] = [
  { top: 29.04, days: [null, 1, 2, 3, 4, 5, 6] },
  { top: 70.04, days: [7, 8, 9, 10, 11, 12, 13] },
  { top: 110.04, days: [14, 15, 16, 17, 18, 19, 20] },
  { top: 151.04, days: [21, 22, 23, 24, 25, 26, 27] },
];

function ArrowButton({ src }: { src: string }) {
  return (
    <span className="flex size-[23.973px] shrink-0 items-center justify-center rounded-[5.993px] border-[0.599px] border-white/15 opacity-50">
      <img alt="" className="size-[11.73px]" src={src} />
    </span>
  );
}

function Calendar() {
  return (
    <div className="relative h-[255px] w-[379px] shrink-0 overflow-clip rounded-[12px] bg-[#101010] max-sm:[zoom:0.79]">
      <div aria-hidden className="absolute top-[16px] left-1/2 flex w-[347px] -translate-x-1/2 flex-col items-start rounded-[12px] bg-[#1f1f1f] p-[11.987px]">
        <div className="flex w-full flex-col items-start gap-[12px]">
          <div className="flex w-full items-center justify-between pr-[6.593px] pl-[5.993px]">
            <ArrowButton src={`${IMG}/chev-l.svg`} />
            <p className="whitespace-nowrap font-montreal text-[11.987px] font-medium leading-[1.2] tracking-[-0.1199px] text-white">
              September
            </p>
            <ArrowButton src={`${IMG}/chev-r.svg`} />
          </div>

          <div className="relative h-[228.203px] w-full">
            <div className="absolute top-[0.04px] left-[0.02px] flex w-[323px] items-center gap-[4px]">
              {WEEKDAYS.map((d) => (
                <p
                  key={d}
                  className="flex min-w-px flex-1 justify-center p-[6px] font-montreal text-[8.99px] leading-[1.4] tracking-[-0.0899px] text-[#bbb]"
                >
                  {d}
                </p>
              ))}
            </div>

            {/* Event range 4–7: pill behind 4–6, filled circle on the 4th, outlined circle on the 7th. */}
            <div className="absolute top-[29.04px] left-[191.02px] h-[36px] w-[132px] rounded-full bg-[rgba(37,99,235,0.2)]" />
            <div className="absolute top-[29.04px] left-[191.02px] size-[36px]">
              <img alt="" className="absolute inset-[-22.22%_-27.78%_-22.22%_-16.67%] block size-auto max-w-none" src={`${IMG}/day-start.svg`} />
            </div>
            <div className="absolute top-[70.04px] left-[3.02px] size-[36px]">
              <img alt="" className="absolute inset-[-5.56%] block max-w-none" src={`${IMG}/day-end.svg`} />
            </div>

            {WEEKS.map((week) => (
              <div key={week.top} className="absolute left-[0.02px] flex w-[323px] items-center gap-[4px]" style={{ top: week.top }}>
                {week.days.map((day, i) => (
                  <span key={i} className="relative flex h-[36px] min-w-px flex-1 items-center justify-center">
                    {day !== null && (
                      <span className={`font-montreal leading-normal text-white ${day === 1 ? "text-[9.59px]" : "text-[11.73px]"}`}>
                        {day}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={fadeBottom} />
    </div>
  );
}

const CONTROLS = ["ctrl-1", "ctrl-2", "ctrl-3", "ctrl-4", "ctrl-5", "ctrl-6"];

function ZoomWindow() {
  return (
    <div className="relative h-[255px] w-[379px] shrink-0 overflow-clip max-sm:[zoom:0.79]">
      <div
        aria-hidden
        className="absolute top-[calc(50%-1.6px)] left-1/2 flex h-[251.795px] w-[379px] -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-[13.325px] rounded-[2px] border-[0.35px] border-white/10 bg-[#1f1f1f] pb-[13.325px]"
        style={{
          filter:
            "drop-shadow(0 54.843px 7.712px rgb(0 0 0 / 0.01)) drop-shadow(0 35.134px 7.07px rgb(0 0 0 / 0.05)) drop-shadow(0 19.709px 5.998px rgb(0 0 0 / 0.17)) drop-shadow(0 8.569px 4.285px rgb(0 0 0 / 0.29)) drop-shadow(0 2.142px 2.357px rgb(0 0 0 / 0.34)) drop-shadow(0 -6.662px 10.409px rgb(0 0 0 / 0.06))",
        }}
      >
        <div className="flex w-full flex-col items-start overflow-clip">
          <div className="relative h-[14.278px] w-full overflow-clip rounded-t-[10px] bg-[#1f1f1f]">
            <p className="absolute top-[calc(50%-4.92px)] left-[177.23px] -translate-x-1/2 whitespace-nowrap text-center font-montreal text-[6px] font-medium leading-[1.5] tracking-[0.18px] text-white">
              Zoom Meeting
            </p>
            <span className="absolute top-[4.13px] left-[6.01px] h-[4.509px] w-[19.54px]">
              <img alt="" className="absolute inset-[-4.17%_-0.97%_-4.17%_-0.96%] block max-w-none" src={`${IMG}/traffic-light.svg`} />
            </span>
          </div>

          <div className="relative h-[192.652px] w-full overflow-clip rounded-b-[8.883px] bg-white shadow-[0_0.581px_1.163px_rgba(0,0,0,0.04),0_0.581px_1.163px_rgba(0,0,0,0.04)]">
            <div className="absolute top-[calc(50%+16.26px)] left-[calc(50%+0.01px)] h-[289.812px] w-[378.643px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
              <Image
                src={`${IMG}/zoom-suli.png`}
                alt=""
                width={1264}
                height={967}
                sizes="379px"
                quality={90}
                className="absolute top-0 left-0 h-[99.99%] w-full max-w-none"
              />
            </div>
            <div className="absolute bottom-[5.1px] left-[5.28px] flex items-center gap-[2.802px]">
              {/* Rounded like the main TWS site's NameTag / mic chip (OneOnOne). */}
              <span className={`relative flex h-[17.514px] items-center justify-center rounded-full border-[0.35px] border-white/15 px-[9.808px] py-[2.802px] ${chipShadow}`}>
                <span className="absolute inset-0 rounded-full bg-[rgba(45,45,45,0.55)] backdrop-blur-[1.43px] max-lg:backdrop-blur-none" />
                <span className="relative whitespace-nowrap font-montreal text-[7.006px] font-medium leading-[1.4] text-white">
                  Sulianto Indria Putra
                </span>
                <span className={glassInset} />
              </span>
              <span className={`relative flex size-[17.514px] items-center justify-center rounded-full border-[0.35px] border-white/15 p-[2.802px] ${chipShadow}`}>
                <span className="absolute inset-0 rounded-full bg-[rgba(45,45,45,0.55)] backdrop-blur-[1.43px] max-lg:backdrop-blur-none" />
                <img alt="" className="relative size-[8.407px]" src={`${IMG}/mic.svg`} />
                <span className={glassInset} />
              </span>
            </div>
            {/* Stroke drawn over the photo, as Figma does, instead of a CSS border over the white fill. */}
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] border-[0.5px] border-white/10 shadow-[inset_0_-0.581px_0.581px_rgba(0,0,0,0.12),inset_0_0.35px_0.35px_rgba(255,255,255,0.12)]" />
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-[7.006px]">
          {CONTROLS.map((c) => (
            <span
              key={c}
              className={`relative flex size-[17.514px] items-center justify-center rounded-[31.467px] border-[0.35px] border-white/10 p-[2.802px] ${chipShadow}`}
            >
              <span className="absolute inset-0 rounded-[31.467px] bg-white/6 backdrop-blur-[1.43px] max-lg:backdrop-blur-none" />
              <img alt="" className="relative size-[8.407px]" src={`${IMG}/${c}.svg`} />
              <span className={glassInset} />
            </span>
          ))}
          <span
            className="relative flex size-[17.514px] items-center justify-center rounded-[31.467px] border-[0.35px] border-white/10 p-[2.802px]"
            style={{ filter: "drop-shadow(0 1.401px 2.802px rgb(0 0 0 / 0.2)) drop-shadow(0 2.802px 4.203px rgb(0 0 0 / 0.15))" }}
          >
            <span className="absolute inset-0 rounded-[31.467px] bg-[#b91c1c] backdrop-blur-[1.43px] max-lg:backdrop-blur-none" />
            <img alt="" className="relative size-[7.006px]" src={`${IMG}/ctrl-end.svg`} />
            <span className={glassInset} />
          </span>
        </div>
      </div>
      <div className={fadeBottom} />
    </div>
  );
}

export function DetailEvent() {
  return (
    <section id="detail-event" className="flex w-full flex-col items-center justify-center gap-[48px] bg-black p-[80px] text-white max-lg:gap-8 max-lg:px-5 max-lg:py-16">
      <h2 data-reveal className="font-montreal text-[30px] font-medium leading-[36px] whitespace-nowrap max-sm:text-[24px]">Detail event</h2>
      <div className="flex w-full max-w-[1280px] items-end justify-center gap-[21px] max-lg:flex-col max-lg:items-center max-lg:gap-4">
        <Card title="Event apa ini?" delay={0}>
          <Ticket />
        </Card>
        <Card title="Kapan diadakan?" delay={120}>
          <Calendar />
        </Card>
        <Card title="Dimana?" delay={240}>
          <ZoomWindow />
        </Card>
      </div>
    </section>
  );
}
