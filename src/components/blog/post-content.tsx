import { DocumentRenderer } from "@keystatic/core/renderer";

type PostContentProps = {
  content: Awaited<ReturnType<() => Promise<any>>>;
};

export function PostContent({ content }: PostContentProps) {
  return (
    <article className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-muted prose-pre:border prose-pre:border-border max-w-none">
      <DocumentRenderer document={content} />
    </article>
  );
}
