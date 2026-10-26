import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

export function Section({
  id,
  title,
  action,
  children,
}: {
  id: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <section id={id} aria-labelledby={`${id}-title`}>
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id={`${id}-title`} className="label">
            {title}
          </h2>
          {action}
        </div>
        {children}
      </section>
    </Reveal>
  );
}
