import { DATA } from "@/data/resume";
import { ProjectCard } from "@/components/project-card";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="px-6 sm:px-10 md:px-12 py-10 md:py-14">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className="p-5 sm:p-6 mb-8"
          style={{
            border: "2px solid #000",
            boxShadow: "6px 6px 0 #000",
            backgroundColor: "#a9d6b7",
          }}
        >
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2">
            My Projects
          </h1>
          <p className="font-bold text-sm sm:text-base max-w-xl">
            From simple websites to complex web applications — here&apos;s what
            I&apos;ve built.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {DATA.projects.map((project) => (
            <ProjectCard
              key={project.title}
              href={project.href}
              title={project.title}
              description={project.description}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
