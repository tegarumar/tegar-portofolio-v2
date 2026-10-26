import type { Metadata } from "next";
import { PostList } from "@/components/blog/post-list";
import { getPublishedPosts } from "@/lib/blog/queries";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Blog",
  description: "Tegar is learning to write. These are the notes.",
};

export default async function Blog() {
  const posts = await getPublishedPosts();

  return (
    <>
      <header className="space-y-3">
        <h1 className="animate-enter text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
          Blog
        </h1>
        <p className="animate-enter text-muted [animation-delay:80ms]">
          I&apos;m learning to write. These are the notes, along with whatever
          I figure out on the way.
        </p>
      </header>

      <div className="animate-enter mt-10 [animation-delay:160ms]">
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className="text-muted">
            Nothing here yet. The first post is on its way.
          </p>
        )}
      </div>
    </>
  );
}
