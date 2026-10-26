import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project/project-detail";
import { DATA, getProject } from "@/data/resume";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DATA.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <article className="space-y-6">
      <Link
        href="/projects"
        className="label inline-flex items-center gap-1.5 transition-colors duration-300 ease-out-expo hover:text-foreground"
      >
        <ArrowLeftIcon className="size-3.5" />
        All projects
      </Link>
      <h1 className="animate-enter text-[2rem] font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {project.title}
      </h1>
      <div className="animate-enter [animation-delay:80ms]">
        <ProjectDetail project={project} />
      </div>
    </article>
  );
}
