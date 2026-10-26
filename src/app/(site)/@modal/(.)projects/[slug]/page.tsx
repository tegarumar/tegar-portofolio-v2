import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project/project-detail";
import { ProjectTray } from "@/components/project/project-tray";
import { DATA, getProject } from "@/data/resume";

export const dynamicParams = false;

export function generateStaticParams() {
  return DATA.projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <ProjectTray title={project.title} description={project.description}>
      <ProjectDetail project={project} />
    </ProjectTray>
  );
}
