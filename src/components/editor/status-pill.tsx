import type { PostStatus } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

export function StatusPill({ status }: { status: PostStatus }) {
  const published = status === "published";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[13px]",
        published ? "bg-accent-soft/12 text-foreground" : "bg-hover text-muted"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          published ? "bg-accent-soft" : "bg-muted"
        )}
      />
      {published ? "Published" : "Draft"}
    </span>
  );
}
