import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
}

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  links,
}: Props) {
  return (
    <li
      className="flex gap-4 p-4 bg-white list-none"
      style={{ border: "2px solid #000", marginBottom: "-2px" }}
    >
      {image && (
        <div
          className="shrink-0 flex items-center justify-center bg-white"
          style={{
            border: "2px solid #000",
            width: 44,
            height: 44,
            minWidth: 44,
          }}
        >
          <Image
            src={image}
            alt={title}
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className="font-black text-sm uppercase">{title}</h3>
          <span
            className="text-[10px] font-black uppercase px-2 py-0.5 shrink-0"
            style={{ border: "1.5px solid #000", backgroundColor: "#FFE033" }}
          >
            {dates}
          </span>
        </div>
        {location && (
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mt-0.5">
            {location}
          </p>
        )}
        {description && (
          <p className="text-xs text-gray-700 leading-relaxed mt-1 line-clamp-2">
            {description}
          </p>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                className="flex items-center gap-1 text-xs font-black uppercase px-2 py-0.5"
                style={{
                  border: "1.5px solid #000",
                  backgroundColor: "#5B8DEF",
                  color: "#fff",
                }}
              >
                {link.icon}
                {link.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
