"use client";

/* eslint-disable @next/next/no-img-element -- colon separator icon */
import { Fragment, useState } from "react";
import { pad2, useRemaining } from "@/components/hero/countdown";

const UNITS = ["DAYS", "HOURS", "MINUTE", "SECONDS"] as const;

/** One digit that rolls up when it changes: the old digit rises out as the new one rises in from below. */
function RollingDigit({ value }: { value: string }) {
  const [roll, setRoll] = useState({ current: value, previous: null as string | null, key: 0 });
  if (value !== roll.current) setRoll({ current: value, previous: roll.current, key: roll.key + 1 });

  return (
    <span className="relative inline-block w-[1ch] text-center">
      <span key={`in-${roll.key}`} className={`inline-block ${roll.key ? "animate-digit-in" : ""}`}>
        {roll.current}
      </span>
      {roll.previous !== null && (
        <span key={`out-${roll.key}`} aria-hidden className="absolute inset-0 animate-digit-out">
          {roll.previous}
        </span>
      )}
    </span>
  );
}

/** Large DD : HH : MM : SS countdown used in the closing CTA. */
export function CountdownBlocks({ deadline, colon }: { deadline: string; colon: string }) {
  const remaining = useRemaining(deadline);
  const values = [remaining?.days, remaining?.hours, remaining?.minutes, remaining?.seconds];

  return (
    <div className="flex items-center gap-[12px] max-sm:gap-2">
      {UNITS.map((unit, i) => (
        <Fragment key={unit}>
          {i > 0 && <img alt="" aria-hidden className="h-[37px] w-[4px] shrink-0" src={colon} />}
          <div className="flex flex-col items-center justify-center font-mono leading-[1.5] whitespace-nowrap">
            <span className="flex text-[32.333px] tracking-[2.5867px] text-white tabular-nums max-sm:text-[26px] max-sm:tracking-[1px]">
              <span className="sr-only">{pad2(values[i])}</span>
              <span aria-hidden className="flex">
                {pad2(values[i]).split("").map((digit, d) => (
                  <RollingDigit key={d} value={digit} />
                ))}
              </span>
            </span>
            <span className="text-[12px] tracking-[0.96px] text-white/50">{unit}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
