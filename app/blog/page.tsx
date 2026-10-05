import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GST & Invoicing Blog for Indian Freelancers | BillBuddy",
  description: "Practical guides on GST invoices, CGST/SGST/IGST, HSN/SAC codes, exports under LUT and getting paid on time, written for Indian freelancers and consultants.",
  path: "/blog",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">GST and invoicing guides</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Plain-English explanations of the GST rules freelancers and small businesses actually run into.</p>
      <ul className="mt-8 space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="surface p-5">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${p.slug}`} className="hover:text-teal-600">
                {p.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {formatPostDate(p.date)} · {p.readingMinutes} min read
            </p>
            <p className="mt-2 text-slate-600">{p.description}</p>
          </li>
        ))}
      </ul>
      <Cta />
    </div>
  );
}
