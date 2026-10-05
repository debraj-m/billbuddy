import Link from "next/link";
import { FaqList } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { professions } from "@/data/professions";
import { stateGuides } from "@/data/states";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { faqJsonLd, pageMetadata, type Faq } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BillBuddy – Free GST Invoice Generator for Indian Freelancers",
  description: "Create professional GST invoices in minutes. Automatic CGST/SGST/IGST, amount in words, 3 templates and PDF download. Free, no sign-up, private by design.",
  path: "/",
});

const steps = [
  { n: "1", title: "Add your details", text: "Enter your business, GSTIN and bank details once. They are remembered in your browser for next time." },
  { n: "2", title: "Add client and items", text: "Pick the client's state and list your work with HSN/SAC and GST rate. Tax is calculated as you type." },
  { n: "3", title: "Download the PDF", text: "Choose a template, check the live preview and download a clean A4 PDF to send to your client." },
];

const features = [
  { title: "Automatic CGST, SGST and IGST", text: "Same state means CGST + SGST. Different state means IGST. No manual maths." },
  { title: "GSTIN validation", text: "Catches wrong-length or malformed GSTINs and PAN before they reach a client." },
  { title: "Amount in words", text: "Totals written in the Indian system: lakh and crore, with paise." },
  { title: "Three templates", text: "Classic, Modern and Minimal, all print-ready on A4." },
  { title: "UPI and bank details", text: "Put your UPI ID and bank account on the invoice so clients can pay immediately." },
  { title: "Private by design", text: "No account, no server storage. Your invoices never leave your device." },
];

const faqs: Faq[] = [
  { q: "Is BillBuddy free?", a: "Yes, completely. There are no accounts, limits or watermarks." },
  { q: "Do I need to sign up?", a: "No. Open the generator, fill in the form and download your PDF." },
  { q: "Is my data safe?", a: "Your data stays in your browser. BillBuddy has no database and does not upload your invoices. A draft is saved in your browser's local storage so you can come back later." },
  { q: "Is the invoice GST compliant?", a: "The PDF includes the fields required on a tax invoice: supplier and recipient details, GSTIN, invoice number and date, HSN/SAC, taxable value, tax rate and amount, place of supply and total. BillBuddy is a tool, not tax advice, so check with your accountant for your situation." },
  { q: "Can I use it if I am not GST registered?", a: "Yes. Leave the GSTIN blank and set the GST rate to 0% to produce a plain invoice or bill of supply." },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/40 dark:to-transparent">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Free GST invoice generator for Indian freelancers</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Create a professional, GST-ready invoice in two minutes. Automatic CGST/SGST/IGST, amount in words and instant PDF. No sign-up, and your data never leaves your browser.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/generator" className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow hover:bg-indigo-700">
              Create an invoice
            </Link>
            <Link href="/invoice-template" className="rounded-lg border border-slate-300 px-6 py-3 text-base font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
              Browse templates
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="how">
        <h2 id="how" className="text-center text-2xl font-bold tracking-tight sm:text-3xl">How it works</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-600 text-sm font-bold text-white">{s.n}</span>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-slate-50 py-14 dark:bg-slate-900/40" aria-labelledby="features">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="features" className="text-center text-2xl font-bold tracking-tight sm:text-3xl">Everything a GST invoice needs</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.title} className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="templates">
        <h2 id="templates" className="text-2xl font-bold tracking-tight sm:text-3xl">Start from a template for your work</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {professions.map((p) => (
            <li key={p.slug}>
              <Link href={`/invoice-template/${p.slug}`} className="inline-block rounded-full border border-slate-300 px-4 py-1.5 text-sm hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mt-8 text-lg font-semibold">GST invoice format by state</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {stateGuides.map((s) => (
            <li key={s.slug}>
              <Link href={`/gst-invoice-format/${s.slug}`} className="inline-block rounded-full border border-slate-300 px-4 py-1.5 text-sm hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6" aria-labelledby="blog">
        <h2 id="blog" className="text-2xl font-bold tracking-tight sm:text-3xl">Latest guides</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <Link href={`/blog/${p.slug}`} className="font-semibold hover:text-indigo-600">{p.title}</Link>
              <p className="mt-1 text-xs text-slate-500">{formatPostDate(p.date)}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-6">
        <FaqList faqs={faqs} />
      </div>
    </>
  );
}
