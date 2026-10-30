"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vy: number;
  lane: number;
  offset: number;
  speed: number;
  size: number;
  hot: boolean;
};

const LANES = 9;
const BLUE = [37, 99, 235];
const CYAN = [8, 145, 178];
const AMBER = [217, 119, 6];

/**
 * Canvas 2D gas-flow field. Particles travel along sinusoidal streamlines
 * that converge left -> right, a visual metaphor for low-pressure intake
 * becoming a compressed high-pressure stream. The cursor parts the flow.
 */
export default function GasFlowCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let time = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    // Streamline centre for a lane at horizontal position x.
    const laneY = (lane: number, x: number) => {
      const p = Math.min(Math.max(x / w, 0), 1);
      const spread = 1 - 0.78 * Math.pow(p, 1.3); // converge toward the right
      const base = h * 0.52 + (lane / (LANES - 1) - 0.5) * h * 0.78 * spread;
      const wave = Math.sin(x * 0.0035 + lane * 0.8 + time * 0.55) * h * 0.04 * spread;
      return base + wave + Math.sin(x * 0.012 - time * 1.1 + lane) * 4;
    };

    const spawn = (p: Partial<Particle> = {}): Particle => ({
      x: -20 - Math.random() * w * 0.2,
      y: 0,
      vy: 0,
      lane: Math.floor(Math.random() * LANES),
      offset: (Math.random() - 0.5) * 26,
      speed: 0.6 + Math.random() * 1.1,
      size: Math.random() < 0.08 ? 2.2 : 0.6 + Math.random() * 1.2,
      hot: Math.random() < 0.06,
      ...p,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.round((w * h) / 4200), 420);
      particles = Array.from({ length: count }, () => {
        const p = spawn();
        p.x = Math.random() * w;
        p.y = laneY(p.lane, p.x) + p.offset;
        return p;
      });
      ctx.fillStyle = "#F7F9FC";
      ctx.fillRect(0, 0, w, h);
    };

    const frame = () => {
      time += 0.016;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      // Motion-blur trails: fade previous frame instead of clearing.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(247, 249, 252, 0.14)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      for (const p of particles) {
        const prog = Math.min(Math.max(p.x / w, 0), 1);
        const px = p.x;
        const py = p.y;

        // Gas accelerates as it is compressed.
        p.x += p.speed * (1 + prog * 2.2);
        const target = laneY(p.lane, p.x) + p.offset * (1 - prog * 0.7);
        p.vy += (target - p.y) * 0.02;

        // Cursor: radial push plus a tangential swirl.
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const R = 140;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / R) * 2.4;
          p.vy += (dy / d) * f * 2;
          p.x += (dx / d) * f - (dy / d) * f * 0.6;
        }

        p.vy *= 0.86;
        p.y += p.vy;

        const c = p.hot ? AMBER : BLUE.map((b, i) => b + (CYAN[i] - b) * prog);
        const alpha = (p.hot ? 1 : 0.6 + prog * 0.4) * Math.min(1, (p.x + 20) / 80);
        ctx.strokeStyle = `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${alpha})`;
        ctx.lineWidth = p.size * 1.25;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        if (p.x > w + 20) Object.assign(p, spawn());
      }

      if (visible && !reduce) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (mouse.x < -999) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    };
    const onLeave = () => {
      mouse.tx = mouse.ty = -9999;
      mouse.x = mouse.y = -9999;
    };

    // Pause rendering while the hero is off screen.
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(frame);
    });

    resize();
    if (reduce) {
      for (let i = 0; i < 60; i++) frame(); // draw a settled still frame
    } else {
      raf = requestAnimationFrame(frame);
    }
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden />;
}
