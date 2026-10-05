import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Cta } from "@/components/Cta";
import { ExampleInvoicePreview, exampleView } from "@/components/ExampleInvoice";
import { FaqList } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { professions } from "@/data/professions";
import { getStateGuide, stateGuides } from "@/data/states";
import { getAllPosts } from "@/lib/blog";
import { calcLine } from "@/lib/gst";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/words";

export const dynamicParams = false;

export function generateStaticParams() {
  return stateGuides.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gst-invoice-format/[state]">): Promise<Metadata> {
  const { state } = await params;
  const s = getStateGuide(state);
  if (!s) return {};
  return pageMetadata({ title: s.title, description: s.description, path: `/gst-invoice-format/${s.slug}` });
}

export default async function StatePage({ params }: PageProps<"/gst-invoice-format/[state]">) {
  const { state } = await params;
  const s = getStateGuide(state);
  if (!s) notFound();

  const view = exampleView(s.example);
  const sample = { qty: 1, rate: 50000, discount: 0, gstRate: 18 };
  const intra = calcLine(sample, true);
  const inter = calcLine(sample, false);
  const posts = getAllPosts().filter((x) => s.blog.includes(x.slug));
  const others = stateGuides.filter((x) => x.slug !== s.slug).slice(0, 6);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "GST invoice format by state", path: "/gst-invoice-format" },
    { name: s.name, path: `/gst-invoice-format/${s.slug}` },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd data={[faqJsonLd(s.faqs), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">GST invoice format for {s.name} (state code {s.code})</h1>
      <div className="prose-bb mt-4">
        {s.intro.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>
      <Link href="/generator" className="mt-2 inline-block rounded-full bg-teal-700 px-6 py-3 font-semibold text-white shadow-md shadow-teal-900/15 hover:bg-teal-800">
        Create a {s.name} GST invoice →
      </Link>

      <section className="mt-12">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">{s.name} tax split at a glance</h2>
        <p className="mb-4 max-w-3xl text-slate-600">
          For a ₹{formatINR(sample.rate)} service at 18% GST, here is what appears on the invoice depending on where the client is.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="surface p-4">
            <h3 className="font-semibold">Client in {s.name} (same state)</h3>
            <dl className="mt-2 space-y-1 text-sm">
              <div className="flex justify-between"><dt>CGST 9%</dt><dd>₹{formatINR(intra.cgst)}</dd></div>
              <div className="flex justify-between"><dt>SGST 9%</dt><dd>₹{formatINR(intra.sgst)}</dd></div>
              <div className="flex justify-between border-t border-slate-200 pt-1 font-semibold"><dt>Invoice total</dt><dd>₹{formatINR(intra.total)}</dd></div>
            </dl>
          </div>
          <div className="surface p-4">
            <h3 className="font-semibold">Client in {s.partner.name} (state code {s.partner.code})</h3>
            <dl className="mt-2 space-y-1 text-sm">
              <div className="flex justify-between"><dt>IGST 18%</dt><dd>₹{formatINR(inter.igst)}</dd></div>
              <div className="flex justify-between border-t border-slate-200 pt-1 font-semibold"><dt>Invoice total</dt><dd>₹{formatINR(inter.total)}</dd></div>
            </dl>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-500">Hubs covered: {s.hubs.join(", ")}. Every GSTIN registered in {s.name} starts with {s.code}.</p>
      </section>

      <section className="mt-12">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">Example invoice from {s.name}</h2>
        <p className="mb-4 max-w-3xl text-slate-600">
          {s.example.sellerName} invoices {s.example.buyerName} in {view.buyerState}. The tax is {view.intra ? "CGST and SGST" : "IGST"} and the total is ₹{formatINR(view.totals.grandTotal)}.
        </p>
        <ExampleInvoicePreview example={s.example} label={`Example GST invoice from ${s.name}`} />
      </section>

      <div className="prose-bb">
        <h2>Points that matter when invoicing from {s.name}</h2>
        <ul>
          {s.localPoints.map((pt) => (
            <li key={pt.title}>
              <strong>{pt.title}.</strong> {pt.text}
            </li>
          ))}
        </ul>
        <h2>Fields every {s.name} GST invoice needs</h2>
        <p>
          Every tax invoice from a {s.name} seller must carry your name, address and GSTIN (starting {s.code}), a unique invoice number and date, the client&apos;s name and address, the place of supply, HSN or SAC code, taxable value, tax rate and amount, and the total. The full list is in our guide to{" "}
          <Link href="/blog/what-is-a-gst-invoice-mandatory-fields">mandatory GST invoice fields</Link>.
        </p>
      </div>

      <Cta href="/generator" title={`Generate your ${s.name} GST invoice`} text="Pick your state, add the client's state and BillBuddy applies the right tax automatically." />

      <FaqList faqs={s.faqs} heading={`${s.name} GST invoice FAQs`} />

      <section className="mt-12">
        <h2 className="mb-3 text-xl font-bold">Invoice templates by profession</h2>
        <ul className="flex flex-wrap gap-2">
          {professions.slice(0, 8).map((p) => (
            <li key={p.slug}>
              <Link className="rounded-full border border-teal-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm hover:border-teal-500 hover:text-teal-800" href={`/invoice-template/${p.slug}`}>
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {posts.length > 0 && (
        <section className="mt-10">
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
        <h2 className="mb-3 text-xl font-bold">Other states</h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link className="rounded-full border border-teal-200 bg-white px-4 py-1.5 text-sm font-medium shadow-sm hover:border-teal-500 hover:text-teal-800" href={`/gst-invoice-format/${o.slug}`}>
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
