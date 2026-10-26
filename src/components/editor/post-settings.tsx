"use client";

import { ImageUpIcon, LoaderCircleIcon, Settings2Icon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, useTransition } from "react";
import {
  deletePost,
  unpublishPost,
  updatePostMeta,
} from "@/app/(admin)/dashboard/actions";
import { Tray } from "@/components/motion/tray";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import type { PostStatus } from "@/lib/supabase/database.types";
import { spring } from "@/lib/motion";
import { DeleteConfirm, DeleteIcon } from "./delete-confirm";
import { IMAGE_TYPES, uploadImage } from "./upload-image";

export type PostMeta = {
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
};

type View = "settings" | "delete";
type Busy = "save" | "unpublish" | "delete" | null;

export function PostSettings({
  open,
  onOpenChange,
  postId,
  title,
  status,
  meta,
  onSaved,
  onUnpublished,
  onDeleted,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
  title: string;
  status: PostStatus;
  meta: PostMeta;
  onSaved: (meta: PostMeta) => void;
  onUnpublished: () => void;
  onDeleted: () => void;
}) {
  const [view, setView] = useState<View>("settings");
  const [slug, setSlug] = useState(meta.slug);
  const [excerpt, setExcerpt] = useState(meta.excerpt ?? "");
  const [cover, setCover] = useState(meta.cover_image ?? "");
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState<Busy>(null);
  const [pending, startTransition] = useTransition();
  const fileInput = useRef<HTMLInputElement>(null);

  const published = status === "published";
  const slugChanged = slug !== meta.slug;
  const locked = pending || uploading;

  function reset() {
    setView("settings");
    setSlug(meta.slug);
    setExcerpt(meta.excerpt ?? "");
    setCover(meta.cover_image ?? "");
    setError(null);
  }

  function run(action: Exclude<Busy, null>, work: () => Promise<void>) {
    if (locked) return;
    setError(null);
    setBusy(action);
    startTransition(async () => {
      try {
        await work();
      } finally {
        setBusy(null);
      }
    });
  }

  function save() {
    run("save", async () => {
      const result = await updatePostMeta({
        id: postId,
        slug,
        excerpt,
        coverImage: cover,
      });
      if (!result.ok) return setError(result.error);
      onSaved({
        slug,
        excerpt: excerpt.trim() || null,
        cover_image: cover || null,
      });
      onOpenChange(false);
    });
  }

  function unpublish() {
    run("unpublish", async () => {
      const result = await unpublishPost(postId);
      if (!result.ok) return setError(result.error);
      onUnpublished();
      onOpenChange(false);
    });
  }

  function remove() {
    run("delete", async () => {
      const result = await deletePost(postId);
      if (!result.ok) return setError(result.error);
      onDeleted();
    });
  }

  async function uploadCover(file: File) {
    if (locked) return;
    setError(null);
    setUploading(true);
    try {
      setCover((await uploadImage(file, postId)).src);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const direction = view === "delete" ? 1 : -1;

  return (
    <Tray
      open={open}
      onOpenChange={(next) => {
        if (!locked) onOpenChange(next);
      }}
      onExitComplete={reset}
      title={view === "settings" ? "Post settings" : "Delete this post?"}
      icon={
        view === "settings" ? (
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-hover text-muted">
            <Settings2Icon className="size-4" />
          </span>
        ) : (
          <DeleteIcon />
        )
      }
    >
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        {view === "settings" ? (
          <motion.div
            key="settings"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spring}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="slug">URL</Label>
              <div className="flex items-center rounded-2xl border bg-background pl-4 focus-within:border-accent-soft focus-within:ring-4 focus-within:ring-accent-soft/15">
                <span className="label shrink-0">/blog/</span>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase())}
                  className="border-0 pl-1 focus:ring-0"
                />
              </div>
              {slug.startsWith("draft-") && (
                <p className="text-[14px] text-muted">
                  Set from the title when you publish.
                </p>
              )}
              {published && slugChanged && (
                <p className="text-[14px] text-danger">
                  This post is live. Changing its URL breaks existing links.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                maxLength={500}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Shown in link previews. Leave empty to use the first paragraph."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover">Cover image</Label>
              <div className="flex gap-2">
                <Input
                  id="cover"
                  type="url"
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  placeholder="https://…"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="size-11"
                  aria-label="Upload cover image"
                  pending={uploading}
                  disabled={pending}
                  onClick={() => fileInput.current?.click()}
                >
                  {uploading ? (
                    <LoaderCircleIcon className="animate-spin" />
                  ) : (
                    <ImageUpIcon />
                  )}
                </Button>
                <input
                  ref={fileInput}
                  type="file"
                  accept={IMAGE_TYPES.join(",")}
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadCover(file);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-[14px] text-danger">
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={locked}
                  className="text-danger hover:text-danger"
                  onClick={() => {
                    setError(null);
                    setView("delete");
                  }}
                >
                  Delete
                </Button>
                {published && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    pending={busy === "unpublish"}
                    disabled={locked}
                    onClick={unpublish}
                  >
                    {busy === "unpublish" ? "Unpublishing…" : "Unpublish"}
                  </Button>
                )}
              </div>
              <Button
                type="button"
                pending={busy === "save"}
                disabled={locked}
                onClick={save}
              >
                {busy === "save" && <LoaderCircleIcon className="animate-spin" />}
                {busy === "save" ? "Saving…" : "Save"}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="delete"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spring}
          >
            <DeleteConfirm
              title={title}
              pending={busy === "delete" || (pending && view === "delete")}
              error={error}
              onCancel={() => {
                setError(null);
                setView("settings");
              }}
              onConfirm={remove}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Tray>
  );
}

const slide = {
  enter: (direction: number) => ({ x: direction * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * -40, opacity: 0 }),
};
