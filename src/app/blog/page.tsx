import { reader } from "@/lib/keystatic/reader";
import { Header, Footer } from "@/components/landing";
import { BlogList } from "@/components/blog/blog-list";
import { BlogHero } from "@/components/blog/blog-hero";

export const metadata = {
  title: "Blog",
  description:
    "Deep dives into Heart Rate Variability, cycling performance metrics, and the future of data-driven endurance athletics.",
};

export default async function BlogPage() {
  const posts = await reader.collections.posts.all();

  const publishedPosts = posts
    .filter((p) => !p.entry.draft)
    .sort(
      (a, b) =>
        new Date(b.entry.date ?? 0).getTime() -
        new Date(a.entry.date ?? 0).getTime()
    );

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <BlogHero />
        <BlogList posts={publishedPosts} />
      </main>
      <Footer />
    </div>
  );
}
