import { DATA } from "@/data/resume";

export const metadata = { title: "Skills" };

const SKILL_COLORS = [
  { bg: "#FFE033", text: "#000" },
  { bg: "#fff", text: "#000" },
  { bg: "#a9d6b7", text: "#000" },
  { bg: "#fec7ff", text: "#000" },
  { bg: "#5B8DEF", text: "#fff" },
];

const CATEGORY_MAP: Record<string, string[]> = {
  Frontend: ["Vue", "Nuxt.js", "React", "Next.js", "JavaScript", "TypeScript"],
  Backend: [
    "Node.js",
    "Python",
    "Flask",
    "Go",
    "Java",
    "Spring Boot",
    "PHP",
    "Laravel",
  ],
  Database: ["Postgres", "MySQL", "MongoDB"],
};

export default function SkillsPage() {
  const categorized = Object.entries(CATEGORY_MAP);
  const catColors = ["#FFE033", "#a9d6b7", "#fec7ff"];

  return (
    <div className="px-6 sm:px-10 md:px-12 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        <h1 className="nb-section-title text-3xl sm:text-4xl">Skills</h1>

        {/* Categorized skills */}
        <div className="flex flex-col gap-3 mb-8">
          {categorized.map(([category, skills], ci) => (
            <div
              key={category}
              className="border-b-[3px] border-[#000] border-dashed pb-3 last:border-b-0"
            >
              <div
                className="inline-block px-3 py-1 mb-3 text-xs font-black uppercase tracking-widest"
                style={{
                  border: "2px solid #000",
                  backgroundColor: catColors[ci],
                  boxShadow: "3px 3px 0 #000",
                }}
              >
                {category}
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => {
                  const c = SKILL_COLORS[i % SKILL_COLORS.length];
                  return (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all duration-100 cursor-default hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none"
                      style={{
                        border: "2px solid #000",
                        boxShadow: "3px 3px 0 #000",
                        backgroundColor: c.bg,
                        color: c.text,
                      }}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* All skills flat grid */}
        <div style={{ borderTop: "3px solid #000", paddingTop: 24 }}>
          <p
            className="text-xs font-black uppercase tracking-widest mb-3"
            style={{ color: "rgba(0,0,0,0.45)" }}
          >
            All Technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, i) => {
              const c = SKILL_COLORS[i % SKILL_COLORS.length];
              return (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all duration-100 cursor-default hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none"
                  style={{
                    border: "2px solid #000",
                    boxShadow: "2px 2px 0 #000",
                    backgroundColor: c.bg,
                    color: c.text,
                  }}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
