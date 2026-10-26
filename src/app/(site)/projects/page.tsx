import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ProjectMedia } from "@/components/project/project-media";
import { DATA } from "@/data/resume";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Tegar has built at work and on the side.",
};

export default function Projects() {
  return (
    <>
      <header className="space-y-3">
        <h1 className="animate-enter text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
          Projects
        </h1>
        <p className="animate-enter text-muted [animation-delay:80ms]">
          Things I&apos;ve built at work and on the side, from AI products to
          small browser games.
        </p>
      </header>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {DATA.projects.map((project, i) => (
          <li key={project.slug}>
            <Reveal delay={(i % 2) * 0.06} className="h-full">
              <Link
                href={`/projects/${project.slug}`}
                scroll={false}
                className="group block h-full rounded-card bg-surface p-2 shadow-soft transition-shadow duration-500 ease-out-expo hover:shadow-lift"
              >
                <ProjectMedia
                  project={project}
                  radius={18}
                  sizes="(min-width: 640px) 290px, 100vw"
                  className="aspect-[16/10] w-full"
                />
                <div className="px-3 pb-3 pt-3.5">
                  <p className="font-medium text-foreground">{project.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-[15px] leading-snug text-muted">
                    {project.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </>
  );
}
