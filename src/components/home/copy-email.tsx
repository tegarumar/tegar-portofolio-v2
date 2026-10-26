"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Burst } from "@/components/motion/burst";
import { MorphText } from "@/components/motion/morph-text";
import { spring } from "@/lib/motion";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(0);
  const timeout = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  async function copy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setBurst((n) => n + 1);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.button
      type="button"
      layout
      transition={spring}
      onClick={copy}
      style={{ borderRadius: 999 }}
      className="relative inline-flex h-10 items-center gap-2 bg-foreground px-4 text-[15px] font-medium text-background active:scale-[0.97]"
    >
      <Burst trigger={burst} />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          layout="position"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={spring}
        >
          {copied ? (
            <CheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
        </motion.span>
      </AnimatePresence>
      <MorphText text={copied ? "Copied" : "Copy email"} />
    </motion.button>
  );
}
