import { notFound } from "next/navigation";
import { z } from "zod";
import { PostEditor } from "@/components/editor/post-editor";
import { requireOwner } from "@/lib/auth/dal";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireOwner();
  if (!z.uuid().safeParse(id).success) notFound();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!post) notFound();

  return <PostEditor key={post.id} post={post} />;
}
