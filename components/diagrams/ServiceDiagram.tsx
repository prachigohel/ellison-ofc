import type { Service } from "@/lib/content";

// Schematic line drawings for the solution cards. Elements with the `anim`
// class are paused until the card is hovered (see globals.css `.diagram`).

const stroke = { fill: "none", stroke: "#C9D1DD", strokeWidth: 1.5 } as const;
const label = "fill-dim font-mono text-[9px] tracking-[0.15em]";

function Compression() {
  const stages = [
    { x: 40, r: 30 },
    { x: 150, r: 23 },
    { x: 245, r: 16 },
  ];
  return (
    <svg viewBox="0 0 340 150" className="h-full w-full">
      {/* pipe */}
      <path d="M0 80 H320" {...stroke} strokeWidth={8} stroke="#E6EBF2" />
      <path d="M0 80 H320" className="anim flow-dash" fill="none" stroke="#0891B2" strokeWidth="2" />
      {stages.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={80 - s.r * 1.4} width={s.r * 2} height={s.r * 2.8} rx={s.r * 0.5} fill="#FFFFFF" stroke="#C9D1DD" strokeWidth="1.5" />
          <rect
            x={s.x + 4}
            y={80 - s.r * 1.4 + 4}
            width={s.r * 2 - 8}
            height={s.r * 0.9}
            rx="3"
            fill="#0891B2"
            opacity={0.15 + i * 0.2}
            className="anim"
            style={{ animation: `pulse-piston ${1.2 - i * 0.25}s ease-in-out infinite alternate` }}
          />
          <text x={s.x + s.r} y={80 + s.r * 1.4 + 16} textAnchor="middle" className={label}>
            {["LP", "MP", "HP"][i]}
          </text>
        </g>
      ))}
      {/* discharge gauge */}
      <circle cx="310" cy="38" r="20" {...stroke} />
      <path d="M310 58 V80" {...stroke} />
      <g className="anim origin-[310px_38px]" style={{ animation: "var(--animate-swing)" }}>
        <line x1="310" y1="38" x2="310" y2="24" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      </g>
      <circle cx="310" cy="38" r="2.5" fill="#D97706" />
      <style>{`@keyframes pulse-piston{to{transform:translateY(14px)}}`}</style>
    </svg>
  );
}

function Extraction() {
  return (
    <svg viewBox="0 0 340 150" className="h-full w-full">
      {/* vessel */}
      <rect x="50" y="40" width="220" height="80" rx="40" fill="#FFFFFF" stroke="#C9D1DD" strokeWidth="1.5" />
      <clipPath id="vessel-clip">
        <rect x="50" y="40" width="220" height="80" rx="40" />
      </clipPath>
      <g clipPath="url(#vessel-clip)">
        <rect x="50" y="88" width="220" height="14" fill="#D97706" opacity="0.35" />
        <rect x="50" y="102" width="220" height="20" fill="#2563EB" opacity="0.3" />
      </g>
      <path d="M160 40 V100" stroke="#C9D1DD" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* inlet */}
      <path d="M0 64 H50" {...stroke} strokeWidth={6} stroke="#E6EBF2" />
      <path d="M0 64 H50" className="anim flow-dash" fill="none" stroke="#0891B2" strokeWidth="2" />
      {/* gas out top */}
      <path d="M230 40 V12 H340" {...stroke} strokeWidth={6} stroke="#E6EBF2" />
      <path d="M230 40 V12 H340" className="anim flow-dash" fill="none" stroke="#0891B2" strokeWidth="2" />
      {/* droplets */}
      {[80, 105, 130, 190, 215].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy="62"
          r="2.4"
          fill={i % 2 ? "#2563EB" : "#D97706"}
          className="anim"
          style={{ animation: "var(--animate-drip)", animationDelay: `${i * 0.35}s` }}
        />
      ))}
      {/* liquid outlets */}
      <path d="M120 120 V146" {...stroke} />
      <path d="M200 120 V146" {...stroke} />
      <text x="300" y="30" className={label}>GAS</text>
      <text x="96" y="145" className={label} textAnchor="end">NGL</text>
      <text x="224" y="145" className={label}>H₂O</text>
    </svg>
  );
}

function DewPoint() {
  return (
    <svg viewBox="0 0 340 150" className="h-full w-full">
      {/* exchanger coil */}
      <rect x="20" y="30" width="120" height="90" rx="10" fill="#FFFFFF" stroke="#C9D1DD" strokeWidth="1.5" />
      <path
        d="M30 50 H130 V70 H30 V90 H130 V110 H40"
        fill="none"
        stroke="#0891B2"
        strokeWidth="2"
        className="anim flow-dash"
      />
      {/* snowflake / chill */}
      <g className="anim origin-[80px_18px]" style={{ animation: "var(--animate-spin-slow)" }} stroke="#60A5FA" strokeWidth="1.4">
        <line x1="80" y1="10" x2="80" y2="26" />
        <line x1="73" y1="14" x2="87" y2="22" />
        <line x1="73" y1="22" x2="87" y2="14" />
      </g>
      {/* temperature curve */}
      <path d="M160 40 C200 40 210 110 250 112 S310 115 330 115" fill="none" stroke="#E6EBF2" strokeWidth="6" />
      <path
        d="M160 40 C200 40 210 110 250 112 S310 115 330 115"
        fill="none"
        stroke="url(#temp-g)"
        strokeWidth="2"
        className="anim"
        strokeDasharray="220"
        style={{ animation: "draw-curve 2.4s ease-in-out infinite" }}
      />
      <defs>
        <linearGradient id="temp-g" x1="0" x2="1">
          <stop offset="0" stopColor="#D97706" />
          <stop offset="1" stopColor="#0891B2" />
        </linearGradient>
      </defs>
      <text x="160" y="30" className={label}>38 °C</text>
      <text x="300" y="134" className={label} textAnchor="end">−5 °C · HCDP</text>
      {/* condensate */}
      {[230, 260, 290].map((x, i) => (
        <circle key={x} cx={x} cy="90" r="2.2" fill="#D97706" className="anim" style={{ animation: "var(--animate-drip)", animationDelay: `${i * 0.5}s` }} />
      ))}
      <style>{`@keyframes draw-curve{0%{stroke-dashoffset:220}60%,100%{stroke-dashoffset:0}}`}</style>
    </svg>
  );
}

export default function ServiceDiagram({ kind }: { kind: Service["key"] }) {
  return (
    <div className="diagram h-full w-full" aria-hidden>
      {kind === "compression" && <Compression />}
      {kind === "extraction" && <Extraction />}
      {kind === "dewpoint" && <DewPoint />}
    </div>
  );
}
