import { pillars } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";
import Gauge from "@/components/ui/Gauge";

const icons = [
  // Reliability: shield
  <path key="r" d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z M8.5 12l2.5 2.5 4.5-5" />,
  // Environment: leaf
  <path key="e" d="M5 19c0-8 6-13 15-14-1 9-6 15-14 15 M5 19c3-4 6-6 10-8" />,
  // Expertise: gear
  <path key="x" d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M12 2v3 M12 19v3 M2 12h3 M19 12h3 M4.9 4.9 7 7 M17 17l2.1 2.1 M4.9 19.1 7 17 M17 7l2.1-2.1" />,
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink-2 py-28 md:py-36">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-blue/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <SectionLabel index="01">About Ellison</SectionLabel>
            <SplitText
              text="Reliability engineered into every stage of the gas value chain."
              highlight={["Reliability"]}
              className="mt-6 font-display text-[clamp(2.2rem,4.4vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl leading-relaxed text-muted">
                Ellison Oil Field Services Pvt. Ltd. is an Ahmedabad-based oil and gas processing partner specialising in
                gas compression and by-product recovery. We help operators monetise gas that would otherwise be flared or
                vented, with field systems designed for continuous duty, strict safety and measurable environmental gains.
              </p>
            </Reveal>

            {/* Ops snapshot */}
            <Reveal delay={0.2}>
              <div className="mt-12 rounded-2xl border border-line bg-surface/60 p-6">
                <div className="mb-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  <span>Operations Snapshot</span>
                  <span className="text-dim">Illustrative</span>
                </div>
                <div className="grid grid-cols-3 justify-items-center gap-2">
                  <Gauge value={0.22} reading="4.2 bar" label="Suction" size={150} color="#2563EB" />
                  <Gauge value={0.86} reading="212 bar" label="Discharge" size={150} />
                  <Gauge value={0.38} reading="−4.8 °C" label="HCDP" size={150} color="#D97706" />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-4 lg:pt-28">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="group flex gap-5 rounded-2xl border border-line bg-surface/40 p-6 transition-colors duration-500 hover:border-cyan/40 hover:bg-surface">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-ink text-cyan transition-shadow duration-500 group-hover:shadow-[0_0_24px_-4px_rgba(8,145,178,0.6)]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {icons[i]}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
