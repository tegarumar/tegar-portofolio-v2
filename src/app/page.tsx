import { DATA } from "@/data/resume";
import Link from "next/link";
import Image from "next/image";
import { ProjectCard } from "@/components/project-card";

const socialLinks = Object.entries(DATA.contact.social).filter(
  ([_, s]) => s.navbar,
);

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── TOP: TITLE ROW ────────────────────────────────────── */}
      <div
        className="px-6 sm:px-10 md:px-12 py-[1.26rem]"
        style={{ borderBottom: "3px solid #000" }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            {DATA.name}
          </h1>
          <p className="text-sm font-bold text-gray-600 mt-1 uppercase tracking-wider">
            {DATA.description}
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT: 2-col on desktop ────────────────────── */}
      <div
        className="flex flex-col lg:flex-row max-w-7xl mx-auto"
        style={{ borderBottom: "3px solid #000" }}
      >
        {/* LEFT — Yellow About Card */}
        <div className="flex-1 lg:flex-[3] p-6 sm:p-8">
          {/* Yellow profile card */}
          <div
            className="p-5 sm:p-6 h-full flex flex-col gap-5"
            style={{
              border: "2px solid #000",
              boxShadow: "5px 5px 0 #000",
              backgroundColor: "#f7c539",
            }}
          >
            {/* Name + email + social row */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase leading-tight">
                  {DATA.name}
                </h2>
                <p className="text-sm font-bold mt-0.5">{DATA.contact.email}</p>
              </div>
              {/* Social icon buttons */}
              <div className="flex gap-2">
                {socialLinks.map(([name, social]) => (
                  <Link
                    key={name}
                    href={social.url}
                    target="_blank"
                    title={name}
                    className="flex items-center justify-center transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none hover:!shadow-none"
                    style={{
                      border: "2px solid #000",
                      boxShadow: "2px 2px 0 #000",
                      backgroundColor: "#fff",
                      width: 34,
                      height: 34,
                      flexShrink: 0,
                      transition: "all 0.1s",
                    }}
                  >
                    <social.icon className="size-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div
              className="flex flex-wrap w-fit"
              style={{ border: "2px solid #000", display: "inline-flex" }}
            >
              {[
                { num: "3+", label: "Experience" },
                { num: "15+", label: "Projects" },
                { num: "100K+", label: "Users" },
              ].map((s, i, arr) => (
                <div
                  key={s.label}
                  className="px-4 py-3 text-center bg-[#f5d478]"
                  style={{
                    borderRight:
                      i < arr.length - 1 ? "2px solid #000" : undefined,
                  }}
                >
                  <p className="text-lg sm:text-xl font-black">{s.num}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Short bio */}
            <p className="text-sm sm:text-base leading-relaxed font-medium flex-1">
              I&apos;m a passionate Website Developer currently working at{" "}
              <strong>Soca AI</strong>, collaborating on innovative web
              solutions for 100K+ users. CS student at{" "}
              <strong>Widyatama University</strong> with a blend of theoretical
              knowledge and hands-on experience.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="flex items-center gap-2 px-5 py-2.5 font-black uppercase text-xs sm:text-sm transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none"
                style={{
                  border: "2px solid #000",
                  boxShadow: "3px 3px 0 #000",
                  backgroundColor: "#000",
                  color: "#FFE033",
                }}
              >
                About Me →
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-5 py-2.5 font-black uppercase text-xs sm:text-sm transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none"
                style={{
                  border: "2px solid #000",
                  boxShadow: "3px 3px 0 #000",
                  backgroundColor: "#fff",
                }}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT — Work Experience */}
        <div className="lg:flex-[2] p-6 sm:p-8 flex flex-col gap-4 lg:border-l-[3px] lg:border-[#000] border-t-[3px] border-[#000] lg:border-t-0">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight">
              Work Experience
            </h2>
            <Link
              href="/work"
              className="text-[10px] font-black uppercase px-3 py-1.5 transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none"
              style={{
                border: "1.5px solid #000",
                boxShadow: "2px 2px 0 #000",
                backgroundColor: "#FFE033",
              }}
            >
              View All →
            </Link>
          </div>

          {DATA.work.map((work) => (
            <Link
              key={work.company}
              href={work.href}
              target="_blank"
              className="block group"
            >
              <div
                className="flex gap-3 p-3 sm:p-4 bg-white transition-all duration-100 group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:!shadow-none"
                style={{
                  border: "2px solid #000",
                  boxShadow: "3px 3px 0 #000",
                }}
              >
                <div
                  className="shrink-0 flex items-center justify-center bg-white"
                  style={{
                    border: "2px solid #000",
                    width: 40,
                    height: 40,
                    minWidth: 40,
                  }}
                >
                  <Image
                    src={work.logoUrl}
                    alt={work.company}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-sm uppercase leading-tight">
                    {work.company}
                  </h3>
                  <p className="text-[11px] font-bold uppercase text-gray-500">
                    {work.title}
                  </p>
                  <p className="text-[11px] font-bold mt-1 text-gray-700">
                    {work.start} – {work.end ?? "Present"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── FEATURED PROJECTS ─────────────────────────────────── */}
      <section className="px-6 sm:px-10 md:px-12 py-8 md:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="nb-section-title mb-0 border-b-0 pb-0 text-xl sm:text-2xl">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-xs font-black uppercase px-4 py-2 transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none"
              style={{
                border: "2px solid #000",
                boxShadow: "3px 3px 0 #000",
                backgroundColor: "#FFE033",
              }}
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {DATA.projects.slice(0, 4).map((project) => (
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
      </section>
    </div>
  );
}
