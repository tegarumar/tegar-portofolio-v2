"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

type NavItem = { href: string; label: string };

export function NavPills({ items }: { items: readonly NavItem[] }) {
  const segment = useSelectedLayoutSegment();
  const current = segment ? `/${segment}` : "/";

  return (
    <nav aria-label="Main">
      <ul className="flex items-center gap-0.5 rounded-full bg-surface p-1 shadow-soft">
        {items.map((item) => {
          const active = item.href === current;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative block rounded-full px-3 py-1 text-[15px] transition-colors duration-300 ease-out-expo",
                  active ? "text-background" : "text-muted hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={spring}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
