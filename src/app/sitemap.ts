import { MetadataRoute } from "next";
import { reader } from "@/lib/keystatic/reader";

const BASE_URL = "https://deepmetric.fit";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await reader.collections.posts.all();

  const blogEntries = posts
    .filter((p) => !p.entry.draft)
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.entry.date
        ? new Date(post.entry.date)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
