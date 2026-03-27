import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  tags,
  image,
  video,
  links,
}: Props) {
  return (
    <div
      className="flex flex-col bg-white transition-all duration-100 group hover:translate-x-[3px] hover:translate-y-[3px] hover:!shadow-none"
      style={{
        border: "2px solid #000",
        boxShadow: "5px 5px 0px #000",
      }}
    >
      {/* Image / Video */}
      {(image || video) && (
        <div style={{ borderBottom: "2px solid #000" }}>
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-40 object-cover object-top"
            />
          ) : image ? (
            <Image
              src={image}
              alt={title}
              width={500}
              height={200}
              className="w-full h-40 object-cover object-top"
            />
          ) : null}
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-black text-sm uppercase tracking-wide">{title}</h3>
        <Markdown className="text-xs text-gray-700 leading-relaxed line-clamp-3">
          {description}
        </Markdown>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-2">
            {tags.map((tag, i) => (
              <span
                key={tag}
                className="text-[10px] font-black uppercase px-2 py-0.5"
                style={{
                  border: "1.5px solid #000",
                  backgroundColor: i % 2 === 0 ? "#fff" : "#FFE033",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {links && links.length > 0 && (
          <div
            className="flex flex-wrap gap-2 pt-2"
            style={{ borderTop: "1.5px solid #000" }}
          >
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                className="flex items-center gap-1 text-xs font-black uppercase px-3 py-1 transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none"
                style={{
                  border: "1.5px solid #000",
                  boxShadow: "2px 2px 0px #000",
                  backgroundColor: "#000",
                  color: "#FFE033",
                }}
              >
                {link.icon}
                {link.type}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
