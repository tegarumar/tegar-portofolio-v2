"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { softSpring } from "@/lib/motion";

export function MorphText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const seen: Record<string, number> = {};
  const letters = Array.from(text).map((char) => {
    seen[char] = (seen[char] ?? 0) + 1;
    return { char, key: `${char}-${seen[char]}` };
  });

  return (
    <span className={cn("relative inline-flex", className)}>
      <span className="sr-only">{text}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        {letters.map(({ char, key }) => (
          <motion.span
            key={key}
            layout="position"
            aria-hidden
            className="inline-block whitespace-pre"
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(2px)" }}
            transition={softSpring}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
