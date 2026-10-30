/** Placeholder brand mark: hexagonal vessel with three compressed flow lines. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0891B2" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <path d="M16 2 28 9v14l-12 7-12-7V9z" fill="none" stroke="url(#logo-g)" strokeWidth="1.8" />
        <path d="M8 12.5c4 0 6 2 8 2s4-2 8-2M8 16c4 0 6 1.4 8 1.4S20 16 24 16M8 19.5c4 0 6 .8 8 .8s4-.8 8-.8" fill="none" stroke="#0D1420" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-semibold tracking-[0.18em]">ELLISON</span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-muted">Oil Field Services</span>
      </span>
    </span>
  );
}
