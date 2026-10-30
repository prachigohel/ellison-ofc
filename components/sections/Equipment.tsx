import { equipment, standards } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import GlowCard from "@/components/ui/GlowCard";
import Reveal from "@/components/ui/Reveal";
import EquipmentIcon from "@/components/diagrams/EquipmentIcon";

export default function Equipment() {
  return (
    <section id="operations" className="relative bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <SectionLabel index="04">Equipment & Operations</SectionLabel>
            <SplitText
              text="Field-proven hardware, built to standard."
              highlight={["standard."]}
              className="mt-5 font-display text-[clamp(2rem,4vw,3.6rem)] font-medium leading-[1.03] tracking-[-0.03em]"
            />
          </div>
          <Reveal>
            <p className="max-w-md text-muted md:ml-auto">
              Modular, skid-mounted process equipment that deploys fast, scales with production and operates under
              continuous remote supervision.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((e, i) => (
            <Reveal key={e.title} delay={(i % 3) * 0.08}>
              <GlowCard className="h-full rounded-2xl bg-surface p-6 transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {e.tag}
                  </span>
                  <span className="font-mono text-xs text-dim">EQ-{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="relative my-6 h-36 rounded-xl border border-line bg-ink-2 p-6 text-dim transition-colors duration-500 grid-bg group-hover:text-cyan">
                  <EquipmentIcon kind={e.icon} />
                </div>
                <h3 className="font-display text-xl font-medium tracking-tight">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.body}</p>
                <dl className="mt-5 space-y-2 border-t border-line pt-4 font-mono text-xs">
                  {e.specs.map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <dt className="text-dim">{k}</dt>
                      <dd className="text-fg">{v}</dd>
                    </div>
                  ))}
                </dl>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-ink-2 p-6 md:flex-row md:items-center md:p-8">
            <div className="shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-muted md:w-48">
              Design & safety references
            </div>
            <ul className="flex flex-wrap gap-2">
              {standards.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-4 py-2 font-mono text-xs text-fg transition-colors hover:border-cyan/60 hover:text-cyan"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
