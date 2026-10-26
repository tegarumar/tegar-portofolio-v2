"use server";

import { getSchema, type JSONContent } from "@tiptap/core";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireOwner } from "@/lib/auth/dal";
import { contentExtensions } from "@/lib/blog/extensions";
import { revalidateBlog } from "@/lib/blog/revalidate";
import { draftSlug, SLUG_PATTERN, slugify } from "@/lib/blog/slug";
import {
  countWords,
  firstParagraph,
  isBlankDoc,
  plainText,
} from "@/lib/blog/text";
import type { PostRow } from "@/lib/supabase/database.types";

export type ActionResult =
  | { ok: true; slug?: string }
  | { ok: false; error: string };

const UNIQUE_VIOLATION = "23505";
const MAX_CONTENT_CHARS = 900_000;
const schema = getSchema(contentExtensions);

const content = z.custom<JSONContent>((value) => {
  try {
    if (JSON.stringify(value).length > MAX_CONTENT_CHARS) return false;
    schema.nodeFromJSON(value).check();
    return true;
  } catch {
    return false;
  }
}, "That document isn't valid.");

const postInput = z.object({
  id: z.uuid(),
  title: z.string().max(200),
  content,
});

const metaInput = z.object({
  id: z.uuid(),
  slug: z.string().regex(SLUG_PATTERN, "Use lowercase letters, numbers and hyphens.").max(100),
  excerpt: z.string().max(500),
  coverImage: z.union([z.url(), z.literal("")]),
});

type PostInput = z.input<typeof postInput>;

function contentFields(input: z.output<typeof postInput>) {
  return {
    title: input.title.trim(),
    content: input.content,
    word_count: countWords(plainText(input.content)),
  };
}

const failed = (error: string): ActionResult => ({ ok: false, error });

export async function createDraft() {
  const { supabase } = await requireOwner();

  const { data: blank } = await supabase
    .from("posts")
    .select("id, content")
    .eq("status", "draft")
    .eq("title", "")
    .eq("word_count", 0)
    .is("excerpt", null)
    .is("cover_image", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (blank && isBlankDoc(blank.content)) {
    redirect(`/dashboard/posts/${blank.id}`);
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({ slug: draftSlug() })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  redirect(`/dashboard/posts/${data.id}`);
}

export async function saveDraft(input: PostInput): Promise<ActionResult> {
  const { supabase } = await requireOwner();
  const parsed = postInput.safeParse(input);
  if (!parsed.success) return failed(parsed.error.issues[0].message);

  const { error } = await supabase
    .from("posts")
    .update(contentFields(parsed.data))
    .eq("id", parsed.data.id)
    .eq("status", "draft");
  return error ? failed(error.message) : { ok: true };
}

export async function updatePublished(input: PostInput): Promise<ActionResult> {
  const { supabase } = await requireOwner();
  const parsed = postInput.safeParse(input);
  if (!parsed.success) return failed(parsed.error.issues[0].message);
  if (!parsed.data.title.trim()) return failed("A published post needs a title.");

  const { error } = await supabase
    .from("posts")
    .update(contentFields(parsed.data))
    .eq("id", parsed.data.id)
    .eq("status", "published");
  if (error) return failed(error.message);

  revalidateBlog();
  return { ok: true };
}

export async function publishPost(input: PostInput): Promise<ActionResult> {
  const { supabase } = await requireOwner();
  const parsed = postInput.safeParse(input);
  if (!parsed.success) return failed(parsed.error.issues[0].message);
  const fields = contentFields(parsed.data);
  if (!fields.title) return failed("Give your post a title first.");

  const { data: post, error: readError } = await supabase
    .from("posts")
    .select("slug, excerpt, published_at")
    .eq("id", parsed.data.id)
    .single();
  if (readError) return failed(readError.message);

  const update: Partial<PostRow> = {
    ...fields,
    status: "published",
    published_at: post.published_at ?? new Date().toISOString(),
    excerpt: post.excerpt ?? firstParagraph(fields.content),
  };

  const fresh = post.slug.startsWith("draft-");
  const base = fresh ? slugify(fields.title) : post.slug;
  for (let n = 1; n <= 20; n++) {
    const slug = n === 1 ? base : `${base}-${n}`;
    const { error } = await supabase
      .from("posts")
      .update({ ...update, slug })
      .eq("id", parsed.data.id);
    if (!error) {
      revalidateBlog();
      return { ok: true, slug };
    }
    if (error.code !== UNIQUE_VIOLATION || !fresh) return failed(error.message);
  }
  return failed("Couldn't find a free URL for this post. Set one in Settings.");
}

export async function unpublishPost(id: string): Promise<ActionResult> {
  const { supabase } = await requireOwner();
  if (!z.uuid().safeParse(id).success) return failed("Unknown post.");

  const { error } = await supabase
    .from("posts")
    .update({ status: "draft" })
    .eq("id", id);
  if (error) return failed(error.message);

  revalidateBlog();
  return { ok: true };
}

export async function updatePostMeta(
  input: z.input<typeof metaInput>
): Promise<ActionResult> {
  const { supabase } = await requireOwner();
  const parsed = metaInput.safeParse(input);
  if (!parsed.success) return failed(parsed.error.issues[0].message);
  const { id, slug, excerpt, coverImage } = parsed.data;

  const { data, error } = await supabase
    .from("posts")
    .update({
      slug,
      excerpt: excerpt.trim() || null,
      cover_image: coverImage || null,
    })
    .eq("id", id)
    .select("status")
    .single();
  if (error) {
    return failed(
      error.code === UNIQUE_VIOLATION
        ? "Another post already uses that URL."
        : error.message
    );
  }

  if (data.status === "published") revalidateBlog();
  return { ok: true, slug };
}

export async function deletePost(id: string): Promise<ActionResult> {
  const { supabase } = await requireOwner();
  if (!z.uuid().safeParse(id).success) return failed("Unknown post.");

  const bucket = supabase.storage.from("blog-images");
  const { data: files } = await bucket.list(id, { limit: 1000 });
  if (files?.length) {
    await bucket.remove(files.map((file) => `${id}/${file.name}`));
  }

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .select("status")
    .single();
  if (error) return failed(error.message);

  if (data.status === "published") revalidateBlog();
  return { ok: true };
}
