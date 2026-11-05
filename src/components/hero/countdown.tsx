"use client";

import { useMemo, useSyncExternalStore } from "react";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(deadline: number, at: number): Remaining {
  const total = Math.max(0, Math.floor((deadline - at) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

// One shared 1-second clock for every countdown on the page (instead of an interval per countdown).
let now = 0;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

/** Remaining time, ticking every second; null on the server and first render so markup matches. */
export function useRemaining(deadline: string) {
  const time = useSyncExternalStore(subscribe, () => now, () => 0);
  return useMemo(() => (time ? getRemaining(new Date(deadline).getTime(), time) : null), [deadline, time]);
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
