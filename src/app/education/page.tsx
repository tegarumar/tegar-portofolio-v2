import { DATA } from "@/data/resume";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Education" };

export default function EducationPage() {
  const colors = ["#FFE033", "#a9d6b7", "#fec7ff", "#5B8DEF"];

  return (
    <div className="px-6 sm:px-10 md:px-12 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        <h1 className="nb-section-title text-3xl sm:text-4xl">Education</h1>

        <div className="flex flex-col gap-5">
          {DATA.education.map((edu, i) => (
            <Link
              key={edu.school}
              href={edu.href}
              target="_blank"
              className="block group"
            >
              <div
                className="bg-white transition-all duration-100 group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-hover:!shadow-none"
                style={{
                  border: "2px solid #000",
                  boxShadow: "5px 5px 0 #000",
                }}
              >
                <div
                  className="flex items-center gap-4 p-4 sm:p-5"
                  style={{ backgroundColor: colors[i % colors.length] }}
                >
                  <div
                    className="shrink-0 flex items-center justify-center bg-white"
                    style={{
                      border: "2px solid #000",
                      width: 56,
                      height: 56,
                      minWidth: 56,
                    }}
                  >
                    <Image
                      src={edu.logoUrl}
                      alt={edu.school}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h2 className="font-black text-base sm:text-lg uppercase leading-tight">
                        {edu.school}
                      </h2>
                      <span
                        className="text-xs font-black px-2 py-0.5 whitespace-nowrap"
                        style={{
                          border: "1.5px solid #000",
                          backgroundColor: "#000",
                          color: "#fff",
                        }}
                      >
                        {edu.start} – {edu.end}
                      </span>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wide mt-1 text-gray-700">
                      {edu.degree}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Decorative note */}
        <div
          className="mt-8 p-4 sm:p-5"
          style={{ border: "2px dashed #000", backgroundColor: "#fec7ff" }}
        >
          <p className="text-sm font-bold">
            🎓 Currently pursuing my Bachelor&apos;s degree while working
            full-time as a Web Developer.
          </p>
        </div>
      </div>
    </div>
  );
}
