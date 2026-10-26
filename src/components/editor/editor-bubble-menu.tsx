"use client";

import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  BoldIcon,
  CheckIcon,
  CodeIcon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  LinkIcon,
  QuoteIcon,
} from "lucide-react";
import { useEffect, useState, type ComponentProps, type FormEvent } from "react";
import { cn } from "@/lib/utils";

export function EditorBubbleMenu({ editor }: { editor: Editor }) {
  const [linking, setLinking] = useState(false);
  const [url, setUrl] = useState("");

  const active = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      code: editor.isActive("code"),
      link: editor.isActive("link"),
      h2: editor.isActive("heading", { level: 2 }),
      h3: editor.isActive("heading", { level: 3 }),
      quote: editor.isActive("blockquote"),
      href: (editor.getAttributes("link").href as string | undefined) ?? "",
    }),
  });

  useEffect(() => {
    const reset = () => setLinking(false);
    editor.on("selectionUpdate", reset);
    return () => {
      editor.off("selectionUpdate", reset);
    };
  }, [editor]);

  function applyLink(event: FormEvent) {
    event.preventDefault();
    const href = url.trim();
    const chain = editor.chain().focus().extendMarkRange("link");
    (href ? chain.setLink({ href }) : chain.unsetLink()).run();
    setLinking(false);
  }

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor, state }) =>
        !state.selection.empty &&
        !editor.isActive("image") &&
        !editor.isActive("codeBlock")
      }
      className="z-50 flex items-center gap-0.5 rounded-full bg-foreground p-1 text-background shadow-lift"
    >
      {linking ? (
        <form onSubmit={applyLink} className="flex items-center">
          <input
            autoFocus
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setLinking(false);
                editor.commands.focus();
              }
            }}
            placeholder="Paste a link, or leave empty to remove"
            aria-label="Link URL"
            className="h-8 w-64 bg-transparent px-3 text-[14px] outline-none placeholder:text-background/50"
          />
          <MenuButton type="submit" label="Apply link">
            <CheckIcon />
          </MenuButton>
        </form>
      ) : (
        <>
          <MenuButton label="Bold" active={active.bold} onClick={() => editor.chain().focus().toggleBold().run()}>
            <BoldIcon />
          </MenuButton>
          <MenuButton label="Italic" active={active.italic} onClick={() => editor.chain().focus().toggleItalic().run()}>
            <ItalicIcon />
          </MenuButton>
          <MenuButton label="Inline code" active={active.code} onClick={() => editor.chain().focus().toggleCode().run()}>
            <CodeIcon />
          </MenuButton>
          <MenuButton
            label="Link"
            active={active.link}
            onClick={() => {
              setUrl(active.href);
              setLinking(true);
            }}
          >
            <LinkIcon />
          </MenuButton>
          <span aria-hidden className="mx-1 h-4 w-px bg-background/20" />
          <MenuButton label="Heading" active={active.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2Icon />
          </MenuButton>
          <MenuButton label="Subheading" active={active.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <Heading3Icon />
          </MenuButton>
          <MenuButton label="Quote" active={active.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <QuoteIcon />
          </MenuButton>
        </>
      )}
    </BubbleMenu>
  );
}

function MenuButton({
  label,
  active,
  className,
  ...props
}: ComponentProps<"button"> & { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      onMouseDown={(event) => event.preventDefault()}
      className={cn(
        "grid size-8 place-items-center rounded-full transition-colors duration-200 [&_svg]:size-4",
        active ? "bg-background/20" : "hover:bg-background/10",
        className
      )}
      {...props}
    />
  );
}
