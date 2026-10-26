"use client";

import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useTransition } from "react";
import { createDraft } from "@/app/(admin)/dashboard/actions";
import { MorphText } from "@/components/motion/morph-text";
import { Button } from "@/components/ui/button";

export function NewPostButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      pending={pending}
      onClick={() => startTransition(() => createDraft())}
    >
      {pending ? <LoaderCircleIcon className="animate-spin" /> : <PlusIcon />}
      <MorphText text={pending ? "Creating…" : "New post"} />
    </Button>
  );
}
