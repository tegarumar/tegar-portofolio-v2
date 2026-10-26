"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="ghost" size="sm" pending={pending}>
      {pending ? "Signing out…" : "Sign out"}
    </Button>
  );
}
