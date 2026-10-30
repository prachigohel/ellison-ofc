type Props = { index: string; children: React.ReactNode; className?: string };

/** Mono "03 / Technology" eyebrow used at the top of every section. */
export default function SectionLabel({ index, children, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted ${className}`}>
      <span className="text-cyan">{index}</span>
      <span className="h-px w-8 bg-line-2" />
      <span>{children}</span>
    </div>
  );
}
