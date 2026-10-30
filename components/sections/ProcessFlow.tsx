"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { processSteps } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";

/**
 * Scroll-scrubbed process diagram. The section is 300vh tall with a sticky
 * viewport; scroll progress fills the pipeline, lights up each stage and
 * drives the live pressure/temperature readouts.
 */
export default function ProcessFlow() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(processSteps.length - 1, Math.floor(v * processSteps.length)));
  });

  // Pipe fills node-to-node: node centres sit at 12.5%, 37.5%, 62.5%, 87.5%.
  const fill = useTransform(progress, [0, 1], [0.125, 0.875]);
  const pressure = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [2, 85, 210, 205, 210]);
  const temp = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [38, 45, 45, -5, 30]);
  const pressureText = useTransform(pressure, (v) => v.toFixed(0));
  const tempText = useTransform(temp, (v) => v.toFixed(1));

  const step = processSteps[active];

  return (
    <section id="technology" ref={ref} className="relative h-[300vh] bg-ink-2">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(37,99,235,0.09),transparent_60%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel index="03">Process Technology</SectionLabel>
              <SplitText
                text="From raw field gas to pipeline-grade energy."
                highlight={["pipeline-grade"]}
                className="mt-5 max-w-3xl font-display text-[clamp(2rem,4vw,3.6rem)] font-medium leading-[1.03] tracking-[-0.03em]"
              />
            </div>

            {/* Live readouts */}
            <div className="flex gap-3 font-mono">
              <Readout label="Pressure" unit="bar">
                <motion.span>{pressureText}</motion.span>
              </Readout>
              <Readout label="Temp" unit="°C">
                <motion.span>{tempText}</motion.span>
              </Readout>
            </div>
          </div>

          {/* Pipeline */}
          <div className="relative mt-16 md:mt-24">
            <div className="absolute top-7 right-0 left-0 h-[6px] -translate-y-1/2 overflow-hidden rounded-full bg-line md:top-9">
              <motion.div
                className="h-full origin-left overflow-hidden rounded-full bg-gradient-to-r from-blue via-cyan to-amber"
                style={{ scaleX: fill }}
              >
                <div className="pipe-flow h-full w-full opacity-40 mix-blend-overlay" />
              </motion.div>
            </div>

            <ol className="relative grid grid-cols-4">
              {processSteps.map((s, i) => {
                const on = i <= active;
                return (
                  <li key={s.id} className="flex flex-col items-center text-center">
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full border bg-ink font-mono text-sm transition-all duration-500 md:h-[72px] md:w-[72px] ${
                        on ? "border-cyan text-cyan shadow-[0_0_30px_-4px_rgba(8,145,178,0.6)]" : "border-line-2 text-dim"
                      }`}
                    >
                      {i === active && <span className="absolute inset-0 animate-pulse-ring rounded-full border border-cyan" />}
                      {s.id}
                    </div>
                    <div className={`mt-4 hidden text-sm transition-colors duration-500 sm:block md:text-base ${on ? "text-fg" : "text-dim"}`}>
                      {s.title}
                    </div>
                    <div className="mt-1 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-dim sm:block">{s.sub}</div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Active step detail */}
          <div className="relative mt-12 min-h-[190px] md:mt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-6 rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:p-8"
              >
                <div className="font-display text-6xl font-medium text-outline md:text-7xl">{step.id}</div>
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight">
                    {step.title} <span className="text-muted">· {step.sub}</span>
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{step.body}</p>
                </div>
                <div className="flex gap-6 font-mono text-xs md:flex-col md:gap-2 md:text-right">
                  <div>
                    <span className="text-dim">P </span>
                    <span className="text-cyan">{step.pressure}</span>
                  </div>
                  <div>
                    <span className="text-dim">T </span>
                    <span className="text-amber">{step.temp}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Readout({ label, unit, children }: { label: string; unit: string; children: React.ReactNode }) {
  return (
    <div className="min-w-[120px] rounded-xl border border-line bg-surface/70 px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-dim">{label}</div>
      <div className="mt-1 text-2xl text-fg tabular-nums">
        {children}
        <span className="ml-1 text-xs text-muted">{unit}</span>
      </div>
    </div>
  );
}
