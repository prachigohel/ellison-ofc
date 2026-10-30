"use client";

import { motion } from "framer-motion";

type Props = {
  /** 0 – 1 */
  value: number;
  label: string;
  reading: string;
  color?: string;
  size?: number;
};

const START = -120;
const SWEEP = 240;
const polar = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [100 + r * Math.cos(a), 100 + r * Math.sin(a)];
};
const arc = (r: number) => {
  const [x1, y1] = polar(START, r);
  const [x2, y2] = polar(START + SWEEP, r);
  return `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`;
};

/** SVG pressure gauge. The needle sweeps in on view and then idles with a small jitter. */
export default function Gauge({ value, label, reading, color = "#0891B2", size = 180 }: Props) {
  const angle = START + SWEEP * value;
  const ticks = Array.from({ length: 25 }, (_, i) => START + (SWEEP / 24) * i);

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg viewBox="0 0 200 170" className="w-full overflow-visible">
        <path d={arc(80)} fill="none" stroke="#DFE4EC" strokeWidth="6" strokeLinecap="round" />
        <motion.path
          d={arc(80)}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: value }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
        {ticks.map((t, i) => {
          const [x1, y1] = polar(t, 66);
          const [x2, y2] = polar(t, i % 6 === 0 ? 56 : 61);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 6 === 0 ? "#556070" : "#C9D1DD"} strokeWidth="1.5" />;
        })}
        {/* Each group holds an invisible circle centred on the hub, so the default
            50%/50% SVG transform origin lands exactly on the pivot. */}
        <motion.g
          initial={{ rotate: START }}
          whileInView={{ rotate: [START, angle + 6, angle - 1.5, angle + 1, angle] }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <circle cx="100" cy="100" r="70" fill="none" />
          <motion.g
            animate={{ rotate: [0, 1.4, -0.8, 0.6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
          >
            <circle cx="100" cy="100" r="70" fill="none" />
            <line x1="100" y1="100" x2="100" y2="34" stroke="#0D1420" strokeWidth="2.5" strokeLinecap="round" />
          </motion.g>
        </motion.g>
        <circle cx="100" cy="100" r="7" fill="#F7F9FC" stroke={color} strokeWidth="2" />
        <text x="100" y="146" textAnchor="middle" className="fill-fg font-mono text-[18px]">
          {reading}
        </text>
      </svg>
      <span className="-mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</span>
    </div>
  );
}
