"use client";

import { Trash2Icon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deletePost } from "@/app/(admin)/dashboard/actions";
import { Tray } from "@/components/motion/tray";
import { formatDate } from "@/lib/blog/text";
import { spring } from "@/lib/motion";
import type { PostRow } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";
import { DeleteConfirm, DeleteIcon } from "./delete-confirm";
import { StatusPill } from "./status-pill";

type Row = Pick<PostRow, "id" | "title" | "status" | "updated_at">;

export function PostRows({ posts }: { posts: Row[] }) {
  const router = useRouter();
  const [target, setTarget] = useState<Row | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function askToDelete(post: Row) {
    setTarget(post);
    setError(null);
    setConfirming(true);
  }

  function confirmDelete() {
    if (!target || pending) return;
    const { id } = target;
    startTransition(async () => {
      const result = await deletePost(id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setHidden((current) => new Set(current).add(id));
      setConfirming(false);
      router.refresh();
    });
  }

  const visible = posts.filter((post) => !hidden.has(post.id));

  return (
    <>
      <ul className="-mx-3 mt-8">
        <AnimatePresence initial={false}>
          {visible.map((post) => (
            <motion.li
              key={post.id}
              layout
              exit={{ opacity: 0, height: 0 }}
              transition={spring}
              className="group relative overflow-hidden"
            >
              <Link
                href={`/dashboard/posts/${post.id}`}
                className="flex items-center gap-4 rounded-2xl py-3 pl-3 pr-14 transition-colors duration-300 ease-out-expo hover:bg-hover"
              >
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate font-medium",
                    post.title ? "text-foreground" : "text-muted"
                  )}
                >
                  {post.title || "Untitled"}
                </span>
                <StatusPill status={post.status} />
                <time
                  dateTime={post.updated_at}
                  className="label hidden w-24 text-right sm:block"
                >
                  {formatDate(post.updated_at)}
                </time>
              </Link>
              <button
                type="button"
                onClick={() => askToDelete(post)}
                aria-label={`Delete ${post.title || "Untitled"}`}
                title="Delete"
                className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted opacity-0 transition-[opacity,color,background-color] duration-300 ease-out-expo hover:bg-background hover:text-danger focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
              >
                <Trash2Icon className="size-4" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <Tray
        open={confirming}
        onOpenChange={(open) => {
          if (!pending) setConfirming(open);
        }}
        title="Delete this post?"
        icon={<DeleteIcon />}
      >
        <DeleteConfirm
          title={target?.title ?? ""}
          pending={pending}
          error={error}
          onCancel={() => setConfirming(false)}
          onConfirm={confirmDelete}
        />
      </Tray>
    </>
  );
}
