"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";
import { softSpring } from "@/lib/motion";

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

export function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      }).format(Date.now()),
    () => null
  );

  return (
    <span className="inline-flex font-mono tabular-nums">
      <span className="sr-only">{time}</span>
      {(time ?? "--:--").split("").map((char, i) => (
        <RollingChar key={i} char={char} />
      ))}
    </span>
  );
}

function RollingChar({ char }: { char: string }) {
  const reduce = useReducedMotion();

  return (
    <span aria-hidden className="relative inline-block overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={char}
          className="inline-block"
          initial={{ y: reduce ? 0 : "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduce ? 0 : "-100%", opacity: 0 }}
          transition={softSpring}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
