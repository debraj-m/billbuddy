import Link from "next/link";
import { ExampleInvoicePreview } from "@/components/ExampleInvoice";
import { FaqList } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { professions } from "@/data/professions";
import { stateGuides } from "@/data/states";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { faqJsonLd, pageMetadata, webApplicationJsonLd, type Faq } from "@/lib/seo";

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

const ICONS = [
  <g key="split">
    <line x1="19" x2="5" y1="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </g>,
  <g key="shield">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </g>,
  <g key="rupee">
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="m6 13 8.5 8" />
    <path d="M6 13h3" />
    <path d="M9 13c6.667 0 6.667-10 0-10" />
  </g>,
  <g key="layout">
    <rect width="18" height="7" x="3" y="3" rx="1" />
    <rect width="9" height="7" x="3" y="14" rx="1" />
    <rect width="5" height="7" x="16" y="14" rx="1" />
  </g>,
  <g key="wallet">
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </g>,
  <g key="lock">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </g>,
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
  const showcase = professions[0];
  return (
    <>
      <JsonLd data={[webApplicationJsonLd, faqJsonLd(faqs)]} />

      <section className="hero-bg">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-semibold text-teal-800 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Free forever · No sign-up · Works in your browser
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-slate-900 sm:text-6xl">
              GST invoices that look <span className="relative whitespace-nowrap text-teal-700">professional<svg aria-hidden="true" viewBox="0 0 200 12" className="absolute -bottom-2 left-0 h-2 w-full text-amber-300" preserveAspectRatio="none"><path d="M2 8 C 50 2, 120 2, 198 7" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" /></svg></span>, in two minutes.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Built for Indian freelancers and small businesses. Automatic CGST, SGST and IGST, GSTIN checks, the amount in words and a clean PDF. Your data never leaves your device.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/generator" className="rounded-full bg-teal-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/20 hover:bg-teal-800">
                Create an invoice
              </Link>
              <Link href="/invoice-template" className="rounded-full border border-teal-200 bg-white px-7 py-3.5 text-base font-semibold text-teal-900 hover:border-teal-400">
                Browse templates
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              {["CGST / SGST / IGST", "Lakh & crore in words", "UPI + bank details", "3 templates"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="text-teal-600">✓</span> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full min-w-0 max-w-[34rem]">
            <div aria-hidden="true" className="dot-grid absolute -right-6 -top-6 h-40 w-40 opacity-70" />
            <div className="relative max-h-[34rem] rotate-1 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl shadow-teal-900/15 ring-1 ring-teal-900/10">
              <ExampleInvoicePreview example={showcase.example} label="Sample GST invoice made with BillBuddy" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-3 hidden rounded-xl border border-teal-100 bg-white px-4 py-3 text-sm shadow-lg sm:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Karnataka to Maharashtra</p>
              <p className="font-semibold text-slate-900">IGST applied automatically</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="how">
        <p className="eyebrow">How it works</p>
        <h2 id="how" className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">From blank form to PDF in three steps</h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="surface p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-700 font-display text-lg font-extrabold text-white">{s.n}</span>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 leading-relaxed text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-teal-900/10 bg-white py-16" aria-labelledby="features">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow">Features</p>
          <h2 id="features" className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Everything a GST invoice needs, nothing it does not</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <li key={f.title} className="rounded-2xl border border-teal-900/10 bg-gradient-to-b from-teal-50/60 to-white p-6">
                <span aria-hidden="true" className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-md shadow-teal-900/20 ring-1 ring-inset ring-white/25">
                  <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[i]}
                  </svg>
                </span>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-1.5 leading-relaxed text-slate-600">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="templates">
        <p className="eyebrow">Templates</p>
        <h2 id="templates" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Start from an invoice made for your work</h2>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {professions.map((p) => (
            <li key={p.slug}>
              <Link href={`/invoice-template/${p.slug}`} className="inline-block rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-500 hover:text-teal-800">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mt-12 text-xl font-bold">GST invoice format by state</h3>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {stateGuides.map((s) => (
            <li key={s.slug}>
              <Link href={`/gst-invoice-format/${s.slug}`} className="inline-block rounded-full border border-amber-200 bg-amber-50/60 px-4 py-2 text-sm font-medium text-slate-800 transition hover:-translate-y-0.5 hover:border-amber-400">
                {s.name} <span className="text-slate-400">· {s.code}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6" aria-labelledby="blog">
        <p className="eyebrow">Guides</p>
        <h2 id="blog" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">GST, explained plainly</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="surface lift block h-full p-5">
                <p className="text-xs font-medium text-slate-500">{formatPostDate(p.date)} · {p.readingMinutes} min read</p>
                <h3 className="mt-2 text-lg font-bold leading-snug">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-6">
        <FaqList faqs={faqs} />
        <Cta />
      </div>
    </>
  );
}
