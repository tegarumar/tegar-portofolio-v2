import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PostList } from "@/components/blog/post-list";
import { CopyEmail } from "@/components/home/copy-email";
import { WorkList } from "@/components/home/work-list";
import { ProjectMedia } from "@/components/project/project-media";
import { Section } from "@/components/section";
import { DATA } from "@/data/resume";
import { getPublishedPosts } from "@/lib/blog/queries";

export const revalidate = 86400;

const featured = DATA.projects.filter((project) => project.featured);

export default async function Home() {
  const posts = await getPublishedPosts(3);

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="space-y-6">
        <div className="space-y-3">
          <h1 className="animate-enter text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            {DATA.name}
          </h1>
          <p className="animate-enter text-muted [animation-delay:60ms]">
            {DATA.role}
          </p>
        </div>
        <p className="animate-enter flex items-center gap-2.5 text-[15px] text-muted [animation-delay:120ms]">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inset-0 animate-breathe rounded-full bg-gold motion-reduce:hidden" />
            <span className="relative size-2 rounded-full bg-gold" />
          </span>
          {DATA.now.join(" · ")}
        </p>
        <div className="animate-enter space-y-4 [animation-delay:180ms]">
          {DATA.summary}
        </div>
      </section>

      <Section id="work" title="Work">
        <WorkList jobs={DATA.work} />
      </Section>

      <Section
        id="projects"
        title="Projects"
        action={
          <Link
            href="/projects"
            className="label transition-colors duration-300 ease-out-expo hover:text-foreground"
          >
            All projects →
          </Link>
        }
      >
        <ul className="-mx-3">
          {featured.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                scroll={false}
                className="group flex items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors duration-300 ease-out-expo hover:bg-hover"
              >
                <ProjectMedia
                  project={project}
                  radius={10}
                  sizes="64px"
                  className="h-11 w-16"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-foreground">
                    {project.title}
                  </span>
                  <span className="block truncate text-[15px] text-muted">
                    {project.technologies.slice(0, 3).join(" · ")}
                  </span>
                </span>
                <ArrowUpRightIcon
                  aria-hidden
                  className="size-4 shrink-0 text-muted opacity-0 transition-opacity duration-300 ease-out-expo group-hover:opacity-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {posts.length > 0 && (
        <Section
          id="writing"
          title="Writing"
          action={
            <Link
              href="/blog"
              className="label transition-colors duration-300 ease-out-expo hover:text-foreground"
            >
              All posts →
            </Link>
          }
        >
          <PostList posts={posts} />
        </Section>
      )}

      <Section id="stack" title="Stack">
        <ul className="flex flex-wrap gap-1.5">
          {DATA.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-surface px-3 py-1 text-[14px] text-body shadow-soft"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" title="Education">
        <ul className="-mx-3">
          {DATA.education.map((school) => (
            <li key={school.school}>
              <a
                href={school.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors duration-300 ease-out-expo hover:bg-hover"
              >
                <Image
                  src={school.logoUrl}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0 rounded-full border bg-white object-contain"
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-foreground">
                    {school.school}
                  </span>
                  <span className="block text-[15px] text-muted">
                    {school.degree}
                  </span>
                </span>
                <span className="label hidden sm:block">
                  {school.start} — {school.end === "Present" ? "Now" : school.end}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" title="Contact">
        <div className="space-y-5">
          <p>
            Got a question, or want to work together? Drop me a message on{" "}
            <a
              className="link"
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>{" "}
            and I&apos;ll get back to you as soon as I can.
          </p>
          {DATA.contact.email && <CopyEmail email={DATA.contact.email} />}
        </div>
      </Section>
    </div>
  );
}
