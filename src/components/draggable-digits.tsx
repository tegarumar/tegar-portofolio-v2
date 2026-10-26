"use client";

import { motion, useReducedMotion } from "motion/react";

export function DraggableDigits({ text }: { text: string }) {
  const reduce = useReducedMotion();

  return (
    <p
      aria-label={text}
      className="flex select-none text-[7rem] font-semibold leading-none tracking-[-0.06em] text-foreground sm:text-[9rem]"
    >
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block cursor-grab active:cursor-grabbing"
          initial={reduce ? false : { y: -80, opacity: 0, rotate: -12 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{
            type: "spring",
            bounce: 0.5,
            duration: 0.9,
            delay: 0.1 + i * 0.08,
          }}
          drag={!reduce}
          dragSnapToOrigin
          dragTransition={{ bounceStiffness: 300, bounceDamping: 12 }}
          whileDrag={{ scale: 1.08, rotate: i % 2 ? 8 : -8 }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  );
}
