"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gallery, type GalleryItem } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";
import EquipmentIcon from "@/components/diagrams/EquipmentIcon";

const filters = ["All", "Field Sites", "Equipment", "Operations"] as const;
type Filter = (typeof filters)[number];

const spanClass = { wide: "sm:col-span-2", tall: "sm:row-span-2" } as const;

/** Filterable bento gallery with a keyboard-navigable lightbox. */
export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <section id="gallery" className="relative bg-ink-2 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <SectionLabel index="05">Gallery</SectionLabel>
            <SplitText
              text="Inside our sites and workshops."
              highlight={["sites"]}
              className="mt-5 font-display text-[clamp(2rem,4vw,3.6rem)] font-medium leading-[1.03] tracking-[-0.03em]"
            />
          </div>
          <Reveal>
            <div className="flex flex-wrap gap-2 md:justify-end" role="tablist" aria-label="Filter gallery">
              {filters.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                    filter === f
                      ? "border-cyan bg-cyan text-white"
                      : "border-line-2 bg-surface text-muted hover:border-cyan/60 hover:text-cyan"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.ul layout className="mt-14 grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.li
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={item.span ? spanClass[item.span] : ""}
              >
                <button
                  onClick={() => setOpen(i)}
                  className="group relative block h-full w-full overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-[0_1px_2px_rgba(13,20,32,0.04)] transition-shadow duration-500 hover:shadow-[0_20px_40px_-20px_rgba(13,20,32,0.25)]"
                >
                  <Photo item={item} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d1420]/80 via-[#0d1420]/30 to-transparent p-5 pt-16">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">{item.category}</div>
                    <div className="mt-1 font-display text-lg font-medium tracking-tight text-white">{item.title}</div>
                  </div>
                  <span className="absolute top-4 right-4 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white/90 text-fg opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                      <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" />
                    </svg>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {open !== null && items[open] && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d1420]/85 p-4 backdrop-blur-sm md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal
            aria-label={items[open].title}
          >
            <motion.figure
              key={items[open].src}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-surface"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10]">
                <Photo item={items[open]} />
              </div>
              <figcaption className="flex items-center justify-between gap-4 border-t border-line p-5">
                <div>
                  <div className="font-display text-lg font-medium tracking-tight">{items[open].title}</div>
                  <div className="mt-1 font-mono text-xs text-muted">
                    {items[open].location} · {items[open].category}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="mr-2 font-mono text-xs text-dim">
                    {open + 1} / {items.length}
                  </span>
                  <LightboxButton label="Previous" onClick={() => step(-1)} d="M10 3 5 8l5 5" />
                  <LightboxButton label="Next" onClick={() => step(1)} d="M6 3l5 5-5 5" />
                  <LightboxButton label="Close" onClick={() => setOpen(null)} d="M4 4l8 8M12 4l-8 8" />
                </div>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/** Real photo when present in /public/gallery, otherwise a schematic placeholder. */
function Photo({ item, className = "" }: { item: GalleryItem; className?: string }) {
  const [missing, setMissing] = useState(false);
  const img = useRef<HTMLImageElement>(null);

  // onError can fire before hydration; catch images that already failed.
  useEffect(() => {
    const el = img.current;
    if (el?.complete && el.naturalWidth === 0) setMissing(true);
  }, []);

  if (missing) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br from-[#e6f4f8] via-surface to-[#e8eefb] grid-bg ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center p-10 pb-20 text-cyan/70">
          <div className="h-full max-h-40 w-full max-w-60">
            <EquipmentIcon kind={item.icon} />
          </div>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={img}
      src={item.src}
      alt={`${item.title}, ${item.location}`}
      loading="lazy"
      onError={() => setMissing(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}

function LightboxButton({ label, onClick, d }: { label: string; onClick: () => void; d: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-fg transition-colors hover:border-cyan hover:text-cyan"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d={d} />
      </svg>
    </button>
  );
}
