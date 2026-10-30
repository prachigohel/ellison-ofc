"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useSpring, type AnimationPlaybackControls } from "framer-motion";

const W = 1000;
const H = 220;

/**
 * Oversized footer wordmark. Soft embossed letters are always visible; a
 * spotlight reveals the brand gradient beneath. The spotlight sweeps
 * across on its own and follows the cursor while hovered.
 */
export default function FooterWordmark({ text = "ELLISON" }: { text?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const x = useMotionValue(W * 0.15);
  const y = useMotionValue(H * 0.55);
  const sx = useSpring(x, { stiffness: 90, damping: 20 });
  const sy = useSpring(y, { stiffness: 90, damping: 20 });
  const sweep = useRef<AnimationPlaybackControls | null>(null);

  const startSweep = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      x.set(W / 2);
      return;
    }
    sweep.current?.stop();
    y.set(H * 0.55);
    sweep.current = animate(x, [W * 0.1, W * 0.9], {
      duration: 7,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    });
  };

  useEffect(() => {
    startSweep();
    return () => sweep.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    sweep.current?.stop();
    x.set(((e.clientX - r.left) / r.width) * W);
    y.set(((e.clientY - r.top) / r.height) * H);
  };

  const common = {
    x: W / 2,
    y: 196,
    textAnchor: "middle" as const,
    textLength: W - 24,
    lengthAdjust: "spacing" as const,
    className: "font-display",
    style: { fontSize: 236, fontWeight: 600 },
  };

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="block w-full select-none"
      onPointerMove={onMove}
      onPointerLeave={startSweep}
      aria-hidden
    >
      <defs>
        {/* Resting state: soft embossed letters */}
        <linearGradient id="wm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E2E8F0" />
        </linearGradient>
        {/* Revealed state: brand gradient */}
        <linearGradient id="wm-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="0.55" stopColor="#0891B2" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="wm-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="wm-spot">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wm-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
        </linearGradient>

        {/* Spotlight that follows the cursor / idle sweep */}
        <mask id="wm-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <motion.circle cx={sx} cy={sy} r="240" fill="url(#wm-spot)" />
        </mask>
        {/* Bottom fade for the whole mark */}
        <mask id="wm-fade-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect width={W} height={H} fill="url(#wm-fade)" />
        </mask>
        <filter id="wm-emboss" x="-5%" y="-10%" width="110%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0D1420" floodOpacity="0.08" />
          <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#0D1420" floodOpacity="0.06" />
        </filter>
        <filter id="wm-glow" x="-10%" y="-30%" width="120%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0891B2" floodOpacity="0.28" />
        </filter>
      </defs>

      <g mask="url(#wm-fade-mask)">
        {/* Base letters, always visible */}
        <text {...common} fill="url(#wm-base)" stroke="rgba(13,20,32,0.10)" strokeWidth="1" filter="url(#wm-emboss)">
          {text}
        </text>

        {/* Brand-coloured letters revealed by the spotlight */}
        <g mask="url(#wm-mask)">
          <text {...common} fill="url(#wm-fill)" stroke="none" filter="url(#wm-glow)">
            {text}
          </text>
          <text {...common} fill="url(#wm-sheen)" stroke="none">
            {text}
          </text>
        </g>
      </g>
    </svg>
  );
}
