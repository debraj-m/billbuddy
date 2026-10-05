import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { mdxComponents } from "@/components/mdx";
import { formatPostDate, getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: `${post.title} | BillBuddy`,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={[articleJsonLd(post), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs crumbs={crumbs} />
      <header>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-slate-500">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min read
        </p>
      </header>
      <div className="prose-bb mt-8">
        <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>
      <Cta />
      <section className="mt-10" aria-labelledby="related">
        <h2 id="related" className="mb-3 text-xl font-bold">
          Related articles
        </h2>
        <ul className="space-y-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/blog/${r.slug}`} className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                {r.title}
              </Link>
              <p className="text-sm text-slate-600 dark:text-slate-400">{r.description}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
          Looking for a ready-made format? Browse <Link className="text-indigo-600 hover:underline" href="/invoice-template">invoice templates by profession</Link> or{" "}
          <Link className="text-indigo-600 hover:underline" href="/gst-invoice-format">GST invoice formats by state</Link>.
        </p>
      </section>
    </article>
  );
}
