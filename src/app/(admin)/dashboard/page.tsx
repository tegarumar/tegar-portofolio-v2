import { NewPostButton } from "@/components/editor/new-post-button";
import { PostRows } from "@/components/editor/post-rows";
import { requireOwner } from "@/lib/auth/dal";

export default async function Dashboard() {
  const { supabase } = await requireOwner();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, status, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div className="mx-auto max-w-[640px]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
            Posts
          </h1>
          <p className="text-muted">
            {posts?.length
              ? `${posts.length} ${posts.length === 1 ? "post" : "posts"}`
              : "Your first post starts here."}
          </p>
        </div>
        <NewPostButton />
      </div>

      {error && (
        <p role="alert" className="mt-8 text-danger">
          Couldn&apos;t load posts: {error.message}
        </p>
      )}

      {posts && posts.length > 0 && <PostRows posts={posts} />}
    </div>
  );
}
