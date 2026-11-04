"use client";

import { useEffect } from "react";

/**
 * Reveals every `[data-reveal]` element once it scrolls into view (CSS in globals.css does the motion;
 * `--reveal-delay` staggers siblings). Elements are revealed once, then unobserved.
 */
export function ScrollReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
