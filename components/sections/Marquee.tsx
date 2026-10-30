import { marquee } from "@/lib/content";

/** Infinite ticker of capabilities between hero and solutions. */
export default function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2 py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-medium tracking-tight text-dim md:text-3xl">
            {item}
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-cyan" aria-hidden>
              <path d="M5 0 10 5 5 10 0 5z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
