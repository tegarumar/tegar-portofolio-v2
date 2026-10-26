import type { Transition } from "motion/react";

export const easeOutExpo = [0.19, 1, 0.22, 1] as const;

export const spring: Transition = { type: "spring", bounce: 0.15, duration: 0.5 };

export const softSpring: Transition = { type: "spring", bounce: 0, duration: 0.4 };
