import { company, nav, services } from "@/lib/content";
import Logo from "@/components/ui/Logo";
import FooterWordmark from "@/components/ui/FooterWordmark";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2">
      <div className="mx-auto max-w-7xl px-6 pt-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Gas compression, by-product recovery and dew point conditioning for the oil & gas industry.
            </p>
          </div>
          <FooterCol title="Navigate">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-cyan">
                {n.label}
              </a>
            ))}
          </FooterCol>
          <FooterCol title="Solutions">
            {services.map((s) => (
              <a key={s.key} href="#solutions" className="hover:text-cyan">
                {s.kicker}
              </a>
            ))}
          </FooterCol>
          <FooterCol title="Office">
            {company.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${company.email}`} className="mt-2 text-fg hover:text-cyan">
              {company.email}
            </a>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-dim md:flex-row">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <a href="#" className="hover:text-cyan">
            Back to top ↑
          </a>
        </div>
      </div>

      {/* Oversized outlined wordmark */}
      <div className="relative mx-auto max-w-[1600px] px-4 pt-6 md:px-8">
        {/* Soft cyan horizon glow behind the mark */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(8,145,178,0.10),rgba(37,99,235,0.04)_40%,transparent_70%)]" />
        <FooterWordmark />
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">{title}</div>
      <div className="mt-4 flex flex-col gap-2 text-sm text-muted [&_a]:transition-colors">{children}</div>
    </div>
  );
}
