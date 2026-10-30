"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import GlowCard from "@/components/ui/GlowCard";
import ServiceDiagram from "@/components/diagrams/ServiceDiagram";
import { Arrow } from "./Navbar";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Desktop: the section pins and the card track scrolls horizontally with
 * vertical scroll (GSAP ScrollTrigger, scrubbed). Mobile: plain vertical stack.
 */
export default function Solutions() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(barRef.current, { scaleX: self.progress }),
          },
        });
      });
      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <section id="solutions" className="relative bg-ink">
      <div ref={pinRef} className="relative overflow-hidden lg:h-screen">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />

        <div
          ref={trackRef}
          className="relative flex flex-col gap-6 px-6 py-24 md:px-10 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:py-0 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-[12vw]"
        >
          {/* Intro panel */}
          <div className="flex shrink-0 flex-col justify-center lg:w-[min(36vw,520px)] lg:pr-10">
            <SectionLabel index="02">Core Solutions</SectionLabel>
            <SplitText
              text="Three systems. One continuous value chain."
              highlight={["value", "chain."]}
              className="mt-6 font-display text-[clamp(2.2rem,4.2vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]"
            />
            <p className="mt-6 max-w-md text-muted">
              From the wellhead to the sales line, our solutions capture, compress, condition and commercialise
              every stream your field produces.
            </p>
            <div className="mt-10 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dim lg:flex">
              Scroll to explore <Arrow className="text-cyan" />
            </div>
          </div>

          {services.map((s) => (
            <GlowCard
              key={s.id}
              as="article"
              className="flex shrink-0 flex-col overflow-hidden rounded-3xl bg-surface lg:w-[min(46vw,620px)]"
            >
              {/* Diagram */}
              <div className="relative h-44 border-b border-line bg-ink-2 px-6 py-5 md:h-52">
                <div className="absolute top-4 left-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                  Schematic · {s.kicker}
                </div>
                <div className="absolute top-4 right-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-ok">●</span> Running
                </div>
                <div className="h-full pt-5">
                  <ServiceDiagram kind={s.key} />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-cyan">{s.id} / 03</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{s.kicker}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-medium leading-tight tracking-tight md:text-[1.75rem]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.summary}</p>

                <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                  {s.specs.map((spec) => (
                    <div key={spec.label} className="bg-surface px-4 py-3 transition-colors group-hover:bg-surface-2">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">{spec.label}</dt>
                      <dd className="mt-1 text-sm text-fg">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-5 space-y-1.5 text-sm text-muted">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <span className="h-px w-3 bg-cyan" /> {p}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-fg transition-colors hover:text-cyan"
                >
                  Discuss this solution <Arrow className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Pin progress */}
        <div className="absolute inset-x-0 bottom-10 mx-auto hidden h-px max-w-7xl bg-line px-10 lg:block">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-blue to-cyan" />
        </div>
      </div>
    </section>
  );
}
