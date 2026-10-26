import { ArrowUpRightIcon } from "lucide-react";
import { Icons } from "@/components/icons";
import { ProjectMedia } from "@/components/project/project-media";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/resume";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="space-y-5">
      <ProjectMedia
        project={project}
        radius={16}
        sizes="(min-width: 640px) 464px, 100vw"
        className="aspect-[16/10] w-full"
      />
      <p className="text-body">{project.description}</p>
      <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
        {project.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-full border px-2.5 py-0.5 text-[13px] text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {project.links.map((link, i) => (
            <Button
              key={link.href}
              asChild
              variant={i === 0 ? "primary" : "secondary"}
            >
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.type === "GitHub" ? (
                  <Icons.github />
                ) : (
                  <ArrowUpRightIcon />
                )}
                {link.type === "GitHub" ? "View source" : "Visit website"}
              </a>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
