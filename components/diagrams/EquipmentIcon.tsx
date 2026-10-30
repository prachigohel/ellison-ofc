import type { Equipment } from "@/lib/content";

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Line-art schematics for the equipment grid (120 x 80 viewBox). */
export default function EquipmentIcon({ kind }: { kind: Equipment["icon"] }) {
  return (
    <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden>
      {kind === "skid" && (
        <g {...s}>
          <path d="M8 66 H112 M14 66 V72 M106 66 V72" />
          <rect x="14" y="30" width="34" height="36" rx="4" />
          <rect x="58" y="22" width="20" height="44" rx="6" />
          <rect x="84" y="30" width="16" height="36" rx="5" />
          <path d="M48 44 H58 M78 44 H84 M68 22 V12 H96 V30" />
          <circle cx="31" cy="48" r="8" />
        </g>
      )}
      {kind === "screw" && (
        <g {...s}>
          <rect x="18" y="20" width="84" height="40" rx="8" />
          <path d="M26 32 c6 -8 10 8 16 0 s10 8 16 0 s10 8 16 0 s10 8 16 0" />
          <path d="M26 48 c6 8 10 -8 16 0 s10 -8 16 0 s10 -8 16 0 s10 -8 16 0" />
          <path d="M60 20 V8 M60 60 V72 M8 40 H18 M102 40 H112" />
        </g>
      )}
      {kind === "separator" && (
        <g {...s}>
          <rect x="12" y="22" width="96" height="36" rx="18" />
          <path d="M20 46 H100 M60 22 V46" strokeDasharray="3 3" />
          <path d="M2 34 H12 M90 22 V10 H118 M40 58 V72 M80 58 V72" />
        </g>
      )}
      {kind === "exchanger" && (
        <g {...s}>
          <rect x="10" y="24" width="56" height="32" rx="6" />
          <path d="M16 32 H60 M16 40 H60 M16 48 H60" />
          <rect x="78" y="14" width="26" height="52" rx="13" />
          <path d="M66 40 H78 M91 66 V74 M91 14 V6 H116" />
        </g>
      )}
      {kind === "glycol" && (
        <g {...s}>
          <rect x="18" y="8" width="24" height="64" rx="12" />
          <path d="M22 24 H38 M22 34 H38 M22 44 H38 M22 54 H38" />
          <rect x="70" y="36" width="40" height="22" rx="4" />
          <path d="M42 18 H56 V46 H70 M90 36 V24 M84 24 h12" />
        </g>
      )}
      {kind === "analyzer" && (
        <g {...s}>
          <rect x="14" y="10" width="64" height="44" rx="4" />
          <path d="M20 40 L32 28 L42 36 L54 20 L72 32" />
          <path d="M46 54 V64 M30 66 H62" />
          <rect x="88" y="16" width="20" height="50" rx="3" />
          <path d="M92 24 H104 M92 32 H104 M92 40 H100" />
        </g>
      )}
    </svg>
  );
}
