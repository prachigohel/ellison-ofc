"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { company, services } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { Arrow } from "./Navbar";

type Field = { name: string; label: string; type?: string; required?: boolean; autoComplete?: string };

const fields: Field[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name" },
  { name: "company", label: "Company", autoComplete: "organization" },
  { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
];

type Errors = Partial<Record<string, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

/** Returns an error message for a field, or "" when the value is valid. */
function validate(name: string, raw: string): string {
  const value = raw.trim();
  switch (name) {
    case "name":
      if (!value) return "Please enter your full name.";
      if (value.length < 2) return "Name must be at least 2 characters.";
      return "";
    case "email":
      if (!value) return "Please enter your work email address.";
      if (!EMAIL_RE.test(value)) return "Please enter a valid email address, e.g. name@company.com.";
      return "";
    case "phone":
      if (value && (!PHONE_RE.test(value) || value.replace(/\D/g, "").length < 7))
        return "Please enter a valid phone number, e.g. +91 98765 43210.";
      return "";
    case "message":
      if (!value) return "Please tell us a little about your project.";
      if (value.length < 10) return "Please add a few more details (at least 10 characters).";
      return "";
    default:
      return "";
  }
}

const VALIDATED = ["name", "email", "phone", "message"];

/**
 * Contact form. With no backend yet, submit opens the visitor's mail client
 * with a pre-filled enquiry to the company inbox. Swap `onSubmit` for an API
 * route or form service when one is available.
 */
export default function Contact() {
  const [interest, setInterest] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const toggle = (k: string) => setInterest((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  // Once a field has shown an error, re-check it live so the message clears as soon as it's fixed.
  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors((cur) => ({ ...cur, [name]: validate(name, value) }));
  };
  const onFieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (value.trim()) setErrors((cur) => ({ ...cur, [name]: validate(name, value) }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const next: Errors = {};
    for (const name of VALIDATED) {
      const msg = validate(name, get(name));
      if (msg) next[name] = msg;
    }
    setErrors(next);
    const firstInvalid = VALIDATED.find((n) => next[n]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      setSent(false);
      return;
    }

    const body = [
      `Name: ${get("name")}`,
      `Company: ${get("company")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Interested in: ${interest.join(", ") || "Not specified"}`,
      "",
      get("message"),
    ].join("\n");
    const subject = `Consultation request: ${get("company") || get("name")}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-28 md:py-36">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[480px] w-[900px] -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.1fr]">
        {/* Details */}
        <div>
          <SectionLabel index="06">Contact</SectionLabel>
          <SplitText
            text="Let's engineer your next gas recovery project."
            highlight={["gas", "recovery"]}
            className="mt-6 font-display text-[clamp(2.2rem,4.4vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-muted">
              Share your field conditions, gas volumes and objectives. Our engineering team will respond with a
              preliminary assessment.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 space-y-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Email</div>
                <a
                  href={`mailto:${company.email}`}
                  className="group mt-2 inline-flex items-center gap-3 font-display text-2xl tracking-tight transition-colors hover:text-cyan md:text-3xl"
                >
                  {company.email}
                  <Arrow className="h-5 w-5 -rotate-45 transition-transform group-hover:rotate-0" />
                </a>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Head Office</div>
                <address className="mt-2 leading-relaxed text-fg not-italic">
                  {company.address.map((l) => (
                    <div key={l}>{l}</div>
                  ))}
                </address>
                <a
                  href={company.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
                >
                  Open in Maps <Arrow />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.15}>
          <form
            noValidate
            onSubmit={onSubmit}
            className="rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur md:p-10"
          >
            <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {fields.map((f) => (
                <FloatingInput key={f.name} {...f} error={errors[f.name]} onChange={onFieldChange} onBlur={onFieldBlur} />
              ))}
            </div>

            <fieldset className="mt-6">
              <legend className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">I'm interested in</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {services.map((s) => {
                  const on = interest.includes(s.kicker);
                  return (
                    <button
                      type="button"
                      key={s.key}
                      aria-pressed={on}
                      onClick={() => toggle(s.kicker)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                        on
                          ? "border-cyan bg-cyan/10 text-cyan shadow-[0_0_20px_-6px_rgba(8,145,178,0.7)]"
                          : "border-line text-muted hover:border-line-2 hover:text-fg"
                      }`}
                    >
                      {s.kicker}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6">
              <FloatingInput
                name="message"
                label="Project details: location, gas volume, pressure"
                textarea
                required
                error={errors.message}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className={`text-xs ${hasErrors(errors) ? "text-danger" : sent ? "text-ok" : "text-dim"}`} aria-live="polite">
                {hasErrors(errors)
                  ? "Please fix the highlighted fields to send your enquiry."
                  : sent
                    ? "Your email app should open with the enquiry ready to send."
                    : "We typically reply within one business day."}
              </p>
              <MagneticButton type="submit">
                Send Enquiry <Arrow />
              </MagneticButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const hasErrors = (errors: Errors) => Object.values(errors).some(Boolean);

type InputProps = Field & {
  textarea?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function FloatingInput({ name, label, type = "text", required, autoComplete, textarea, error, onChange, onBlur }: InputProps) {
  const errorId = `${name}-error`;
  const cls = `peer block w-full border-0 border-b bg-transparent px-0 pt-6 pb-2 text-fg outline-none transition-colors placeholder:text-transparent ${
    error ? "border-danger/70" : "border-line focus:border-cyan"
  }`;
  const a11y = {
    name,
    placeholder: label,
    autoComplete,
    onChange,
    onBlur,
    "aria-required": required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className="py-2">
      <label className="relative block">
        {textarea ? (
          <textarea {...a11y} rows={4} className={`${cls} resize-none`} />
        ) : (
          <input {...a11y} type={type} className={cls} />
        )}
        <span
          className={`pointer-events-none absolute top-0 left-0 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:font-sans peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:font-mono peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] ${
            error ? "text-danger" : "text-dim peer-focus:text-cyan"
          }`}
        >
          {label}
          {required && <span className={error ? "text-danger" : "text-cyan"}> *</span>}
        </span>
        <span
          className={`absolute bottom-0 left-0 h-px w-full origin-left transition-transform duration-500 ${
            error ? "scale-x-100 bg-danger" : "scale-x-0 bg-cyan peer-focus:scale-x-100"
          }`}
        />
      </label>

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-2 overflow-hidden pt-2 text-xs text-danger"
          >
            <svg viewBox="0 0 16 16" className="mt-px h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <circle cx="8" cy="8" r="6.5" />
              <path d="M8 4.5v4M8 11v.01" strokeLinecap="round" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
