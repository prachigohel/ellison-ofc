"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  strength?: number;
  className?: string;
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-cyan text-white shadow-[0_0_40px_-8px_rgba(8,145,178,0.7)] hover:bg-blue hover:shadow-[0_0_50px_-6px_rgba(8,145,178,0.9)]",
  ghost: "border border-line-2 bg-white/60 text-fg hover:border-cyan/60 hover:text-cyan",
};

const sizes = { md: "h-12 px-6 text-sm", sm: "h-10 px-5 text-[13px]" };

/** Button that is pulled toward the cursor; its label drifts a little further for depth. */
export default function MagneticButton({
  children,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  strength = 0.35,
  className = "",
  disabled,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 16, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const lx = useTransform(sx, (v) => v * 0.4);
  const ly = useTransform(sy, (v) => v * 0.4);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-[background-color,color,border-color,box-shadow] duration-300 disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;
  const label = (
    <motion.span style={{ x: lx, y: ly }} className="relative inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className="inline-block">
      {href ? (
        <a href={href} className={cls}>
          {label}
        </a>
      ) : (
        <button type={type} className={cls} disabled={disabled}>
          {label}
        </button>
      )}
    </motion.div>
  );
}
