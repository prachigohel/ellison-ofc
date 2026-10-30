"use client";

import { useRef } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & { as?: React.ElementType };

/** Card whose 1px border lights up around the cursor (styles in globals.css `.glow-card`). */
export default function GlowCard({ as: Tag = "div", className = "", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag ref={ref} onMouseMove={onMove} className={`glow-card group ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
