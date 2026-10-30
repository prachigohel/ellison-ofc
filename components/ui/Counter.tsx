"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

type Props = { to: number; decimals?: number; suffix?: string; duration?: number };

/** Counts up from zero the first time it enters the viewport. */
export default function Counter({ to, decimals = 0, suffix = "", duration = 2.2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {(0).toFixed(decimals) + suffix}
    </span>
  );
}
