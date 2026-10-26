import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog/queries";
import { renderPostHtml } from "@/lib/blog/render";
import { formatDate, readingTime } from "@/lib/blog/text";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.published_at ?? undefined,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();

  const html = await renderPostHtml(post.content);

  return (
    <article>
      <Link
        href="/blog"
        className="label inline-flex items-center gap-1.5 transition-colors duration-300 ease-out-expo hover:text-foreground"
      >
        <ArrowLeftIcon className="size-3.5" />
        Blog
      </Link>

      <header className="mt-6 space-y-3">
        <h1 className="animate-enter text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[2.5rem]">
          {post.title}
        </h1>
        <p className="animate-enter label [animation-delay:60ms]">
          {post.published_at && (
            <time dateTime={post.published_at}>
              {formatDate(post.published_at, "long")}
            </time>
          )}{" "}
          · {readingTime(post.word_count)} min read
        </p>
      </header>

      {post.cover_image && (
        <Image
          src={post.cover_image}
          alt=""
          width={1200}
          height={750}
          priority
          sizes="(min-width: 640px) 592px, 100vw"
          className="animate-enter mt-8 aspect-[16/10] w-full rounded-card object-cover [animation-delay:120ms]"
        />
      )}

      <div
        className="prose article animate-enter mt-8 [animation-delay:160ms]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
