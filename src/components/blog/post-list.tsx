import Link from "next/link";
import type { PostSummary } from "@/lib/blog/queries";
import { formatDate } from "@/lib/blog/text";

export function PostList({ posts }: { posts: PostSummary[] }) {
  return (
    <ul className="-mx-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="flex flex-col gap-0.5 rounded-2xl px-3 py-3 transition-colors duration-300 ease-out-expo hover:bg-hover sm:flex-row sm:items-baseline sm:gap-4"
          >
            <span className="flex-1 font-medium text-foreground">
              {post.title}
            </span>
            {post.published_at && (
              <time dateTime={post.published_at} className="label shrink-0">
                {formatDate(post.published_at)}
              </time>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
