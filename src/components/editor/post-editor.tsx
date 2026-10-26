"use client";

import type { Editor, EditorEvents } from "@tiptap/core";
import FileHandler from "@tiptap/extension-file-handler";
import Typography from "@tiptap/extension-typography";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  ImagePlusIcon,
  Settings2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
  type KeyboardEvent,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  publishPost,
  saveDraft,
  updatePublished,
  type ActionResult,
} from "@/app/(admin)/dashboard/actions";
import { Burst } from "@/components/motion/burst";
import { MorphText } from "@/components/motion/morph-text";
import { Button } from "@/components/ui/button";
import { contentExtensions } from "@/lib/blog/extensions";
import { readingTime } from "@/lib/blog/text";
import type { PostRow } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";
import { EditorBubbleMenu } from "./editor-bubble-menu";
import { PostSettings, type PostMeta } from "./post-settings";
import { StatusPill } from "./status-pill";
import { IMAGE_TYPES, uploadImage } from "./upload-image";

type SaveState = "saved" | "unsaved" | "saving" | "error";

const saveLabel: Record<SaveState, string> = {
  saved: "Saved",
  unsaved: "Unsaved",
  saving: "Saving…",
  error: "Not saved",
};

export function PostEditor({ post }: { post: PostRow }) {
  const [title, setTitle] = useState(post.title);
  const [status, setStatus] = useState(post.status);
  const [meta, setMeta] = useState<PostMeta>({
    slug: post.slug,
    excerpt: post.excerpt,
    cover_image: post.cover_image,
  });
  const [save, setSave] = useState<SaveState>("saved");
  const [words, setWords] = useState(post.word_count);
  const [notice, setNotice] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [celebrate, setCelebrate] = useState(0);
  const [publishing, startPublishing] = useTransition();
  const router = useRouter();
  const titleRef = useRef(post.title);
  const version = useRef(0);
  const savedVersion = useRef(0);
  const inFlight = useRef<Promise<void> | null>(null);
  const busy = useRef(false);
  const titleInput = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const published = status === "published";

  const insertImage = useCallback(
    async (editor: Editor, file: File, pos: number) => {
      setNotice("Uploading image…");
      try {
        const attrs = await uploadImage(file, post.id);
        editor
          .chain()
          .insertContentAt(pos, { type: "image", attrs: { ...attrs, alt: "" } })
          .focus()
          .run();
        setNotice(null);
      } catch (e) {
        setNotice(e instanceof Error ? e.message : "Upload failed.");
      }
    },
    [post.id]
  );

  const editor = useEditor({
    immediatelyRender: false,
    content: post.content,
    extensions: [
      ...contentExtensions,
      Typography,
      CharacterCount,
      Placeholder.configure({ placeholder: "Write something…" }),
      FileHandler.configure({
        allowedMimeTypes: IMAGE_TYPES,
        onDrop: (editor, files, pos) => {
          files.forEach((file) => insertImage(editor, file, pos));
        },
        onPaste: (editor, files, html) => {
          if (html) return;
          files.forEach((file) =>
            insertImage(editor, file, editor.state.selection.anchor)
          );
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose article min-h-[50vh] pb-40 focus:outline-none",
        "aria-label": "Post body",
      },
    },
    onCreate: ({ editor }) => setWords(editor.storage.characterCount.words()),
    onUpdate: ({ editor }) => setWords(editor.storage.characterCount.words()),
  });

  function settle(result: ActionResult, sent: number) {
    if (!result.ok) {
      setSave("error");
      setNotice(result.error);
      return;
    }
    savedVersion.current = sent;
    setNotice(null);
    setSave(sent === version.current ? "saved" : "unsaved");
  }

  async function saveNow() {
    if (!editor) return;
    while (inFlight.current) await inFlight.current;
    if (savedVersion.current === version.current) return;

    const sent = version.current;
    setSave("saving");
    const request = saveDraft({
      id: post.id,
      title: titleRef.current,
      content: editor.getJSON(),
    }).then((result) => settle(result, sent));
    inFlight.current = request;
    try {
      await request;
    } finally {
      if (inFlight.current === request) inFlight.current = null;
    }
  }

  const autosave = useDebouncedCallback(saveNow, 1500, { maxWait: 10_000 });

  const markChanged = useCallback(() => {
    version.current += 1;
    setSave("unsaved");
    if (status === "draft") autosave();
  }, [status, autosave]);

  useEffect(() => {
    if (!editor) return;
    const onUpdate = ({ transaction }: EditorEvents["update"]) => {
      if (transaction.docChanged) markChanged();
    };
    editor.on("update", onUpdate);
    return () => {
      editor.off("update", onUpdate);
    };
  }, [editor, markChanged]);

  useEffect(() => () => void autosave.flush(), [autosave]);

  useEffect(() => {
    if (save !== "unsaved" && save !== "saving") return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [save]);

  useEffect(() => {
    const input = titleInput.current;
    if (!input) return;
    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;
  }, [title]);

  function goLive(
    send: typeof publishPost | typeof updatePublished,
    onDone?: (result: ActionResult) => void
  ) {
    if (!editor || busy.current) return;
    busy.current = true;
    autosave.cancel();
    editor.setEditable(false, false);
    startPublishing(async () => {
      try {
        while (inFlight.current) await inFlight.current;
        const sent = version.current;
        const result = await send({
          id: post.id,
          title: titleRef.current,
          content: editor.getJSON(),
        });
        if (!result.ok) {
          setNotice(result.error);
          return;
        }
        settle(result, sent);
        onDone?.(result);
      } finally {
        editor.setEditable(true, false);
        busy.current = false;
      }
    });
  }

  const update = () => goLive(updatePublished);

  const publish = () =>
    goLive(publishPost, (result) => {
      setStatus("published");
      setMeta((current) => ({
        ...current,
        slug: (result.ok && result.slug) || current.slug,
      }));
      setCelebrate((n) => n + 1);
    });

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        if (status === "published") update();
        else autosave.flush();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  function onTitleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      editor?.commands.focus("start");
    }
  }

  return (
    <div className="mx-auto max-w-[640px]">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/dashboard"
          className="label inline-flex items-center gap-1.5 transition-colors duration-300 ease-out-expo hover:text-foreground"
        >
          <ArrowLeftIcon className="size-3.5" />
          All posts
        </Link>
        <div className="flex items-center gap-2">
          {published && (
            <Link
              href={`/blog/${meta.slug}`}
              target="_blank"
              className="label inline-flex items-center gap-1 transition-colors duration-300 ease-out-expo hover:text-foreground"
            >
              View post
              <ArrowUpRightIcon className="size-3.5" />
            </Link>
          )}
          <StatusPill status={status} />
        </div>
      </div>

      <textarea
        ref={titleInput}
        value={title}
        rows={1}
        maxLength={200}
        placeholder="Title"
        aria-label="Title"
        onChange={(event) => {
          setTitle(event.target.value);
          titleRef.current = event.target.value;
          markChanged();
        }}
        onKeyDown={onTitleKeyDown}
        readOnly={publishing}
        className="mt-8 block w-full resize-none overflow-hidden bg-transparent text-[2.25rem] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground outline-none placeholder:text-muted/60 sm:text-[2.5rem]"
      />

      <div className="mt-6">
        <EditorContent editor={editor} />
        {editor && <EditorBubbleMenu editor={editor} />}
      </div>

      <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
        <div className="flex max-w-full items-center gap-1 rounded-full bg-surface p-1.5 pl-4 shadow-lift">
          <p className="label flex min-w-0 items-center gap-2 pr-2" aria-live="polite">
            <span
              aria-hidden
              className={cn(
                "size-1.5 shrink-0 rounded-full transition-colors duration-300",
                save === "saved" && "bg-[#44c67f]",
                save === "saving" && "bg-gold",
                save === "unsaved" && "bg-muted",
                save === "error" && "bg-danger"
              )}
            />
            <span className="truncate">
              {notice ?? <MorphText text={saveLabel[save]} />}
            </span>
            <span className="hidden shrink-0 sm:inline">
              · {words} words · {readingTime(words)} min
            </span>
          </p>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Insert image"
            title="Insert image"
            onClick={() => fileInput.current?.click()}
          >
            <ImagePlusIcon />
          </Button>
          <input
            ref={fileInput}
            type="file"
            accept={IMAGE_TYPES.join(",")}
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file && editor) {
                insertImage(editor, file, editor.state.selection.anchor);
              }
              event.target.value = "";
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Post settings"
            title="Post settings"
            disabled={publishing}
            onClick={() => setSettingsOpen(true)}
          >
            <Settings2Icon />
          </Button>

          <div className="relative">
            <Burst trigger={celebrate} />
            {published ? (
              <Button
                pending={publishing}
                disabled={save === "saved"}
                onClick={update}
              >
                <MorphText
                  text={
                    publishing
                      ? "Updating…"
                      : save === "saved"
                        ? "Published"
                        : "Update"
                  }
                />
              </Button>
            ) : (
              <Button pending={publishing} onClick={publish}>
                <MorphText text={publishing ? "Publishing…" : "Publish"} />
              </Button>
            )}
          </div>
        </div>
      </div>

      <PostSettings
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        postId={post.id}
        title={title}
        status={status}
        meta={meta}
        onSaved={setMeta}
        onUnpublished={() => setStatus("draft")}
        onDeleted={() => {
          autosave.cancel();
          router.replace("/dashboard");
        }}
      />
    </div>
  );
}
