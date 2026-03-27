import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import Link from "next/link";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="px-6 sm:px-10 md:px-12 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        <h1 className="nb-section-title text-3xl sm:text-4xl">About Me</h1>

        {/* Main card */}
        <div
          className="p-5 sm:p-8 bg-white mb-6"
          style={{ border: "2px solid #000", boxShadow: "5px 5px 0 #000" }}
        >
          <Markdown
            className="prose max-w-full text-sm sm:text-base leading-relaxed"
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="font-black underline decoration-2 decoration-yellow-400 hover:bg-yellow-300 transition-colors"
                  target="_blank"
                />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className="mb-4 last:mb-0" />
              ),
            }}
          >
            {DATA.summary}
          </Markdown>
        </div>

        {/* Quick info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="p-5 bg-white"
            style={{
              border: "2px solid #000",
              boxShadow: "4px 4px 0 #000",
              backgroundColor: "#a9d6b7",
            }}
          >
            <p className="text-xs font-black uppercase tracking-wider mb-1">
              Location
            </p>
            <p className="font-black text-lg">{DATA.country}</p>
            <p className="text-xs font-bold uppercase text-gray-600">
              {DATA.location}
            </p>
          </div>
          <div
            className="p-5"
            style={{
              border: "2px solid #000",
              boxShadow: "4px 4px 0 #000",
              backgroundColor: "#FFE033",
            }}
          >
            <p className="text-xs font-black uppercase tracking-wider mb-1">
              Currently At
            </p>
            <p className="font-black text-lg">{DATA.work[0].company}</p>
            <p className="text-xs font-bold uppercase text-gray-600">
              {DATA.work[0].title}
            </p>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-6 flex flex-wrap gap-3">
          {Object.entries(DATA.contact.social)
            .filter(([_, s]) => s.navbar)
            .map(([name, social]) => (
              <Link
                key={name}
                href={social.url}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none"
                style={{
                  border: "2px solid #000",
                  boxShadow: "3px 3px 0 #000",
                  backgroundColor: "#fff",
                }}
              >
                <social.icon className="size-4" />
                {name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
