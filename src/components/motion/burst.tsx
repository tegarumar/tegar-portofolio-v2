"use client";

import { motion, useReducedMotion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";

const PARTICLES = 12;
const COLORS = ["var(--accent-soft)", "var(--gold)", "#44c67f", "#f966ac"];

export function Burst({ trigger }: { trigger: number }) {
  const reduce = useReducedMotion();
  if (!trigger || reduce) return null;

  return (
    <span
      key={trigger}
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {Array.from({ length: PARTICLES }, (_, i) => {
        const angle = (i / PARTICLES) * Math.PI * 2;
        const distance = 34 + (i % 3) * 10;
        return (
          <motion.span
            key={i}
            className="absolute size-1.5 rounded-full"
            style={{ backgroundColor: COLORS[i % COLORS.length] }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0.4,
            }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          />
        );
      })}
    </span>
  );
}
