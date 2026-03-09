import { notFound } from "next/navigation";
import { reader } from "@/lib/keystatic/reader";
import { Header, Footer } from "@/components/landing";
import { PostHeader } from "@/components/blog/post-header";
import { PostContent } from "@/components/blog/post-content";
import { PostNavigation } from "@/components/blog/post-navigation";
import { ShareButtons } from "@/components/blog/share-buttons";
import { RelatedPosts } from "@/components/blog/related-posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);
  if (!post) return {};

  const url = `https://deepmetric.fit/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url,
      type: "article",
      publishedTime: post.date ?? undefined,
      authors: [post.author ?? "Luisma"],
      tags: [...post.tags],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post || post.draft) {
    notFound();
  }

  const allPosts = await reader.collections.posts.all();
  const publishedPosts = allPosts
    .filter((p) => !p.entry.draft)
    .sort(
      (a, b) =>
        new Date(b.entry.date ?? 0).getTime() -
        new Date(a.entry.date ?? 0).getTime()
    );

  const currentIndex = publishedPosts.findIndex((p) => p.slug === slug);
  const prevPost =
    currentIndex < publishedPosts.length - 1
      ? publishedPosts[currentIndex + 1]
      : null;
  const nextPost = currentIndex > 0 ? publishedPosts[currentIndex - 1] : null;

  const postTags = [...post.tags] as string[];
  const relatedPosts = publishedPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        p.entry.tags.some((t) => postTags.includes(t as string))
    )
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.entry.title,
      tags: p.entry.tags,
      date: p.entry.date,
    }));

  const content = await post.content();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.date ?? undefined,
    author: {
      "@type": "Person",
      name: post.author ?? "Luisma",
      url: "https://deepmetric.fit/#sobre-mi",
    },
    publisher: {
      "@type": "Organization",
      name: "DeepMetric",
      url: "https://deepmetric.fit",
    },
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <PostHeader
          title={post.title}
          date={post.date}
          author={post.author ?? "Luisma"}
          tags={post.tags}
          excerpt={post.excerpt}
        />

        <PostContent content={content} />

        <div className="mt-8 flex justify-end">
          <ShareButtons title={post.title} slug={slug} />
        </div>

        <RelatedPosts posts={relatedPosts} />

        <PostNavigation
          prevPost={
            prevPost
              ? { slug: prevPost.slug, title: prevPost.entry.title }
              : null
          }
          nextPost={
            nextPost
              ? { slug: nextPost.slug, title: nextPost.entry.title }
              : null
          }
        />
      </main>
      <Footer />
    </div>
  );
}
