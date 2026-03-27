import { DATA } from "@/data/resume";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Work Experience" };

export default function WorkPage() {
  return (
    <div className="px-6 sm:px-10 md:px-12 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        <h1 className="nb-section-title text-3xl sm:text-4xl">
          Work Experience
        </h1>

        <div className="flex flex-col gap-5">
          {DATA.work.map((work, i) => (
            <Link
              key={work.company}
              href={work.href}
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
                {/* Header strip */}
                <div
                  className="flex items-center gap-4 p-4 sm:p-5"
                  style={{
                    borderBottom: "2px solid #000",
                    backgroundColor: i === 0 ? "#FFE033" : "#a9d6b7",
                  }}
                >
                  <div
                    className="shrink-0 flex items-center justify-center bg-white"
                    style={{
                      border: "2px solid #000",
                      width: 50,
                      height: 50,
                      minWidth: 50,
                    }}
                  >
                    <Image
                      src={work.logoUrl}
                      alt={work.company}
                      width={42}
                      height={42}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="font-black text-base sm:text-lg uppercase">
                        {work.company}
                      </h2>
                      <span
                        className="text-xs font-black px-2 py-0.5"
                        style={{
                          border: "1.5px solid #000",
                          backgroundColor: "#000",
                          color: "#FFE033",
                        }}
                      >
                        {work.start} – {work.end ?? "Present"}
                      </span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-700 mt-0.5">
                      {work.title} · {work.location}
                    </p>
                  </div>
                </div>
                {/* Body */}
                <div className="p-4 sm:p-5">
                  <p className="text-sm sm:text-base leading-relaxed text-gray-800">
                    {work.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
