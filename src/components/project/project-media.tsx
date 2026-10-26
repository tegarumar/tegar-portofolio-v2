"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { Project } from "@/data/resume";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ProjectMedia({
  project,
  radius,
  sizes,
  className,
}: {
  project: Pick<Project, "slug" | "title" | "image" | "video">;
  radius: number;
  sizes: string;
  className?: string;
}) {
  return (
    <motion.div
      layoutId={`project-media-${project.slug}`}
      transition={spring}
      style={{ borderRadius: radius }}
      className={cn("relative shrink-0 overflow-hidden bg-hover", className)}
    >
      {project.video ? (
        <video
          src={project.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={project.title}
          className="absolute inset-0 size-full object-cover object-top"
        />
      ) : project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      ) : null}
    </motion.div>
  );
}
