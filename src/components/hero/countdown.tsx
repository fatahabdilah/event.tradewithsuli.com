"use client";

import { useEffect, useState } from "react";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(deadline: number): Remaining {
  const total = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** Ticks every second; null until mounted so server and client markup match. */
export function useRemaining(deadline: string) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const target = new Date(deadline).getTime();
    const tick = () => setRemaining(getRemaining(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return remaining;
}

export const pad2 = (n: number | undefined) => (n === undefined ? "--" : String(n).padStart(2, "0"));

export function Countdown({ deadline }: { deadline: string }) {
  const remaining = useRemaining(deadline);

  const units: [number | undefined, string][] = [
    [remaining?.days, "HARI"],
    [remaining?.hours, "JAM"],
    [remaining?.minutes, "MENIT"],
    [remaining?.seconds, "DETIK"],
  ];

  return (
    <p className="whitespace-pre text-[12px] leading-normal" suppressHydrationWarning>
      {units.map(([value, label], i) => (
        <span key={label}>
          <span className="font-medium text-white tabular-nums">
            {pad2(value)}
          </span>
          {` ${label}${i < units.length - 1 ? "  " : ""}`}
        </span>
      ))}
    </p>
  );
}

/** Single-line "04 HARI, 03 JAM, 52 MENIT, 01 DETIK" countdown. */
export function CountdownLine({ deadline, className }: { deadline: string; className?: string }) {
  const remaining = useRemaining(deadline);
  return (
    <p className={className} suppressHydrationWarning>
      {pad2(remaining?.days)} HARI, {pad2(remaining?.hours)} JAM, {pad2(remaining?.minutes)} MENIT, {pad2(remaining?.seconds)} DETIK
    </p>
  );
}
