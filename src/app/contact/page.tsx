import { DATA } from "@/data/resume";
import Link from "next/link";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const socialLinks = Object.entries(DATA.contact.social).filter(
    ([_, s]) => s.navbar,
  );

  return (
    <div className="px-6 sm:px-10 md:px-12 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        <h1 className="nb-section-title text-3xl sm:text-4xl">Get In Touch</h1>

        {/* Main CTA card */}
        <div
          className="p-6 sm:p-8 mb-6"
          style={{
            border: "2px solid #000",
            boxShadow: "6px 6px 0 #000",
            backgroundColor: "#fec7ff",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-3">
            Let&apos;s Work Together!
          </h2>
          <p className="font-bold text-sm sm:text-base mb-6 max-w-md">
            Got a question or a collaboration idea? Reach out via LinkedIn or
            social media — I&apos;ll get back to you as soon as possible!
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              className="nb-btn-dark font-black uppercase text-xs sm:text-sm px-5 py-2.5"
            >
              LinkedIn →
            </Link>
            <Link
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              className="nb-btn font-black uppercase text-xs sm:text-sm px-5 py-2.5"
            >
              GitHub →
            </Link>
          </div>
        </div>

        {/* Social cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {socialLinks.map(([name, social], i) => {
            const bgs = ["#FFE033", "#a9d6b7", "#fec7ff"];
            return (
              <Link
                key={name}
                href={social.url}
                target="_blank"
                className="flex flex-col items-start gap-3 p-4 transition-all duration-100 hover:translate-x-[3px] hover:translate-y-[3px] hover:!shadow-none"
                style={{
                  border: "2px solid #000",
                  boxShadow: "4px 4px 0 #000",
                  backgroundColor: bgs[i % bgs.length],
                }}
              >
                <social.icon className="size-6" />
                <div>
                  <p className="font-black text-sm uppercase">{name}</p>
                  <p className="text-xs font-bold text-gray-600 mt-0.5 break-all">
                    {social.url.replace("https://", "").replace(/\/$/, "")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Email note */}
        <div
          className="mt-6 p-4"
          style={{ border: "2px dashed #000", backgroundColor: "#fff" }}
        >
          <p className="text-xs font-black uppercase tracking-widest mb-1 text-gray-500">
            Email
          </p>
          <p className="font-black text-sm">{DATA.contact.email}</p>
        </div>
      </div>
    </div>
  );
}
