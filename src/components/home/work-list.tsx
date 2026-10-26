"use client";

import { ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Job = {
  company: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
};

const year = (date: string) => (date === "Present" ? "Now" : date.slice(-4));

export function WorkList({ jobs }: { jobs: readonly Job[] }) {
  const [openCompany, setOpenCompany] = useState<string | null>(null);

  return (
    <ul className="-mx-3">
      {jobs.map((job) => {
        const open = openCompany === job.company;
        const panelId = `work-${job.company.replace(/\W+/g, "-").toLowerCase()}`;
        return (
          <li key={job.company}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenCompany(open ? null : job.company)}
              className="group flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors duration-300 ease-out-expo hover:bg-hover"
            >
              <Image
                src={job.logoUrl}
                alt=""
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full border bg-white object-contain"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-foreground">
                  {job.company}
                </span>
                <span className="block text-[15px] text-muted">{job.title}</span>
              </span>
              <span className="label hidden sm:block">
                {year(job.start)} — {year(job.end)}
              </span>
              <ChevronDownIcon
                aria-hidden
                className={cn(
                  "size-4 shrink-0 text-muted transition-transform duration-500 ease-out-expo",
                  open && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={spring}
                >
                  <div className="space-y-2 pb-4 pl-[4.25rem] pr-3 pt-1 text-[15px]">
                    <p className="label sm:hidden">
                      {year(job.start)} — {year(job.end)}
                    </p>
                    <p>{job.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
