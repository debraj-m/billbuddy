import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Cta } from "@/components/Cta";
import { ExampleInvoicePreview, exampleView } from "@/components/ExampleInvoice";
import { FaqList } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { getProfession, professions } from "@/data/professions";
import { stateGuides } from "@/data/states";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/words";

export const dynamicParams = false;

export function generateStaticParams() {
  return professions.map((p) => ({ profession: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/invoice-template/[profession]">): Promise<Metadata> {
  const { profession } = await params;
  const p = getProfession(profession);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.description, path: `/invoice-template/${p.slug}` });
}

export default async function ProfessionPage({ params }: PageProps<"/invoice-template/[profession]">) {
  const { profession } = await params;
  const p = getProfession(profession);
  if (!p) notFound();

  const view = exampleView(p.example);
  const t = view.totals;
  const posts = getAllPosts().filter((x) => p.blog.includes(x.slug));
  const stateGuide = stateGuides.find((s) => s.code === p.example.sellerStateCode);
  const related = professions.filter((x) => p.related.includes(x.slug));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Invoice templates", path: "/invoice-template" },
    { name: p.name, path: `/invoice-template/${p.slug}` },
  ];
  const taxSentence = view.intra
    ? `Both parties are in ${view.sellerState}, so the ₹${formatINR(t.totalTax)} of GST is split into CGST of ₹${formatINR(t.cgst)} and SGST of ₹${formatINR(t.sgst)}.`
    : `The seller is in ${view.sellerState} and the client is in ${view.buyerState}, so the whole ₹${formatINR(t.totalTax)} of GST is charged as IGST.`;

  return (
    <article className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={[faqJsonLd(p.faqs), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{p.h1}</h1>
      <div className="prose-bb mt-4">
        {p.intro.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>
      <Link href={`/generator?example=${p.slug}`} className="mt-2 inline-block rounded-full bg-teal-700 px-6 py-3 font-semibold text-white shadow-md shadow-teal-900/15 hover:bg-teal-800">
        Use this {p.name.toLowerCase()} template →
      </Link>

      <section className="mt-12">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">Example {p.name.toLowerCase()} invoice</h2>
        <p className="mb-4 max-w-3xl text-slate-600">
          {p.example.sellerName} bills {p.example.buyerName} for ₹{formatINR(t.taxable)} before tax. {taxSentence} The invoice total is ₹{formatINR(t.grandTotal)}.
        </p>
        <ExampleInvoicePreview example={p.example} label={`Example ${p.name} invoice`} />
      </section>

      <div className="prose-bb">
        <h2>SAC codes {p.name.toLowerCase()}s commonly use</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>What it covers</th>
            </tr>
          </thead>
          <tbody>
            {p.sac.map((s) => (
              <tr key={s.code}>
                <td>{s.code}</td>
                <td>{s.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          These are commonly used headings, not legal advice. Confirm the best fit with your accountant, and read our <Link href="/blog/hsn-vs-sac-codes-practical-guide">HSN vs SAC guide</Link> for how to choose.
        </p>

        <h2>What to get right on a {p.name.toLowerCase()} invoice</h2>
        <ul>
          {p.tips.map((tip) => (
            <li key={tip.title}>
              <strong>{tip.title}.</strong> {tip.text}
            </li>
          ))}
        </ul>

        <h2>How {p.name.toLowerCase()}s usually bill</h2>
        <p>{p.billing}</p>
        <p>
          The place of supply decides the tax type: {view.sellerState || "your state"} to {view.buyerState || "the client's state"} is {view.intra ? "an intra-state supply (CGST + SGST)" : "an inter-state supply (IGST)"}. See{" "}
          <Link href="/blog/cgst-sgst-igst-when-each-applies">CGST vs SGST vs IGST</Link> for the full rules, or see how invoicing works{" "}
          {stateGuide ? (
            <>
              in <Link href={`/gst-invoice-format/${stateGuide.slug}`}>{stateGuide.name}</Link>.
            </>
          ) : (
            <>
              across <Link href="/gst-invoice-format">Indian states</Link>.
            </>
          )}
        </p>
      </div>

      <Cta
        title={`Create your own ${p.name.toLowerCase()} invoice`}
        text="Start from this example, change the client and rates, and download the PDF. No sign-up."
        href={`/generator?example=${p.slug}`}
        label="Open in the generator"
      />

      <FaqList faqs={p.faqs} heading={`${p.name} invoice FAQs`} />

      {posts.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-3 text-xl font-bold">Further reading</h2>
          <ul className="space-y-2">
            {posts.map((x) => (
              <li key={x.slug}>
                <Link className="text-teal-600 hover:underline" href={`/blog/${x.slug}`}>
                  {x.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-bold">Related invoice templates</h2>
        <ul className="flex flex-wrap gap-2">
          {related.map((r) => (
            <li key={r.slug}>
              <Link className="rounded-full border border-teal-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm hover:border-teal-500 hover:text-teal-800" href={`/invoice-template/${r.slug}`}>
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
