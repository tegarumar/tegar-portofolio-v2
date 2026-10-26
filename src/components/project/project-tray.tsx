"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Tray } from "@/components/motion/tray";

export function ProjectTray({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <Tray
      open={open}
      onOpenChange={setOpen}
      title={title}
      description={description}
      onExitComplete={() => router.back()}
    >
      {children}
    </Tray>
  );
}
