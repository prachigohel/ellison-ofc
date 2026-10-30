"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { metrics } from "@/lib/content";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import Counter from "@/components/ui/Counter";
import { Arrow } from "./Navbar";

const GasFlowCanvas = dynamic(() => import("@/components/canvas/GasFlowCanvas"), { ssr: false });

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay },
});

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background: particle flow + vignette + grid */}
      <div className="absolute inset-0">
        <GasFlowCanvas />
        <div className="pointer-events-none absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_0%,rgba(247,249,252,0.35)_60%,#F7F9FC_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 pb-10 md:px-10">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-4xl">
            <motion.div {...fade(0.1)} className="mb-8 inline-flex items-center gap-3 rounded-full border border-line bg-ink/60 px-4 py-2 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ok" />
                <span className="relative h-2 w-2 rounded-full bg-ok" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Gas Processing & Energy Solutions · Ahmedabad
              </span>
            </motion.div>

            <SplitText
              as="h1"
              immediate
              delay={0.2}
              text="Engineering High-Efficiency Gas Compression & By-Product Recovery"
              highlight={["Compression", "Recovery"]}
              className="font-display text-[clamp(2.5rem,5.4vw,5rem)] font-medium leading-[0.98] tracking-[-0.035em]"
            />

            <motion.p {...fade(0.9)} className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Ellison Oil Field Services turns stranded, low-pressure field gas into high-pressure marketable
              energy, and recovers every valuable liquid and mineral along the way.
            </motion.p>

            <motion.div {...fade(1.05)} className="pointer-events-auto mt-8 flex flex-wrap gap-4">
              <MagneticButton href="#contact">
                Request Consultation <Arrow />
              </MagneticButton>
              <MagneticButton href="#solutions" variant="ghost">
                Explore Solutions
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Metric counters */}
      <motion.div {...fade(1.3)} className="relative z-10 border-t border-line/80 bg-ink/40 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={m.label} className={`px-6 py-7 md:px-10 ${i > 0 ? "md:border-l" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} border-line/80`}>
              <div className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                {typeof m.value === "number" ? <Counter to={m.value} decimals={m.decimals} suffix={m.suffix} /> : <span className="text-gradient">{m.value}</span>}
              </div>
              <div className="mt-2 text-sm text-fg">{m.label}</div>
              <p className="mt-1 text-xs text-dim">{m.note}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
