"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ChevronDownIcon } from "lucide-react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block group"
      onClick={handleClick}
    >
      <div
        className="flex gap-4 p-4 bg-white transition-all duration-100 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
        style={{
          border: "2px solid #000",
          boxShadow: "4px 4px 0px #000",
        }}
      >
        {/* Logo */}
        <div
          className="shrink-0 flex items-center justify-center bg-white"
          style={{
            border: "2px solid #000",
            width: 48,
            height: 48,
            minWidth: 48,
          }}
        >
          <Image
            src={logoUrl}
            alt={altText}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-black text-sm uppercase">{title}</h3>
                {badges && badges.map((badge, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-black uppercase px-2 py-0.5"
                    style={{ border: "1.5px solid #000", backgroundColor: "#FFE033" }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
              {subtitle && (
                <p className="text-xs font-bold text-gray-600 mt-0.5 uppercase tracking-wide">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="text-xs font-bold px-2 py-0.5 whitespace-nowrap"
                style={{ border: "1.5px solid #000", backgroundColor: "#FFE033" }}
              >
                {period}
              </span>
              {description && (
                <ChevronDownIcon
                  size={16}
                  style={{
                    strokeWidth: 3,
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              )}
            </div>
          </div>

          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="text-xs leading-relaxed text-gray-700 mt-3 pt-3" style={{ borderTop: "1.5px dashed #000" }}>
                {description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </Link>
  );
};
