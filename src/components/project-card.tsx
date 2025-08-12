import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { RainbowButton } from "./magicui/rainbow-button";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

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
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <>
      <CardContainer className="inter-var h-full" containerClassName="h-full">
        <CardBody className="bg-card relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-full rounded-xl p-6 border flex flex-col gap-2">
          <CardItem translateZ="50" className="text-xl font-bold">
            {title}
          </CardItem>
          <CardItem translateZ="60">
            <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert ">
              {description}
            </Markdown>
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Link
              href={href || "#"}
              className={cn("block cursor-pointer", className)}
            >
              {video && (
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none mx-auto h-40 w-full object-cover object-top rounded-xl"
                />
              )}
              {image && (
                <Image
                  src={image}
                  alt={title}
                  width={500}
                  height={300}
                  className="h-40 w-full overflow-hidden object-cover object-top rounded-xl"
                />
              )}
            </Link>
          </CardItem>
          <div className="flex flex-col gap-2 mt-auto">
            <CardItem translateZ={60} className="flex flex-col px-2">
              {tags && tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {tags?.map((tag) => (
                    <Badge
                      className="px-1 py-0 text-[10px]"
                      variant="secondary"
                      key={tag}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardItem>
            <CardItem translateZ={60} className="flex items-center">
              {links && links.length > 0 && (
                <div className="flex flex-row flex-wrap items-start gap-1">
                  {links?.map((link, idx) => (
                    <Link href={link?.href} key={idx} target="_blank">
                      <RainbowButton key={idx}>
                        {link.icon}
                        {link.type}
                      </RainbowButton>
                    </Link>
                  ))}
                </div>
              )}
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </>
  );
}
